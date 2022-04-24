import {  Box,
  Button,
  Container,
  Grid,
  IconButton,
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

const Cart: React.FC = () => {
  const sm = useMediaQuery('(max-width:600px)');
  const [quantity, setQuantity] = React.useState<number>(1);
  return (
    <Layout title="home" customTitle="Cart">
      <Container maxWidth="lg" sx={{ mb: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={styles.cartWrapper}>
              <Box>
                <Image
                  priority={true}
                  width={sm ? '120%' : '420'}
                  height={sm ? '120%' : '525'}
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/fb149f6b-c850-4708-ac13-1c2cb4df89d5/metcon-7-flyease-training-sneakers-RKGv1m.png"
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
                  Nike Air Zoom Pegasus 36 Miami dsa dsa das dsa dsaw12321 321
                  sda
                </Typography>
                {!sm && (
                  <Typography>
                    Created for the hardwood but taken to the streets, the '80s
                    basketball icon returns with classic details and throwback
                    hoops flair. Its padded, low-cut collar and foam midsole let
                    you take your game anywhere—in comfort.
                  </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: sm ? '12px' : '20px' }}>
                    Quantity:
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="Add one item"
                    component="span"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AddBox
                      sx={{
                        height: sm ? '30px' : '45px',
                        width: sm ? '30px' : '45px',
                      }}
                    />
                  </IconButton>
                  <Typography sx={{ fontSize: sm ? '12px' : '20px' }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    color="primary"
                    aria-label="Delete one item"
                    component="span"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
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
                  <Typography sx={styles.cartItemPrice}>$299,43</Typography>
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
        </Grid>
      </Container>
    </Layout>
  );
};

export default Cart;
