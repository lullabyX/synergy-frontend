import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import classes from './Dashboard.module.css';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function ProjectCard({name,description,_id}) {
  const deleteProjectRoom =async() =>{
    await axios.delete(`http://localhost:8080/room/${_id}/delete`,
		{
      headers: {
				'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				'Content-Type': 'application/json',
			},
      data: {
        roomId: _id
      }
		})
		.then((res)=>{
			console.log(res.data);
			
		})
		.catch((error)=>{
			//console.log("here",localStorage.getItem("token"))
			console.log(error.message);
		});
  }
  return (
    <Card sx={{ minWidth: 345 }} className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="purple.jpg"
          alt="Project Card"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button 
        size="small"
        onClick={deleteProjectRoom}
      >
        Delete
      </Button>
    </Card>
  );
}
