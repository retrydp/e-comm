import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import { Header } from '../components';
import { Container, CssBaseline } from '@mui/material';
//TODO CssBaseline to layout
const Index: React.FC = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
      </Container>
    </>
  );
};

export default Index;
