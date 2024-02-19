import {
    SET_CLIENTS,
    CLEAR_CLIENTS,
} from '../types';
import { Client } from '../../libs/types';

const initialState: Client[] = [];

const clientsReducer = (state: Client[] = initialState, action: any) => {
    switch (action.type) {
        case SET_CLIENTS:
            return [...action.payload];
        case CLEAR_CLIENTS:
            return [];
        default:
            return state;
    }
};
export default clientsReducer;
