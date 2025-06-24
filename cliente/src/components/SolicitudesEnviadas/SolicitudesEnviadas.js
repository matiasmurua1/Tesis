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
  Stack, 
  TextField
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
import {enviarCalificacion} from '../../services/resena'

const SolicitudesEnviadas = ({ solicitudes, loading, onDeleteSolicitud, recargarSolicitudes }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState({});
  const [openModalEmpleador, setOpenModalEmpleador] = useState(false);
  const [openModalClasificar, setOpenModalClasificar] = useState(false);
  const [usuarioEmpleador, setUsuarioEmpleador] = useState({});
  const [loadingEmpleador, setLoadingEmpleador] = useState(false);

  
  const [review, setReview] = useState(null)
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingSubmit = () => {
      fetchCalificarEmpleador();
      setOpenModalClasificar(false);
  };

  const fetchCalificarEmpleador = async () => {
    const payload = {
      id_usuario_empleador: selectedSolicitud.id_usuario_empleador,
      id_solicitud_servicio: selectedSolicitud.id ,
      puntaje: rating,
      comentario: review,
    }
    
     try {
      const data = await enviarCalificacion(payload);
      recargarSolicitudes()
      setOpenModalClasificar(false)
    } catch (error) {
      console.error("Error al calificar al empleador:", error);
    } 
  }

  const handleVerEmpleador = (id) => {
    setOpenModalEmpleador(!openModalEmpleador);
    fetchUsuario(id);
  };

  const clasificarEmpleador = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenModalClasificar(!openModalClasificar);
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
                          style={{ 
                            backgroundColor: 
                              solicitud.estado === "pendiente" ? "#FCBE11" : 
                              solicitud.estado === "aceptada" ? "#2196F3" : 
                              solicitud.estado === "en curso" ? "#FF9800" : 
                              solicitud.estado === "finalizada" ? "#4CAF50" : 
                              solicitud.estado === "rechazada" ? "#FF2C2C" : "default",
                            color: 
                              solicitud.estado === "pendiente" ? "#000000" : 
                              solicitud.estado === "aceptada" ? "#000000" : 
                              solicitud.estado === "en curso" ? "#000000" : 
                              solicitud.estado === "finalizada" ? "#000000" : 
                              solicitud.estado === "rechazada" ? "#FFFFFF" : "default",
                          }}
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatHora(solicitud.fecha_hora)}
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="right">
                        {
                          solicitud.estado == "finalizada" && !solicitud.resena_id ? (

                        <Button 
                          size="small" 
                          startIcon={<StarIcon />}
                          onClick={() => clasificarEmpleador(solicitud)}
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
        onClose={()=> setOpenModalEmpleador(!openModalEmpleador)}
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
              <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    fontSize: 48,
                    marginBottom: 24,
                    backgroundColor: usuarioEmpleador.imagen_path ? "transparent" : "#3f51b5", // primary.main
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                  }}
                >
                  {usuarioEmpleador.imagen_path ? (
                    <img
                      src={`http://localhost:4000${usuarioEmpleador.imagen_path}`}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    usuarioEmpleador.nombre?.charAt(0).toUpperCase()
                  )}
              </div>
              
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
          onClose={()=> {setOpenModalClasificar(false)}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
            Calificar al empleador segun tu confirmidad
            {
              <Button
                  onClick={()=> {setOpenModalClasificar(false)}}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                  >
                  X
              </Button> 
            }
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column", alignItems: 'center', gap:'10px', my: 3 }}>
              <Box>
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
              <Grid width='100%' display='flex' justifyContent='center' flexDirection='column'>
                <Typography variant="subtitle1" sx={{marginBottom: '5px'}}>
                    Escribe una reseña segun tu conformidad con el servicio
                </Typography>
                <TextField
                  size="big"
                  variant="outlined"
                  label="Reseña"
                  name="Reseña"
                  required={true}
                  onChange={(e) => setReview(e.target.value)}
                ></TextField>
              </Grid>
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
              Enviar
            </Button>
          </DialogActions>

              
        </Dialog>
      
    </Box>
  );
};

export default SolicitudesEnviadas;