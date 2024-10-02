import { MouseEventHandler, useEffect, useState } from "react";
import { type boardIdx, type Game } from "../game";
import { move } from "../game";

interface GameScreenProps {
    x:string,
    o:string
}

function GameScreen(props:GameScreenProps){
    const initialGameState:Game = {
        currPlayer:'x',
        boardState: ['', '', '', '', '', '', '', '', ''],
        winState: 'undecided'
    };
    const [game,setGame] = useState<Game>(initialGameState);


    useEffect(()=>{
        if(game.winState === 'win'){
            const winner = game.currPlayer === 'x'?'o':'x';
            alert(winner+' Won!');
            setGame(initialGameState);
        }
        if(game.winState === 'tie'){
            alert("It's a tie");
            setGame(initialGameState);
        }},[game]

    )


    function onCellClick(idx:boardIdx): MouseEventHandler {
        return () => {
            const newGame = move(game, idx);
            setGame(newGame);
          }
    }

    function getPlayerName(){
        return props.o ? game.currPlayer === 'o':'x';
    }
    return(
        <div>
            <h1>{getPlayerName()}</h1>
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

export default GameScreen;