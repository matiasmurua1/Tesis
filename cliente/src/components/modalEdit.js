import React, { useEffect, useState } from "react";
import { obtenerUsuarioClientePorID, actualizarUsuarioCliente } from "../services/administrarUsuario";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/usuarioContexto";

const ModalEdit = () => {
  const [usuario, setUsuario] = useState(null);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchUsuario() {
      if (!user || !user.id) {
        console.error("No hay un usuario autenticado.");
        return;
      }
      try {
        const data = await obtenerUsuarioClientePorID(user.id);
        setUsuario(data[0] || {});
        setFormData(data[0] || {});
      } catch (error) {
        console.error("Error al obtener el usuario cliente:", error);
      }
    }
    fetchUsuario();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await actualizarUsuarioCliente(user.id, formData);
      setUsuario(formData);
      setModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el usuario cliente:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
        Editar Perfil
      </Typography>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "white", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Editar Perfil</Typography>
          <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre || ""} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
          <TextField fullWidth label="Email" name="email" value={formData.email || ""} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>Guardar Cambios</Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default ModalEdit;
