import io from 'socket.io-client';

import config from 'config';

const socket = io(config.WS_URL, {
  transports: ['websocket'],
  autoConnect: false,
});

export const connected = () => socket.connected;

export const disconnected = () => socket.disconnected;
