import React from 'react';
import { Layout, ModulePlaceholder } from '../components';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import { NavTitles } from '../components/NavigationBar';
import { useSharedContext } from '../context/SharedContext';
import styles from '../utils/styles';

const LoadingPage: React.FC = () => {
  const { smMin, mdMin } = useSharedContext();
  const router = useRouter();
  const { category } = router.query;

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
            {mdMin && (
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
            {smMin && (
              <Box sx={{ mb: '20px' }}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{
                    maxWidth: '100%',
                    borderRadius: '30px',
                  }}
                />
              </Box>
            )}
            <Skeleton
              variant="rectangular"
              height={68}
              sx={{ maxWidth: '100%', mb: '15px' }}
            />
            <ModulePlaceholder displayCount={9} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoadingPage;
