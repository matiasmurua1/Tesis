import * as React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid2';

export default function CustomStar({calification}) {
    const maxStars = 5;
    return (
        <Grid container justifyContent="center" alignItems="center" >
            <div>
                {Array.from({ length: calification }, (_, index) => (
                    <StarIcon key={index} sx={{color:'#c5c537'}}></StarIcon>
                ))}
                {
                    Array.from({ length: maxStars-calification }, (_, index) => (
                    <StarBorderIcon key={index}></StarBorderIcon>
                ))  
                }
            </div>
        </Grid>
    );
}
        