const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');


    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //socket.leave();

        //io.emit -> io.to('room name').emit
        //socket.broadcast.emit -> socket.boradcast.to('room name').emit
        //socket.emit

        socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });

    socket.on('CreateMessage',(message,callback)=>{
        console.log('Creat Message',message);
        
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }
        
        callback();
        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createAt:new Date().getTime()
        // });
    });

    socket.on('createLocationMessage',(coords)=>{
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
        }
        
    });

    socket.on('disconnect',()=>{
        console.log(`client disconected`);
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }
    });
});


server.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});