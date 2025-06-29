import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5001'; 

export const socket = io(SERVER_URL, {
  autoConnect: false
});