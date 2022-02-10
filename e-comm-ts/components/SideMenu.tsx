import React from 'react';
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { SliderSelector } from '.';
import { filterValues } from './GoodsWrapper';
import { useAppDispatch, useAppSelector } from '../store';
import {
  AvailableColors,
  Brands,
  setBrand,
  setColor,
  setSliderValue,
  setSort,
} from '../store/displayInterface';
import styles from '../utils/styles';

interface AvailableColorsList {
  color: AvailableColors;
  bg: string;
  slug: string;
}

interface SideMenuTemplateProps {
  width: '60vw' | '100%';
  withSort: boolean;
}

const SideMenuTemplate: React.FC<SideMenuTemplateProps> = ({
  width,
  withSort,
}) => {
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

  const dispatch = useAppDispatch();
  const { brand, sort, color: colorChecked } = useAppSelector((store) => store);

  /**
   * Changes current selected brand option.
   * @param {SelectChangeEvent} event
   */
  const brandHandler = (event: SelectChangeEvent) => {
    dispatch(setBrand(event.target.value));
  };

  /**
   * Changes current selected sort order option.
   * @param {SelectChangeEvent} event
   */
  const sortHandler = (event: SelectChangeEvent) => {
    dispatch(setSort(event.target.value));
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
    dispatch(
      setColor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      )
    );
  };

  /**
   * Obtain values from the slider.
   * @param {number[]} values - values from the slider component as array [min, max]
   */
  const getSliderValues = (values: number[]) => {
    dispatch(setSliderValue(values));
  };

  return (
    <Grid item sx={styles.grow}>
      <Box sx={styles.sideMenuItem}>
        <Grid item container spacing={2} direction="column">
          <Grid item>
            <FormControl sx={{ width: width }}>
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
          {withSort && (
            <Grid item>
              <FormControl sx={{ width }}>
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
          )}
          <Grid item>
            <FormControl sx={{ width }}>
              <InputLabel id="colorChange-label">Color</InputLabel>
              <Select
                labelId="colorChange-label"
                id="colorChange"
                multiple
                value={colorChecked}
                onChange={colorsChangeHandler}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                    <Typography sx={{ color: bg === 'white' ? 'black' : bg }}>
                      {slug}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Grid item sx={styles.grow}>
        <Box sx={styles.sideMenuItem}>
          <Typography variant="h4" sx={{ mb: '10px' }}>
            Price
          </Typography>
          <SliderSelector getSliderValues={getSliderValues} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideMenuTemplate;
