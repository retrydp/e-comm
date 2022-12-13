import React from 'react';
import NextLink from 'next/link';
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
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import styles from '../utils/styles';
import { FilterAltRounded, ViewList, ViewModule } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { SideMenuTemplate, Module, List, Pagination } from '../components';
import { useSharedContext } from '../context/SharedContext';
import { WrapperProps } from '../utils/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store';
import commonConst from '../constants/common';

export interface FilterValues {
  id: string;
  title: string;
}

export type View = 'module' | 'list';

export const filterValues: FilterValues[] = [
  { id: 'popular', title: 'Popular' },
  { id: 'new', title: 'New' },
  { id: 'asc', title: 'Price ascending' },
  { id: 'desc', title: 'Price descending' },
];

const GoodsWrapper: React.FC<WrapperProps> = ({ goods }) => {
  const {
    display: { productsQuantity },
  } = useAppSelector((store) => store);
  const { filterQuery } = useSharedContext();
  const [view, setView] = React.useState<View>('module');
  const router = useRouter();
  const { mdMax, smMin } = useSharedContext();
  const [sort, setSort] = React.useState<string>(
    (router.query['sort'] as string) || 'new'
  );
  const [drawerIsVisible, setDrawerIsVisible] = React.useState<boolean>(false);
  const validateQuantity = () => {
    if (
      !commonConst.QUANTITY_VALUES.includes(router.query['quantity'] as string)
    ) {
      return commonConst.DEFAULT_LIMIT;
    }

    return router.query['quantity'] as string;
  };
  const [quantity, setQuantity] = React.useState<string>(validateQuantity());

  /**
   * @description Changes current selected sort order option.
   * @param {SelectChangeEvent} event
   */
  const sortHandler = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    filterQuery({ sort: event.target.value });
  };

  /**
   * @description Filter sidebar visibility trigger.
   */
  const drawerVisibleHandler = () => {
    setDrawerIsVisible(!drawerIsVisible);
  };

  const quantityHandler = (event: SelectChangeEvent) => {
    setQuantity(event.target.value);
    filterQuery({ quantity: event.target.value, page: '1' });
  };

  const viewChangeHandler = (
    event: React.MouseEvent<HTMLElement>,
    nextView: View
  ) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  const PresentationSwitch = () => {
    if (!productsQuantity) {
      return (
        <Box sx={styles.goodsNotFoundWrapper}>
          <Image
            src="https://res.cloudinary.com/retrydp/image/upload/v1669098608/joyewwspqavz0bojkqxk.jpg"
            alt="product not found"
            priority={true}
            width={300}
            height={300}
          ></Image>
          <Typography sx={styles.textCenter}>Products not found.</Typography>
        </Box>
      );
    }

    return view === 'module' ? (
      <Module products={goods} />
    ) : (
      <List products={goods} />
    );
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={drawerIsVisible}
        onClose={() => setDrawerIsVisible(false)}
      >
        <SideMenuTemplate width="60vw" withSort={false} />
      </Drawer>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={styles.jcsb}>
          {mdMax ? (
            <Grid item container rowSpacing={2} sx={styles.aic}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={drawerVisibleHandler}
                >
                  <FilterAltRounded sx={styles.mr10} />
                  <Typography sx={styles.filterButton}>Filters</Typography>
                </Button>
              </Grid>
              <Box sx={styles.grow}></Box>
              <Grid item>
                <FormControl sx={styles.mw150}>
                  <InputLabel id="sortSelect-label">Sort by</InputLabel>
                  <Select
                    labelId="sortSelect-label"
                    id="sortSelect"
                    value={sort}
                    onChange={sortHandler}
                    inputProps={{ 'aria-label': 'Sorting selection' }}
                    label="Sort by"
                    size="small"
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
              sx={styles.mb4}
            >
              <SideMenuTemplate width="100%" withSort />
            </Grid>
          )}
          <Grid
            item
            sx={{ ...styles.grow, ...styles.goodsWrapper }}
            xl={9}
            lg={9}
            md={9}
          >
            {smMin && (
              <NextLink href="/sneakers/nike-air-max-plus" passHref>
                <Link>
                  <Box sx={styles.mb20}>
                    <Image
                      src="https://res.cloudinary.com/retrydp/image/upload/v1651495865/banner_gxsmbo.png"
                      width={860}
                      height={300}
                      alt="Nike Air Max Plus"
                    />
                  </Box>
                </Link>
              </NextLink>
            )}
            <Toolbar sx={styles.sortToolbar} disableGutters>
              <Box sx={styles.sortToolbarInner}>
                {smMin && (
                  <Typography sx={styles.goodsItemsText}>
                    Items: {productsQuantity}
                  </Typography>
                )}
                <FormControl sx={styles.mw150}>
                  <InputLabel id="quantity-label">Quantity</InputLabel>
                  <Select
                    labelId="quantity-label"
                    id="quantity"
                    value={quantity.toString()}
                    onChange={quantityHandler}
                    inputProps={{ 'aria-label': 'Quantity selection' }}
                    label="Quantity"
                    size="small"
                  >
                    {commonConst.QUANTITY_VALUES.map((el) => (
                      <MenuItem value={el} key={el}>
                        {el}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={styles.grow}></Box>
              <ToggleButtonGroup
                color="primary"
                value={view}
                exclusive
                onChange={viewChangeHandler}
              >
                <ToggleButton
                  value="module"
                  aria-label="Simple list"
                  sx={styles.p7}
                >
                  <Tooltip title="Simple list" arrow>
                    <ViewModule />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton
                  value="list"
                  aria-label="Extended list"
                  sx={styles.p7}
                >
                  <Tooltip title="Extended list" arrow>
                    <ViewList />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </Toolbar>
            <PresentationSwitch />
          </Grid>
          {!productsQuantity || <Pagination />}
        </Grid>
      </Container>
    </>
  );
};

export default GoodsWrapper;
