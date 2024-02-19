import { LOGOUT_USER, SET_USER } from '../types';
import axios from 'axios';
import { Dispatch } from 'redux';
import { connectSocket } from '../../libs/socketClient';
import { disconnectSocket } from '../../libs/socketClient';


export const setUser = (name: string, token: string) => ({
    type: SET_USER,
    payload: { name, token }
});

export const logoutUser = () => {
    disconnectSocket(); // Disconnect from Socket.IO server
    return {
        type: LOGOUT_USER
    };
}

export const login = (name1: string, password: string): any => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post('/api/auth/login', { name: name1, password });
            const { name, token } = response.data; // Assuming backend returns name and token
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
            dispatch(setUser(name, token));
            connectSocket(token);
            return '/main-area/users';
        } catch (error) {
            // throw error;
            return undefined;
        }
    };
};

export default {
    setUser,
    logoutUser,
    login: login,
};
