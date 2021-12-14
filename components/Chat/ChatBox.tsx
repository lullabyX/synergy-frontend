import Message from './Message'
import { format } from "timeago.js";
import {useEffect, useState} from 'react';
import classes from './Chat.module.css'
export default function ChatBox({messages}){
    //let username = localStorage.getItem('username');
    // let username:any;
    const [username, setUsername] = useState('');
    
    useEffect(()=>{
        setUsername(localStorage.getItem('username') || null);
        
        console.log(username);
    },[])
    
    
    return (
        <div >
            {
                messages.map((message:any)=>(
                    
                    <div className={(username?.toString().trim() === message.sender.toString().trim()) ? "message own" : "message"}>
                        <div className={classes.messageTop}>
                            {/* <img
                                className={"messageImg"}
                                src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                                /> */}
                            <h6>{message.sender}</h6>
                            <p className="messageText">{message.message}</p>
                        </div>
                        {/* <h3>{message.message}</h3>
                        <h5>{message.sender}</h5> */}
                        <div className="messageBottom">{format(message.createdAt)}</div>
                    </div>
                ))
            }
        </div>
    )
}