import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Paper,
  CircularProgress,
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
  

  const fetchServicios = async () => {
      try {
          setLoading(true);
          const data = await obtenerServicios();
          setServicios(data || []);
          setLoading(false);
      } catch (error) {
          setLoading(false);
      } 
  };

  useEffect(() => {
      fetchServicios();
  }, []);


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
                    checked={serviciosActivos == servicio.id ? true : false}
                    color="primary"
                    disabled={serviciosActivos == servicio.id ? false : true}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {servicio.nombre}
                </Typography>
              </ServicioItem>
            ))}
          </Box>
        </>
      )}
    </ServiciosContainer>
  );
};

export default ServiciosActivos;