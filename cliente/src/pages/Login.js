import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import imageBG from "../assets/Home/home3.jpg";
import Link from "@mui/material/Link";
import { useState } from "react";
import { postLogin } from "../services/login";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "../context/usuarioContexto";

export default function Login() {
  const { user, login } = useAuth();
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      let response = await postLogin(usuario, contrasena);
      //let data = await response.json();
      if (response.status === 200) {
        // Si el login es exitoso, redirige al usuario
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Mensaje de error capturado:", error.message); // 🔍 Verifica qué error llega
      setError(error.message); // Ahora Snackbar mostrará este mensaje
    }
  };

  const registroHandler = () => {
    navigate("/signup");
  }

  return (
    <Grid
      container
      style={{
        backgroundImage: `url('${imageBG}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginButtom: "100px",
      }}
      spacing={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        sx={{
          height: "440px",
          width: "50%",
          border: " solid #474963 1px",
          borderRadius: "10px",
          margin: "100px",
          boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffffde",
        }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={12}>
          <Typography variant="h3" gutterBottom>
            Bienvenido!
          </Typography>
        </Grid>
        <Grid
          xs={12}
          sm={8}
          md={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            size="small"
            variant="outlined"
            label="Usuario"
            name="usuario"
            required={true}
            onChange={(e) => setUsuario(e.target.value)}
          ></TextField>
          <TextField
            size="small"
            variant="outlined"
            type="password"
            label="Contrasena"
            name="contrasena"
            required={true}
            onChange={(e) => setContrasena(e.target.value)}
          ></TextField>
          <Grid display="flex" justifyContent="center" sx={{ margin: " 10px" }}>
            <Button
              onClick={() => {
                loginHandler();
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            flexDirection="column"
            xs={12}
          >
            <Link onClick={()=> registroHandler()}>¿ Olvidaste tu contraseña ?</Link>
            <br />
            <Link onClick={()=> registroHandler()}>¿Todavía no tenés usuario?</Link>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={error !== null}
        autoHideDuration={3000}
        message={error} // Aquí se usa el mensaje del backend
        onClose={() => setError(null)}
      />
    </Grid>
  );
}
