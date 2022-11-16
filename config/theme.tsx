import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#BCDDFE',
      main: '#40BFFF',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    h2: {
      fontFamily: 'Poppins',
      fontSize: '64px',
      fontWeight: '700',
      color: 'white',
    },
    h3: {
      fontFamily: 'Poppins',
      fontSize: '35px',
      fontWeight: '600',
      color: '#262626',
    },
    h4: {
      fontFamily: 'Poppins',
      fontSize: '18px',
      fontWeight: '500',
      color: '#262626',
      textTransform: 'none',
    },
    h5: {
      fontFamily: 'Poppins',
      fontSize: '10px',
      fontWeight: '500',
      color: '#262626',
      textTransform: 'none',
    },
  },
});

export default theme;
