import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import { Visibility, VisibilityOff, Edit } from "@mui/icons-material";
import { obtenerServicios } from '../../services/servicios';


const EditarPerfilModal = ({
  open,
  onClose,
  formData,
  onFormChange,
  onSave,
  mostrarContrasena,
  toggleMostrarContrasena
}) => {
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Edit sx={{ mr: 1 }} /> Editar Perfil
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Nombre y Apellido" 
              name="nombre" 
              value={formData.nombre} 
              onChange={onFormChange} 
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Email" 
              name="email" 
              value={formData.email} 
              onChange={onFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Dirección" 
              name="direccion" 
              value={formData.direccion} 
              onChange={onFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="Teléfono" 
              name="telefono" 
              value={formData.telefono} 
              onChange={onFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              margin="normal" 
              label="DNI/CUIT" 
              name="dni_cuit" 
              value={formData.dni_cuit} 
              onChange={onFormChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              margin="normal" 
              type={mostrarContrasena ? "text" : "password"} 
              label="Nueva Contraseña" 
              name="contrasena" 
              value={formData.contrasena} 
              onChange={onFormChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={toggleMostrarContrasena}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {mostrarContrasena ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
           
            <Select
              fullWidth 
              margin="normal" 
              type="text" 
              label="Servicio" 
              name="id_servicio" 
              value={formData.id_servicio} 
              onChange={onFormChange}
              variant="outlined"
            > 
            {servicios.map((servicio, index) => (
                <MenuItem value={servicio.id} key={servicio.id}>
                  {servicio.nombre}
                </MenuItem>
            ))
            }
            </Select>
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          sx={{ mr: 2 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          color="primary"
          startIcon={<Edit />}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarPerfilModal;