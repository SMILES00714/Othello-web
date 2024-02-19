import { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from "@mui/material";
import ClientTable from '../components/ClientTable';
import { getSocket } from '../libs/socketClient';
// import { setClients } from '../redux/actions/client.action';
// import { useDispatch } from 'react-redux';

const ClientBoard = () => {
    // const dispatch = useDispatch();
    const [cls, setCls] = useState([]);
    const socket = getSocket();

    useEffect(() => {
        // Fetch initial list of MAC addresses
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/clients/');
                setCls(response.data);
            } catch (error) {
                console.error(`Failed to fetch clients' MAC addresses:`, error);
            }
        };

        fetchClients();

        socket.on('update_clients', (data: any) => {
            // console.log('Updated clients data received:', data);
            // Handle the received data
            // dispatch(setClients(data));
            setCls(data);
        });

        return () => { socket.off('update_clients'); };
    }, []);

    return (
        <Container sx={{ display: 'flex' }}>
            <ClientTable data={cls} />
        </Container>
    );
}

export default ClientBoard;