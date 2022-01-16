import { Box, Container, Grid, Link, Slider, Typography } from '@mui/material';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import NextLink from 'next/link';

type hdLinks = 'Nike' | 'Airmax' | 'Adidas' | 'Vans';

const Bags = () => {
  const hotDealsLinks: hdLinks[] = ['Nike', 'Airmax', 'Adidas', 'Vans'];
  const [sliderValue, setSliderValue] = React.useState<number[]>([0, 331]);

  const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  const sliderValueText = (value: number) => {
    return `$${value}`;
  };

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
            <Grid item sx={styles.grow}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Brand
                </Typography>
                {hotDealsLinks.map((el) => (
                  <NextLink href="/" passHref key={el}>
                    <Link sx={styles.sideLinksText}>
                      <Typography>{el}</Typography>
                      <Typography>TBA</Typography>
                    </Link>
                  </NextLink>
                ))}
              </Box>
            </Grid>
            <Grid item sx={styles.grow}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Prices
                </Typography>
                <Typography>
                  Ranger: $ {sliderValue[0]} - $ {sliderValue[1]}
                </Typography>
                <Box sx={{ width: '100%' }}>
                  <Slider
                    min={0}
                    max={331}
                    step={10}
                    getAriaLabel={() => 'Price range'}
                    value={sliderValue}
                    onChange={sliderHandleChange}
                    //TODO API request according to folowing methods to prevent unnecessary calls
                    onMouseUp={(e) => console.log(sliderValue, e.type)}
                    onTouchEnd={(e) => console.log(sliderValue, e.type)}
                    valueLabelDisplay="off"
                    getAriaValueText={sliderValueText}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sx={styles.grow}>
              <Box sx={styles.sideMenuItem}>
                <Typography variant="h4" sx={{ mb: '10px' }}>
                  Colors
                </Typography>
                item bl0o9ck
              </Box>
            </Grid>
            <Grid item sx={styles.grow}>
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
