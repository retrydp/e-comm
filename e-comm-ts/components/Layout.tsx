import { Container, CssBaseline } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Header, NavigationBar } from '.';

interface LayoutProps {
  description?: string;
  title?: 'Home' | 'Bags' | 'Sneakers' | 'Belts' | 'Contacts';
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children, description }) => {
  return (
    <>
      <CssBaseline />
      <Head>
        {description && <meta name="description" content={description} />}
        <title>{title || 'E-Comm'}</title>
      </Head>
      <Container maxWidth="lg">
        <Header />
        <NavigationBar currentTab={title || 'Home'} />
      </Container>
      {children}
    </>
  );
};

export default Layout;
