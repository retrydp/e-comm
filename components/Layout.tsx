import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Footer, Header, NavigationBar } from '.';
import styles from '../utils/styles';

interface LayoutProps {
  description?: string;
  title?: 'home' | 'bags' | 'sneakers' | 'belts' | 'contacts';
  customTitle?: string;
  children?: React.ReactNode;
}

const theme = createTheme({
  components: {
    //jumping scrollbar fix
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          marginLeft: 'calc(100vw - 100%)',
          ['@media (max-width:960px)']: {
            marginLeft: 'calc(100vw - 100%)',
          },
        },
      },
    },
  },
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

const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  description,
  customTitle,
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          {description && <meta name="description" content={description} />}
          <title>{customTitle || title?.toUpperCase() || 'E-comm'}</title>
        </Head>
        <Box sx={styles.layoutWrapper}>
          <Container maxWidth="lg">
            <Header />
            <NavigationBar currentTab={title || 'home'} />
          </Container>
          {children}
          <Box sx={styles.grow}></Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Layout;
