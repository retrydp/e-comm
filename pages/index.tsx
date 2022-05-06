import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import styles from '../utils/styles';
import { Layout, Module } from '../components';
import { ModulePlaceholder } from '../components';
import axios from 'axios';
import { AppResponse, InnerPayload, ProductSchema } from '../utils/types';
import apiRoutes from '../constants/apiRoutes';
import { useSharedContext } from '../context/SharedContext';

type TabItemNames = 'all' | 'bags' | 'sneakers' | 'belts';

interface TabItems {
  name: TabItemNames;
}

const Index: React.FC = (): JSX.Element => {
  const { smMin } = useSharedContext();
  const [value, setValue] = React.useState<TabItemNames>('all');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [presentationData, setPresentationData] =
    React.useState<InnerPayload<ProductSchema>>();

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
