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

type Brands = 'nike' | 'airmax' | 'adidas' | 'vans' | 'all';
type SortParams = 'popular' | 'new' | 'asc' | 'desc';

interface FilterValues {
  id: SortParams;
  title: string;
}

const Bags: React.FC = () => {
  const hotDealsLinks: Brands[] = ['all', 'nike', 'airmax', 'adidas', 'vans'];
  const filterValues: FilterValues[] = [
    { id: 'popular', title: 'Popular' },
    { id: 'new', title: 'New' },
    { id: 'asc', title: 'Price ascending' },
    { id: 'desc', title: 'Price descending' },
  ];
  const [sort, setSort] = React.useState<SortParams>('new');
  const [brand, setBrand] = React.useState<Brands>('all');
  const [drawerIsVisible, setDrawerIsVisible] = React.useState<boolean>(false);
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 331]);
  const md = useMediaQuery('(max-width:900px)');

  /**
   * Changes current selected sort order option.
   * @param {SelectChangeEvent} event
   */
  const sortHandler = (event: SelectChangeEvent) => {
    setSort(event.target.value as SortParams);
  };

  /**
   * Changes current selected brand option.
   * @param {SelectChangeEvent} event
   */
  const brandHandler = (event: SelectChangeEvent) => {
    setBrand(event.target.value as Brands);
  };

  /**
   * Filter sidebar visibility trigger.
   */
  const drawerVisibleHandler = () => {
    setDrawerIsVisible(!drawerIsVisible);
  };

  /**
   * Obtain values from the slider.
   * @param {number[]} values - values from the slider component as array [min, max]
   */
  const getSliderValues = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <Layout title="Bags">
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        filter menu placeholder
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
                    {filterValues.map(({ id, title }) => (
                      <MenuItem value={id} key={id}>
                        {title}
                      </MenuItem>
                    ))}
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
                  <Grid item container spacing={2} direction="column">
                    <Grid item>
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="brandSelect-label">Brand</InputLabel>
                        <Select
                          labelId="brandSelect-label"
                          id="brandSelect"
                          value={brand}
                          onChange={brandHandler}
                          inputProps={{ 'aria-label': 'Brand selection' }}
                          label="Brand"
                        >
                          {hotDealsLinks.map((el) => (
                            <MenuItem value={el} key={el}>
                              {el && el[0].toUpperCase() + el.slice(1)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
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
                          {filterValues.map(({ id, title }) => (
                            <MenuItem value={id} key={id}>
                              {title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Price
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
          <Grid item>
            CONTENT PLACEHOLDER [Properties selected: Sort: {sort} | Brand:{' '}
            {brand} | Price range: {priceRange.join('-')}]
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Bags;
