import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({abierto, abrirModal, handler, title, children, confirmarBtn = true}) {
    const cerrarModal = () => {
        title === "Alta de Turno" ? abrirModal(true) : abrirModal(false)
    };
    const confirmacionTurno = () => {
        cerrarModal()
        handler()
    }

  return (
    <div>
      <Modal
        open={abierto}
        onClose={cerrarModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container justifyContent="flex" >
                <Grid size={12} display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                    <Typography variant="h6">{title}</Typography>
                    <IconButton onClick={cerrarModal} style={{marginBottom: '10px'}}>X</IconButton>
                </Grid>
                {children}
                <Grid size={12} display="flex" justifyContent="center" marginTop={3}>
                  {  confirmarBtn ?
                    (
                    <Button onClick={confirmacionTurno}>Confirmar</Button>
                    ) : null
                  }
                </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}