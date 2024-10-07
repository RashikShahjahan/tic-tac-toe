import { io } from "socket.io-client";


export function useSocketIO(){
    const SERVER_URL = 'http://localhost:3000';
    const socket = io(SERVER_URL);
    return socket.connect();
}

