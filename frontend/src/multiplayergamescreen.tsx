import { MouseEventHandler, useEffect,  useState } from "react";
import { boardIdx, Game} from "./game";
import { useParams } from "react-router-dom";
import { useSocketIO } from "./socketIO";

type message={
    game:Game,
    pos:boardIdx,
    gameId:string
}

function MultiPlayerGameScreen(){
    const params = useParams();
    const id = params.gameId?params.gameId:"";
    const gameId = id.substring(1);
    
    const socket = useSocketIO();
    const initialGameState:Game = {
        currPlayer:'x',
        boardState: ['', '', '', '', '', '', '', '', ''],
        winState: 'undecided',
        players:["",""]
        
    };
    const [game,setGame] = useState<Game>(initialGameState);

    
    useEffect(()=>{
        socket.on("connect",()=>{
            console.log("Connected");   
        });
        socket.on("game",(newGame)=>{
            setGame(newGame);
        });

        return ()=>{
            socket.off("connect");
        };
        }
    );

    useEffect(()=>{
        if(game.winState === 'win'){
            const winner = "";
            alert(winner+' Won!');
            setGame(initialGameState);
        }
        if(game.winState === 'tie'){
            alert("It's a tie");
            setGame(initialGameState);
        }},[game]

    )

    function onCellClick(pos:boardIdx): MouseEventHandler {
        return () => {
            const msg:message = {game,pos,gameId};
            socket.emit("move",msg);
          }
    }

    return(
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', width: '300px', height: '300px' }}>
                {game.boardState.map((cell,index)=>{
                    const onClickHandler = onCellClick(index as boardIdx);
                    return(
                        <div onClick={onClickHandler} key={index} style={{ border: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                            {cell}
                        </div>  
                    )
                })
                }
            </div>
        </div>
    );
};



export default MultiPlayerGameScreen;
