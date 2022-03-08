import React from 'react';
import { Layout } from '../components';
import { useRouter } from 'next/router';
import { CircularProgress, Container } from '@mui/material';

const LoadingPage = () => {
  const router = useRouter();
  const { category } = router.query;

  React.useEffect(() => {
    router.replace(`/${category || ''}`);
  });

  return (
    <Layout title="bags">
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}
      >
        <CircularProgress />
      </Container>
    </Layout>
  );
};

export default LoadingPage;
