import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './Taskcard.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TaskCard({name,description,assignTo,deadline,isCompleted,_id}) {
  const router = useRouter();
  const {id} = router.query;
  const deleteTask = async()=>{
    console.log("deleteTask",_id);
    await axios.delete(`http://localhost:8080/room/${id}/task/delete`,
		{
      headers: {
				'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				'Content-Type': 'application/json',
			},
      data: {
        taskId: _id
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
  const completeTask = async()=>{
    console.log("deleteTask",_id);
    await axios.put(`http://localhost:8080/room/${id}/task/complete`,
      {
        taskId: _id
      },
      { 
        headers: {
              'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
				      'Content-Type': 'application/json',
        }  
			}
		)
		.then((res)=>{
			console.log(res.data);
			
		})
		.catch((error)=>{
			//console.log("here",localStorage.getItem("token"))
			console.log(error.message);
		});
  }
  return (
    <Card className={classes.card} sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          {
            isCompleted ? (
              <s>{name}</s>
            ) : null
          }
          {
            !isCompleted ? (
              <h4>{name}</h4>
            ) : null
          }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2">
          {assignTo}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {new Date(deadline).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={completeTask}
        >
          Complete
        </Button>
        <Button 
          size="small"
          onClick={deleteTask}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
