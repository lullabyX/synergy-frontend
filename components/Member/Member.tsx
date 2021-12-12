import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from './Member.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Member () {
    const [memberInfo,setMemberInfo] = useState('');
    const router = useRouter();
    const {id} = router.query;
    const sendInvitation = async() =>{
        console.log(id,"id")
		await axios.put('http://localhost:8080/room/invitation',
		{
			peopleInfo:memberInfo,
            roomId: id
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
    }
    return (
        <div>
            Member
            <div>
					<TextField
                        sx={{ width: 400 }}
						id="outlined-basic" 
						label=" Email/Username" 
						variant="outlined"
						onChange={(e)=>{setMemberInfo(e.target.value)}}
					/>
						<Button 
							id = {classes.button}
							variant="contained"
							onClick={sendInvitation}
						>
							Add
						</Button>
				</div>
        </div>
    )
}