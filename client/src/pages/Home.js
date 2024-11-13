import React from "react";

import Grid from '@mui/material/Grid2';
//https://mui.com/material-ui/react-grid2/
import Typography from '@mui/material/Typography';
//https://mui.com/material-ui/react-typography/

import MaterialCard from '../components/Card/Card'
import peluqueria from '../assets/Cards/Peluqueria.jpg'
import paseos from '../assets/Cards/Paseos.jpg'
import veterinaria from '../assets/Cards/Veterinario.jpg'
import entrenamiento from '../assets/Cards/Entrenador.jpg'
import imageBG from '../assets/Home/home2.jpg'

const dataServices=[
    {
        title: 'Peluqueria',
        description: 'Nuestros servicios de peluquería están diseñados para mantener a tus mascotas luciendo y sintiéndose bien. Desde cortes de pelo hasta baños y cuidados de piel, cada sesión es un momento de mimo.',
        image: peluqueria
    },
    {
        title: 'Paseos',
        description: 'Llevamos a tus peludos a disfrutar de paseos divertidos y seguros, asegurándonos de que tengan la actividad física que necesitan y, al mismo tiempo, explorando nuevos entornos.',
        image: paseos
    },
    {
        title: 'Veterinaria',
        description: 'Ofrecemos acceso a veterinarios de confianza que brindan atención médica de calidad, desde chequeos regulares hasta cuidados especiales, asegurando la salud y felicidad de tus mascotas.',
        image: veterinaria
    },
    {
        title: 'Entrenamiento',
        description: 'Contamos con entrenadores experimentados que utilizan métodos positivos para enseñar habilidades y buenos modales a tus mascotas, garantizando una convivencia armoniosa en el hogar.',
        image: entrenamiento
    },
]

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
                {dataServices.map((item, index) => (
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