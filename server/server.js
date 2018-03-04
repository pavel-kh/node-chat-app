const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const { generateMessage } = require('./utils/message');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');



    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));



    socket.on('createMessage', (message) => {
        console.log(message);


        io.emit('newMessage', generateMessage(message.from, message.text));
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});
