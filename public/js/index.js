/*global jQuery navigator alert io moment*/
var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');


});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});


socket.on('newMessage', (message) => {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('hh:mm:ss');

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    console.log('newMessage', message);

});

jQuery('#message-form').submit(function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()

    }, () => {
        messageTextbox.val('');
    });
});
socket.on('newLocationMessage', (message) => {
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('hh:mm:ss');

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

});
var locationButton = jQuery('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending Location');
    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        console.log(position);
    }, () => {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location').text('Send Location');
    });
});
