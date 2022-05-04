import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  NoSsr,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import {
  FavoriteBorder,
  DeleteOutline,
  AddBox,
  IndeterminateCheckBox,
  ArrowBack,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store';
import {
  cartIncrementCount,
  cartDecrementCount,
  cartDeleteProduct,
} from '../store/cart';
import NextLink from 'next/link';
import { useSharedContext } from '../context/SharedContext';
import axios from 'axios';
import { useRouter } from 'next/router';

const TAXES = 0.2;
const SHIPPING_PRICE = 10;

const Cart: React.FC = () => {
  const { snackbar, userInfo } = useSharedContext();

  const sm = useMediaQuery('(max-width:600px)');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    cart: { cartProducts },
  } = useAppSelector((store) => store);
  const totalProductsInCart = cartProducts?.length
    ? cartProducts.reduce((prev, { count }) => prev + count, 0)
    : 0;
  const totalSum = cartProducts?.length
    ? cartProducts.reduce((prev, { price, count }) => prev + price * count, 0)
    : 0;

  /**
   * Add product to user's favorites list. If user is not logged in,
   * redirect to login page.
   * @param id slug of product
   */
  const addFavoriteHandler = async (id: string) => {
    if (!userInfo) {
      snackbar(`Please login before adding favorites.`, {
        variant: 'error',
      });
      router.push(`/login?redirect=${router.pathname}`);
    } else {
      try {
        await axios.put(
          `/api/users/favorite`,
          { id },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        snackbar(`Product successfully added.`, { variant: 'success' });
      } catch (error: any) {
        snackbar(`${error.response.data.message || error.toString()}`, {
          variant: 'error',
        });
      }
    }
  };

  return (
    <NoSsr>
      <Layout title="home" customTitle="Cart">
        {cartProducts?.length > 0 ? (
          <Container maxWidth="lg" sx={{ mb: '15px' }}>
            <Typography variant="h4" sx={{ padding: '15px 0' }}>
              Your cart:
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              {cartProducts.map((product) => (
                <Grid item xs={12} key={product.slug}>
                  <Box sx={styles.cartWrapper}>
                    <Box>
                      <Image
                        priority={true}
                        width={sm ? '120%' : '420'}
                        height={sm ? '120%' : '525'}
                        src={product.images[0]}
                      ></Image>
                    </Box>
                    <Box
                      sx={{
                        ml: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Typography sx={styles.cartItemText}>
                        {product.name}
                      </Typography>
                      {!sm && <Typography>{product.description}</Typography>}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: sm ? '12px' : '20px' }}>
                          Quantity:
                        </Typography>
                        <IconButton
                          color="primary"
                          aria-label="Add one item"
                          component="span"
                          onClick={() => dispatch(cartIncrementCount(product))}
                        >
                          <AddBox
                            sx={{
                              height: sm ? '30px' : '45px',
                              width: sm ? '30px' : '45px',
                            }}
                          />
                        </IconButton>
                        <Typography sx={{ fontSize: sm ? '12px' : '20px' }}>
                          {product.count}
                        </Typography>
                        <IconButton
                          color="primary"
                          aria-label="Delete one item"
                          component="span"
                          onClick={() => dispatch(cartDecrementCount(product))}
                        >
                          <IndeterminateCheckBox
                            sx={{
                              height: sm ? '30px' : '45px',
                              width: sm ? '30px' : '45px',
                            }}
                          />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Typography sx={styles.cartItemPrice}>
                          ${product.price}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                          <IconButton
                            color="primary"
                            aria-label="Favorite"
                            component="span"
                            onClick={() => addFavoriteHandler(product.slug)}
                          >
                            <FavoriteBorder
                              sx={{
                                height: sm ? '25px' : '45px',
                                width: sm ? '25px' : '45px',
                              }}
                            />
                          </IconButton>
                          <IconButton
                            color="primary"
                            aria-label="Delete"
                            component="span"
                            onClick={() => dispatch(cartDeleteProduct(product))}
                          >
                            <DeleteOutline
                              sx={{
                                height: sm ? '25px' : '45px',
                                width: sm ? '25px' : '45px',
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: 'left',
                      maxWidth: '350px',
                      width: '100%',
                    }}
                  >
                    Payment details:
                  </Typography>
                  <Box sx={styles.cartTotal}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: '15px',
                        width: '100%',
                        gap: '25px',
                      }}
                    >
                      <Box sx={styles.detailsWrapper}>
                        <Typography sx={styles.paymentName}>
                          Items ({totalProductsInCart})
                        </Typography>
                        <Typography sx={styles.paymentValues}>
                          ${totalSum.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box sx={styles.detailsWrapper}>
                        <Typography sx={styles.paymentName}>
                          Shipping
                        </Typography>
                        <Typography sx={styles.paymentValues}>
                          ${SHIPPING_PRICE}
                        </Typography>
                      </Box>
                      <Box sx={styles.detailsWrapper}>
                        <Typography sx={styles.paymentName}>Tax</Typography>
                        <Typography sx={styles.paymentValues}>
                          ${(totalSum * TAXES).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      mt: '15px',
                      textAlign: 'left',
                      maxWidth: '350px',
                      width: '100%',
                    }}
                  >
                    Total: $
                    {(totalSum * (1 + TAXES) + SHIPPING_PRICE).toFixed(2)}
                  </Typography>
                  <Box
                    sx={{
                      maxWidth: '350px',
                      width: '100%',
                      mt: '15px',
                    }}
                  >
                    <Button variant="contained" fullWidth>
                      Check out
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container
            maxWidth="lg"
            sx={{
              mb: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '50px',
              gap: '15px',
            }}
          >
            <Image
              src="https://res.cloudinary.com/retrydp/image/upload/v1651300005/d1me29qkm191jwnsqxgc.png"
              alt="cart is empty"
              priority={true}
              width={300}
              height={300}
            ></Image>
            <Typography sx={{ textAlign: 'left' }}>
              Your cart is empty&nbsp;
            </Typography>
            <NextLink href="/" passHref>
              <Button
                component="a"
                variant="contained"
                startIcon={<ArrowBack />}
              >
                go shopping
              </Button>
            </NextLink>
          </Container>
        )}
      </Layout>
    </NoSsr>
  );
};

export default Cart;
