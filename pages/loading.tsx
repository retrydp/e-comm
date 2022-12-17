import React from 'react';
import { Layout, ModulePlaceholder } from '../components';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import { NavTitles } from '../utils/types';
import styles from '../utils/styles';
import { useAppMedia } from '../utils/hooks';

const LoadingPage: React.FC = () => {
  const { smMin, mdMin } = useAppMedia();
  const router = useRouter();
  const { category } = router.query;

  React.useEffect(() => {
    router.replace(`/${category || ''}`);
  });

  return (
    <Layout title={`${(category as NavTitles) || 'home'}`}>
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
            sx={styles.mb4}
          >
            {mdMin && (
              <Grid item>
                <Skeleton
                  variant="rectangular"
                  height={390}
                  sx={styles.fullWidth}
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
              <Box sx={styles.mb20}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={styles.skeletonMin}
                />
              </Box>
            )}
            <Skeleton
              variant="rectangular"
              height={68}
              sx={styles.skeletonInner}
            />
            <ModulePlaceholder displayCount={9} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LoadingPage;
