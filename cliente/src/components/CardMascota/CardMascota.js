import React, {useState} from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import ModalEditarMascota from "./ModalEditarMascota";
import { useAuth } from "../../context/usuarioContexto";

import {crearMascotaPorIdUsuario, editarMascotaPorId} from '../../services/mascotas'

const PetAvatar = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '55%',
  margin: '0 auto',
  backgroundColor: theme.palette.secondary.main,
}));



const MascotaCard = ({ mascota, onClose}) => {
  const { user} = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleGuardarMascota = async (nuevaMascota) => {
    try {
      let data;
      if (mascota?.id) {
        // Si ya tiene ID, edita
        data = await editarMascotaPorId({ ...nuevaMascota, id: mascota.id });
      } else {
        // Si no tiene ID, crea
        data = await crearMascotaPorIdUsuario(nuevaMascota);
      }

      onClose();
      return data.id;
    } catch (error) {
      console.error("Error al guardar mascota:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: 3, 
      borderRadius: 3,
      mb: 4,
      position: 'relative'
    }}>
      {/* Botón de editar en esquina superior derecha */}
      <IconButton
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          backgroundColor: 'action.hover'
        }}
        aria-label="editar mascota"
        onClick={() => setOpenModal(true)}
      >
        <EditIcon fontSize="small" />
      </IconButton>

      {/* Encabezado con nombre */}
      <Typography 
        variant="h6" 
        gutterBottom 
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mt: 2
        }}
      >
        {mascota?.nombre || 'Mi Mascota'}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3} gap={1} display='flex' justifyContent='space-between'>
        {/* Columna izquierda - Avatar */}
        <Grid item xs={12} md={4} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
            }}>

              <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    fontSize: 48,
                    marginBottom: 24,
                    marginLeft: 10,
                    backgroundColor: mascota?.imagen_path ? "transparent" : "#3f51b5", // primary.main
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden"
                  }}
                >
                  {mascota?.imagen_path ? (
                    <img
                      src={`http://localhost:4000${mascota?.imagen_path}`}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <PetsIcon sx={{ fontSize: 30 }} />
                  )}
                </div>

        </Grid>

        {/* Columna derecha - Información */}
        <Grid item xs={12} md={7}>
          {
            mascota.edad && mascota.descripcion ? <div>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Edad
              </Typography>
              <Typography variant="h6">
                {mascota?.edad}
              </Typography>
            </Box>

              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Descripcion
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  {mascota?.descripcion}
                </Typography>
              </Box>
            </div> : 
              <Typography variant="subtitle1" color="text.secondary">
                 Toque el lapiz para cargar su mascota
              </Typography>
            }
        </Grid>
      </Grid>
      <ModalEditarMascota
        mascotaData={mascota}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onGuardar={handleGuardarMascota}
        usuario={user}
      />
    </Paper>
  );
};

export default MascotaCard;