import { useState } from "react";
import { TextField, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { postRegistrarse } from "../services/registro";
import imageBG from "../assets/Home/home3.jpg";

export default function Signup() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      let response = await postRegistrarse(usuario, email, contrasena);

      if (response.status === 201) {
        navigate("/login"); // Redirige a login después de registrarse
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid
      container
      style={{
        backgroundImage: `url('${imageBG}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        sx={{
          width: "40%",
          border: "solid #474963 1px",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "#ffffffde",
        }}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h3" gutterBottom>
          Crear Cuenta
        </Typography>

        <TextField
          size="small"
          variant="outlined"
          label="Nombre de usuario"
          required
          onChange={(e) => setUsuario(e.target.value)}
        />
        <TextField
          size="small"
          variant="outlined"
          label="Email"
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          size="small"
          variant="outlined"
          type="password"
          label="Contraseña"
          required
          onChange={(e) => setContrasena(e.target.value)}
        />

        <Button
          onClick={handleSignup}
          color="primary"
          variant="contained"
          sx={{ marginTop: "10px" }}
        >
          Registrarse
        </Button>

        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
      </Grid>
    </Grid>
  );
}
