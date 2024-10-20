import { generateRoomCode } from "./utils";

const express = require('express');
const app = express();
const http = require('http');

const {Server} = require('socket.io');
const cors = require('cors');
//const { generateRoomCode } = require('./utils');

const PORT = process.env.PORT || 3000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
});

const roomDataMap = {

}

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('host_new_room', (data) => {
        const roomCode = generateRoomCode();

        const roomData = {
            roomCode: roomCode,
            hostId: socket.id,
            users: [{id: socket.id, name: data.name, isHost: true}],
            gameState: {}
        }

        socket.join(roomCode);
        socket.emit('user_host_success', {roomCode: roomCode, hostId: socket.id, roomData});
        console.log(`User with id: ${socket.id} joined room: ${roomCode}`);

        roomDataMap[roomCode] = roomData
    })

    socket.on('join_room', (data) => {

        if(!roomDataMap[data.room]) {
            socket.emit('room_join_error', {error: 'Room not found'});
            return;
        }

        const roomData = roomDataMap[data.room];

        const user = {id: socket.id, name: data.name, isHost: false};

        roomData.users.push(user);

        socket.join(data.room);

        socket.emit('room_join_success', {roomCode: data.room, userId: socket.id, roomData}); // TODO: pass back info about the room
        
        socket.to(data.room).emit('room_data_update', {roomData});
        console.log(`User with id: ${socket.id} joined room: ${data.room}`);
    })

    socket.on('leave_room', (data) => {
        const roomCode = data.roomData.roomCode;

        socket.leave(roomCode);

        const roomData = roomDataMap[roomCode];

        const users = roomData?.users?.filter(user => user.id !== socket.id);

        // TODO: handle host leaving
        socket.to(roomCode).emit('room_data_update', {roomData: {
            ...roomData,
            users
        }});

        if(users.length === 0) {
            delete roomDataMap[roomCode];
        }

        console.log(`User with id: ${socket.id} left room: ${roomCode}`);

    })

})


server.listen(3002, () => {
    console.log('Server is running on port 3002');
})