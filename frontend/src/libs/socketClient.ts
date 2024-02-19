// import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
// import { setClients } from '../redux/actions/client.action';

let socket: Socket;

export const connectSocket = (token: string) => {
    // const dispatch = useDispatch();
    // Connect to Socket.IO server
    socket = io('http://localhost:8080', {
        query: { token },
        // Additional options if needed
    });

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
        // You can emit an event here if needed, e.g., to register the client type
        socket.emit('register_client_type', { type: 'web' });
    });

};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Disconnected from Socket.IO server');
    }
};

export const getSocket = () => socket;
