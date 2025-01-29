import React from "react";

import Typography from '@mui/material/Typography';
//https://mui.com/material-ui/react-typography/

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import logo from '../../assets/Home/logo.jpeg'
import Grid from '@mui/material/Grid2';

const drawerWidth = 240;

export default function MenuBar() {
  // Creamos un estado para el modo Mobile 
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Cuidando Patitas
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href="/" sx={{textDecorationLine: 'none', color: 'white'}}>
                  Home
              </Link> 
            {/* <ListItemText primary={item} /> */}
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/servicios" sx={{textDecorationLine: 'none', color: 'black'}}>
              Servicios
            </Link>
          </ListItemButton>
        </ListItem> 
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <Link href="/acerca-de" sx={{textDecorationLine: 'none', color: 'black'}}>
              Acerca de
            </Link> 
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{ paddingX: { xs: '0px', sm: '10px', md: '150px', lg: '10%' } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            
            sx={{ mr: 2, display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
          <Grid sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Grid display='flex' alignItems="center">
              <img
                src={logo}
                alt='logo'
                loading="lazy"
                width={35}
                height={35}
                style={{marginRight:10}}
              />
              <Typography variant="h6" component="div">
                Cuidando Patitas
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
              <Button sx={{ color: '#fff' }}>
                <Link href="/" sx={{textDecorationLine: 'none', color: 'white'}}>
                  Home
                </Link> 
              </Button>
              <Button sx={{ color: '#fff' }}>
              <Link href="/servicios" sx={{textDecorationLine: 'none', color: 'white'}}>
                Servicios
                </Link> 
              </Button>
              <Button sx={{ color: '#fff' }}>
              <Link href="/acerca-de" sx={{textDecorationLine: 'none', color: 'white'}}>
                Acerca de
                </Link> 
              </Button>
            <Button variant="contained" color="secondary" sx={{ marginLeft: '10px'}}>
              <Link href="/login" sx={{textDecorationLine: 'none', color: 'black'}}>
                Login
              </Link> 
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
        <Toolbar />
    </Box>
  );
}

