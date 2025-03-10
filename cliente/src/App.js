

import ConfiguracionRuta from "./navegacion/ConfiguracionRuta";
import MenuBar from "./components/MenuBar/MenuBar";
import { ThemeProvider } from '@mui/material';
import theme from "./theme/index"
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <MenuBar/>
        <ConfiguracionRuta/>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
