import dynamic from 'next/dynamic';
import { Box, Button, Container, Grid, NoSsr, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
const Layout = dynamic(() => import('../components/Layout'));
const List = dynamic(() => import('../components/List'));
import styles from '../utils/styles';
import { ArrowBack } from '@mui/icons-material';
import { useAppSelector } from '../store';
import NextLink from 'next/link';
import commonConst from '../constants/common';

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
          <Container maxWidth="lg" sx={styles.mb15}>
            <Typography variant="h4" sx={styles.defaultP}>
              Your cart:
            </Typography>
            <Grid container spacing={2}>
              <List products={cartProducts} cartMode></List>
              <Grid item xs={12}>
                <Box sx={styles.cartOuter}>
                  <Typography variant="h4" sx={styles.cartOuterText}>
                    Payment details:
                  </Typography>
                  <Box sx={styles.cartTotal}>
                    <Box sx={styles.cartTotalWrapper}>
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
                          ${commonConst.SHIPPING_PRICE}
                        </Typography>
                      </Box>
                      <Box sx={styles.detailsWrapper}>
                        <Typography sx={styles.paymentName}>Tax</Typography>
                        <Typography sx={styles.paymentValues}>
                          ${(totalSum * commonConst.TAXES).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={styles.cartTotalText}>
                    Total: $
                    {(
                      totalSum * (1 + commonConst.TAXES) +
                      commonConst.SHIPPING_PRICE
                    ).toFixed(2)}
                  </Typography>
                  <Box sx={styles.cartTotalButton}>
                    <Button variant="contained" fullWidth>
                      Check out
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Container maxWidth="lg" sx={styles.cartContainer}>
            <Image
              src="https://res.cloudinary.com/retrydp/image/upload/v1651300005/d1me29qkm191jwnsqxgc.png"
              alt="cart is empty"
              priority={true}
              width={300}
              height={300}
            ></Image>
            <Typography sx={styles.textLeft}>
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
