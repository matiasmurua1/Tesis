import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Box,
  IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import {enviarImagenes} from '../../services/imagenes'

const ModalEditarMascota = ({ open, onClose, onGuardar, usuario }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    imagen: null,
    imagenPreview: null,
    usuario: usuario?.id || null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagen' && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagen: file,
          imagenPreview: reader.result
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  
  const fetchImagenes = async () => {
    const form = new FormData();
    form.append("path", formData.imagen); 

    try {
      const data = await enviarImagenes(form);
      return data.id;
    } catch (error) {
      console.error("Error al obtener las solicitudes del cliente:", error);
    } 
  };


  const handleGuardar = async () => {
    
    const idImagen = await fetchImagenes()
    formData.imagen = idImagen
    formData.imagenPreview = formData.imagenPreview ? null : null;

    // Aquí puedes subir la imagen si lo necesitas y luego pasar el formData
    onGuardar(formData);
    onClose(); // cerrar el modal luego de guardar
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Mascota</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={formData.imagenPreview}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input
            accept="image/*"
            id="imagen"
            name="imagen"
            type="file"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
          <label htmlFor="imagen">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <TextField
          margin="normal"
          fullWidth
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          name="edad"
          label="Edad"
          type="number"
          value={formData.edad}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarMascota;
