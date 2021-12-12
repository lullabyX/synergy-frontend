import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import classes from './Dashboard.module.css';

export default function ProjectCard({name,description}) {
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
    </Card>
  );
}
