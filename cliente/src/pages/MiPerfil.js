import React, { useEffect, useState } from "react";
import { obtenerUsuarioClientePorID, modificarUsuarioClientePorID} from "../services/administrarUsuario";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  IconButton,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/usuarioContexto";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const MiPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const { user } = useAuth();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    dni_cuit: "",
    contrasena: "",
  });

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
        contrasena: usuario.contrasena || "",
      });
    }
  }, [usuario]);


  const fetchUsuario = async () => {
    if (!user || !user.id) {
      console.error("No hay un usuario autenticado.");
      return;
    }

    try {
      const data = await obtenerUsuarioClientePorID(user.id);
      setUsuario(data[0] || {});
    } catch (error) {
      console.error("Error al obtener el usuario cliente:", error);
    }
  }

  useEffect(() => {
    fetchUsuario();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    console.log("Datos actualizados:", formData);
    await modificarUsuarioClientePorID(user.id, formData);
    setOpenModal(false);
    fetchUsuario();
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
        Mis Datos
      </Typography>

      {usuario ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
          <Paper
              elevation={3}
              sx={{ padding: 3, borderRadius: 2, backgroundColor: "#f5f5f5" }}
            >
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6" sx={{ color: "#3f51b5" }}>
                  <strong>Nombre y Apellido:</strong> {usuario.nombre}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={toggleMostrarContrasena}
              >
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  <strong>Contraseña:</strong> {
                usuario.contrasena}
                </Typography>
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMostrarContrasena();
                  }}
                >
                  {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>DNI:</strong> {usuario.dni_cuit}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Teléfono:</strong> {usuario.telefono}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Dirección:</strong> {usuario.direccion}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>ID Mascota:</strong> {usuario.id_mascota}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Email:</strong> {usuario.email}
                </Typography>
              </Box>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ marginTop: 2 }}
              >
                <Button variant="contained" color="error">
                  Dar de baja mi cuenta
                </Button>
                <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                  Actualizar datos de mi cuenta
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography align="center" sx={{ marginTop: 4 }}>
          Cargando datos del usuario...
        </Typography>
      )}

      {/* Modal de actualización */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Actualizar Datos</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="normal" label="Nombre y Apellido" name="nombre" value={formData.nombre} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" value={formData.email} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="DNI" name="dni_cuit" value={formData.dni_cuit} onChange={handleChange} />
          <TextField fullWidth margin="normal" type="password" label="Nueva Contraseña" name="contrasena" value={formData.contrasena} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} style={{color: "red"}}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MiPerfil;
