import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
type AvailableColors =
  | 'black'
  | 'blue'
  | 'brown'
  | 'green'
  | 'grey'
  | 'multicolour'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow';

interface FilterValues {
  id: SortParams;
  title: string;
}

interface AvailableColorsList {
  color: AvailableColors;
  bg: string;
  slug: string;
}

const Bags: React.FC = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };
  const hotDealsLinks: Brands[] = ['all', 'nike', 'airmax', 'adidas', 'vans'];
  const availableColorsList: AvailableColorsList[] = [
    { color: 'black', bg: 'black', slug: 'Black' },
    { color: 'blue', bg: 'blue', slug: 'Blue' },
    { color: 'brown', bg: 'brown', slug: 'Brown' },
    { color: 'green', bg: 'green', slug: 'Green' },
    { color: 'grey', bg: 'grey', slug: 'Grey' },
    { color: 'multicolour', bg: 'grey', slug: 'Multi-Colour' },
    { color: 'orange', bg: 'orange', slug: 'Orange' },
    { color: 'pink', bg: 'pink', slug: 'Pink' },
    { color: 'purple', bg: 'purple', slug: 'Purple' },
    { color: 'red', bg: 'red', slug: 'Red' },
    { color: 'white', bg: 'white', slug: 'White' },
    { color: 'yellow', bg: 'yellow', slug: 'Yellow' },
  ];
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
  const [colorChecked, setColorChecked] = React.useState<string[]>([]);
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

  /**
   *Changes state due to selected colors.
   * @param {SelectChangeEvent<typeof colorChecked>} event
   */
  const colorsChangeHandler = (
    event: SelectChangeEvent<typeof colorChecked>
  ) => {
    const {
      target: { value },
    } = event;
    setColorChecked(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <Layout title="Bags">
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        <Grid item sx={styles.grow}>
          <Box sx={styles.sideMenuItem}>
            <Grid item container spacing={2} direction="column">
              <Grid item>
                <FormControl sx={{ width: '60vw' }}>
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
                <FormControl sx={{ width: '60vw' }}>
                  <InputLabel id="colorChange-label">Color</InputLabel>
                  <Select
                    labelId="colorChange-label"
                    id="colorChange"
                    multiple
                    value={colorChecked}
                    onChange={colorsChangeHandler}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0.5,
                        }}
                      >
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              availableColorsList.find(
                                ({ color }) => color === value
                              )?.slug
                            }
                            sx={{
                              color: availableColorsList.find(
                                ({ color }) => color === value
                              )?.bg,
                              backgroundColor: 'primary',
                            }}
                          />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {availableColorsList.map(({ color, slug, bg }) => (
                      <MenuItem key={color} value={color}>
                        <Typography
                          sx={{ color: bg === 'white' ? 'black' : bg }}
                        >
                          {slug}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={styles.grow}>
                <Box sx={styles.sideMenuItem}>
                  <Typography variant="h4" sx={{ mb: '10px' }}>
                    Price
                  </Typography>
                  <SliderSelector getSliderValues={getSliderValues} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Drawer>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {md ? (
            <Grid item container rowSpacing={2} sx={{ alignItems: 'center' }}>
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
                    <Grid item>
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="colorChange-label">Color</InputLabel>
                        <Select
                          labelId="colorChange-label"
                          id="colorChange"
                          multiple
                          value={colorChecked}
                          onChange={colorsChangeHandler}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Chip"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={
                                    availableColorsList.find(
                                      ({ color }) => color === value
                                    )?.slug
                                  }
                                  sx={{
                                    color: availableColorsList.find(
                                      ({ color }) => color === value
                                    )?.bg,
                                    backgroundColor: 'primary',
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {availableColorsList.map(({ color, slug, bg }) => (
                            <MenuItem key={color} value={color}>
                              <Typography
                                sx={{ color: bg === 'white' ? 'black' : bg }}
                              >
                                {slug}
                              </Typography>
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
            </Grid>
          )}
          <Grid item sx={styles.grow} xl={9} lg={9} md={9}>
            CONTENT PLACEHOLDER [Properties selected: Sort: {sort} | Brand:{' '}
            {brand} | Price range: {priceRange.join('-')} | Colors Checked:{' '}
            {colorChecked.join(',')}]
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Bags;
