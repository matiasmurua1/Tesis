import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useAuth } from "../../context/usuarioContexto";

export default function MaterialCard({data}) {

  const { user } = useAuth(); 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={data.image}
      />
      <CardContent sx={{minHeight:'232px'}}>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
      </CardContent>
      <Divider />
      {
        user?.rol == "CLIENTE" ?
          (
        <CardActions>
          <Button size="small" variant='contained' color='primary'>Ver Servicio</Button>
        </CardActions>
        
        ): null
      }
    </Card>
  );
}