import { MouseEventHandler, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useSocketIO } from "./socketIO";

function GameLobby() {
  type joinMsg = {
    gameId:string;
    playerId:string;
  };
  const [gameIds,setGameIds] = useState<string[]>([]);
  const socket = useSocketIO();
  useEffect(()=>{
    socket.on("connect",()=>{
        console.log("Connected");
        socket.emit("lobby");
    });

    socket.on("lobby",(data)=>{
      setGameIds(data);
    });
    return ()=>{
        socket.off("connect");
      };
    }
  );

  function createGame(){
      socket.emit("create_game");
    }

  function joinGame(gameId: string): MouseEventHandler{
    return () => {
      const playerId = socket.id?socket.id:"";
      const msg:joinMsg = {gameId,playerId};
      socket.emit("join_game",msg);
    }
  }
  
  return(
      <div>
        {
          gameIds.map((gameId:string)=>{
            const callback = joinGame(gameId);
            return(  
              <div>        
                <Link to={"/games/:"+gameId} onClick={callback}>{gameId}</Link>
              </div>
              )
            }
          )
        }
      <button type="submit" onClick={() => createGame()}> Create Game</button>
      </div>
    )
  }
export default GameLobby;