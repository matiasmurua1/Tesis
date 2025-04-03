import React from "react";

import Grid from '@mui/material/Grid2';
//https://mui.com/material-ui/react-grid2/
import Typography from '@mui/material/Typography';
//https://mui.com/material-ui/react-typography/
import MaterialCard from '../components/Card/Card'
import imageBG from '../assets/Home/home2.jpg'
import { mockServices } from '../utils/mockServices';


export default function Home() {

    return (
        <Grid container spacing={4} display='flex' justifyContent="center" alignItems="center" >
            <Grid size={8} display='flex' justifyContent="center" sx={{ marginTop: '30px' }}  >
                <Typography variant="h2">
                    Cuidando Patitas
                </Typography>
            </Grid>
            <Grid size={8} container >
                <Grid size={8}>
                    <Typography variant="h6">
                    En Cuidando Patitas nos dedicamos a ofrecer un servicio integral para el bienestar de tus queridas mascotas. 
                    </Typography>
                    <Typography variant="h6">
                    Sabemos que cada animal es único, por eso adaptamos nuestros servicios a sus necesidades específicas.
                    </Typography>
                    <Typography variant="h6">
                        Nuestra pasión por los animales nos impulsa a brindar un servicio excepcional. 
                    </Typography>
                    <Typography variant="h5" style={{marginTop:'10px'}}>
                    Tu mascota merece lo mejor y nosotros estamos aquí para hacerlo posible. ¡Contáctanos y descubre cómo podemos cuidar de tus peludos!
                    </Typography>

                </Grid>
               
                <Grid  size={4} spacing={4} justifyContent='center'> 
                    <img
                        src={imageBG}
                        alt='Peluqueria 1'
                        style={{height: '100%', width:'100%', borderRadius:'10px', margin: '6px'}}
                        />
                </Grid>
                
            </Grid>
           
            <Grid container size={8} spacing={4}>
                <Grid size={12}>
                    <Typography variant="h4">
                        Servicios
                    </Typography>
                </Grid>
                {mockServices.map((item, index) => (
                    <Grid key={index} size={3}>
                        <MaterialCard data={item}/>
                    </Grid>
                ))}
            </Grid>
            <Grid container size={8} sx={{ height:'100px'}}>

            </Grid>

        </Grid>
    )
}