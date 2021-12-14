import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import classes from './Chat.module.css';
import io from "socket.io-client";
import { useRouter } from 'next/router';
import axios from 'axios'
import ChatBox from '../../components/Chat/ChatBox'

let socket; 

export default function Chat() {
    
    type getMessage = {
        createdAt: string,
        message: string,
        sender: string
    }
    const getMessageDefaultValue:getMessage ={
        createdAt: '',
        message: '',
        sender: ''
    }
    const [getMessages,setGetMessages] = useState<getMessage[]>([getMessageDefaultValue])
    const [message,setMessage] = useState('');
    const router = useRouter();
    const {id} = router.query;
    const addMessage = async()=>{
        await axios.post(`http://localhost:8080/room/${id}/new-message`,
		{
			roomId: id,
            text: message
		},
		{
			headers: {
				'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				'Content-Type': 'application/json',
			}
		})
		.then((res)=>{
			console.log(res.data);
            setMessage('')
		})
		.catch((error)=>{
			console.log(error.message);
		});
    }

    // let start = new Date();
    // let timer_id = setInterval(function() {
    // // the duration is 10 seconds
    // if (new Date() - start > 10000) {
    //     clearInterval(timer_id);
    // } else {
    //     console.log("timer_id")
    // }
    // }, 1000);

    const fetchMessages = async () =>{
        await axios.get(`http://localhost:8080/room/${id}/messages`,
		{
			headers: {
				'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				'Content-Type': 'application/json',
			}
		})
		.then((res:any)=>{
            let messages = res.data.roomMessages;
            console.log(messages)
            messages = messages.map((message:any)=>{
                return {...message,sender:message.senderId.username}
            });
			console.log(messages,"getMessage");

            setGetMessages(messages)
			
		})
		.catch((error)=>{
			console.log(error.message);
		});
    }

    useEffect(()=> {
        fetchMessages();
    });

    return (
        <div>
            <ChatBox messages={getMessages} />
            <div className={classes.input_field}>
                <TextField 
                    sx={{ width: 800 }}
                    id="full-width-text-field" 
                    label="Send Your Message" 
                    variant="outlined"
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value)}}
                />
                <Button 
                    id = {classes.button}
                    variant="contained"
                    onClick={addMessage}
                >
                    Send
                </Button>
            </div>
        </div>
  );
}
