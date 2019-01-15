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
        from:'server',
        text:'text from server',
        createAt:new Date()
    });

    socket.on('CreateMessage',(newMessage)=>{
        console.log('Creat Message',newMessage);
    });

    socket.on('disconnect',()=>{
        console.log(`client disconected`);
    });
});


server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});