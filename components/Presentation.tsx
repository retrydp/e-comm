import {  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import styles from '../utils/styles';
import shoeLogo from '../public/assets/img/columbia.jpg';
import { Box } from '@mui/system';
import { ProductSchema } from '../utils/types';

interface PresentationProps {
  goods: ProductSchema[];
}

const Presentation: React.FC<PresentationProps> = ({ goods }) => {
  return (
    <Grid container rowSpacing={3} spacing={2}>
      {goods.map(({ slug, name, images, price, oldPrice }) => (
        <Grid item lg={4} md={4} sm={12} xs={12} key={slug}>
          <NextLink href={`/product/${slug}`} passHref>
            <Link sx={styles.plainAnchor}>
              <Card>
                <CardHeader
                  title={name}
                  titleTypographyProps={styles.cardHeaderTextPresentation}
                ></CardHeader>
                <CardMedia
                  component="img"
                  height="350"
                  image={images[0]}
                  alt={name}
                />
                <CardContent sx={styles.cardContentWrapper}>
                  {Boolean(oldPrice) ? (
                    <Box sx={styles.promo}>
                      <Typography sx={styles.oldPrice}>${oldPrice}</Typography>
                      <Typography sx={styles.percent}>
                        {Math.round((oldPrice - price) / (oldPrice / 100))}% Off
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={styles.grow}></Box>
                  )}
                  <Box>
                    <Typography sx={styles.actualPrice}>${price}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default Presentation;
