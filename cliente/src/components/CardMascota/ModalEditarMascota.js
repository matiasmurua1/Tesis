import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Avatar, Box, IconButton
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { enviarImagenes } from '../../services/imagenes';

const ModalEditarMascota = ({ mascotaData, open, onClose, onGuardar, usuario }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    descripcion: '',
    imagen: null,
    imagenPreview: null,
    imagen_id: null,
    usuario: usuario?.id || null
  });

  const [imagenActualizada, setImagenActualizada] = useState(false);

  const [errors, setErrors] = useState({
    nombre: false,
    edad: false,
    descripcion: false,
    imagen: false
  });

  useEffect(() => {
    setFormData({
      nombre: mascotaData.nombre || '',
      edad: mascotaData.edad || '',
      descripcion: mascotaData.descripcion || '',
      imagen: null,
      imagenPreview: mascotaData.imagen_path ? `http://localhost:4000${mascotaData.imagen_path}` : null,
      imagen_id: mascotaData.imagen || mascotaData.imagen_id || null,
      usuario: usuario?.id || null
    });
    setImagenActualizada(false); // al abrir, por defecto no se modificó
  }, [mascotaData, usuario]);

  const validarCampos = () => {
    const nuevosErrores = {
      nombre: !formData.nombre.trim(),
      edad: !formData.edad || isNaN(formData.edad),
      descripcion: !formData.descripcion.trim(),
      imagen: !formData.imagen_id && !imagenActualizada
    };

    setErrors(nuevosErrores);
    return !Object.values(nuevosErrores).some(Boolean);
  };

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
        setImagenActualizada(true);
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
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleGuardar = async () => {
    if (!validarCampos()) return;

    let idImagen = formData.imagen_id;

    if (imagenActualizada && formData.imagen) {
      idImagen = await fetchImagenes();
      if (!idImagen) return; // no continuar si falló subir la imagen
    }

    const mascotaFinal = {
      id: mascotaData.id, // necesario si vas a hacer PUT por ID
      nombre: formData.nombre,
      edad: formData.edad,
      descripcion: formData.descripcion,
      imagen: idImagen,
      id_usuario: formData.usuario
    };

    onGuardar(mascotaFinal);
    onClose();
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
          {errors.imagen && (
            <Box sx={{ color: 'red', fontSize: '0.75rem' }}>
              La imagen es obligatoria
            </Box>
          )}
        </Box>

        <TextField
          margin="normal"
          fullWidth
          name="nombre"
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          helperText={errors.nombre ? "El nombre es obligatorio" : ""}
        />

        <TextField
          margin="normal"
          fullWidth
          name="edad"
          label="Edad"
          type="number"
          value={formData.edad}
          onChange={handleChange}
          error={errors.edad}
          helperText={errors.edad ? "Edad obligatoria y numérica" : ""}
        />

        <TextField
          margin="normal"
          fullWidth
          name="descripcion"
          label="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          error={errors.descripcion}
          helperText={errors.descripcion ? "La descripción es obligatoria" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEditarMascota;
