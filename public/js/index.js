let socket=io();
socket.on('connect',function (){
    console.log('Connected to server');

});

socket.on('disconnect',function (){
    console.log('Disconnected from server');
});


socket.on('newMessage',function(message){
    // console.log(`Got new messegae `,message);
     let formatedTime= moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formatedTime
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My current location</a>');
    let formatedTime= moment(message.createdAt).format('h:mm a');

    // li.text(`${message.from}: ${formatedTime}  `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formatedTime
    });

    jQuery('#messages').append(html);
 
});
// socket.emit('CreateMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    let messageTextbox=jQuery('[name=message]');
    socket.emit('CreateMessage',{
        from:'User',
        text:messageTextbox.val()
    },function(){
        messageTextbox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
    if(!navigator.geolocation){
        return alert('Geolaction not supported by your browser.');
    }

    locationButton.attr('disabled','disabled').text("Sending location...");
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fecth location.');
    });
});

