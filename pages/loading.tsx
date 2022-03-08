import React from 'react';
import { Layout } from '../components';
import { useRouter } from 'next/router';
import { CircularProgress, Container } from '@mui/material';
import { NavTitles } from '../components/NavigationBar';

const LoadingPage = () => {
  const router = useRouter();
  const { category } = router.query;

  React.useEffect(() => {
    router.replace(`/${category || ''}`);
  });

  return (
    <Layout title={`${category || 'home'}` as NavTitles}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: '150px auto',
        }}
      >
        <CircularProgress />
      </Container>
    </Layout>
  );
};

export default LoadingPage;
