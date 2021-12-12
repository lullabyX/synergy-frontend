import {useState,useEffect} from 'react';
import classes from './Dashboard.module.css';
import ProjectCard from './ProjectCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Link from 'next/link'

import {dashboardCTX} from '../../store/DashboardContext'
import { ConstructionOutlined, TrendingUpSharp } from '@mui/icons-material';


const Dashboard = () => {
	const [projectName,setProjectName] = useState('');
	const [addIcon,setAddIcon] = useState(false);

	type projectType = {
		name: string,
		_id: string,
		description:string,
	}
	
	const projectDefaultValues:projectType = {
		_id: '',
		name: '',
		description: ''
		
		
	}
	const [projectRoom,setProjectRoom] = useState<projectType[]>([projectDefaultValues]);
	const createProject = async() =>{
		const url:string = process.env.API as string;
		
		await axios.put(`${url}/room/create`,
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
	 useEffect(()=>{
		const url:string = process.env.API as string;
		const URL: string = process.env.POST_LOGIN_URL as string;
		console.log("env",url);
		console.log("URL",URL);
		axios.get(`http://localhost:8080/room/all`,
		{
			headers: {
				'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				'Content-Type': 'application/json',
			}
		})
		.then((res:any)=>{
			console.log(res.data.rooms);
			const data = res.data.rooms;
			setProjectRoom(data)
			
		})
		.catch((error)=>{
			console.log(error.message);
		});
	 },[]);
	return (
		<div className={classes.profile}>
            
			<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<Fab className={classes.fab} color="primary" aria-label="add">
				<AddIcon onClick={()=>{setAddIcon(true)}}/>
			</Fab>
			<br/>
				{addIcon ? 
				<div>
					<TextField 
						id="outlined-basic" 
						label="Create a project" 
						variant="outlined"
						onChange={(e)=>{setProjectName(e.target.value)}}
					/>
						<Button 
							id = {classes.button}
							variant="contained"
							onClick={createProject}
						>
							Create
						</Button>
				</div>
			: null	
			}
			</Box>
			<div >
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{/* {Array.from(Array(10)).map((_, index) => (
					<Grid   md={3} key={index}>
						<ProjectCard/>
					</Grid>
					))} */}
					{
					projectRoom.map((room)=>(
						<Link href={`project/${room._id}`}>
							<Grid md={3}>
								<ProjectCard 
								name={room.name}
								description={room.description}/>
							</Grid>
						</Link>
						
					))
					}
					
				</Grid>
    		</Box>
			</div>
        </div>
	);
};

export default Dashboard;
