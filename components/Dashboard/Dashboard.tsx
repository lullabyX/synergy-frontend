import {useState} from 'react';
import classes from './Dashboard.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

import {dashboardCTX} from '../../store/DashboardContext'
import { ConstructionOutlined } from '@mui/icons-material';

const Dashboard = () => {
	const [projectName,setProjectName] = useState('');
	//const token: string = localStorage.getItem('token') || "none";
	const url:string = process.env.API as string;
	const createProject = () =>{
		axios.put(`${url}/room/create`,
		{
			roomName:projectName
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
			console.log("here",localStorage.getItem("token"))
			console.log(error.message);
		});
	 }
	return (
		<div className={classes.profile}>
            dashboard
			<Box sx={{ '& > :not(style)': { m: 1 } }}>
				<TextField 
					id="outlined-basic" 
					label="Create a project" 
					variant="outlined"
					onChange={(e)=>{setProjectName(e.target.value)}}
				/>
				<br></br>
				<Button 
					variant="contained"
					onClick={createProject}
				>Create</Button>
			</Box>
        </div>
	);
};

export default Dashboard;
