import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Grid2 as Grid
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { obtenerServicios } from '../services/servicios';
import {crearUsuarioCliente} from '../services/administrarUsuario'; 
import {enviarImagenes} from '../services/imagenes'
import imageBG from "../assets/Home/negrito.jpeg";


const Registro = () => {
  const [servicios, setServicios] = useState([])
  const [infoMensaje, setInfoMensaje] = useState(null);
  const [openMsg, setOpenMsg] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    contrasena: '',
    confirmarContrasena: '',
    dni_cuit: '',
    direccion: '',
    telefono: '',
    email: '',
    esEmpleador: false,
    id_servicio: '',
    imagen: null, 
    id_mascota: null,
  });

  const [errors, setErrors] = useState({
    nombre: false,
    contrasena: false,
    confirmarContrasena: false,
    dni_cuit: false,
    direccion: false,
    telefono: false,
    email: false,
    id_servicio: false
  });


  const fetchServicios = async () => {
    try {
      const data = await obtenerServicios();
      setServicios(data || []);
    } catch (error) {
      console.error("Error al obtener las solicitudes del cliente:", error);
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

  
  useEffect(() => {
    fetchServicios();
  }, []);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'file' ? files[0] : value
    }));

    // Limpiar errores al cambiar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleRegistro = async (idImagen) => {
    try {
      
      formData.imagen = idImagen
      formData.imagenPreview = formData.imagenPreview ? null : null;


      const respuesta = await crearUsuarioCliente(formData);
      console.log("respuesta", respuesta)
      setInfoMensaje(respuesta.mensaje);
      setOpenMsg(true)
    } catch (error) {
      console.log("Mensaje de error capturado:", error.message);
      setInfoMensaje(error.message);
      setOpenMsg(true)
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    let newErrors = {
      nombre: !formData.nombre,
      contrasena: !formData.contrasena || formData.contrasena.length < 6,
      confirmarContrasena: formData.contrasena !== formData.confirmarContrasena,
      dni_cuit: !formData.dni_cuit,
      direccion: !formData.direccion,
      telefono: !formData.telefono,
      email: !formData.email || !/^\S+@\S+\.\S+$/.test(formData.email),
      id_servicio: formData.esEmpleador && !formData.id_servicio
    };

    setErrors(newErrors);

    // validamos que si es cliente no se envie el id servicio
    if(!formData.esEmpleador){
      formData.id_servicio = null;
    }

    
    // Si no hay errores, proceder con el registro
    if (!Object.values(newErrors).some(error => error)) {
      const idImagen = await fetchImagenes()
      // Aquí iría la lógica para enviar los datos al backend
      handleRegistro(idImagen); // Llama a la función de registro


      // Resetear el formulario
        // setFormData({
        //     nombre: '', 
        //     contrasena: '',
        //     confirmarContrasena: '',
        //     dni_cuit: '',
        //     direccion: '',
        //     telefono: '',
        //     email: '',
        //     esEmpleador: false,
        //     id_servicio: '',
        //     imagen: null
        // });

      
    }
  };

  const handleNavigate = () => {
    if(infoMensaje === "Usuario cliente creado exitosamente"){
      navigate("/login")
    }
  }

  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          imagenPreview: event.target.result,
          imagen: e.target.files[0]
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Grid
      container
      style={{
        paddingButtom: "100px",
        backgroundImage: `url('${imageBG}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    <Grid sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 4, marginBottom: '100px', 
          border: " solid #474963 1px",
          borderRadius: "10px",
          margin: "100px",
          boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffffde"}} >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Registro de Usuario
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Campo de imagen de perfil */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={formData.imagenPreview || ''}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <input
            accept="image/*"
            id="imagen"
            name="imagen"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImagePreview}
          />
          <label htmlFor="imagen">
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Subir Foto
            </Button>
          </label>
        </Box>

        {/* Nombre */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="nombre"
          label="Nombre completo"
          name="nombre"
          autoComplete="name"
          autoFocus
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          helperText={errors.nombre ? 'Este campo es requerido' : ''}
        />

        {/* Email */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? 'Ingrese un email válido' : ''}
        />

        {/* Contraseña */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="contrasena"
          label="Contraseña"
          type="password"
          id="contrasena"
          autoComplete="new-contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          error={errors.contrasena}
          helperText={errors.contrasena ? 'La contraseña debe tener al menos 6 caracteres' : ''}
        />

        {/* Confirmación de contraseña */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmarContrasena"
          label="Confirmar contraseña"
          type="password"
          id="confirmarContrasena"
          value={formData.confirmarContrasena}
          onChange={handleChange}
          error={errors.confirmarContrasena}
          helperText={errors.confirmarContrasena ? 'Las contraseñas no coinciden' : ''}
        />

        {/* DNI/CUIT */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="dni_cuit"
          label="DNI/CUIT"
          id="dni_cuit"
          value={formData.dni_cuit}
          onChange={handleChange}
          error={errors.dni_cuit}
          helperText={errors.dni_cuit ? 'Este campo es requerido' : ''}
          InputProps={{
            startAdornment: <InputAdornment position="start">ARG</InputAdornment>,
          }}
        />

        {/* Dirección */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="direccion"
          label="Dirección"
          id="direccion"
          autoComplete="street-address"
          value={formData.direccion}
          onChange={handleChange}
          error={errors.direccion}
          helperText={errors.direccion ? 'Este campo es requerido' : ''}
        />

        {/* Teléfono */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="telefono"
          label="Teléfono"
          id="telefono"
          autoComplete="tel"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
          helperText={errors.telefono ? 'Este campo es requerido' : ''}
        />

        {/* Checkbox para empleador */}
        <FormControlLabel
          control={
            <Checkbox
              name="esEmpleador"
              checked={formData.esEmpleador}
              onChange={handleChange}
              color="primary"
            />
          }
          label="Soy empleador (ofrezco servicios)"
        />

        {/* Campo de id_servicio (solo para empleadores) */}
        {formData.esEmpleador && (
          <FormControl fullWidth margin="normal" error={errors.id_servicio}>
            <InputLabel id="id_servicio-label">Servicio que brinda</InputLabel>
            <Select
              labelId="id_servicio-label"
              id="id_servicio"
              name="id_servicio"
              value={formData.id_servicio}
              label="Servicio que brinda"
              onChange={handleChange}
            >
              {servicios.map((servicio) => (
                <MenuItem key={servicio.id} value={servicio.id}>
                  {servicio.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.id_servicio && <FormHelperText>Seleccione un id_servicio</FormHelperText>}
          </FormControl>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          size="large"
        >
          Registrarse
        </Button>
     
      </Box>
      <Snackbar
        open={openMsg}
        autoHideDuration={2000}
        message={infoMensaje}
        onClose={handleNavigate}
      />
    </Grid>
    </Grid>
  );
};

export default Registro;