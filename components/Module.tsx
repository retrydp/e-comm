import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Rating,
  Typography,
  Box,
} from '@mui/material';
import React from 'react';
import { ProductSchema } from '../utils/types';
import styles from '../utils/styles';
import NextLink from 'next/link';

interface ModuleProps {
  products: ProductSchema[];
}

const Module: React.FC<ModuleProps> = ({ products }) => {
  return (
    <Grid container spacing={3} sx={styles.moduleContainer}>
      {products.map(
        ({ name, rating, oldPrice, price, images, slug, category }) => (
          <Grid item lg={4} md={4} sm={4} xs={12} key={name}>
            <NextLink href={`/${category}/${slug}`} passHref>
              <Link sx={styles.plainAnchor}>
                <Card>
                  <CardMedia
                    component="img"
                    height="280"
                    image={images[0]}
                    alt={name}
                  />
                  <CardHeader
                    title={name}
                    titleTypographyProps={{
                      ...styles.cardHeaderText,
                      ...styles.cartHeaderTextPos,
                    }}
                  ></CardHeader>
                  <Box sx={styles.cardContentOuterWrapper}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={rating}
                      precision={0.5}
                      readOnly
                    />
                    <CardContent
                      sx={{
                        ...styles.cardContentWrapper,
                        ...styles.cardContentWrapperGrid,
                      }}
                    >
                      {oldPrice > 0 ? (
                        <Box sx={styles.promo}>
                          <Typography
                            sx={styles.oldPrice}
                            aria-label="old price"
                          >
                            ${oldPrice}
                          </Typography>
                          <Typography sx={styles.percent} aria-label="discount">
                            {Math.round((oldPrice - price) / (oldPrice / 100))}%
                            off
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={styles.grow}></Box>
                      )}
                      <Box>
                        <Typography
                          sx={styles.actualPrice}
                          aria-label="actual price"
                        >
                          ${price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Link>
            </NextLink>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Module;
