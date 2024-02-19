import { Client } from '../../libs/types';
import { SET_CLIENTS, CLEAR_CLIENTS } from '../types';


export const setClients = (data: Client[]) => ({
    type: SET_CLIENTS,
    payload: data,
});

export const clearClients = () => ({
    type: CLEAR_CLIENTS
});

export default {
    setClients,
    clearClients,
};