import { useState } from "react";
import GameScreen from "./pages/gamescreen";





function App() {
  const [started,setStarted] = useState(false);
  const [name1,setName1] = useState("");
  const [name2,setName2] = useState("");

  const startGame = () =>{
    setStarted(!started);
  };
  return(
    <div>

        {!started &&
          <div>

          <form>
                Enter P1 Name:
                <input type="text"/>
                Enter P2 Name:
                <input type="text"/>
          </form>
          <button type="button" onClick={() => startGame()}>Start Game</button>
        </div>  
      }
      {started && <GameScreen x={name1} o={name2}/>}
      </div>

    )

}
export default App;
