import React from 'react';
import { Layout, List } from '../components';
import {
  Button,
  CircularProgress,
  Container,
  NoSsr,
  Typography,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store';
import { useSharedContext } from '../context/SharedContext';
import axios from 'axios';
import { AppResponse, ProductSchema } from '../utils/types';
import { favoritesFetch, favoritesSetLoading } from '../store/favorites';
import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import apiRoutes from '../constants/apiRoutes';
import notificationMessages from '../constants/notificationMessages';
import { useSession } from 'next-auth/react';
import styles from 'utils/styles';

const Favorites: React.FC = () => {
  const { onNotLoggedIn } = useSharedContext();
  const dispatch = useAppDispatch();
  const {
    favorites: { favoritesData, favoritesLoading },
  } = useAppSelector((store) => store);

  const { data } = useSession();

  React.useEffect(() => {
    if (!data?.user)
      return onNotLoggedIn(notificationMessages.FAVORITES_GET_NOT_LOGGED);
    const fetchFavorites = async () => {
      dispatch(favoritesSetLoading(true));
      const { data } = await axios.get<null, AppResponse<ProductSchema[]>>(
        apiRoutes.USER_FAVORITE
      );
      dispatch(favoritesFetch(data.payload));
      dispatch(favoritesSetLoading(false));
    };
    fetchFavorites();
  }, []);

  return (
    <NoSsr>
      <Layout title="home" customTitle="Favorites">
        {favoritesLoading ? (
          <CircularProgress sx={styles.mCenter} />
        ) : favoritesData?.length > 0 ? (
          <Container maxWidth="lg" sx={styles.mb15}>
            <Typography variant="h4" sx={styles.defaultP}>
              Your favorites:
            </Typography>
            <List products={favoritesData} favoritesModeAccept={false}></List>
          </Container>
        ) : (
          <Container maxWidth="lg" sx={styles.favoritesContainer}>
            <Image
              src="https://res.cloudinary.com/retrydp/image/upload/v1651472271/wc7b9db7dbmlsujffqiv.png"
              alt="favorites is empty"
              priority={true}
              width={300}
              height={300}
            ></Image>
            <Typography sx={styles.textLeft}>
              Your favorites is empty&nbsp;
            </Typography>
            <NextLink href="/" passHref>
              <Button
                component="a"
                variant="contained"
                startIcon={<ArrowBack />}
              >
                go shopping
              </Button>
            </NextLink>
          </Container>
        )}
      </Layout>
    </NoSsr>
  );
};

export default Favorites;
