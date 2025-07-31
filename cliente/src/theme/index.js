import { createTheme } from '@mui/material/styles';
import palette from "./palette";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      marginBottom: '20px',
    },
    h6: {
      lineHeight: 1.6,
    },
  },
  palette,
});

export default theme;
