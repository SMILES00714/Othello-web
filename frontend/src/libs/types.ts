export interface AuthState {
    name: string | null;
    token: string | null;
}

export type User = {
    id: string,
    name: string;
    password: string;
};

export type Client = {
    macAddress: string,
    isConnected: boolean,
    createdAt: Date,
}