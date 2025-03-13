import React, { useEffect, useState } from "react";
import { obtenerUsuariosClientes } from "../services/administrarUsuario";
import { Container, Typography, Button, Box, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
const AdministrarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await obtenerUsuariosClientes();
        setUsuarios(data); // Guarda los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener usuarios clientes", error);
      }
    }
    fetchUsuarios();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Mis Datos
      </Typography>
      {usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <Grid container spacing={2} key={usuario.id} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" sx={{ color: '#3f51b5' }}>
                    <strong>Nombre y Apellido:</strong> {usuario.nombre}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>Contraseña:</strong> {usuario.contrasena}
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="body1">
                    <strong>DNI:</strong> {usuario.dni}
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
                
                {/* Contenedor de los botones */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                  <Button variant="contained" color="error">
                    Dar de baja mi cuenta
                  </Button>
                  <Button variant="contained" color="primary">
                    Actualizar datos de mi cuenta
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography align="center" variant="h6" color="textSecondary">
          No hay usuarios registrados.
        </Typography>
      )}
    </Container>
  );
};

export default AdministrarUsuario;
