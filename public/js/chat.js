/*global jQuery navigator alert io moment window Mustache*/
var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', () => {
    console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, (err) => {
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
    });

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

    scrollToBottom();
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
