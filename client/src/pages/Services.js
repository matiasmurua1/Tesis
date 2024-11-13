import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import pelu1 from '../assets/Peluqueria/pelu1.jpg'
import pelu3 from '../assets/Peluqueria/pelu3.jpg'
import pelu4 from '../assets/Peluqueria/pelu4.jpg'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';

export default function Services() {
    return(
        <Grid container display='flex' justifyContent="center" alignItems="center" spacing={5}>
            <Grid size={12} display='flex' justifyContent="center" sx={{marginTop:5}}>
                <Typography variant='h3'>
                    Peluqueria
                </Typography>
            </Grid>
            <Grid size={2} sx={{ height: '550px', borderRight:'solid #474963 1px'}}>
                <Grid>
                    <Typography variant='h6'>
                        Filtros
                    </Typography>
                </Grid>
                <Grid container alignItems="flex-start" flexDirection='column'>
                    <Grid size={12}>
                        <Typography variant='subtitle2'>
                            Calidad
                        </Typography>
                    </Grid>
                    <Grid size={4}>
                        <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                        <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                        <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                        <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                        <StarBorderIcon></StarBorderIcon>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={8} container spacing={2}>
                <Grid size={12}>
                    <Typography variant='h6'>
                        Ubicaciones
                    </Typography>
                </Grid>
                <Grid container size={12} sx={{ height: '160px', border:' solid #474963 1px', borderRadius:'10px', boxShadow:'4px 4px 4px 2px rgba(0, 0, 0, 0.1)'}} justifyContent='space-evenly'>
                    <Grid >
                        <img
                        src={pelu1}
                        alt='Peluqueria 1'
                        style={{height: '145px', width:'200px', borderRadius:'10px', margin: '6px'}}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant='h6'>
                        Veterinarias Güemes
                        </Typography>
                        <Typography variant='body1'>
                        <LocationOnIcon fontSize='small' sx={{marginRight:'4px'}}></LocationOnIcon>Av. Marcelo T. de Alvear 1085 local 1 
                        </Typography>
                        <Typography variant='body1'>
                        <PhoneEnabledIcon fontSize='small' sx={{marginRight:'4px'}}></PhoneEnabledIcon>0351 469-1453
                        </Typography>
                        <Typography variant='body1'>
                        <InstagramIcon fontSize='small' sx={{marginRight:'4px'}}></InstagramIcon>VeterinariaGuemes
                        </Typography>
                    </Grid>
                    <Grid size={3} container justifyContent='flex-end' alignContent='center'>
                        <Grid>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarBorderIcon></StarBorderIcon>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" color="primary" >Solicitar Turno</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={12} sx={{ height: '160px', border:' solid #474963 1px', borderRadius:'10px', boxShadow:'4px 4px 4px 2px rgba(0, 0, 0, 0.1)'}} justifyContent='space-evenly'
>
                    <Grid>
                        <img
                        src={pelu4}
                        alt='Peluqueria 1'
                        style={{height: '145px', width:'200px', borderRadius:'10px', margin: '6px'}}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant='h6'>
                        DACOR VETERINARIA - PET SHOP
                        </Typography>
                        <Typography variant='body1'>
                        <LocationOnIcon fontSize='small' sx={{marginRight:'4px'}}></LocationOnIcon>Gral. Simón Bolívar 945
                        </Typography>
                        <Typography variant='body1'>
                        <PhoneEnabledIcon fontSize='small' sx={{marginRight:'4px'}}></PhoneEnabledIcon>0351 678-4060
                        </Typography>
                        <Typography variant='body1'>
                        <InstagramIcon fontSize='small' sx={{marginRight:'4px'}}></InstagramIcon>Dacorveterinaria
                        </Typography>
                    </Grid>
                    <Grid size={3} container justifyContent='flex-end' alignContent='center'>
                        <Grid>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarBorderIcon></StarBorderIcon>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" color="primary" >Solicitar Turno</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={12} sx={{ height: '160px', border:' solid #474963 1px', borderRadius:'10px', boxShadow:'4px 4px 4px 2px rgba(0, 0, 0, 0.1)'}} justifyContent='space-evenly'>
                    <Grid>
                        <img
                        src={pelu3}
                        alt='Peluqueria 1'
                        style={{height: '145px', width:'200px', borderRadius:'10px', margin: '6px'}}
                        />
                    </Grid>
                    <Grid size={6}>
                        <Typography variant='h6'>
                            Pipispet
                        </Typography>
                        <Typography variant='body1' >
                        <LocationOnIcon fontSize='small' sx={{marginRight:'4px'}}></LocationOnIcon>Venezuela 109, Nueva Cordoba, esquina Buenos Aires
                        </Typography>
                        <Typography variant='body1'>
                        <PhoneEnabledIcon fontSize='small' sx={{marginRight:'4px'}}></PhoneEnabledIcon>0351 398-3934
                        </Typography>
                        <Typography variant='body1'>
                        <InstagramIcon fontSize='small' sx={{marginRight:'4px'}}></InstagramIcon>Pipispet
                        </Typography>
                    </Grid>
                    <Grid size={3} container justifyContent='flex-end' alignContent='center'>
                        <Grid>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarIcon sx={{color:'#c5c537'}}></StarIcon>
                            <StarBorderIcon></StarBorderIcon>
                        </Grid>
                        <Grid>
                            <Button variant="outlined" color="primary" >Solicitar Turno</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid  size={12}>

            </Grid>
        </Grid>
    )
}