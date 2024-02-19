import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from 'axios';
import { User } from '../libs/types';

const UserBoard = () => {
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                console.log(token);
                const response = await axios.get('/api/auth/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    // Handle error response
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers(); // Always fetch users when the component mounts
    }, []);


    return (
        <Container>
            <Typography variant="h4">User Information</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Password</TableCell>
                            {/* Add more table headings as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: User, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                {/* Add more table cells for other user properties */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default UserBoard;
