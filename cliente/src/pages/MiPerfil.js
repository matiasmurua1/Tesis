import React, { useEffect, useState } from "react";
import { obtenerUsuarioClientePorID, modificarUsuarioClientePorID, borrarUsuarioClientePorID } from "../services/administrarUsuario";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  IconButton,
  Avatar,
  Divider,
  CircularProgress,
  Snackbar
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAuth } from "../context/usuarioContexto";
import { Visibility, VisibilityOff, Edit, Pets, Phone, Email, Home, Badge, Lock } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import EditarPerfilModal from "../components/EditarPerfilModal/EditarPerfilModal";
import SolicitudesEnviadas from "../components/SolicitudesEnviadas/SolicitudesEnviadas";
import {borrarSolicitudPorID, obtenerSolicitudesPorCliente} from "../services/solicitudes";
import ConfirmationModal from "../components/ConfirmarModal/ConfirmarModal";
import { useNavigate } from "react-router-dom";
import ServiciosActivos from "../components/ServiciosActivos/ServiciosActivos";
import MascotaCard from "../components/CardMascota/CardMascota";
import {obtenerMascotaPorIdUsuario} from "../services/mascotas";

// Componente estilizado para los ítems del perfil
const ProfileItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.3s ease',
}));

const MiPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const { user, logout, modificarServicioUsuario} = useAuth();
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    dni_cuit: "",
    contrasena: "",
    id_servicio: "",
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(true);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [mascota , setMascota] = useState([])



  const toggleMostrarContrasena = () => {
    setMostrarContrasena((prev) => !prev);
  };

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        email: usuario.email || "",
        direccion: usuario.direccion || "",
        telefono: usuario.telefono || "",
        dni_cuit: usuario.dni_cuit || "",
        contrasena: "",
        id_mascota: usuario.id_mascota || "",
        id_servicio: usuario.id_servicio || "",
      });
      setLoading(false);
    }
  }, [usuario]);

  const fetchUsuario = async () => {
    if (!user || !user.id) {
      console.error("No hay un usuario autenticado.");
      return;
    }

    try {
      setLoading(true);
      const data = await obtenerUsuarioClientePorID(user.id);
      setUsuario(data || {});
    } catch (error) {
      console.error("Error al obtener el usuario cliente:", error);
      setLoading(false);
    }
  }

  const fetchMascotas = async () => {
    if (!user || !user.id) {
      console.error("No hay un usuario autenticado.");
      return;
    }

    try {
      setLoading(true);
      const data = await obtenerMascotaPorIdUsuario(user.id);
      setMascota(data[0] || {});
    } catch (error) {
      setLoading(false);
    }
  }

  const fetchSolicitudes = async () => {
    try {
      setLoadingSolicitudes(true);
      const data = await obtenerSolicitudesPorCliente(user.id);
      setSolicitudes(data || []); // Asegura que sea array
    } catch (error) {
      console.error("Error al obtener las solicitudes del cliente:", error);
      setLoading(false);
    } finally {
      setLoadingSolicitudes(false);
    }
  };
  
  const fetchBorrarUsuario = async () => {
    try {
      const data = await borrarUsuarioClientePorID(user.id);
    } catch (error) {
      console.error("Error al borrar cliente:", error);
    }
  };

  const fetchBorrarSolicitudPorID = async (solicitudId) => {
    try {
      const data = await borrarSolicitudPorID(solicitudId);
    } catch (error) {
      console.error("Error al borrar la solicitud del cliente:", error);
    }
  } 

  useEffect(() => {
    fetchUsuario();
    fetchSolicitudes();
    fetchMascotas()
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await modificarUsuarioClientePorID(user.id, formData);
      modificarServicioUsuario(formData)
      setOpenModal(false);
      fetchUsuario();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetchBorrarUsuario();
      setDeleteSuccess(true);
      setTimeout(() => {
        navigate("/");
        logout();
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleDeleteSolicitud = async (solicitudId) => {
    try {
      await fetchBorrarSolicitudPorID(solicitudId);

      setDeleteSuccess(true);
      const updatedSolicitudes = await obtenerSolicitudesPorCliente(user.id);
      setSolicitudes(updatedSolicitudes);
      
      // Opcional: Mostrar notificación de éxito
    } catch (error) {
      console.error("Error al eliminar solicitud:", error);
      // Opcional: Mostrar notificación de error
      setDeleteSuccess(true);
    }
  };


  const mostrarContrasenaOculta = (contrasena) => {
    if (!contrasena) return "";
    return mostrarContrasena ? contrasena : "•".repeat(8);
  };

  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ 
        fontWeight: "bold", 
        color: "primary.main",
        mb: 4,
        position: 'relative',
        '&:after': {
          content: '""',
          display: 'block',
          width: '80px',
          height: '4px',
          backgroundColor: 'primary.main',
          margin: '16px auto 0',
          borderRadius: '2px'
        }
      }}>
        Mi Perfil
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : usuario ? (
        <Grid container  gap={1} display='flex' justifyContent='space-between'>
          {/* columna 1 */}
          <Grid item xs={12} md={5} >
            <Grid item xs={12} >
              <Paper elevation={3} sx={{ 
                p: 3, 
                borderRadius: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
              }}>
                <Avatar sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: 48, 
                  mb: 3,
                  bgcolor: 'primary.main'
                }}>
                  {getInitials(usuario.nombre)}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {usuario.nombre}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {usuario.email}
                </Typography>
                
                <Button 
                  variant="contained" 
                  startIcon={<Edit />}
                  onClick={() => setOpenModal(true)}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Editar Perfil
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error"
                  fullWidth
                  onClick={() => setOpenDeleteModal(true)}
                >
                  Dar de baja cuenta
                </Button>
              </Paper>
            </Grid>

            {
            user.rol == "CLIENTE" ?
                (
                    <Grid item xs={12}  style={{marginTop: "20px"}}>
                      <MascotaCard 
                        mascota={mascota} 
                      />
                    {/* <ProfileItem>
                      <Pets color="primary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Mascota</Typography>
                        <Typography>{usuario.id_mascota || 'No asignada'}</Typography>
                      </Box>
                    </ProfileItem> */}
                  </Grid>
                ) : null
          }
          </Grid>

          
          {/* columna 2 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                '& svg': { mr: 1 }
              }}>
                <Badge fontSize="small" /> Información Personal
              </Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ProfileItem>
                    <Badge color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">DNI/CUIT</Typography>
                      <Typography>{usuario.dni_cuit || 'No especificado'}</Typography>
                    </Box>
                  </ProfileItem>
                </Grid>
                
                <Grid item xs={12} sm={12}>
                  <ProfileItem>
                    <Phone color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Teléfono</Typography>
                      <Typography>{usuario.telefono || 'No especificado'}</Typography>
                    </Box>
                  </ProfileItem>
                </Grid>
                
                <Grid item xs={12}>
                  <ProfileItem>
                    <Home color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Dirección</Typography>
                      <Typography>{usuario.direccion || 'No especificada'}</Typography>
                    </Box>
                  </ProfileItem>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <ProfileItem>
                    <Email color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography>{usuario.email}</Typography>
                    </Box>
                  </ProfileItem>
                </Grid>
                
                
                <Grid item xs={12} sm={12}>
                  <ProfileItem sx={{ 
                    cursor: 'pointer',
                    position: 'relative'
                  }}>
                    <Lock color="primary" sx={{ mr: 2 }} />
                    <Box flexGrow={1}>
                      <Typography variant="caption" color="text.secondary">Contraseña</Typography>
                      <Typography>{mostrarContrasenaOculta(usuario.contrasena)}</Typography>
                    </Box>
                    <IconButton
                      onClick={toggleMostrarContrasena}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{ position: 'absolute', right: 15 }}
                    >
                      {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </ProfileItem>
                </Grid>
                
              </Grid>
            </Paper>
          </Grid>

          
        </Grid>
      ) : (
        <Typography align="center" sx={{ mt: 4 }}>No se encontraron datos del usuario</Typography>
      )}


            

      <Grid
      sx ={{
        marginTop: '20px'
      }}
      >

        {user.rol == "CLIENTE" ?
          (
          <SolicitudesEnviadas 
            solicitudes={solicitudes} 
            loading={loadingSolicitudes}
            onDeleteSolicitud={handleDeleteSolicitud}
          />
          ) : (
            <ServiciosActivos serviciosActivos={user.id_servicio}/>
          )
        }

      </Grid>


      <Snackbar
        open={deleteSuccess}
        autoHideDuration={2000}
        message="Cuenta eliminada correctamente"
      />
      {/* Modal de confirmación para eliminar cuenta */}
      <ConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar eliminación de cuenta"
        confirmText="Eliminar cuenta"
        message="¿Estás seguro que deseas eliminar tu cuenta permanentemente? Esta acción no se puede deshacer."
        warning="Todos tus datos y solicitudes serán eliminados definitivamente."
      />

      {/* Modal de actualización */}
      <EditarPerfilModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        formData={formData}
        onFormChange={handleChange}
        onSave={handleUpdate}
        mostrarContrasena={mostrarContrasena}
        toggleMostrarContrasena={toggleMostrarContrasena}
        rol={user.rol}
      />
      
    </Container>
  );
};

export default MiPerfil;