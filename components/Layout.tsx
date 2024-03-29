import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Footer, Header, NavigationBar, BreadcrumbsBar } from './';
import styles from '../utils/styles';
import theme from '../config/theme';
import { NavTitles } from '../utils/types';

interface LayoutProps {
  description?: string;
  title?: NavTitles;
  customTitle?: string;
  children?: React.ReactNode;
}

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
          <Header />
          <Container maxWidth="lg" sx={styles.mt64}>
            <NavigationBar currentTab={title || 'home'} />
            {title !== 'home' ? <BreadcrumbsBar /> : null}
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
