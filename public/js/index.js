var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage',{
        from : 'Pasha',
        text : 'Hi, whats up?'
    });
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});


socket.on('newMessage', (message) =>{
    console.log('newMessage' , message);
});