import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import styles from '../utils/styles';
const ModulePlaceholder = dynamic(
  () => import('../components/ModulePlaceholder')
);
const Layout = dynamic(() => import('../components/Layout'));
const Module = dynamic(() => import('../components/Module'));
import axios from 'axios';
import { AppResponse, InnerPayload, ProductSchema } from '../utils/types';
import apiRoutes from '../constants/apiRoutes';
import { useAppMedia } from '../utils/hooks';

const tabItems = [
  { name: 'all' },
  { name: 'bags' },
  { name: 'sneakers' },
  { name: 'belts' },
] as const;

const Index: React.FC = (): JSX.Element => {
  const { smMin } = useAppMedia();
  const [value, setValue] =
    React.useState<typeof tabItems[number]['name']>('all');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [presentationData, setPresentationData] =
    React.useState<InnerPayload<ProductSchema>>();

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: typeof tabItems[number]['name']
  ) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const goodsRequest = async () => {
      setLoading(true);
      const { data } = await axios.get<null, AppResponse<InnerPayload>>(
        apiRoutes.USER_PRESENTATION
      );
      setPresentationData(data.payload);
      setLoading(false);
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
        {smMin && (
          <Box sx={styles.banner}>
            <Container maxWidth="lg">
              <Typography sx={styles.bannerText} variant="h2">
                Super Flash Sale 50% Off
              </Typography>
            </Container>
          </Box>
        )}
        <Container maxWidth="lg">
          {loading ? (
            <ModulePlaceholder displayCount={3} />
          ) : (
            presentationData && (
              <Module products={presentationData.productRandom} />
            )
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
          {loading ? (
            <ModulePlaceholder displayCount={3} />
          ) : (
            <Module products={tabMap[value]} />
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Index;
