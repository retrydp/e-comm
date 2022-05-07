import { Box, Button, Container, Grid, NoSsr, Typography } from '@mui/material';import Image from 'next/image';
import React from 'react';
import { Layout, List } from '../components';
import styles from '../utils/styles';
import { ArrowBack } from '@mui/icons-material';
import { useAppSelector } from '../store';
import NextLink from 'next/link';

const TAXES = 0.2;
const SHIPPING_PRICE = 10;

const Cart: React.FC = () => {
  const {
    cart: { cartProducts },
  } = useAppSelector((store) => store);
  const totalProductsInCart = cartProducts?.length
    ? cartProducts.reduce((prev, { count }) => prev + count, 0)
    : 0;
  const totalSum = cartProducts?.length
    ? cartProducts.reduce((prev, { price, count }) => prev + price * count, 0)
    : 0;

  return (
    <NoSsr>
      <Layout title="home" customTitle="Cart">
        {cartProducts?.length > 0 ? (
          <Container maxWidth="lg" sx={{ mb: '15px' }}>
            <Typography variant="h4" sx={{ padding: '15px 0' }}>
              Your cart:
            </Typography>
            <Grid container spacing={2}>
              <List products={cartProducts} cartMode></List>
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
