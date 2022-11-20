import React from 'react';import {
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
import { useAppSelector } from '../store';
import styles from '../utils/styles';
import { useSharedContext } from '../context/SharedContext';
import { useRouter } from 'next/router';

interface AvailableColorsList {
  color: string;
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
  const { filterQuery } = useSharedContext();
  const {
    display: { availableBrands, availableColors },
  } = useAppSelector((store) => store);
  const router = useRouter();
  const [innerColors, setInnerColors] = React.useState<AvailableColorsList[]>(
    []
  );
  const [sort, setSort] = React.useState<string>(
    (router.query['sort'] as string) || 'new'
  );
  const [brand, setBrand] = React.useState<string>(
    (router.query['brand'] as string) || 'all'
  );
  const [colorChecked, setColorChecked] = React.useState<string[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      props: {
        disableScrollLock: true,
      },
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  /**
   * @description Changes current selected brand option.
   * @param {SelectChangeEvent} event
   */
  const brandHandler = (event: SelectChangeEvent) => {
    setBrand(event.target.value);
    filterQuery('brand', event.target.value);
    filterQuery('page', '1');
  };

  /**
   * @description Changes current selected sort order option.
   * @param {SelectChangeEvent} event
   */
  const sortHandler = (event: SelectChangeEvent) => {
    filterQuery('sort', event.target.value);
    filterQuery('page', '1');
    setSort(event.target.value);
  };

  /**
   * @description Changes state due to selected colors.
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
    filterQuery('colors', typeof value === 'string' ? value.split(',') : value);
    filterQuery('page', '1');
  };

  React.useEffect(() => {
    const colorsMap = availableColors.map(
      (el) =>
        ({
          color: el,
          bg: el,
          slug: el.replace(/^./, (str) => str.toUpperCase()),
        } as AvailableColorsList)
    );

    setInnerColors(colorsMap);
  }, [availableColors.length]);

  return (
    <Grid item sx={styles.grow}>
      <Box sx={styles.sideMenuItem}>
        <Grid item container spacing={2} direction="column">
          <Grid item>
            {availableBrands.length > 0 && (
              <FormControl sx={{ width: width }}>
                <InputLabel id="brandSelect-label">Brand</InputLabel>
                <Select
                  labelId="brandSelect-label"
                  id="brandSelect"
                  value={brand}
                  defaultValue="all"
                  onChange={brandHandler}
                  inputProps={{ 'aria-label': 'Brand selection' }}
                  label="Brand"
                >
                  <MenuItem value="all">All</MenuItem>
                  {availableBrands.map((el) => (
                    <MenuItem value={el} key={el}>
                      {el && el[0].toUpperCase() + el.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
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
            {innerColors.length > 0 && (
              <FormControl sx={{ width }}>
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
                            innerColors.find(({ color }) => color === value)
                              ?.slug
                          }
                          sx={{
                            color: innerColors.find(
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
                  {innerColors.map(({ color, slug, bg }) => (
                    <MenuItem key={color} value={color}>
                      <Typography sx={{ color: bg === 'white' ? 'black' : bg }}>
                        {slug}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Box>
      <Grid item sx={styles.grow}>
        <Box sx={styles.sideMenuItem}>
          <Typography variant="h4" sx={{ mb: '10px' }}>
            Price
          </Typography>
          <SliderSelector />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SideMenuTemplate;
