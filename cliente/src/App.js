

import ConfiguracionRuta from "./navegacion/ConfiguracionRuta";
import MenuBar from "./components/MenuBar/MenuBar";
import { ThemeProvider } from '@mui/material';
import theme from "./theme/index"
import Footer from "./components/Footer/Footer";

import { AuthProvider } from "./context/usuarioContexto";

function App() {
  return (
    <div className="App" >
      <AuthProvider> 
        <ThemeProvider theme={theme}>
          <MenuBar/>
          <ConfiguracionRuta/>
          <Footer/>
        </ThemeProvider>
      </AuthProvider> 
    </div>
  );
}

export default App;
