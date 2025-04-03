import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { mockServices } from '../utils/mockServices'
import Link from '@mui/material/Link';


export default function Services() {
    return (
        <Grid container margin={1} padding={2} >
            <Grid size={12} margin={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h4'>
                    Servicios
                </Typography>
            </Grid>
            <Grid container size={12} spacing={3} justifyContent={'center'} alignItems={'center'}>
                {mockServices.map((service, index) => (
                    <Link href={`/servicios/${service.title.toLowerCase()}`} sx={{ textDecorationLine: 'none', color: 'white' }}>
                        <Grid
                            size={6} key={index} padding={2}
                            display={'flex'} justifyContent={'center'} alignItems={'flex-end'}
                            sx={{ backgroundImage: `url('${service.image}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '35vh', width: '35vw' }}
                            className="cardSection"
                        >
                            <Grid className='hoverImg'>
                                <button className='buttonSection'>
                                    <p>
                                        {service.title}
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