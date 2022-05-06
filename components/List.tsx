import React from 'react';
import { ProductSchema } from '../utils/types';
import styles from '../utils/styles';
import NextLink from 'next/link';
import {
  FavoriteBorder,
  ShoppingCartOutlined,
  DeleteOutline,
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
  Link,
  Rating,
  Typography,
} from '@mui/material';
import { cartAddProduct } from '../store/cart';
import { useAppDispatch } from '../store';
import axios from 'axios';
import { favoritesDelete } from '../store/favorites';
import { useSharedContext } from '../context/SharedContext';
import apiRoutes from '../constants/apiRoutes';
import notificationMessages from '../constants/notificationMessages';

interface ListProps {
  products: ProductSchema[];
  favoritesModeAccept?: boolean;
}

const List: React.FC<ListProps> = ({
  products,
  favoritesModeAccept = true,
}) => {
  const {
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
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item lg={12} md={12} sm={12} xs={12} key={product.name}>
          <Card
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link sx={styles.plainAnchor}>
                <CardMedia
                  sx={{ width: smList ? '100%' : '280px', height: '100%' }}
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
              <NextLink href={`/product/${product.slug}`} passHref>
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
                  <Typography sx={styles.reviewsText}>
                    {product.reviews?.length || 0} reviews
                  </Typography>
                  <Button>
                    <Typography
                      sx={{ fontSize: '14px', textTransform: 'none' }}
                    >
                      Submit a review
                    </Typography>
                  </Button>
                </Box>
                <Divider sx={{ ml: '15px' }} />
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
                          ${product.oldPrice}
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
                  <Box>
                    <Typography>{product.description}</Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ padding: '15px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(cartAddProduct(product))}
                    startIcon={<ShoppingCartOutlined />}
                  >
                    Add to cart
                  </Button>
                  <Button
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
                  </Button>
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
