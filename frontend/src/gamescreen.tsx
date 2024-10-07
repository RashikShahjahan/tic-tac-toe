import { MouseEventHandler,  useEffect, useState } from "react";
import { type boardIdx, type Game } from "./game";
import { move } from "./game";


function GameScreen(){
    const initialGameState:Game = {
        currPlayer:'x',
        boardState: ['', '', '', '', '', '', '', '', ''],
        winState: 'undecided'
    };
    const [game,setGame] = useState<Game>(initialGameState);
    const [started,setStarted] = useState(false);
    const [name1,setName1] = useState("");
    const [name2,setName2] = useState("");
    const [name, setName] = useState(name1);

    const startGame = () =>{
      setStarted(!started);
    };

    useEffect(()=>{
        if(game.winState === 'win'){
            const winner = name;
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
            const newName = game.currPlayer === 'o'? name2 :name1;
            setName(newName);

          }
    }

  
    return(
        <div>
        {!started &&
            <div>
  
            <form>
                  Enter P1 Name:
                  <input type="text" value={name1} onChange={(e)=>setName1(e.target.value)}/>
                  Enter P2 Name:
                  <input type="text" value={name2} onChange={(e)=>setName2(e.target.value)}/>
            </form>
            <button type="button" onClick={() => startGame()}>Start Game</button>
          </div>  
        }
        {started &&
        <div>
            <h1>{name}</h1>
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
        }
    </div>
    );

};

export default GameScreen;