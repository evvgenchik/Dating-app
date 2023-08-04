import { io } from 'socket.io-client';

const URL = 'https://dating-app-ls06.onrender.com';

export const socket = io(URL, {
  autoConnect: false,
});
