import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  NoSsr,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { Layout } from '../components';
import styles from '../utils/styles';
import {
  Favorite,
  Delete,
  AddBox,
  IndeterminateCheckBox,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store';
import { decrementCount, incrementCount, deleteProduct } from '../store/cart';
import NextLink from 'next/link';

const TAXES = 0.2;
const SHIPPING_PRICE = 10;

const Cart: React.FC = () => {
  const sm = useMediaQuery('(max-width:600px)');
  const dispatch = useAppDispatch();
  const {
    cart: { products },
  } = useAppSelector((store) => store);
  const totalProductsInCart = products?.length
    ? products.reduce((prev, { count }) => prev + count, 0)
    : 0;
  const totalSum = products?.length
    ? products.reduce((prev, { price, count }) => prev + price * count, 0)
    : 0;

  return (
    <NoSsr>
      <Layout title="home" customTitle="Cart">
        {products.length > 0 ? (
          <Container maxWidth="lg" sx={{ mb: '15px' }}>
            <Grid container spacing={2}>
              {products.map((product) => (
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
                          onClick={() => dispatch(incrementCount(product))}
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
                          onClick={() => dispatch(decrementCount(product))}
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
                          >
                            <Favorite
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
                            onClick={() => dispatch(deleteProduct(product))}
                          >
                            <Delete
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
                </Grid>
              ))}
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
                    mt: '15px',
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
                      <Typography sx={styles.paymentName}>Shipping</Typography>
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
                  Total: ${(totalSum * (1 + TAXES) + SHIPPING_PRICE).toFixed(2)}
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
          </Container>
        ) : (
          <Container maxWidth="lg" sx={{ mb: '15px', display: 'flex' }}>
            <Typography sx={{ textAlign: 'left' }}>
              No items in cart&nbsp;
            </Typography>
            <NextLink href="/" passHref>
              <Link sx={styles.plainAnchor}>go shopping.</Link>
            </NextLink>
          </Container>
        )}
      </Layout>
    </NoSsr>
  );
};

export default Cart;
