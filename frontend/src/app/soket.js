import { io } from 'socket.io-client';

const socket = io('http://localhost:5432');

export default socket;
