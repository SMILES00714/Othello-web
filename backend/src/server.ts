import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app: Express = express();
const PORT = process.env.PORT || 8080;

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
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World with TypeScript!');
});

app.use('/api/auth', authRoutes);

// Listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
