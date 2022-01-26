import {
  Box,
  Button,
  Container,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import { SelectChangeEvent } from '@mui/material/Select';
import { SliderSelector } from '../components/SliderSelector';

type hdLinks = 'Nike' | 'Airmax' | 'Adidas' | 'Vans';

const Bags: React.FC = () => {
  const hotDealsLinks: hdLinks[] = ['Nike', 'Airmax', 'Adidas', 'Vans'];

  const [sort, setSort] = React.useState<string>('new');
  const [drawerIsVisible, setDrawerIsVisible] = React.useState<boolean>(false);
  const md = useMediaQuery('(max-width:900px)');

  const sortHandler = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  const drawerVisibleHandler = () => {
    setDrawerIsVisible(!drawerIsVisible);
  };
  const getSliderValues = (values: number[]) => {
    console.log(values);
  };

  return (
    <Layout title="Bags">
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        1dsadadsa
      </Drawer>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {md ? (
            <Grid
              item
              container
              rowSpacing={2}
              lg={12}
              sx={{ width: '100%', alignItems: 'center' }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={drawerVisibleHandler}
                >
                  <FilterAltRoundedIcon sx={{ mr: '10px' }} />
                  <Typography sx={styles.filterButton}>Filters</Typography>
                </Button>
              </Grid>
              <Box sx={styles.grow}></Box>
              <Grid item>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel id="sortSelect-label">Sort by</InputLabel>
                  <Select
                    labelId="sortSelect-label"
                    id="sortSelect"
                    value={sort}
                    onChange={sortHandler}
                    inputProps={{ 'aria-label': 'Sorting selection' }}
                    label="Sort by"
                  >
                    <MenuItem value={'popular'}>Popular</MenuItem>
                    <MenuItem value={'new'}>New</MenuItem>
                    <MenuItem value={'asc'}>Price ascending</MenuItem>
                    <MenuItem value={'desc'}>Price descending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ) : (
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
                  <Grid item>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="sortSelect-label">Sort by</InputLabel>
                      <Select
                        labelId="sortSelect-label"
                        id="sortSelect"
                        value={sort}
                        onChange={sortHandler}
                        inputProps={{ 'aria-label': 'Sorting selection' }}
                        label="Sort by"
                      >
                        <MenuItem value={'popular'}>Popular</MenuItem>
                        <MenuItem value={'new'}>New</MenuItem>
                        <MenuItem value={'asc'}>Price ascending</MenuItem>
                        <MenuItem value={'desc'}>Price descending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Prices
                  </Typography>
                  <SliderSelector getSliderValues={getSliderValues} />
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Colors
                  </Typography>
                  <Typography>Colors selection</Typography>
                </Box>
              </Grid>
              <Grid item>
                <Button variant="contained">
                  <Typography sx={styles.filterButton}>
                    Apply filters
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid item>main content {sort}</Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Bags;
