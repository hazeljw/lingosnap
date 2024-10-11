const express = require('express');
const app = express();
const http = require('http');

const {Server} = require('socket.io');
const cors = require('cors');
//const { generateRoomCode } = require('./utils');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join_room', (data) => {
        socket.join(data.room);
        console.log(`User with id: ${socket.id} joined room: ${data.room}`);
        //console.log("code", generateRoomCode());
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message', data);

        //socket.broadcast.emit('receive_message', data);

        //socket.emit('receive_message', {message: 'You sent: ' + data.message});

        //socket.emit('receive_message', data);
        //console.log(data);
    })
})


server.listen(3002, () => {
    console.log('Server is running on port 3002');
})