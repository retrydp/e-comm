import React from 'react';import { Layout } from '../components';
import { useRouter } from 'next/router';
import { CircularProgress, Container, Grid, Skeleton } from '@mui/material';
import { NavTitles } from '../components/NavigationBar';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../utils/styles';

const LoadingPage = () => {
  const router = useRouter();
  const { category } = router.query;
  const md = useMediaQuery('(min-width:900px)');

  React.useEffect(() => {
    router.replace(`/${category || ''}`);
  });

  return (
    <Layout title={`${category || 'home'}` as NavTitles}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            container
            rowSpacing={2}
            direction="column"
            sx={{ mb: 4 }}
          >
            {md && (
              <Grid item>
                <Skeleton
                  variant="rectangular"
                  height={390}
                  sx={{ maxWidth: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            item
            sx={{ ...styles.grow, ...styles.goodsWrapper }}
            xl={9}
            lg={9}
            md={9}
          >
            <Skeleton
              variant="rectangular"
              height={68}
              sx={{ maxWidth: '100%', mb: '15px' }}
            />
            <Grid container spacing={3} sx={{ padding: '15px 0' }}>
              {Array.from({ length: 9 }).map((_, idx) => (
                <Grid item lg={4} md={4} sm={4} xs={12} key={idx}>
                  <Skeleton variant="rectangular" height={450} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoadingPage;
