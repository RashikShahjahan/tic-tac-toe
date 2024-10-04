import { useEffect, useState } from "react";
import { io } from "socket.io-client";


const SERVER_URL = 'http://localhost:3000';
const socket = io(SERVER_URL);
socket.connect();


type Message = string;

const SocketExample = () => {

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on("connect", () => {
            socket.on("messages", (data) => {
                console.log("new messages", data)
                setMessages(data.messages)
            });
        });

        return () => {
            socket.off("connect");
        }
    }, [setMessages]);

    function sendMessages(){
        if(socket.connected){
            socket.emit('message', messages);
        }else {
            console.warn("warning: socket not connected when trying to send msg");
        }
    };

    return (
    <div>
        messages:
        {messages.map((msg) => {
            return <div key={msg}>{msg}</div>
        })}
        <input type="text" value={messages} onChange={(e) => setMessages(["hi"])}/>
        <button onClick={sendMessages}>send message</button>
    </div>
    )
}

export default SocketExample;