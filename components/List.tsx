import React from 'react';import { ProductSchema } from '../utils/types';
import styles from '../utils/styles';
import NextLink from 'next/link';
import { FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material';
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
import useMediaQuery from '@mui/material/useMediaQuery';
import { addProduct } from '../store/cart';
import { useAppDispatch } from '../store';

interface ListProps {
  products: ProductSchema[];
}

const List: React.FC<ListProps> = ({ products }) => {
  const sm = useMediaQuery('(max-width:670px)');
  const dispatch = useAppDispatch();
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
                  sx={{ width: sm ? '100%' : '280px', height: '100%' }}
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
                width: sm ? '100%' : '55%',
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
                    onClick={() => dispatch(addProduct(product))}
                    startIcon={<ShoppingCartOutlined />}
                  >
                    Add to cart
                  </Button>
                  <Button>
                    <FavoriteBorder />
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
