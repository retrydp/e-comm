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
} from '@mui/material';
import React from 'react';
import styles from '../utils/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Layout } from '../components';
import shoeLogo from '../public/assets/img/columbia.jpg';
import NextLink from 'next/link';

type TabItemNames = 'all' | 'bags' | 'sneakers' | 'belts';

interface TabItems {
  name: TabItemNames;
  value: string;
}

const Index: React.FC = (): JSX.Element => {
  const [value, setValue] = React.useState<TabItemNames>('all');
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

  return (
    <>
      <Layout title="Home">
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
          <Grid container>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <NextLink href="/" passHref>
                <Link sx={styles.plainAnchor}>
                  <Card>
                    <CardHeader
                      title="FS - QUILTED MAXI CROSS BAG"
                      titleTypographyProps={styles.cardHeaderText}
                    ></CardHeader>
                    <CardMedia
                      component="img"
                      height="180"
                      image={shoeLogo.src}
                      alt="green iguana"
                    />
                    <CardContent sx={styles.cardContentWrapper}>
                      <Box sx={styles.promo}>
                        <Typography sx={styles.oldPrice}>$534,33</Typography>
                        <Typography sx={styles.percent}>24% Off</Typography>
                      </Box>
                      <Box>
                        <Typography sx={styles.actualPrice}>$299,43</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </NextLink>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <NextLink href="/" passHref>
                <Link sx={styles.plainAnchor}>
                  <Card>
                    <CardHeader
                      title="FS - QUILTED MAXI CROSS BAG"
                      titleTypographyProps={styles.cardHeaderText}
                    ></CardHeader>
                    <CardMedia
                      component="img"
                      height="180"
                      image={shoeLogo.src}
                      alt="green iguana"
                    />
                    <CardContent sx={styles.cardContentWrapper}>
                      <Box sx={styles.promo}>
                        <Typography sx={styles.oldPrice}>$534,33</Typography>
                        <Typography sx={styles.percent}>24% Off</Typography>
                      </Box>
                      <Box>
                        <Typography sx={styles.actualPrice}>$299,43</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </NextLink>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <NextLink href="/" passHref>
                <Link sx={styles.plainAnchor}>
                  <Card>
                    <CardHeader
                      title="FS - QUILTED MAXI CROSS BAG"
                      titleTypographyProps={styles.cardHeaderText}
                    ></CardHeader>
                    <CardMedia
                      component="img"
                      height="180"
                      image={shoeLogo.src}
                      alt="green iguana"
                    />
                    <CardContent sx={styles.cardContentWrapper}>
                      <Box sx={styles.promo}>
                        <Typography sx={styles.oldPrice}>$534,33</Typography>
                        <Typography sx={styles.percent}>24% Off</Typography>
                      </Box>
                      <Box>
                        <Typography sx={styles.actualPrice}>$299,43</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Link>
              </NextLink>
            </Grid>
          </Grid>
          <Typography variant="h3" sx={styles.sectionHeader}>
            BEST SELLER
          </Typography>
          <Box sx={styles.tabWrapper}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="secondary tabs example"
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
        </Container>
      </Layout>
    </>
  );
};

export default Index;
