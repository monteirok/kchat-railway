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
    process.stdout.write('\033c');
    console.log('\x1b[2m\x1b[36m=====================\x1b[0m');
    console.log("  \x1b[37mWelcome to kChat Console!\x1b[0m");
    console.log('\x1b[2m\x1b[36m=====================\x1b[0m');
    console.log('\x1b[100m\x1b[32m[SUCCESS]\x1b[0m' + '\x1b[33m Server is running on port ' + '\x1b[4m3000\x1b[0m' + ' \x1b[5m\x1b[35m->\x1b[0m' + '\x1b[2m\x1b[35m http://localhost:3000 \x1b[0m');
    console.log('\x1b[2m\x1b[36m-_-_-_-_-_-_-_-_-_-_-_');
    console.log();
});

io.on('connection', (socket) => {
    console.log('\x1b[5m\x1b[32m >>\x1b[0m' + '\x1b[2mNew user connected\x1b[0m');

    socket.on('disconnect', () => {
        console.log('\x1b[0m\x1b[5m\x1b[31m >>\x1b[0m' + '\x1b[2mUser disconnected\x1b[0m');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
        console.log('\x1b[5m\x1b[34m [\x1b[0m' + '\x1b[2m\x1b[34mCHAT\x1b[0m' + '\x1b[5m\x1b[34m]\x1b[0m ' + msg);
    });
});