import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
  Rating,
} from '@mui/material';
import React from 'react';
import styles from '../utils/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Layout } from '../components';
import NextLink from 'next/link';
import product from './product.json';
import { Presentation } from '../components';
import axios from 'axios';
import { ProductRequest, ProductResponse, ProductSchema } from '../utils/types';

type TabItemNames = 'all' | 'bags' | 'sneakers' | 'belts';

interface TabItems {
  name: TabItemNames;
  value: string;
}

const Index: React.FC = (): JSX.Element => {
  const [value, setValue] = React.useState<TabItemNames>('all');
  const [errorResponse, setErrorResponse] = React.useState<string>('');
  const [presentationData, setPresentationData] = React.useState<
    ProductSchema[]
  >([]);
  const sm = useMediaQuery('(min-width:600px)');
  const tabItems: TabItems[] = [
    { name: 'all', value: '/' },
    { name: 'bags', value: '/bags' },
    { name: 'sneakers', value: '/sneakers' },
    { name: 'belts', value: '/belts' },
  ];

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: TabItemNames
  ) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const goodsRequest = async () => {
      try {
        const { data } = await axios.get<{}, ProductResponse>(
          '/api/presentation'
        );
        setPresentationData(data.payload as ProductSchema[]);
      } catch (error: any) {
        setErrorResponse(error.message || error.toString());
      }
    };
    goodsRequest();
  }, []);

  return (
    <>
      <Layout title="home">
        {sm && (
          <Box sx={styles.banner}>
            <Container maxWidth="lg">
              <Typography sx={styles.bannerText} variant="h2">
                Super Flash Sale 50% Off
              </Typography>
            </Container>
          </Box>
        )}
        <Container maxWidth="lg">
          {errorResponse ? (
            <Typography sx={{ color: 'red' }}>{errorResponse}</Typography>
          ) : (
            <Presentation goods={presentationData} />
          )}

          <Typography variant="h3" sx={styles.sectionHeader}>
            BEST SELLER
          </Typography>
          <Box sx={styles.tabWrapper}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="secondary tabs"
              variant="scrollable"
            >
              {tabItems.map(({ name }) => (
                <Tab
                  key={name}
                  value={name}
                  label={name}
                  sx={styles.tabItem}
                ></Tab>
              ))}
            </Tabs>
          </Box>

          <Grid container spacing={3}>
            {product.map(({ title, rating, oldPrice, actualPrice, image }) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={title}>
                <NextLink href="/" passHref>
                  <Link sx={styles.plainAnchor}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="280"
                        image={image}
                        alt={title}
                      />
                      <CardHeader
                        title={title}
                        titleTypographyProps={{
                          ...styles.cardHeaderText,
                          ...styles.cartHeaderTextPos,
                        }}
                      ></CardHeader>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
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
                          <Box sx={styles.promo}>
                            <Typography sx={styles.oldPrice}>
                              ${oldPrice}
                            </Typography>
                            <Typography sx={styles.percent}>
                              {Math.round(
                                (oldPrice - actualPrice) / (oldPrice / 100)
                              )}
                              % off
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={styles.actualPrice}>
                              ${actualPrice}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  </Link>
                </NextLink>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Index;
