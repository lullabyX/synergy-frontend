import { format } from "timeago.js";
import {useEffect} from 'react';
import classes from './Chat.module.css'

export default function Message ({sender, message,createdAt}){
    let own = false
    useEffect(()=> {
        let username = localStorage.getItem('username');
        console.log("username",username)
        console.log("sender",sender)
        // own = username.localeCompare(sender);
        own = (username?.toString() == sender.toString());
        
    },[])
    return (
        <div className={own ? "message own" : "message"}>
            <div className={classes.messageTop}>
                <img
                    className={"messageImg"}
                    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    />
                <h6>{sender}</h6>
                <p className="messageText">{message}</p>
            </div>
            {/* <h3>{message.message}</h3>
            <h5>{message.sender}</h5> */}
            <div className="messageBottom">{format(createdAt)}</div>
        </div>
    )
}