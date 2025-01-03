const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { initializeSocket } = require('./socketHandlers');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.static('public'));

initializeSocket(io);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});