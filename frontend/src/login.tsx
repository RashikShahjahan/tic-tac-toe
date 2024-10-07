import {  useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState("");


    const enterlobby = () =>{
        console.log("/lobby/:"+name)
        navigate("/lobby/:"+name);
    };

    return(
        <div>
            <form>
                Enter Player Name:
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                <button type="button" onClick={() => enterlobby()}>Enter Lobby</button>
            </form>
        </div>  
    );

  
}
export default Login;