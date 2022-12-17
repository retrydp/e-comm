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
import apiRoutes from '../constants/apiRoutes';
import notificationMessages from '../constants/notificationMessages';
import { ProductSchema } from '../utils/types';
import { isAxiosError } from '../utils/errorHandler';
import { useSession } from 'next-auth/react';
import useAppMedia from '../utils/hooks/useAppMedia';
import useInform from 'utils/hooks/useInform';
import useHandler from 'utils/hooks/useHandler';
import useAccessProvider from 'utils/hooks/useAccessProvider';

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
  const { onNotLoggedIn } = useAccessProvider();
  const { snackbarError, snackbarSuccess } = useInform();
  const { addFavoriteHandler } = useHandler();
  const { smList, smMin } = useAppMedia();
  const dispatch = useAppDispatch();
  const { data } = useSession();
  /**
   * Delete product to user's favorites list. If user is not logged in,
   * redirect to login page.
   * @param id slug of product
   */
  const deleteFavoriteHandler = async (id: string) => {
    if (!data)
      return onNotLoggedIn(notificationMessages.FAVORITES_DELETE_NOT_LOGGED);
    try {
      await axios.delete(apiRoutes.USER_FAVORITE, {
        data: { id },
      });
      snackbarSuccess(notificationMessages.PRODUCT_DELETED);
      dispatch(favoritesDelete(id));
    } catch (error: unknown) {
      if (isAxiosError<{ message: string }>(error))
        snackbarError(`${error.response?.data.message}`);
      else {
        snackbarError(`Unexpected error`);
      }
    }
  };

  return (
    <Grid container item spacing={2}>
      {products.map((product) => (
        <Grid item lg={12} md={12} sm={12} xs={12} key={product.name}>
          <Card sx={styles.listCard}>
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
                    sx={styles.mw300}
                    titleTypographyProps={styles.cardHeaderTextSecondary}
                  ></CardHeader>
                </Link>
              </NextLink>
              <Box sx={styles.ratingWrapper}>
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
                    <Typography sx={styles.ratingButtonText}>
                      Submit a review
                    </Typography>
                  </Button>
                </Box>
                <Divider sx={styles.ratingDivider} />
                <CardContent
                  sx={{
                    ...styles.cardContentWrapperSecondary,
                    ...styles.cardContentWrapperGrid,
                  }}
                >
                  <Box sx={styles.promo}>
                    {product.oldPrice - product.price > 0 && (
                      <Box sx={styles.promoPrice}>
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
                  {!cartMode && (
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
                        : // TODO: ask user confirm on delete
                          deleteFavoriteHandler(product.slug)
                    }
                  >
                    {favoritesModeAccept ? (
                      <FavoriteBorder />
                    ) : (
                      <DeleteOutline sx={styles.colorRed} />
                    )}
                  </IconButton>
                  {cartMode && (
                    <Box sx={styles.cardButtonWrapper}>
                      <IconButton
                        aria-label="Add one item"
                        component="span"
                        onClick={() => dispatch(cartIncrementCount(product))}
                      >
                        <AddBox />
                      </IconButton>
                      <Typography sx={styles.m15}>
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
                        <DeleteOutline sx={styles.colorRed} />
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
