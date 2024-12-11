const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');

const { generateRoomCode, getItemsForCard, moveToNextRound } = require("./utils");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"]
    }
});

app.use(cors());
app.use(router);

const SERVER_PORT = process.env.PORT || 3002

// const io = new Server(server, {
//     cors: {
//         origin: process.env.CLIENT_URL || "http://localhost:3000",
//         method: ["GET", "POST"]
//     }
// });

const roomDataMap = {}

io.on("connect", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('host_new_room', (data) => {
        const roomCode = generateRoomCode();

        const roomData = {
            roomCode: roomCode,
            hostId: socket.id,
            users: [{id: socket.id, name: data.name, isHost: true, score: 0, selectedLanguage: data.selectedLanguage, avatar: data.selectedAvatar}],
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

        const user = {id: socket.id, name: data.name, isHost: false, score: 0, selectedLanguage: data.selectedLanguage, avatar: data.selectedAvatar};

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


    socket.on('start_game', (data) => {
        const roomCode = data.roomData.roomCode;

        console.log("trying to start game")

        if(!roomDataMap[roomCode]) {
            socket.emit('start_game_error', {error: 'Room not found'});
            return;
        }

        const roomData = roomDataMap[roomCode];

        // generate the game state
        
        // TODO: make this change throughout the game
        const numberItemsPerCard = 3;

        const contentMode = data.contentMode

        const gameItems = getItemsForCard(numberItemsPerCard, contentMode);

        const rounds = data.rounds;
        const timePerRound = data.timePerRound * 1000; // convert to milliseconds

        const gameState = {
            totalRounds: rounds,
            timePerRound: timePerRound,
            contentMode,
            currentRound: 1,
            ...gameItems,
            userIdsWithCorrectAnswerForRound: [],
            roundExpiryTimeUTC: new Date(Date.now() + timePerRound)
        }
        
        // set all scores to 0
        roomData.users.forEach(user => user.score = 0);

        roomData.gameState = gameState;

        // send the game state to all users in the room
        socket.to(roomCode).emit('game_start', {roomData});
        socket.emit('game_start', {roomData}); // TODO: pass back info about the room
        
    })


    socket.on('correct_answer', (data) => {

        const userId = socket.id;
        const roomCode = data.roomData.roomCode;
        const roomData = roomDataMap[roomCode];

        // update the user's score

        const totalUsers = roomData.users.length;
        const totalUsersWithCorrectAnswer = roomData.gameState?.userIdsWithCorrectAnswerForRound.length;

        const score = (totalUsers - totalUsersWithCorrectAnswer) * 100 + 100;

        const user = roomData.users.find(user => user.id === userId);

        if(!user) return;
        user.score += score;
        roomData.gameState?.userIdsWithCorrectAnswerForRound.push(userId);

        // check if all users have answered correctly
        if(roomData.gameState?.userIdsWithCorrectAnswerForRound.length === totalUsers) {
            // move to the next round
            moveToNextRound(roomData)  
        }



        socket.to(roomCode).emit('game_update', {roomData});
        socket.emit('game_update', {roomData}); 
    })

    socket.on('ran_out_of_time', (data) => {
        // ran out of time to answer
        const roomCode = data.roomData.roomCode;
        const roomData = roomDataMap[roomCode];


        // ping anyone who didn't make it in time 
        const usersWhoDidntAnswer = roomData.users.filter(user => !roomData.gameState.userIdsWithCorrectAnswerForRound.includes(user.id));
        for(const user of usersWhoDidntAnswer) {
            io.to(user.id).emit('out_of_time', {roomData});
        }
        
        // move to the next round
        moveToNextRound(roomData)

        io.in(roomCode).emit('game_update', {roomData});
        //socket.emit('game_update', {roomData});
        
    })

    socket.on('return_to_lobby', (data) => {
        const roomCode = data.roomData.roomCode;
        const roomData = roomDataMap[roomCode];
    
        // reset the game state
        roomData.gameState = undefined;

        io.in(roomCode).emit('return_to_lobby', {roomData});

    })

    socket.on('player_changed_language', (data) => {
        const roomCode = data?.roomData?.roomCode;
        const roomData = roomDataMap[roomCode];

        const user = roomData?.users?.find((user) => user.id === data.user?.id)

        if(user) {
          user.selectedLanguage = data.language
        }

        socket.emit('room_data_update', {roomData});
        socket.to(roomCode).emit('room_data_update', {roomData});

    })

})


server.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
})