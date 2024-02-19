import {
    SET_USER,
    LOGOUT_USER
} from '../types';
import { AuthState } from '../../libs/types';

const initialState: AuthState = {
    name: null,
    token: null
};

const authReducer = (state: AuthState = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.payload.name,
                token: action.payload.token
            };
        case LOGOUT_USER:
            return {
                ...state,
                name: null,
                token: null
            };
        default:
            return state;
    }
};
export default authReducer;
