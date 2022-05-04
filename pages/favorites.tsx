import React from 'react';import { Layout, List } from '../components';
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
import { useRouter } from 'next/router';
import { AppResponse, ProductSchema } from '../utils/types';
import { favoritesFetch, favoritesSetLoading } from '../store/favorites';
import Image from 'next/image';
import NextLink from 'next/link';
import { ArrowBack } from '@mui/icons-material';

const Favorites: React.FC = () => {
  const { snackbar, userInfo } = useSharedContext();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    favorites: { favoritesData, favoritesLoading },
  } = useAppSelector((store) => store);

  React.useEffect(() => {
    if (!userInfo) {
      snackbar('Please login to view favorites.', {
        variant: 'error',
      });
      router.push(`/login?redirect=${router.pathname}`);
      return;
    } else {
      const fetchFavorites = async () => {
        dispatch(favoritesSetLoading(true));
        const { data } = await axios.get<null, AppResponse<ProductSchema[]>>(
          `/api/users/favorite`,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        dispatch(favoritesFetch(data.payload));
        dispatch(favoritesSetLoading(false));
      };
      fetchFavorites();
    }
  }, []);

  return (
    <NoSsr>
      <Layout title="home" customTitle="Favorites">
        {favoritesLoading ? (
          <CircularProgress sx={{ margin: '0 auto' }} />
        ) : favoritesData?.length > 0 ? (
          <Container maxWidth="lg" sx={{ mb: '15px' }}>
            <Typography variant="h4" sx={{ padding: '15px 0' }}>
              Your favorites:
            </Typography>
            <List products={favoritesData} favoritesModeAccept={false}></List>
          </Container>
        ) : (
          <Container
            maxWidth="lg"
            sx={{
              mb: '15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '50px',
              gap: '15px',
            }}
          >
            <Image
              src="https://res.cloudinary.com/retrydp/image/upload/v1651472271/wc7b9db7dbmlsujffqiv.png"
              alt="favorites is empty"
              priority={true}
              width={300}
              height={300}
            ></Image>
            <Typography sx={{ textAlign: 'left' }}>
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
