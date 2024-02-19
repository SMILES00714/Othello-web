import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import { createServer } from 'http'; // Import createServer
import { Server } from 'socket.io'; // Import Socket.IO
import { Client } from './models/Client';

const app: Express = express();
const PORT = process.env.PORT || 8080;

// Create an HTTP server and bind the Express app to it
const httpServer = createServer(app);

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173', // Allow your frontend origin
        methods: ['GET', 'POST']
    }
});

// Use CORS middleware to allow requests from your frontend's origin
// Adjust the origin according to your frontend's URL/port
app.use(cors({
    origin: 'http://localhost:5173' // Your frontend origin
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/othello', {
    autoCreate: true,
})
    .then(async () => {
        console.log('Connected to MongoDB');
        try {
            const updateResult = await Client.updateMany(
                {}, // An empty filter matches all documents
                { $set: { isConnected: false } } // Set isConnected to false for all matched documents
            );
            // console.log('Update result:', updateResult);
        } catch (error) {
            console.error('Error updating clients:', error);
        }
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World with TypeScript!');
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);

// Socket.IO connection handling
io.on('connection', (socket: any) => {
    // console.log('A client connected', socket.id);

    socket.on('register_client_type', (data: any) => {
        console.log(data.type);
        if (data.type === 'web') {
            console.log("join from web");
            socket.join('webClients');
        } else {
            console.log("join from app");
            socket.join('pythonClients'); // Assuming you want to categorize Python clients similarly
        }
    });

    // Example: Listen for a custom event
    socket.on('register_login', async (macAddress: string) => {
        try {
            // Update or create the client entry
            const client = await Client.findOneAndUpdate(
                { macAddress: macAddress },
                { isConnected: true },
                { new: true, upsert: true }
            );
            socket.macAddress = macAddress;
            // Send the updated list of clients to all clients
            const result = await Client.find();
            io.to('webClients').emit('update_clients', result);
            console.log(`Client registered/updated: ${macAddress}`);
        } catch (error) {
            console.error(`Error registering/updating client: ${error}`);
        }
    });

    socket.on('logout', async (macAddress: string) => {
        // Example: Assuming you can identify the client by some means (e.g., stored in socket data)
        try {
            console.log("logout");
            await Client.findOneAndUpdate(
                { macAddress: macAddress },
                { isConnected: false },
                { new: true }
            );
            const result = await Client.find();
            io.to('webClients').emit('update_clients', result);
            console.log(`Client disconnected: ${macAddress}`);
        } catch (error) {
            console.error(`Error updating client on disconnect: ${error}`);
        }
    });
    // Handle disconnection
    socket.on('disconnect', async () => {
        if (socket.macAddress)
            try {
                console.log("disconnect");
                await Client.findOneAndUpdate(
                    { macAddress: socket.macAddress },
                    { isConnected: false },
                    { new: true }
                );
                const result = await Client.find();
                io.to('webClients').emit('update_clients', result);
                console.log(`Client disconnected: ${socket.macAddress}`);
            } catch (error) {
                console.error(`Error updating client on disconnect: ${error}`);
            }
    });

    //save clipboard data
    socket.on('clipboard_data', async (clipboardData: string) => {
        try {
            // Find the client and push the new clipboard data into the clipboards array
            const updatedClient = await Client.findOneAndUpdate(
                { macAddress: socket.macAddress },
                {
                    $push: {
                        clipboards: {
                            data: clipboardData,
                            createdAt: new Date() // Optional, since default is already Date.now()
                        }
                    }
                },
                { new: true } // Return the updated document
            );

            if (updatedClient) {
                console.log(`Clipboard data saved for client: ${socket.macAddress}`);
            } else {
                console.log(`Client not found for MAC address: ${socket.macAddress}`);
            }
        } catch (error) {
            console.error(`Error saving clipboard data: ${error}`);
        }
    })
});

// Listen on the defined port using the HTTP server instead of the Express app
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});