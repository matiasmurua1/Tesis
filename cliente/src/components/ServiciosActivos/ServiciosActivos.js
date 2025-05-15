import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  CircularProgress,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { obtenerServicios } from '../../services/servicios';


const ServiciosContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  maxWidth: '900px',
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
}));

const ServicioItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ServiciosActivos = ({ serviciosActivos, userId }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [modified, setModified] = useState(false);
  const [initialState, setInitialState] = useState([]);
  

const fetchServicios = async () => {
    try {
        setLoading(true);
        const data = await obtenerServicios();
        setServicios(data || []);
        setLoading(false);
    } catch (error) {
        setError('Error al cargar los servicios');
        setLoading(false);
    } 
    
        
    console.log( "serviciosActivos", serviciosActivos)
    console.log( "setServicios", servicios)
};


useEffect(() => {
    fetchServicios();
}, []);


  // Manejar cambio de checkbox
  const handleToggleServicio = (index) => {
    const updatedServicios = [...servicios];
    updatedServicios[index].activo = !updatedServicios[index].activo;
    setServicios(updatedServicios);
    setModified(true);
  };

  // Guardar cambios
  const guardarCambios = async () => {
    try {
      setLoading(true);
      // Preparar datos para enviar
      const serviciosActualizados = servicios.map(servicio => ({
        id: servicio.id,
        activo: servicio.activo
      }));

      // Llamar al endpoint de modificación
      const response = await fetch('/api/fetchModificarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          servicios: serviciosActualizados
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      setSuccess(true);
      setModified(false);
      // Actualizar estado inicial
      setInitialState(servicios.map(servicio => servicio.activo));
    } catch (err) {
      setError('Error al guardar los cambios');
    } finally {
      setLoading(false);
    }
  };

  // Verificar si hay cambios
  const hasChanges = () => {
    return servicios.some((servicio, index) => 
      servicio.activo !== initialState[index]
    );
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  return (
    <ServiciosContainer elevation={3}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Servicios Activos
      </Typography>
      
      {loading && servicios.length === 0 ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box mb={3} display='flex' gap={4} justifyContent='center' >
            {servicios.map((servicio, index) => (
              <ServicioItem key={servicio.id}>
                <Checkbox
                    // checked={serviciosActivos.includes(servicio.id) }
                    // checked={serviciosActivos == servicio.id ? true : false}
                    onChange={() => handleToggleServicio(index)}
                    color="primary"
                    disabled={loading}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {servicio.nombre}
                    {servicio.id}
                </Typography>
              </ServicioItem>
            ))}
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={guardarCambios}
              disabled={!hasChanges() || loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                padding: '8px 20px',
                fontWeight: 500,
              }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </>
      )}

      {/* Notificaciones */}
      <Snackbar
        open={error !== null || success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {success ? 'Cambios guardados exitosamente!' : error}
        </Alert>
      </Snackbar>
    </ServiciosContainer>
  );
};

export default ServiciosActivos;