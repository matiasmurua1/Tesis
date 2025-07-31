// components/ConfirmationModal.js
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  warning,
  details,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "error",
  actions = true
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
      {title}
      {
        !actions ? 
        <Button
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
            >
            X
        </Button> : null
        } 

    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" sx={{ mt: 2 }}>
        {message}
      </DialogContentText>
      {warning && (
        <DialogContentText
          sx={{ mt: 2, fontWeight: "bold", color: "error.main", marginLeft: '5px' }}
        >
          {warning}
        </DialogContentText>
      )}
      {details && (
        <Box
          sx={{ mt: 2,  bgcolor: "background.default", borderRadius: 1 }}
        >
          {details}
        </Box>
      )}
    </DialogContent>
    {
        actions ? 
        <DialogActions sx={{ p: 3 }}>
            <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
                {cancelText}
            </Button>
            <Button
                onClick={onConfirm}
                variant="contained"
                color={confirmColor}
                autoFocus
            >
                {confirmText}
            </Button>
        </DialogActions> 
        : null
    }
    
  </Dialog>
);

export default ConfirmationModal;
