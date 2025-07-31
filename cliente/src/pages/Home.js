import React from "react";
import { useAuth } from "../context/usuarioContexto";
import Grid from '@mui/material/Grid';
import {
  Typography,
  Link
} from '@mui/material';
import MaterialCard from '../components/Card/Card';
import imageBG from '../assets/Home/home2.jpg';
import { mockServices } from '../utils/mockServices';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Crear un tema personalizado

const theme = createTheme({
    palette: {
      primary: {
        main: '#4CAF50', // Verde naturaleza
      },
      secondary: {
        main: '#FF9800', // Naranja acogedor
      },
    },
   
  });

export default function Home() {

  const { user } = useAuth(); 

  return (
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
          minHeight: '100vh',
          padding: '40px 0',
        }}
      >
        <Container maxWidth="lg">
          {/* Sección Hero */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={8}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                gap: 2
              }}>
                <Typography variant="h2" gutterBottom>
                  <PetsIcon sx={{ fontSize: '2.5rem', verticalAlign: 'middle', mr: 1 }} />
                  Cuidando Patitas
                </Typography>
                
                <Typography variant="h6" color="text.secondary">
                  En <strong>Cuidando Patitas</strong> nos dedicamos a ofrecer un servicio integral para el bienestar de tus queridas mascotas.
                </Typography>
                
                <Typography variant="h6" color="text.secondary">
                  Sabemos que cada animal es único, por eso adaptamos nuestros servicios a sus necesidades específicas.
                </Typography>
                
                <Typography variant="h6" color="text.secondary">
                  Nuestra pasión por los animales nos impulsa a brindar un servicio excepcional.
                </Typography>
                
                <Typography variant="h5" sx={{ mt: 3, color: 'primary.main' }}>
                  Tu mascota merece lo mejor y nosotros estamos aquí para hacerlo posible.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<PetsIcon />}
                    sx={{ 
                      borderRadius: '50px',
                      padding: '12px 24px',
                      fontWeight: 'bold'
                    }}
                  >
                    ¡Contáctanos!
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box
                component="img"
                src={imageBG}
                alt="Mascotas felices"
                sx={{
                  width: '95%',
                  height: '100%',
                  borderRadius: '16px',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                  margin: '10px'
                }}
              />
            </Grid>
          </Grid>
          
          {/* Sección Servicios */}
          <Box sx={{ my: 10 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Nuestros Servicios
            </Typography>
            
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
              Descubre todo lo que podemos ofrecer para el bienestar de tu mascota
            </Typography>
            
            <Grid container spacing={4}>
              {mockServices.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <MaterialCard data={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
          
          {/* Llamado a la acción */}
          <Box sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            my: 8,
            boxShadow: 3,
          }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              ¿Listo para consentir a tu mascota?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Agenda una cita hoy mismo y dale a tu compañero peludo el cuidado que se merece
            </Typography>
              {
                user?.rol == "CLIENTE" ?
                  (
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      startIcon={<PetsIcon />}
                      sx={{ 
                        borderRadius: '50px',
                        padding: '12px 36px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}
                    >
                      <Link href="/servicios" sx={{ textDecoration: "none", color: "inherit" }}>
                        Reservar Ahora
                      </Link>
                        
                    </Button>
                  ) : null 
              }
          </Box>
        </Container>
      </Box>
  );
}