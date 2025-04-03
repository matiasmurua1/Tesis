import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomStars from '../components/CustomStars/CustomStars';
import CustomModal from '../components/CustomModal/CustomModal';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { mockLocales } from '../utils/mockServices';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { getFecha } from '../utils/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function TableServices() {
    const [locales, setLocales] = useState([])
    const { service } = useParams();
    const [modalTurno, setModalTurno] = useState(false);
    const [fechaTurno, setFechaTurno] = useState(dayjs(getFecha()));
    const [solicitudTurno, setSolicitudTurno] = useState("")
    const [modalMsg, setAbrirModalMsg] = useState(false)
    const [msg, setMsg] = useState("")

    const fetchFormulario = () => {
        try {
            setSolicitudTurno(fechaTurno.toISOString())
            setMsg("Alta de Turno exitosa")
            setAbrirModalMsg(!modalMsg)

            console.log("fechaTurno", fechaTurno)
        } catch (error) {
            setMsg("Alta de Turno fallida")
            setAbrirModalMsg(!modalMsg)
        }
        
        console.log("solicitudTurno", dayjs(fechaTurno))
    }

    const abrirModalTurno = () => {
        setModalTurno(!modalTurno)
    }

    const abrirModalMsg = () => {
        setAbrirModalMsg(!modalMsg)
    }

    useEffect(() => {
        setLocales(mockLocales)
        console.log("asda", getFecha())
        setFechaTurno(dayjs.utc(getFecha(), 'DD/MM/YYYY'));
    }, []);

    function MensajeExitoso() {
        return (
            <Grid container size={12} justifyContent="center" spacing={2}>
                {
                    msg === "Alta de Turno exitosa"
                        ?
                        <Grid size={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant='body1'>Se envio la solicitud de tu turno para el {dayjs(solicitudTurno).format('lll')}</Typography>
                            <CheckCircleIcon sx={{ color: "green", fontSize: "60px", marginTop:'15px'}}></CheckCircleIcon>
                        </Grid>
                        :
                        <Grid size={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant='body1'>No se pudo enviar la solicitud de turno, intente ingresar otro horario</Typography>
                            <CancelIcon sx={{ color: "green", fontSize: "60px"}}></CancelIcon>
                        </Grid>
                }
            </Grid>
        )
    }

    function FormSolicitudServicio() {
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DemoContainer components={['DatePicker', 'TimePicker']}>
                    <Grid container size={12} justifyContent="center" spacing={2}>
                        <Grid size={12} display="flex" justifyContent="center">
                            <DatePicker
                                disablePast
                                sx={{width:'70%'}}
                                label="Fecha del Turno"
                                value={fechaTurno}
                                onChange={(fecha) => setFechaTurno(fecha)}
                            />
                        </Grid>
                        <Grid size={12} display="flex" justifyContent="center">
                            <TimePicker
                                sx={{ width: '70%' }}
                                label="Hora del Turno"
                                value={fechaTurno}
                                onChange={(fecha) => setFechaTurno(fecha)}
                                format="HH:mm"
                            />
                        </Grid>
                    </Grid>
                </DemoContainer>
            </LocalizationProvider>
        )
    }

    return (
        <Grid container display='flex' justifyContent="center" alignItems="center" spacing={5}>
            <Grid size={12} display='flex' justifyContent="center" sx={{ marginTop: 5 }}>
                <Typography variant='h3'>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                </Typography>
            </Grid>
            <Grid size={2} sx={{ height: '550px', borderRight: 'solid #474963 1px' }}>
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
                        <StarIcon sx={{ color: '#c5c537' }}></StarIcon>
                        <StarIcon sx={{ color: '#c5c537' }}></StarIcon>
                        <StarIcon sx={{ color: '#c5c537' }}></StarIcon>
                        <StarIcon sx={{ color: '#c5c537' }}></StarIcon>
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
                {locales.map((local, index) => (
                    <Grid key={index} container size={12} sx={{ height: '160px', border: ' solid #474963 1px', borderRadius: '10px', boxShadow: '4px 4px 4px 2px rgba(0, 0, 0, 0.1)' }} justifyContent='space-evenly'>
                        <Grid >
                            <img
                                src={local.img}
                                alt='Peluqueria 1'
                                style={{ height: '145px', width: '200px', borderRadius: '10px', margin: '6px' }}
                            />
                        </Grid>
                        <Grid size={6} padding={1}>
                            <Typography variant='h6'>
                                {local.name}
                            </Typography>
                            <Typography variant='body1' display="flex" alignItems="center">
                                <LocationOnIcon fontSize='small' sx={{ marginRight: '4px' }}></LocationOnIcon>
                                {local.location}
                            </Typography>
                            <Typography variant='body1' display="flex" alignItems="center">
                                <PhoneEnabledIcon fontSize='small' sx={{ marginRight: '4px' }}></PhoneEnabledIcon>
                                {local.tel}
                            </Typography>
                            <Typography variant='body1' display="flex" alignItems="center">
                                <InstagramIcon fontSize='small' sx={{ marginRight: '4px' }}></InstagramIcon>
                                {local.ig}
                            </Typography>
                        </Grid>
                        <Grid size={3} container justifyContent='center' alignContent='center'>
                            <Grid >
                                <CustomStars calification={local.calification} ></CustomStars>
                            </Grid>
                            <Grid>
                                <Button variant="outlined" color="primary" onClick={abrirModalTurno}>Solicitar Turno</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <CustomModal abierto={modalTurno} abrirModal={abrirModalTurno} handler={fetchFormulario} title="Alta de Turno" children={<FormSolicitudServicio />}></CustomModal>
            <CustomModal abierto={modalMsg} abrirModal={abrirModalMsg} handler={fetchFormulario} title={msg} children={<MensajeExitoso />}></CustomModal>
        </Grid>
    )
}