import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Rating, Avatar,
  IconButton,
  Stack
} from "@mui/material";
import {
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';
import { AccessTime, Delete, Visibility, Email, Phone, Home  } from "@mui/icons-material";
import ConfirmationModal from "../ConfirmarModal/ConfirmarModal";
import { obtenerUsuarioClientePorID } from "../../services/administrarUsuario";
import {mayuscPrimeraLetra} from '../../utils/utils';


const SolicitudesEnviadas = ({ solicitudes, loading, onDeleteSolicitud }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState({});
  const [openModalEmpleador, setOpenModalEmpleador] = useState(false);
  const [openModalClasificar, setOpenModalClasificar] = useState(false);
  const [usuarioEmpleador, setUsuarioEmpleador] = useState({});
  const [loadingEmpleador, setLoadingEmpleador] = useState(false);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingSubmit = () => {
      fetchCalificarEmpleadores(rating);
      setOpenModalClasificar(false);
    };

  const fetchCalificarEmpleadores = () => {
    console.log("calificacion", rating)
  }

  const handleVerEmpleador = (id) => {
    setOpenModalEmpleador(!openModalEmpleador);
    fetchUsuario(id);
  };

  const clasificarEmpleador = (id) => {
    setOpenModalClasificar(!openModalClasificar);
    fetchUsuario(id);
  };

  

  const fetchUsuario = async (id) => {
    try {
      setLoadingEmpleador(true);
      const data = await obtenerUsuarioClientePorID(id);
      setUsuarioEmpleador(data || {});
    } catch (error) {
      console.error("Error al obtener el usuario cliente:", error);
      setLoadingEmpleador(false);
    } finally {
      setLoadingEmpleador(false);
    }
  }

  const handleOpenDelete = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenConfirmModal(true);
  };

  const handleCloseDelete = () => {
    setOpenConfirmModal(false);
  };

  const handleConfirmDelete = () => {
    onDeleteSolicitud(selectedSolicitud.id);
    handleCloseDelete();
  };

  // Función para formatear la fecha
  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES');
  };

  // Función para formatear la hora
  const formatHora = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  // Obtener nombre del servicio basado en id_servicio
  const getTipoServicio = (idServicio) => {
    const servicios = {
      1: "Paseo",
      2: "Veterinario",
      3: "Entrenamiento",
      4: "Peluquería",
    };
    return servicios[idServicio] || "Servicio";
  };


  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        '& svg': { mr: 1 }
      }}>
        <AccessTime fontSize="small" /> Solicitudes Enviadas
      </Typography>
      
      <Divider sx={{ mb: 3 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
              <Table>
                <TableBody>
                  {solicitudes.map((solicitud) => (
                    <TableRow key={solicitud.id}>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {getTipoServicio(solicitud.id_servicio)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFecha(solicitud.fecha_hora)}
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="right">
                        <Chip 
                          label={mayuscPrimeraLetra(solicitud.estado)} 
                          size="small"
                          color={
                            solicitud.estado === "pendiente" ? "primary" : 
                            solicitud.estado === "aceptada" ? "success" : 
                            solicitud.estado === "en curso" ? "success" : 
                            solicitud.estado === "finalizada" ? "success" : 
                            solicitud.estado === "rechazada" ? "error" : "default"
                          }
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatHora(solicitud.fecha_hora)}
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="right">
                        {
                          solicitud.estado == "finalizada" ? (

                        <Button 
                          size="small" 
                          startIcon={<StarIcon />}
                          onClick={() => clasificarEmpleador(solicitud.id_usuario_empleador)}
                          sx={{ mr: 1 ,color: '#e5be01'}}
                        >
                          Calificar empleador
                        </Button>
                          ): null
                        }
                      <Button 
                          size="small" 
                          startIcon={<Visibility />}
                          onClick={() => handleVerEmpleador(solicitud.id_usuario_empleador)}
                          sx={{ mr: 1 }}
                        >
                          Ver empleador
                        </Button>
                        <Button 
                          size="small" 
                          startIcon={<Delete />}
                          onClick={() => handleOpenDelete(solicitud)}
                          color="error"
                        >
                          Cancelar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
              No tienes solicitudes enviadas
            </Typography>
          )}
        </>
      )}

      {/* Modal de confirmación para cancelar solicitud */}
      
      <ConfirmationModal
        open={openConfirmModal}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar cancelación de solicitud"
        message="¿Estás seguro que deseas cancelar esta solicitud?"
        warning="Tu turno se perderá y no podrás recuperarlo."
        details={
          <>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
             <Typography variant="body2">
                <strong>Servicio: </strong> 
                {getTipoServicio(selectedSolicitud?.id_servicio)}
              </Typography>
              <Typography variant="body2">
                <strong>Fecha: </strong> 
                {formatFecha(selectedSolicitud?.fecha_hora)}
              </Typography>
              <Typography variant="body2">
                <strong>Hora: </strong> 
                {formatHora(selectedSolicitud?.fecha_hora)}
              </Typography>
            </Box>
          </>
        }
        confirmText="Confirmar cancelación"
        cancelText="Conservar turno"
      />

      <ConfirmationModal
        open={openModalEmpleador}
        onClose={handleVerEmpleador}
        title="Empleador de la solicitud"
        message=""
        warning=""
        actions={false}
        details={
          <>
          {loadingEmpleador ? 
            <CircularProgress size={20} />
          :
          <Box sx={{ 
            mt: 2, 
            p: 0, 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3
          }}>
            <Box sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: { md: 200 },
              borderRight: { md: '1px solid' },
              borderColor: { md: 'divider' }
            }}>
              <Avatar
                alt={usuarioEmpleador.nombre}
                src={usuarioEmpleador.imagen || '/default-avatar.jpg'}
                sx={{ 
                  width: 120, 
                  height: 120,
                  fontSize: '3rem',
                  mb: 2
                }}
              >
                {!usuarioEmpleador.imagen && 
                  usuarioEmpleador.nombre?.charAt(0).toUpperCase()}
              </Avatar>
              
              <Box sx={{ textAlign: 'center' }}>
                <Rating
                  value={usuarioEmpleador.rating || 0}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  sx={{ color: 'warning.main' }}
                />
                <Typography variant="body2" color="text.secondary">
                  ({usuarioEmpleador.reviewsCount || 0} reseñas)
                </Typography>
                
                {usuarioEmpleador.verificado && (
                  <Chip
                    label="Verificado"
                    color="success"
                    size="small"
                    icon={<StarIcon fontSize="small" />}
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Box>
      
            <Box sx={{ 
              p: 3,
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {usuarioEmpleador.nombre}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2  }}>
                    <Email color="primary" sx={{ mr: 1.5, minWidth: 24 }} />
                    <Typography variant="body1">
                      {usuarioEmpleador.email || 'No especificado'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone color="primary" sx={{ mr: 1.5, minWidth: 24 }} />
                    <Typography variant="body1">
                      {usuarioEmpleador.telefono || 'No especificado'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Home color="primary" sx={{ mr: 1.5, minWidth: 24, mt: '4px' }} />
                    <Typography variant="body1">
                      {usuarioEmpleador.direccion || 'No especificada'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          }
          </>
        }
      />

      <Dialog
          open={openModalClasificar}
          onClose={()=> {openModalClasificar(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
            Calificar al empleador segun tu confirmidad
            {
              <Button
                  onClick={()=> {openModalClasificar(false)}}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  >
                  X
              </Button> 
              } 

          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  size="large"
                >
                  {star <= (hover || rating) ? (
                    <StarIcon sx={{ fontSize: 40, color: '#FFD700' }} />
                  ) : (
                    <StarBorderIcon sx={{ fontSize: 40, color: '#BDBDBD' }} />
                  )}
                </IconButton>
              ))}
            </Box>
            
          </DialogContent>
      
          <Divider />
      
          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button
              variant="outlined"
              color="error" onClick={()=> setOpenModalClasificar(false)}
              sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
            >
              Cancelar
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={handleRatingSubmit}
              disabled={rating === 0}
              sx={{ borderRadius: '20px', textTransform: 'none', px: 3 }}
            >
              Calificar
            </Button>
          </DialogActions>

              
        </Dialog>
    </Box>
  );
};

export default SolicitudesEnviadas;