import React from 'react';
import styles from '../utils/styles';
import NextLink from 'next/link';
import {
  FavoriteBorder,
  ShoppingCartOutlined,
  DeleteOutline,
  AddBox,
  IndeterminateCheckBox,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  Rating,
  Typography,
} from '@mui/material';
import { cartAddProduct } from '../store/cart';
import { useAppDispatch } from '../store';
import {
  cartIncrementCount,
  cartDecrementCount,
  cartDeleteProduct,
} from '../store/cart';
import { CartProduct } from '../store/cart';
import axios from 'axios';
import { favoritesDelete } from '../store/favorites';
import { useSharedContext } from '../context/SharedContext';
import apiRoutes from '../constants/apiRoutes';
import notificationMessages from '../constants/notificationMessages';
import { ProductSchema } from '../utils/types';

interface ListProps {
  products: CartProduct[] | ProductSchema[];
  favoritesModeAccept?: boolean;
  cartMode?: boolean;
}

const List: React.FC<ListProps> = ({
  products,
  favoritesModeAccept = true,
  cartMode = false,
}) => {
  const {
    smMin,
    mdMin,
    userInfo,
    snackbarSuccess,
    snackbarError,
    addFavoriteHandler,
    smList,
    onNotLoggedIn,
    authHeader,
  } = useSharedContext();
  const dispatch = useAppDispatch();

  /**
   * Delete product to user's favorites list. If user is not logged in,
   * redirect to login page.
   * @param id slug of product
   */
  const deleteFavoriteHandler = async (id: string) => {
    if (!userInfo)
      return onNotLoggedIn(notificationMessages.FAVORITES_DELETE_NOT_LOGGED);
    try {
      await axios.delete(apiRoutes.USER_FAVORITE, {
        ...authHeader,
        data: { id },
      });
      snackbarSuccess(notificationMessages.PRODUCT_DELETED);
      dispatch(favoritesDelete(id));
    } catch (error: any) {
      snackbarError(`${error.response.data.message || error.toString()}`);
    }
  };

  return (
    <Grid container item spacing={2}>
      {products.map((product) => (
        <Grid item lg={12} md={12} sm={12} xs={12} key={product.name}>
          <Card
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <NextLink href={`/${product.category}/${product.slug}`} passHref>
              <Link sx={styles.plainAnchor}>
                <CardMedia
                  sx={{
                    width: smList ? '50%' : '280px',
                    height: '100%',
                    m: '0 auto',
                  }}
                  component="img"
                  image={product.images[0]}
                  alt={product.name}
                />
              </Link>
            </NextLink>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: smList ? '100%' : '55%',
              }}
            >
              <NextLink href={`/${product.category}/${product.slug}`} passHref>
                <Link sx={styles.plainAnchor}>
                  <CardHeader
                    title={product.name}
                    sx={{ maxWidth: '300px' }}
                    titleTypographyProps={styles.cardHeaderTextSecondary}
                  ></CardHeader>
                </Link>
              </NextLink>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box sx={styles.ratingBar}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  {smMin && (
                    <Typography sx={styles.reviewsText}>
                      {product.reviews?.length || 0} reviews
                    </Typography>
                  )}
                  <Button>
                    <Typography
                      sx={{ fontSize: '14px', textTransform: 'none' }}
                    >
                      Submit a review
                    </Typography>
                  </Button>
                </Box>
                <Divider sx={{ m: '0 15px' }} />
                <CardContent
                  sx={{
                    ...styles.cardContentWrapperSecondary,
                    ...styles.cardContentWrapperGrid,
                  }}
                >
                  <Box sx={styles.promo}>
                    {product.oldPrice - product.price > 0 && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '9px',
                        }}
                      >
                        <Typography sx={styles.oldPrice} aria-label="old price">
                          ${product.oldPrice.toFixed(2)}
                        </Typography>
                        <Typography sx={styles.percent} aria-label="discount">
                          {Math.round(
                            (product.oldPrice - product.price) /
                              (product.oldPrice / 100)
                          )}
                          % off
                        </Typography>
                      </Box>
                    )}
                    <Box>
                      <Typography
                        sx={styles.actualPrice}
                        aria-label="actual price"
                      >
                        ${product.price}
                      </Typography>
                    </Box>
                  </Box>
                  {mdMin && (
                    <Box>
                      <Typography>{product.description}</Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions
                  sx={{
                    padding: '15px',
                    m: cartMode && !smMin ? '0 auto' : 'auto 0 0 0',
                  }}
                >
                  {!cartMode && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => dispatch(cartAddProduct(product))}
                      startIcon={<ShoppingCartOutlined />}
                    >
                      Add to cart
                    </Button>
                  )}
                  <IconButton
                    color="primary"
                    aria-label={`${
                      favoritesModeAccept ? 'add to' : 'delete from'
                    } favorites`}
                    onClick={() =>
                      favoritesModeAccept
                        ? addFavoriteHandler(product.slug)
                        : deleteFavoriteHandler(product.slug)
                    }
                  >
                    {favoritesModeAccept ? (
                      <FavoriteBorder />
                    ) : (
                      <DeleteOutline sx={{ color: 'red' }} />
                    )}
                  </IconButton>
                  {cartMode && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        aria-label="Add one item"
                        component="span"
                        onClick={() => dispatch(cartIncrementCount(product))}
                      >
                        <AddBox />
                      </IconButton>
                      <Typography sx={{ m: '15px' }}>
                        {(product as CartProduct).count}
                      </Typography>
                      <IconButton
                        aria-label="Delete one item"
                        component="span"
                        onClick={() => dispatch(cartDecrementCount(product))}
                      >
                        <IndeterminateCheckBox />
                      </IconButton>
                      <IconButton
                        color="primary"
                        aria-label="Delete"
                        component="span"
                        onClick={() => dispatch(cartDeleteProduct(product))}
                      >
                        <DeleteOutline sx={{ color: 'red' }} />
                      </IconButton>
                    </Box>
                  )}
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
