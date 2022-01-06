import { Container, CssBaseline } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { Header } from '.';

interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title || 'sample'}</title>
      </Head>
      <Header />
    </>
  );
};

export default Layout;
