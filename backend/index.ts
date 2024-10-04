import express from "express"
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { move } from "./game";

const app = express()
app.use(cors());
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})


io.on('connection', (socket) => {
    console.log("a user connected")
    socket.on('game_event', (msg) => {
        const game = move(msg.game,msg.pos);
        console.log(game);
        socket.emit("game_event",game);
    })

})

httpServer.listen(3000, () => {
    console.log('http://localhost:3000')
})