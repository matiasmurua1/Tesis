import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {obtenerServicios} from '../services/servicios'


import peluqueria from '../assets/Cards/Peluqueria.jpg'
import paseos from '../assets/Cards/Paseos.jpg'
import veterinaria from '../assets/Cards/Veterinario.jpg'
import entrenamiento from '../assets/Cards/Entrenador.jpg'

export default function Services() {
    const [servicios, setServicios] = useState([])
    
    useEffect(() => {
        fetchServicios();
    }, []);

    const fetchServicios = async () => {
        try {
        const data = await obtenerServicios();
        setServicios(data || []);
        } catch (error) {
        console.error("Error al obtener los servicios:", error);
        } 
    };


    return (
        <Grid container margin={1} padding={2} >
            <Grid size={12} margin={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h4'>
                    Servicios
                </Typography>
            </Grid>
            <Grid container size={12} spacing={3} justifyContent={'center'} alignItems={'center'}>
                {servicios.map((service, index) => (
                    <Link href={`/servicios/${service.id}`} sx={{ textDecorationLine: 'none', color: 'white' }}>
                        <Grid
                            size={6} key={index} padding={2}
                            display={'flex'} justifyContent={'center'} alignItems={'flex-end'}
                            sx={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '35vh', width: '35vw' }}
                            style={{ backgroundImage: `url('${
                                service.nombre == 'Peluqueria' ? peluqueria 
                                : service.nombre == 'Paseo' ? paseos 
                                : service.nombre == 'Veterinaria' ? veterinaria 
                                : service.nombre == 'Entrenamiento' ? entrenamiento 
                                : null
                            }')`}}
                            className="cardSection"
                        >
                            <Grid className='hoverImg'>
                                <button className='buttonSection'>
                                    <p>
                                        {service.nombre}
                                    </p>
                                    <div className="arrow-wrapper">
                                        <div className="arrow"></div>
                                    </div>
                                </button>
                            </Grid>
                        </Grid>
                    </Link>
                ))}
            </Grid>
        </Grid>
    )
}