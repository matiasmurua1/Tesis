

import RouterConfig from "./navegation/RouterConfig";
import MenuBar from "./components/MenuBar/MenuBar";
import { ThemeProvider } from '@mui/material';
import theme from "./theme/index"
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
        <MenuBar/>
        <RouterConfig/>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
