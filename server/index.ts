import { generateRoomCode } from "./utils";

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

    socket.on('host_new_room', (data) => {
        const roomCode = generateRoomCode();
        socket.join(roomCode);
        socket.emit('user_host_success', {roomCode: roomCode, hostId: socket.id});
        console.log(`User with id: ${socket.id} joined room: ${data.room}`);
    })

    socket.on('join_room', (data) => {
        socket.join(data.room);

        socket.emit('room_join_success', {roomCode: data.room, userId: socket.id}); // TODO: pass back info about the room
        console.log(`User with id: ${socket.id} joined room: ${data.room}`);
    })
    
})


server.listen(3002, () => {
    console.log('Server is running on port 3002');
})