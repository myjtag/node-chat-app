let socket=io();
socket.on('connect',function (){
    console.log('Connected to server');

});

socket.on('disconnect',function (){
    console.log('Disconnected from server');
});


socket.on('newMessage',function(message){
    console.log(`Got new messegae `,message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('CreateMessage',{
//     from:'Frank',
//     text:'Hi'
// },function(data){
//     console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('CreateMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function(){

    });
});
