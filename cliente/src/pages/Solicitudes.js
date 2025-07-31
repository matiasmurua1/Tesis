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
import ConfirmationModal from '../components/ConfirmarModal/ConfirmarModal';

import {mayuscPrimeraLetra, formatFecha, formatHora} from '../utils/utils'

import { useAuth } from "../context/usuarioContexto";

const Solicitudes = () => {
    const { user } = useAuth();
    const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([])
    const [solicitudEnProgreso, setSolicitudEnProgreso] = useState({})
    const [solicitudesFinalizadas, setSolicitudesFinalizadas] = useState([])
    const [serviceSelected, setServiceSelected]= useState({})
    const [servicios, setServicios] = useState([])
    const [msgModal, setMsgModal] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [openModalCliente, setOpenModalCliente] = useState(false)
    const [openRechazarModal, setOpenRechazarModal] = useState(false)

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
                console.log("aaaaaaacliente", data)
                setUsuario(data || {});
            }
        } catch (error) {
            console.error("Error al obtener el usuario cliente:", error);
        }
    }
    
    const handleVerCliente = (service) => {
        setServiceSelected(service)
        fetchUsuario(service.id_usuario_cliente)
        setOpenModalCliente(true)
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
                setOpenRechazarModal(false)
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
                    <DialogContentText sx={{  fontWeight: "bold" }} >   
                        <Grid container display='flex' flex='row' justifyContent='center' gap={2}>
                                <Grid item size={6}>
                                    <Grid item sx={{
                                        marginBottom: '15px', 
                                        borderRadius: '8px',
                                        bgcolor: 'background.paper',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid',
                                        borderColor: 'primary.main',
                                        padding:'10px'
                                    }} 
                                    display='flex' 
                                    flexDirection='column'
                                    justifyContent='space-between' >
                                    
                                        <Typography variant="body2" fontStyle="italic" sx={{ fontSize: '1.1rem', color: 'black' }}>
                                            Comentario: 
                                        </Typography>
                                        <Typography variant="body2" fontStyle="italic" sx={{ fontSize: '1.1rem', color: 'black' }}>
                                            {serviceSelected?.comentario}
                                        </Typography>

                                    </Grid>
                                    <Grid item sx={{
                                        marginBottom: '15px', 
                                        borderRadius: '8px',
                                        bgcolor: 'background.paper',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                        borderLeft: '4px solid',
                                        borderColor: 'primary.main',
                                        padding:'10px'
                                    }} 
                                    display='flex' 
                                    flexDirection='column'
                                    justifyContent='space-between' >

                                        <Typography variant="body2" fontStyle="italic" sx={{ fontSize: '1.1rem', color: 'black' }}>
                                            Calificacion del servicio:
                                        </Typography>
                                        <Rating 
                                            value={serviceSelected?.puntaje} 
                                            readOnly 
                                            precision={0.5} 
                                            size="small" 
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item size={5} >

                                    <Grid item size={12} sx={{marginBottom: '15px'}} display='flex' justifyContent='space-between' >
                                        <Grid>
                                            <Typography variant="caption" color="text.primary">Nombre</Typography>
                                            <Typography>{usuario?.nombre || 'No especificada'}</Typography>
                                        </Grid>
                                        <Grid>
                                            
                                         <div
                                            style={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: "50%",
                                                fontSize: 48,
                                                backgroundColor: usuario?.imagen_path ? "transparent" : "#3f51b5", // primary.main
                                                color: "#fff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden"
                                            }}
                                            >
                                            {usuario?.imagen_path ? (
                                                <img
                                                src={`http://localhost:4000${usuario?.imagen_path}`}
                                                alt="avatar"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                />
                                            ) : (
                                                getInitials(usuario?.nombre)
                                            )}
                                            </div>
                                        
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

                                    <Grid item size={12} sx={{marginBottom: '15px'}} display='flex' justifyContent='space-between'>
                                        <Grid>
                                            <Typography variant="caption" color="text.primary">Mascota</Typography>
                                            <Typography>{usuario?.mascota?.nombre}</Typography>
                                        </Grid>
                                        <Grid>
                                            <div
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    borderRadius: "50%",
                                                    fontSize: 48,
                                                    backgroundColor: usuario?.mascota?.imagen_path ? "transparent" : "#3f51b5", // primary.main
                                                    color: "#fff",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    overflow: "hidden"
                                                }}
                                                >
                                                {usuario?.imagen_path ? (
                                                    <img
                                                    src={`http://localhost:4000${usuario?.mascota.imagen_path}`}
                                                    alt="avatar"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                    />
                                                ) : (
                                                    getInitials(usuario?.mascota?.nombre)
                                                )}
                                            </div>
                                        </Grid>
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
                                    <Typography variant="body1">{formatFecha(solicitudEnProgreso?.fecha_hora)}</Typography>
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
                            <TableCell>{formatFecha(solicitud.fecha_hora)}</TableCell>
                            <TableCell>{formatHora(solicitud.fecha_hora)}</TableCell>
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
                                onClick={() => setOpenRechazarModal(true)}
                                sx={{ borderRadius: '20px', textTransform: 'none' }}
                                >
                                Cancelar
                                </Button>
                            </Stack>
                            </TableCell>
                            

                            <ConfirmationModal
                                open={openRechazarModal}
                                onClose={() => setOpenRechazarModal(false)}
                                onConfirm={() => cambiarEstadoDeSolicitud(solicitud, "rechazada")}
                                title="Rechazar solicitud de servicio"
                                confirmText="Rechazar"
                                message="¿Estás seguro que deseas rechazar solicitud de este cliente? "
                                warning="Esta acción no se puede deshacer."
                            />
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
                                {formatFecha(servicio.fecha_hora)} · {formatHora(servicio.fecha_hora)}
                            </Typography>
                            </Box>
                            
                            <Grid container direction="row" spacing={2} alignItems="center">
                                
                                    {
                                    servicio.puntaje ? 
                                        (
                                        <Grid item display='flex' flexDirection="column" alignItems='center'>
                                            <Rating 
                                            value={servicio.puntaje} 
                                            readOnly 
                                            precision={0.5} 
                                            size="small" 
                                            />
                                            <Button 
                                                variant="text" 
                                                size='small' 
                                                onClick={() => handleVerCliente(servicio)}
                                                sx={{ marginLeft: '5px', textTransform: "capitalize"}} 
                                            >
                                                Ver reseña
                                            </Button>
                                        </Grid>
                                        )
                                        :  (<Typography variant="body2" color="text.secondary">
                                                Reseña del cliente pendiente
                                            </Typography>)                            
                                    }
                                    
                            </Grid>
                        </Stack>
                        </CardContent>
                    </Card>
                    ))}
                </Stack>
            <ClienteModal/>
            
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
        </Grid>
    </Grid>
  );
};

export default Solicitudes;