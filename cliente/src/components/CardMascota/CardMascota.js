import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Grid,
  Button,
  IconButton
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const PetAvatar = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '55%',
  margin: '0 auto',
  backgroundColor: theme.palette.secondary.main,
}));

const MascotaCard = ({ mascota }) => {
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
        {mascota.nombre || 'Mi Mascota'}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3} gap={1} display='flex' justifyContent='space-between'>
        {/* Columna izquierda - Avatar */}
        <Grid item xs={12} md={4} sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
            }}>
          <PetAvatar>
            <PetsIcon sx={{ fontSize: 30 }} />
          </PetAvatar>

        </Grid>

        {/* Columna derecha - Información */}
        <Grid item xs={12} md={7}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Edad
            </Typography>
            <Typography variant="h6">
              {mascota.edad || '3 años'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Descripcion
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {mascota.descripcion || 'Ninguna descripcion registrada'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MascotaCard;