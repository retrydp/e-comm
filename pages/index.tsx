import { Box, Container, Tab, Tabs, Typography } from '@mui/material';import React from 'react';
import styles from '../utils/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Layout, Module } from '../components';
import { Presentation } from '../components';
import axios, { AxiosResponse } from 'axios';
import { ProductSchema } from '../utils/types';

type TabItemNames = 'all' | 'bags' | 'sneakers' | 'belts';

interface TabItems {
  name: TabItemNames;
}

interface InnerPayload<T> {
  productRandom: T[];
  bestOfAll: T[];
  bestOfBelts: T[];
  bestOfBags: T[];
  bestOfSneakers: T[];
}

interface ProductPayload
  extends AxiosResponse<{
    payload: InnerPayload<ProductSchema>;
  }> {}

const Index: React.FC = (): JSX.Element => {
  const [value, setValue] = React.useState<TabItemNames>('all');
  const [errorResponse, setErrorResponse] = React.useState<string>('');
  const [presentationData, setPresentationData] =
    React.useState<InnerPayload<ProductSchema>>();
  const sm = useMediaQuery('(min-width:600px)');
  const tabItems: TabItems[] = [
    { name: 'all' },
    { name: 'bags' },
    { name: 'sneakers' },
    { name: 'belts' },
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
        const { data } = await axios.get<{}, ProductPayload>(
          '/api/presentation'
        );
        setPresentationData(data.payload);
      } catch (error: any) {
        setErrorResponse(error.message || error.toString());
      }
    };
    goodsRequest();
  }, []);

  const tabMap = {
    all: presentationData?.bestOfAll || [],
    bags: presentationData?.bestOfBags || [],
    sneakers: presentationData?.bestOfSneakers || [],
    belts: presentationData?.bestOfBelts || [],
  };

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
        {presentationData && (
          <Container maxWidth="lg">
            <Presentation goods={presentationData.productRandom} />{' '}
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
            <Module products={tabMap[value]} />
          </Container>
        )}
      </Layout>
    </>
  );
};

export default Index;
