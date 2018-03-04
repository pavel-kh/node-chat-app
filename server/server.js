const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage' , {
        from : 'John',
        text : "asdasd",
        createdAt: new Date()
    });
    
    socket.on('createMessage', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`App started on port ${port}`);
});
