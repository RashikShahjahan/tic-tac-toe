import { useState } from "react";
import InputForm from "./inputform";




function StartScreen(){
    const [computerMode, setComputerMode] = useState(false);
    const modeChange = () =>{
        setComputerMode(!computerMode);
        console.log(computerMode)
    };
    return(
        <div>
            <button type="button" onClick={() => modeChange()}>Change Mode</button>
            <InputForm computerMode={computerMode}/>
        </div>  

    );
};

export default StartScreen;