import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import imageBG from '../assets/Home/home3.jpg'
import Link from '@mui/material/Link';
import { useState } from 'react';
import { postLogin } from '../services/login';

export default function Login() {
    const [error, setError] = useState(null);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const login = async () => {
        try{
            let response = await postLogin(usuario, contrasena);
            console.log(response)

        }catch(error){
            setError(error.message);
            window.alert(error.message);
        }
        
    }
    return(
        <Grid container 
        style={{ backgroundImage: `url('${imageBG}')`, backgroundRepeat:'no-repeat', backgroundSize: 'cover',marginButtom: '100px'}} spacing={4} display='flex' justifyContent="center" alignItems="center" >
        <Grid container  sx={{ height: '440px', width: '50%', border:' solid #474963 1px', borderRadius:'10px', margin:'100px', boxShadow:'4px 4px 4px 2px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffffde'}} flexDirection='column' justifyContent="center" alignItems="center" >
            <Grid xs={12}>
                <Typography variant="h3" gutterBottom>
                    Bienvenido!
                </Typography>
            </Grid>
            <Grid xs={12} sm={8} md={4} display='flex' flexDirection='column' gap={3}>
                <TextField 
                    size="small"
                    variant="outlined"
                    label="usuario"
                    name="usuario"
                    required={true}
                    onChange={(e) => setUsuario(e.target.value)}
                ></TextField>
                <TextField 
                    size="small"
                    variant="outlined"
                    type="password"
                    label="contrasena"
                    name="contrasena"
                    required={true}
                    onChange={(e) => setContrasena(e.target.value)}
                ></TextField>
                <Grid display='flex' justifyContent='center' sx={{margin:' 10px'}}>
                    <Button onClick={()=>{login()}} color="primary" variant="contained" type="submit">
                        Login
                    </Button>
                </Grid>
                <Grid
                    display='flex' justifyContent='center' flexDirection='column'
                    xs={12}
                    >
                    <Link to={"/signup"} >
                        ¿ Olvidaste tu contraseña ?
                    </Link>
                    <br />
                    <Link to={"/signup"}>
                        ¿Todavía no tenés usuario?
                    </Link>
                </Grid>
            </Grid>
        </Grid>
        </Grid>
    )
}