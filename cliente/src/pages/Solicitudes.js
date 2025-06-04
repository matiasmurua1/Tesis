import React, {useState, useEffect} from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Stack,
  Rating,
  Card,
  CardContent,
  IconButton,
  Grid2 as Grid,
  Snackbar, Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import {
    Person as PersonIcon,
    Pets as PetsIcon,
    Phone as PhoneIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    History as HistoryIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { obtenerSolicitudesPorEmpleador, editarSolicitudes} from '../services/solicitudes';
import {obtenerServicios} from '../services/servicios'
import {obtenerUsuarioClientePorID} from '../services/administrarUsuario'

import {mayuscPrimeraLetra} from '../utils/utils'

import { useAuth } from "../context/usuarioContexto";

const Solicitudes = () => {
    const { user } = useAuth();
    const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([])
    const [solicitudEnProgreso, setSolicitudEnProgreso] = useState({})
    const [solicitudesFinalizadas, setSolicitudesFinalizadas] = useState([])
    const [servicios, setServicios] = useState([])
    const [msgModal, setMsgModal] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [openModalCliente, setOpenModalCliente] = useState(false)

    const fetchSolicitudes = async () => {
        try {
            const data = await obtenerSolicitudesPorEmpleador(user.id);
            setSolicitudesRecibidas(data.filter(solicitud => solicitud.estado === 'pendiente' || solicitud.estado === 'aceptada' ) || []);
            setSolicitudEnProgreso(data.filter(solicitud => solicitud.estado === 'en curso')[0] || {});
            setSolicitudesFinalizadas(data.filter(solicitud => solicitud.estado === 'finalizada') || []);
        } catch (error) {
            console.error("Error al obtener el usuario cliente:", error);
        }
    }

    const getInitials = (name) => {
        if (!name) return "";
        const names = name.split(" ");
        return names.map(n => n[0]).join("").toUpperCase();
    };

    useEffect(() => {
        fetchSolicitudes();
        fetchServicios();
    }, []);

    useEffect(() => {
        fetchUsuario(solicitudEnProgreso.id_usuario_cliente)
    }, [solicitudEnProgreso]);

    const fetchUsuario = async (id) => {
        try {
            if( id ){
                const data = await obtenerUsuarioClientePorID(id)
                console.log("usuario: ", data);
                setUsuario(data || {});
            }
        } catch (error) {
            console.error("Error al obtener el usuario cliente:", error);
        }
    }

    const fetchServicios = async () => {
        try {
        const data = await obtenerServicios();
        setServicios(data || []);
        } catch (error) {
        console.error("Error al obtener los servicios:", error);
        } 
    };

    const cambiarEstadoDeSolicitud = async (solicitud, estado) => {
        try {
            if (estado === "en curso" && Object.keys(solicitudEnProgreso).length !== 0 ){
                setMsgModal("Se requiere cerrar la solicitud en Progreso")
            } else {
                const data = await editarSolicitudes({ estado: estado }, solicitud.id);
                fetchSolicitudes()
            }
        } catch (error) {
            console.error("Error al obtener los servicios:", error);
        } 
    }
  
    const ClienteModal = () => {
        return(
            <Dialog
                open={openModalCliente}
                onClose={()=> {setOpenModalCliente(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
                    Informacion de tu cliente
                    {
                    <Button
                        onClick={()=> {setOpenModalCliente(false)}}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                        X
                    </Button> 
                    } 

                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mt: 2, fontWeight: "bold" }} >   
                        <Grid container display='flex' flex='row' justifyContent='center' marginInline={8}>

                                <Grid item size={12} sx={{marginBottom: '15px'}} display='flex' justifyContent='space-between' >
                                    <Grid>
                                        <Typography variant="caption" color="text.primary">Nombre</Typography>
                                        <Typography>{usuario?.nombre || 'No especificada'}</Typography>
                                    </Grid>
                                    <Grid>
                                        
                                    <Avatar sx={{ 
                                        width: 80, 
                                        height: 80, 
                                        fontSize: 48, 
                                        bgcolor: 'primary.main'
                                        }}>
                                        {getInitials(usuario?.nombre)}
                                    </Avatar>
                                    
                                    </Grid>
                                </Grid>
                                
                                
                                <Divider sx={{ mb: 3 }} />

                                <Grid item size={6} sx={{marginBottom: '15px'}} >
                                    <Typography variant="caption" color="text.primary">DNI/CUIT</Typography>
                                    <Typography>{usuario?.dni_cuit || 'No especificado'}</Typography>
                                </Grid>
                                
                                <Grid item size={6} sx={{marginBottom: '15px'}} >
                                    <Typography variant="caption" color="text.primary">Teléfono</Typography>
                                    <Typography>{usuario?.telefono || 'No especificado'}</Typography>
                                </Grid>

                                <Grid item size={6} sx={{marginBottom: '15px'}}>
                                    <Typography variant="caption" color="text.primary">Dirección</Typography>
                                    <Typography>{usuario?.direccion || 'No especificada'}</Typography>
                                </Grid>
                                
                                <Grid item size={6} sx={{marginBottom: '15px'}}>
                                    <Typography variant="caption" color="text.primary">Email</Typography>
                                    <Typography>{usuario?.email}</Typography>
                                </Grid>

                                <Grid item size={12} sx={{marginBottom: '15px'}} display='flex' justifyContent='space-between'>
                                    <Grid>
                                        <Typography variant="caption" color="text.primary">Mascota</Typography>
                                        <Typography>{usuario?.mascota.nombre}</Typography>
                                    </Grid>
                                    <Grid>
                                            
                                        <Avatar sx={{ 
                                            width: 80, 
                                            height: 80, 
                                            fontSize: 48, 
                                            bgcolor: 'primary.main'
                                            }}>
                                            {getInitials(usuario?.mascota.nombre)}
                                        </Avatar>

                                    </Grid>
                                </Grid>

                                

                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }

  return (
    <Grid container sx={{ p: 3 }} alignItems='center' display='flex' flexDirection='column'  justifyItems='center'>
      {/* Servicio en progreso */}
        <Grid item size={12} display='flex' alignItems='center' flexDirection='column'>
                <Grid item size={12}   justifyContent='center' display='flex'>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Servicio en progreso
                    </Typography>
                </Grid>
                {
                    solicitudEnProgreso?.id == null ? (
                        <Paper elevation={1} sx={{ p: 3, mb: 1, borderRadius: 2, maxWidth: '900px'}}>
                            <Grid container display="flex" justifyContent='center'>
                                <Typography variant="body2" color='gray'>No hay solicitud en progreso</Typography>
                            </Grid>
                        </Paper>
                    ) : 
                    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: '900px'}}>
                        
                        <Grid container display="flex" justifyContent='end'>

                            <Grid item size={7} flexDirection='column' alignItems='start' display='flex'>
                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <PersonIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Cliente:</Typography>
                                    <Typography variant="body1">{usuario?.nombre}</Typography>
                                </Box>
                                </Stack>
                            
                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                    <PhoneIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Celular:</Typography>
                                    <Typography variant="body1">{usuario?.telefono}</Typography>
                                </Box>
                                </Stack>
                            
                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'success.main' }}>
                                    <PetsIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Mascota:</Typography>
                                    <Typography variant="body1">{usuario?.mascota?.nombre}</Typography>
                                </Box>
                                </Stack>
                        
                            </Grid>

                            

                            <Grid item size={5} flexDirection='column' alignItems='start' display='flex'>
                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <CalendarMonthIcon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Fecha:</Typography>
                                    <Typography variant="body1">{solicitudEnProgreso?.fecha_hora?.split('T')[0]}</Typography>
                                </Box>
                                </Stack>

                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                        <InfoIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Servicio:</Typography>
                                        <Typography variant="body1">{servicios.filter(servicio => servicio.id == solicitudEnProgreso.id_servicio)[0]?.nombre}</Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
                                    <Avatar sx={{ bgcolor: 'error.main' }}>
                                        <LocationOnIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ubicacion:</Typography>
                                        <Typography variant="body1">{user.direccion}</Typography>
                                    </Box>
                                </Stack>
                                
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop:'10px' }}>
                                <Button 
                                    variant="outlined" 
                                    sx={{ borderRadius: '20px', textTransform: 'none' }}
                                    onClick={()=> cambiarEstadoDeSolicitud(solicitudEnProgreso, "finalizada")}
                                >
                                    Finalizar turno
                                </Button>
                            </Box>

                        </Grid>

                    </Paper>
                }
      <Divider sx={{ mb: 4 }} />
            
      </Grid>

      {/* <Divider sx={{ my: 3 }} /> */}

        <Grid item container size={12} display='flex' flexDirection='row'  justifyContent='space-between' >
            <Grid item size={6}>
                {/* Solicitudes recibidas */}
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Solicitudes recibidas
                </Typography>
                
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                    <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>Servicio</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solicitudesRecibidas.map((solicitud, index) => (
                        <TableRow key={index}>
                            <TableCell>
                            <Chip 
                                label={servicios.filter(servicio => servicio.id == solicitud.id_servicio)[0]?.nombre} 
                                color="primary" 
                                size="small" 
                                sx={{ fontWeight: 'bold' }}
                            />
                            </TableCell>
                            
                            <TableCell>{mayuscPrimeraLetra(solicitud.estado)}</TableCell>
                            <TableCell>{solicitud.fecha_hora.split('T')[0]}</TableCell>
                            <TableCell>{solicitud.fecha_hora.split('T')[1].split('.')[0]}</TableCell>
                            <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">

                                {solicitud.estado == "pendiente" ? (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        startIcon={<CheckCircleIcon />}
                                        sx={{ borderRadius: '20px', textTransform: 'none', width:'90px'}}
                                        onClick={() => cambiarEstadoDeSolicitud(solicitud, "aceptada")}
                                    >
                                        Aceptar
                                    </Button>
                                ) : null
                                }

                                {solicitud.estado == "aceptada" ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<CheckCircleIcon/>}
                                        sx={{ borderRadius: '20px', textTransform: 'none', width:'90px'}}
                                        onClick={() => cambiarEstadoDeSolicitud(solicitud, "en curso")}
                                    >   
                                        Iniciar
                                    </Button>
                                ) : null
                                }
                                
                                <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<CancelIcon />}
                                sx={{ borderRadius: '20px', textTransform: 'none' }}
                                >
                                Cancelar
                                </Button>
                            </Stack>
                            </TableCell>
                        </TableRow>
                        ))}
                        {solicitudesRecibidas.length === 0 ? (
                            <TableCell>
                                <Typography variant="body2" color='gray'>No hay solicitudes recibidas</Typography>
                            </TableCell>
                        ) : null}
                    </TableBody>
                    </Table>
                </TableContainer>

                    
            </Grid>

            {/* <Divider sx={{ my: 3 }} /> */}
            
            <Grid item size={5}>


                {/* Historial de servicios */}
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold'}}>
                    Historial de servicios
                </Typography>
                
                <Stack spacing={2}>
                    {solicitudesFinalizadas.map((servicio, index) => (
                    <Card key={index} elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {servicios.filter(servi => servi.id == servicio.id_servicio)[0]?.nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {servicio.fecha_hora.split('T')[0]} · {servicio.fecha_hora.split('T')[1].split('.')[0]}
                            </Typography>
                            </Box>
                            
                            <Stack direction="row" spacing={2} alignItems="center">
                            <Rating 
                                value={servicio.puntaje} 
                                readOnly 
                                precision={0.5} 
                                size="small" 
                            />
                            <Button 
                                variant="text" 
                                startIcon={<VisibilityIcon />}
                                sx={{ textTransform: 'none' }}
                                onClick={()=> setOpenModalCliente(true)}
                            >
                                Ver cliente
                            </Button>
                            </Stack>
                        </Stack>
                        </CardContent>
                    </Card>
                    ))}
                </Stack>
            
            </Grid>
            <Snackbar
                open={msgModal !== null}
                autoHideDuration={6000}
                onClose={() => setMsgModal(null)}
            >
                <Alert 
                    severity="error" 
                    onClose={() => setMsgModal(null)}
                    sx={{ width: '100%' }}>
                    {msgModal}
                </Alert>
            </Snackbar>
            <ClienteModal/>
        </Grid>
    </Grid>
  );
};

export default Solicitudes;