import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import classes from './Member.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Member({ members }) {
	const [memberInfo, setMemberInfo] = useState('');
	const router = useRouter();
	const { id } = router.query;
	//create task
	const [task,setTask] = useState('');
	const [description,setDescription] = useState('');
	const [deadline,setDeadline] = useState('');
	const [assignedTo,setAssignedTo] = useState('');
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
			setMemberInfo('')
			
		})
		.catch((error)=>{
			console.log(error.message);
		});
    }

	const [callUseEffect, setCallUseEffect] = useState(false);
	const createTask = async () => {
		console.log(task, description, assignedTo, deadline, id);
		await axios
			.post(
				`${process.env.API}/room/${id}/task/create`,
				{
					// roomId: id,
					assignedTo: assignedTo,
					taskName: task,
					taskDescription: description,
					taskDeadline: deadline,
				},
				{
					headers: {
						Authorization:
							'Bearer ' + localStorage.getItem('token') || 'none',
						'Content-Type': 'application/json',
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setTask('');
				setDescription('');
				setDeadline('');
				setAssignedTo('');
				setCallUseEffect(!callUseEffect);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	useEffect(()=>{
		console.log(members,"members")
	},[callUseEffect])
    return (
        <div >
            	<div className={classes.member}>
					<Card>
						<TextField
							sx={{ width: 300 }}
							id="outlined-basic" 
							label=" Email/Username" 
							variant="outlined"
							value={memberInfo}
							onChange={(e)=>{setMemberInfo(e.target.value)}}
						/>
						<br/>
						<Button 
							id = {classes.button}
							variant="contained"
							onClick={sendInvitation}
						>
							Add
						</Button>
						
					</Card>
					<br/><br/><br/>
					<Card>
						<TextField
								sx={{ width: 300 }}
								id="outlined-basic" 
								label="Task" 
								variant="outlined"
								value={task}
								onChange={(e)=>{setTask(e.target.value)}}
						/>
						<br/><br/>
						<TextField
								sx={{ width: 300 }}
								id="outlined-basic" 
								value={description}
								label="Short description" 
								variant="outlined"
								onChange={(e)=>{setDescription(e.target.value)}}
						/>
						<br/><br/>
						<TextField
							id="date"
							label="Deadline"
							type="date"
							defaultValue=""
							sx={{ width: 300 }}
							InputLabelProps={{
							shrink: true,
							}}
							value={deadline}
							onChange={(e)=>{setDeadline(e.target.value)}}
						/>
						<br/><br/>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							label="Assign Task To"
							sx={{ width: 300 }}
							onChange={(e)=>{setAssignedTo(e.target.value)}}

							>
							{
							members.map((member:any)=>(	
								<MenuItem value={member.member}>{member.member}</MenuItem>
							))
							}
						</Select>
						<br/>
						<Button 
							id = {classes.button}
							variant="contained"
							onClick={createTask}
						>
							Add
						</Button>
					</Card>
				</div>
        </div>
    )
}
