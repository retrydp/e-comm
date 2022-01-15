import { Box, Container, Grid, Link, Typography } from '@mui/material';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import NextLink from 'next/link';

type hdLinks = 'Nike' | 'Airmax' | 'Adidas' | 'Vans';

const Bags = () => {
  const hotDealsLinks: hdLinks[] = ['Nike', 'Airmax', 'Adidas', 'Vans'];

  return (
    <Layout title="Bags">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={3}
            container
            rowSpacing={2}
            direction="column"
          >
            {/* side bar menu */}
            <Grid item sx={{ flexGrow: 1 }}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Hot Deals
                </Typography>
                {hotDealsLinks.map((el) => (
                  <NextLink href="/" passHref key={el}>
                    <Link sx={styles.sideLinksText}>
                      <Typography>{el}</Typography>
                      <Typography>30</Typography>
                    </Link>
                  </NextLink>
                ))}
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Prices
                </Typography>
                item bl0o9ck
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Colors
                </Typography>
                item bl0o9ck
              </Box>
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Box sx={styles.sideMenuItem}>item bl0o9ck</Box>
            </Grid>
          </Grid>
          <Grid item xl={8} lg={8} md={8} sm={8}>
            main content
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Bags;
