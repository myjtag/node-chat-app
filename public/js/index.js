let socket=io();
socket.on('connect',function (){
    console.log('Connected to server');

    socket.emit('CreateMessage',{
        from:'jen@exmaple.com',
        text:'Hey a new text from client'
    });
});

socket.on('disconnect',function (){
    console.log('Disconnected from server');
});


socket.on('newMessage',function(message){
    console.log(`Got new messegae from ${message.from},   \r\n${message.text} \r\n${message.createAt}`);
});


