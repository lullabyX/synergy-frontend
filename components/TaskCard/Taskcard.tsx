import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './Taskcard.module.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TaskCard({name,description,assignTo,deadline,isCompleted}) {
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
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
