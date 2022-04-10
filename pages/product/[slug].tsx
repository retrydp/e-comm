import React from 'react';
import { GetServerSideProps } from 'next';
import db from '../../utils/database';
import Product from '../../models/Product';
import { ProductSchema } from '../../utils/types';
import { Layout } from '../../components';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Tab,
  Typography,
} from '@mui/material';
import { FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material';
import Image from 'next/image';
import styles from '../../utils/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';

interface ProductScreenProps {
  product?: ProductSchema;
}

type AllowedCategories = 'bags' | 'sneakers' | 'belts';

const ProductScreen: React.FC<ProductScreenProps> = ({ product }) => {
  const [value, setValue] = React.useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Layout
      customTitle={product?.name || 'Product not available'}
      title={product?.category as AllowedCategories}
    >
      <Container maxWidth="lg">
        {product ? (
          <Grid container spacing={3}>
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}
            >
              <Image
                priority={true}
                width={420}
                height={525}
                alt={product.name}
                src={product.images[0]}
              />
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={styles.cardHeaderTextSecondary}>
                  {product.name}
                </Typography>
                <Box sx={styles.customRatingBar}>
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
                <Divider />
                <Box sx={styles.promo}>
                  {product.oldPrice > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '9px',
                      }}
                    >
                      <Typography sx={styles.oldPrice}>
                        ${product.oldPrice}
                      </Typography>
                      <Typography sx={styles.percent}>
                        {Math.round(
                          (product.oldPrice - product.price) /
                            (product.oldPrice / 100)
                        )}
                        % off
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography sx={styles.actualPrice}>
                      ${product.price}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={styles.productInfo}>
                  Availability:{' '}
                  {product.itemsInStock > 0 ? 'In stock' : 'Unavailable'}
                </Typography>
                <Typography sx={styles.productInfo}>
                  Category: {product.category}
                </Typography>
                <Typography sx={styles.productInfo}>Free shipping</Typography>
                <Divider />
                <Box sx={{ display: 'flex', margin: '20px 0' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      console.log(event);
                    }}
                    startIcon={<ShoppingCartOutlined />}
                  >
                    Add to cart
                  </Button>
                  <Button aria-label="add to favorites">
                    <FavoriteBorder />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Box sx={{ width: '100%', mt: '15px' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="product information and reviews"
                    variant="scrollable"
                  >
                    <Tab
                      label="Product information"
                      value="1"
                      sx={{ typography: 'h4' }}
                    />
                    <Tab
                      label="Reviews (0)"
                      value="2"
                      sx={{ typography: 'h4' }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">{product.description}</TabPanel>
                <TabPanel value="2">Reviews currently not available</TabPanel>
              </TabContext>
            </Box>
          </Grid>
        ) : (
          <Typography
            sx={{
              typography: 'h4',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            Product not available.
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  await db.dbConnect();
  const productDoc = await Product.findOne({
    slug,
  }).lean();
  if (productDoc) {
    const product = db.convertDocToObj(productDoc);
    return {
      props: { product },
    };
  }
  return {
    props: {},
  };
};
