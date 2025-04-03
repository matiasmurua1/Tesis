import React from "react";
import { useAuth } from "../../context/usuarioContexto";
import {
  Typography,
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Link,
  Grid,
  Avatar,
  Menu,
  MenuItem
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Login
} from "@mui/icons-material";
import logo from "../../assets/Home/logo.jpeg";

const drawerWidth = 240;

export default function MenuBar() {
  const { user, logout } = useAuth(); // Asegúrate de que tu contexto provea logout
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Cuidando Patitas
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
              Home
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/servicios" sx={{ textDecoration: "none", color: "inherit" }}>
              Servicios
            </Link>
          </ListItemButton>
        </ListItem>
        
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link href="/acerca-de" sx={{ textDecoration: "none", color: "inherit" }}>
              Acerca de
            </Link>
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link 
                href="/mi-perfil" 
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Mi Perfil
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link 
                href="/login" 
                sx={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ 
          paddingX: { xs: "0px", sm: "10px", md: "150px", lg: "10%" },
          backgroundColor: 'primary.main'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Grid sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              width={35}
              height={35}
              style={{ marginRight: 10, borderRadius: '50%' }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Cuidando Patitas
            </Typography>
          </Grid>
          
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
            <Button color="inherit" href="/" component={Link}>
              Inicio
            </Button>
            <Button color="inherit" href="/servicios" component={Link}>
              Servicios
            </Button>
            <Button color="inherit" href="/acerca-de" component={Link}>
              Acerca de
            </Button>
            
            {user ? (
              <>
                <Button color="inherit" href="/mi-perfil" component={Link}>
                  Mi Perfil
                </Button>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {/* <MenuItem onClick={handleMenuClose}>Perfil</MenuItem> */}
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp sx={{ mr: 1 }} /> Cerrar Sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Login />}
                href="/login"
                component={Link}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar /> {/* Esto añade espacio para el AppBar */}
    </Box>
  );
}