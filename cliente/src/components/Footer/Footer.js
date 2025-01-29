import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../assets/Home/logo.jpeg'

export default function Footer() {
    return (
            <Grid container sx={{ height: 400, width: '100%', backgroundColor:'#47496361'}} justifyContent="center" alignItems="center" alignContent='space-around'>
                <Grid size={4} display='flex' justifyContent="center" alignItems="center">
                    <Grid>
                        <Typography variant="h6">
                            Cuidando Patitas
                        </Typography>
                        <Grid  display='flex' justifyContent="center" alignItems="center" sx={{ marginTop: 1}}>
                            <img
                                src={logo}
                                alt='logo'
                                loading="lazy"
                                width={80}
                                height={80}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={8} spacing={10}  justifyContent="center" alignItems="center">
                    <Grid display='flex' flexDirection='column' gap={1}>  
                    </Grid>
                    <Grid display='flex' flexDirection='column' gap={1}>
                        <Grid>
                            <Typography variant="h6">
                                Servicios
                            </Typography>
                        </Grid>
                        <Grid > 
                            <Typography variant="body2">
                                Entrenador
                            </Typography>
                            <Typography variant="body2">
                                Paseos
                            </Typography>
                            <Typography variant="body2">
                                Peluqueria
                            </Typography>
                            <Typography variant="body2">
                                Veterinario
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid display='flex' flexDirection='column' gap={1}>  
                        <Grid>
                            <Typography variant="h6">
                                Contacto
                            </Typography>
                        </Grid>
                        <Grid> 
                            <Typography variant="body2">
                                Sucursales
                            </Typography>
                            <Typography variant="body2">
                                +54 3516 85-2322
                            </Typography>
                            <Grid display='flex' flexDirection='row' alignContent='center' gap={0.5}>
                                <EmailIcon fontSize='small'></EmailIcon>    
                                <Typography variant="body2" >
                                    cuidando_patitas@gmail.com
                                </Typography>
                            </Grid>
                            <Grid display='flex' flexDirection='row' alignContent='center' gap={0.5}>

                                <EmailIcon fontSize='small'></EmailIcon>
                                <Typography variant="body2">
                                    soporte_cuidando_patitas@gmail.com
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid display='flex' flexDirection='column' gap={1} minHeight='120px'>
                        <Grid>
                            <Typography variant="h6">
                                Redes
                            </Typography>
                        </Grid>
                        <Grid display='flex' gap={2}> 
                            <FacebookIcon fontSize='large' ></FacebookIcon>
                            <InstagramIcon fontSize='large' ></InstagramIcon>
                            <XIcon fontSize='large' ></XIcon>
                            <WhatsAppIcon fontSize='large' ></WhatsAppIcon>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ height: 200}} container size={8} spacing={10} justifyContent="space-between" alignContent="flex-end">
                    {/* <Grid size={6} sx={{}}>
                        <Typography variant="body2">
                            Medios de pago
                        </Typography>
                    </Grid> */}
                    <Grid size={12} display='flex' flexDirection='column' justifyContent='centers' alignItems='center'>
                        <Grid display='flex' gap={4}>
                            <Typography variant="body2">
                                Política de Privacidad
                            </Typography>
                            <Typography variant="body2">
                                Política de Cookies
                            </Typography>
                            <Typography variant="body2">
                                Disclaimer de Inversión
                            </Typography>
                            <Typography variant="body2">
                                Términos y Condiciones de Uso
                            </Typography>
                        </Grid>
                            <Typography variant="body2">
                            © 2024 Cuidando Patitas
                            </Typography>
                    </Grid>
                </Grid>
            </Grid>
    )
}