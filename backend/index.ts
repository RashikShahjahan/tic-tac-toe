import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import { move, type Game } from "./game";
import {v4 as uuidv4} from 'uuid';

const app = express()
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})
  

type lobby = {
    [id:string]:Game;
  };

const gameLobby:lobby = {};

const initialGameState:Game = {
    currPlayer:'x',
    boardState: ['', '', '', '', '', '', '', '', ''],
    winState: 'undecided',
    players:[]
};

      
io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on("move", (msg) => {
        const game = move(msg.game,msg.pos);
        console.log(game);
        gameLobby[msg.gameId] = game;
        io.to(msg.gameId).emit("game",game);
    });
    socket.on("create_game",()=>{
        console.log("New game created");
        const gameId = uuidv4();
        gameLobby[gameId] = initialGameState;
        socket.emit("lobby",Object.keys(gameLobby));
    });
    socket.on("lobby",()=>{
        socket.emit("lobby",Object.keys(gameLobby));
        }
    );

    socket.on("join_game",(data)=>{
        if (gameLobby[data.gameId].players.length<2){
            console.log(data.playerId+" joined "+data.gameId);
            gameLobby[data.gameId].players.push(data.playerId);
            socket.join(data.gameId);
            io.to(data.gameId).emit("game",data.game);
        }
    });
})

httpServer.listen(3000, () => {
    console.log('http://localhost:3000')
})