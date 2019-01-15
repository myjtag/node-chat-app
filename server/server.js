const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'Admin',
        text:'welcome to the chat app',
        createAt:new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'new user joined',
        createAt:new Date().getTime()
    });

    socket.on('CreateMessage',(message)=>{
        console.log('Creat Message',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createAt:new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createAt:new Date().getTime()
        // });
    });

    socket.on('disconnect',()=>{
        console.log(`client disconected`);
    });
});


server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});