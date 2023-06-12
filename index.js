// server.js
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

/** 
 * Setup Server:
 *   Run on port 3000, and handle connections/chat messages.
*/
server.listen(3000, () => {
  // clear the console
  console.clear();
  // display welcome message
  console.log('\x1b[2m\x1b[36m=====================\x1b[0m');
  console.log("  \x1b[37mWelcome to kChat Console!\x1b[0m");
  console.log('\x1b[2m\x1b[36m=====================\x1b[0m');
  console.log('\x1b[100m\x1b[32m[SUCCESS]\x1b[0m' + '\x1b[33m Server is running on port ' + '\x1b[4m3000\x1b[0m' + ' \x1b[5m\x1b[35m->\x1b[0m' + '\x1b[2m\x1b[35m http://localhost:3000 \x1b[0m');
  console.log('\x1b[2m\x1b[36m-_-_-_-_-_-_-_-_-_-_-_');
  console.log();
});

/**
 * HANDLE CONNECTIONS
 */
io.on('connection', (socket) => {
  // emit 'new user connected' message to chat/console
  socket.on('newUser', (username) => {
    socket.emit('chatMessage', {
      username: 'kChat',
      message: `${username} has joined the chat!`,
      color: '#ff0000'
    });

    console.log('\x1b[5m\x1b[32m >> \x1b[0m' + `[${username}]\x1b[2m has connected\x1b[0m`);
  });

  /**
   * disconnection
   */
  socket.on('disconnect', () => {
    // emit 'user disconnected' message to chat/console
    io.emit('chatMessage', {
      username: ' kChat ',
      message: `A user has left the chat.`,
      color: '#ff0000'
    });

    console.log('\x1b[0m\x1b[5m\x1b[31m >>\x1b[0m' + '\x1b[2mUser disconnected\x1b[0m');
  });
  
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
    // display user chat message to console
    console.log('\x1b[5m\x1b[34m [\x1b[0m' + '\x1b[2m\x1b[34m' + msg.username + '\x1b[0m' + '\x1b[5m\x1b[34m]\x1b[0m ' + msg.message);
  });
});