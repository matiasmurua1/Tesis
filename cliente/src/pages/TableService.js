import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import { Button, Link, IconButton, TextField} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CustomStars from '../components/CustomStars/CustomStars';
import CustomModal from '../components/CustomModal/CustomModal';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { getFecha, formatearFechaLocal } from '../utils/utils';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {obtenerUsuariosEmpleadores, obtenerUsuarioClientePorID} from '../services/administrarUsuario'
import defaultImg from '../assets/Home/defaultImg.jpeg'
import {obtenerServicios} from '../services/servicios'
import { enviarSolicitudes } from '../services/solicitudes';
import { useAuth } from "../context/usuarioContexto";
import { useNavigate } from "react-router-dom";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';


export default function TableServices() {
    
    const { user } = useAuth();
    const { service } = useParams();
    const [modalTurno, setModalTurno] = useState(false);
    const [fecha, setFecha] = useState(dayjs());
    const [hora, setHora] = useState(dayjs());
    const [modalMsg, setAbrirModalMsg] = useState(false)
    const [msg, setMsg] = useState("")
    const [empleadores, setEmpleadores] = useState([])
    const [empleadorSolicitud, setEmpleadorSolicitud] = useState({})
    const [modalRegitrarMascota, setModalRegitrarMascota] = useState(false)
    const [filtroCalificacion, setFiltroCalificacion] = useState(null);
    const navigate = useNavigate();
    const [servicioSeleccionado, setServicioSeleccionado] = useState()
    const [filtroUbicacion, setFiltroUbicacion] = useState('');

    useEffect(() => {
        fetchServicios();
        fetchEmpledores();
        // setFechaTurno(dayjs.utc(getFecha(), 'DD/MM/YYYY'));
    }, []);

    const fetchServicios = async () => {
        try {
        const data = await obtenerServicios();

        setServicioSeleccionado(data.filter(servicio => servicio.id == service)[0]);
        } catch (error) {
        console.error("Error al obtener los servicios:", error);
        } 
    };
    

    const fetchEmpledores = async () => {
        try {
        const data = await obtenerUsuariosEmpleadores();
        setEmpleadores(data.filter(empleador => empleador.id_servicio == service));
        console.log("dataaa: ", data)
        } catch (error) {
        console.error("Error al obtener los empleadores:", error);
        } 
    };

    const fetchEnviarSolicitudes = async (empleador_id) => {
        const fechaHora = fecha
            .hour(hora.hour())
            .minute(hora.minute())
            .second(0);

        // Formatear a "DD/MM/YYYY HH:mm"
        const fechaFormateada = fechaHora.format('DD/MM/YYYY HH:mm');

        try {
            const data = await enviarSolicitudes({
                fecha_hora: fechaFormateada,
                id_usuario_cliente: user.id,
                id_servicio: service,
                id_usuario_empleador: empleador_id,
                estado: "pendiente"
            });

            setMsg(data.message);
            setAbrirModalMsg(true);

            const empleador = await obtenerUsuarioClientePorID(data.solicitud.id_usuario_empleador);
            setEmpleadorSolicitud(empleador);
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    };

    const abrirModalTurno = async () => {
        const usuarioCliente = await obtenerUsuarioClientePorID(user.id);

        if(!usuarioCliente.mascota){
            setModalRegitrarMascota(!modalRegitrarMascota)
        } else {
            setModalTurno(!modalTurno)
        }
    }

    
    const abrirModalMascota = async () => {
        setModalRegitrarMascota(!modalRegitrarMascota)
    }

    const handlerRedirect = async () => {
        navigate("/mi-perfil");
    } 


    const abrirModalMsg = () => {
        setAbrirModalMsg(!modalMsg)
    }

    function MensajeMascota() {
        return (
            <Grid size={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Typography variant='body1'>Usted no ha registrado su mascota aun.
                    </Typography>
                    <Typography variant='body1'>Porfavor cargue a su mascota en su  
                        {' '}
                        <Link href="/mi-perfil" sx={{ color: "#7079f0", marginTop:'10px' }}>
                                    perfil
                                </Link> 
                    </Typography>
            </Grid>
        )
    }

    function MensajeExitoso() {
        return (
            <Grid container size={12} justifyContent="center" spacing={2}>
                {
                    msg === "Solicitud de servicio creada con éxito"
                        ?
                        <Grid size={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant='body2'>Turno para el dia 
                            </Typography>
                            <Typography variant='subtitle2' sx={{ border: '1px solid', margin: '5px', padding: "8px", borderRadius: "3px"}}> 
                                <Typography variant='subtitle2'>
                                    {fecha.format('DD/MM/YYYY')} - {hora.format('HH:mm')}
                                </Typography>
                            </Typography>
                            <Typography variant='body2'> 
                                con 
                            </Typography>
                            <Typography variant='subtitle2' sx={{ border: '1px solid', margin: '5px', padding: "8px", borderRadius: "3px"}}> 
                                {empleadorSolicitud.nombre} 
                            </Typography>
                            
                            <CheckCircleIcon sx={{ color: "green", fontSize: "30px", marginTop:'10px'}}></CheckCircleIcon>
                            
                            <Typography variant='body2'> 
                                <Link href="/mi-perfil" sx={{ textDecoration: "none", color: "#7079f0", marginTop:'10px' }}>
                                    Ver listado de solicitudes de turnos
                                </Link>
                            </Typography>
                        </Grid>
                        :
                        <Grid size={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                            <Typography variant='body1'>No se pudo enviar la solicitud de turno, intente ingresar otro horario</Typography>
                            <CancelIcon sx={{ color: "red", fontSize: "30px"}}></CancelIcon>
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
                                value={fecha}
                                onChange={(newDate) => setFecha(newDate)}
                            />
                        </Grid>
                        <Grid size={12} display="flex" justifyContent="center">
                            <TimePicker
                                sx={{ width: '70%' }}
                                label="Hora del Turno"
                                value={hora}
                                onChange={(newTime) => setHora(newTime)}
                                format="HH:mm"
                            />
                        </Grid>
                    </Grid>
                </DemoContainer>
            </LocalizationProvider>
        )
    }

    const handleFiltroCalificacion = (valor) => {
        setFiltroCalificacion(valor);
    };


   const empleadoresFiltrados = empleadores
        .filter((empleador) =>
            filtroCalificacion ? empleador.calificacion === filtroCalificacion : true
        )
        .filter((empleador) =>
            filtroUbicacion
            ? empleador.direccion?.toLowerCase().includes(filtroUbicacion.toLowerCase())
            : true
        );

    return (
        <Grid container display='flex' justifyContent="center" alignItems="start" spacing={5}>
            <Grid size={12} display='flex' justifyContent="center" sx={{ marginTop: 5 }}>
                <Typography variant='h3'>
                    {servicioSeleccionado?.nombre}
                </Typography>
            </Grid>
            <Grid size={3} sx={{ height: '550px', paddingRight: '10px', borderRight: 'solid #474963 1px' }}>
                <Grid>
                    <Typography variant='h6'>
                        Filtros
                    </Typography>
                </Grid>
                <Grid container alignItems="flex-start" flexDirection='column'>
                    <Grid size={12} 
                        sx={{marginTop: '10px'}}>
                    <Typography variant='subtitle2'>Calidad</Typography>
                    </Grid>
                    <Grid size={4} display="flex">
                        {[1, 2, 3, 4, 5].map((valor) => (
                            <IconButton
                            key={valor}
                            onClick={() => handleFiltroCalificacion(valor)}
                            sx={{ padding: 0 }}
                            >
                            {valor <= filtroCalificacion ? (
                                <StarIcon sx={{ color: '#c5c537' }} />
                            ) : (
                                <StarBorderIcon />
                            )}
                            </IconButton>
                        ))}
                    </Grid>


                    <Grid size={12} 
                        sx={{marginTop: '10px'}}>
                    <   Typography variant='subtitle2'>Buscar por ubicación</Typography>
                    </Grid>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={filtroUbicacion}
                        onChange={(e) => setFiltroUbicacion(e.target.value)}
                    />
                </Grid>
                

                <Button
                    sx={{marginTop: '30px'}}
                    variant="text"
                    size="small"
                    onClick={() => {
                        setFiltroCalificacion(null);
                        setFiltroUbicacion('');
                    }}
                    >
                    Limpiar filtros
                </Button>
            </Grid>
            
            <Grid size={7} container spacing={2}>
                <Grid size={12}>
                    <Typography variant='h6'>
                        Ubicaciones
                    </Typography>
                </Grid>
                {empleadoresFiltrados.map((local, index) => (
                    <Grid key={index} container size={12} sx={{ height: '160px', border: ' solid #474963 1px', borderRadius: '10px', boxShadow: '4px 4px 4px 2px rgba(0, 0, 0, 0.1)' }} justifyContent='space-evenly'>
                        <Grid display="flex" justifyContent="center">
                            <div
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: "50%",
                                    fontSize: 48,
                                    marginTop: 15,
                                    backgroundColor: local.imagen_path ? "transparent" : "#3f51b5", // primary.main
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden"
                                }}
                                >
                                
                                    <img
                                    src={`http://localhost:4000${local.imagen_path}`}
                                    alt="avatar"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                    />
                                </div>
                        </Grid>
                        <Grid size={5} padding={1}>
                            <Typography variant='h6'>
                                {local.nombre}
                            </Typography>
                            <Typography variant='body1' display="flex" alignItems="center">
                                <LocationOnIcon fontSize='small' sx={{ marginRight: '4px' }}></LocationOnIcon>
                                {local.direccion}
                            </Typography>
                            <Typography variant='body1' display="flex" alignItems="center">
                                <PhoneEnabledIcon fontSize='small' sx={{ marginRight: '4px' }}></PhoneEnabledIcon>
                                {local.telefono}
                            </Typography>
                        </Grid>
                        <Grid size={3} container justifyContent='center' alignContent='center'>
                            <Grid >
                                <CustomStars calification={local.calificacion } ></CustomStars>
                            </Grid>
                            <Grid>
                                <Button variant="outlined" color="primary" onClick={abrirModalTurno}>Solicitar Turno</Button>
                            </Grid>
                        </Grid>
                        <CustomModal abierto={modalTurno} abrirModal={abrirModalTurno} handler={() => fetchEnviarSolicitudes(local.id)} title="Alta de turno" children={<FormSolicitudServicio />}></CustomModal>
                        <CustomModal abierto={modalMsg} abrirModal={abrirModalMsg} handler={() => fetchEnviarSolicitudes(local.id)} title={msg} children={<MensajeExitoso />}  confirmarBtn={false}></CustomModal>
                        <CustomModal abierto={modalRegitrarMascota} abrirModal={abrirModalMascota} title="Registre su mascota" handler={() => handlerRedirect()} children={<MensajeMascota/>}  confirmarBtn={false}></CustomModal>
                    </Grid>
                ))}
                

                {empleadoresFiltrados.length === 0 && (
                <Grid item xs={12} display="flex" flexDirection="column" alignItems="center" mt={5} sx={{ width:"100%"}}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="textSecondary" align="center">
                    No se encontraron empleadores con esta calificación
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                    Probá ajustando los filtros para ver más opciones disponibles.
                    </Typography>
                </Grid>
                )}
            </Grid>
            
        </Grid>
    )
}