import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production'
    ? undefined
    : 'https://dating-app-ls06.onrender.com';

export const socket = io(URL, {
  autoConnect: false,
});
