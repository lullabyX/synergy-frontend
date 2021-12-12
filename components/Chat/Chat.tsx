import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import classes from './Chat.module.css';

export default function Chat() {
    const [message,setMessage] = useState('');
    const addMessage =()=>{

    }
    return (
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
  );
}
