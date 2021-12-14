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
    type sender = {
        username: string,
        _id: string
    }
    const senderDefaultValues:sender = {
        username: '',
        _id: ''
    }
    type getMessage = {
        createdAt: string,
        message: string,
        senderId: sender
    }
    const getMessageDefaultValue:getMessage ={
        createdAt: '',
        message: '',
        senderId: {
            username: '',
            _id: ''
        }
    }
    const [getMessages,setGetMessages] = useState([{
        sender: '',
        createdAt: '',
        messages:''
    }])
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
		})
		.catch((error)=>{
			console.log(error.message);
		});
        socket = io(ENDPOINT);
        const username = localStorage.getItem('username');
        
        socket.emit("createMessage", { message, id, username}, (error:any) => {
            if (error) alert(error);
          });
    }
    const ENDPOINT = "http://localhost:8080";

    // useEffect(() => {
    //     console.log("chat")
        
    // }, [id, message])

    useEffect(()=> {
        socket = io(ENDPOINT);
        socket.on("createMessage",(data)=>{
            console.log("data",data)
        });
        axios.get(`http://localhost:8080/room/${id}/messages`,
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
    },[id, message])
    return (
        <div>
            <ChatBox messages={getMessages} />
            <div className={classes.input_field}>
                <TextField 
                    sx={{ width: 900 }}
                    id="full-width-text-field" 
                    label="Send Your Message" 
                    variant="outlined"
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
