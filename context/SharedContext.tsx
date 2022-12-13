import React from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import axios from 'axios';
import apiRoutes from '../constants/apiRoutes';
import { useMediaQuery } from '@mui/material';
import notificationMessages from '../constants/notificationMessages';
import { isAxiosError } from '../utils/errorHandler';
import { useSession } from 'next-auth/react';

interface AppContextInterface {
  onNotAdmin: () => void;
  addFavoriteHandler: (id: string) => Promise<void>;
  smMin: boolean;
  mdMin: boolean;
  mdMax: boolean;
  smList: boolean;
  onNotLoggedIn: <T>(message: T) => void;
  snackbarSuccess: <T>(message: T) => void;
  snackbarError: <T>(message: T) => void;
  filterQuery: (queryOpts: Record<string, string | string[]>) => void;
}

interface SharedContextProps {
  children: React.ReactNode;
}

const Context = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const SharedContext: React.FC<SharedContextProps> = ({ children }) => {
  const smMin = useMediaQuery('(min-width:600px)');
  const smList = useMediaQuery('(max-width:670px)');
  const mdMin = useMediaQuery('(min-width:900px)');
  const mdMax = useMediaQuery('(max-width:900px)');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSession();

  const onNotAdmin = () => {
    if (!data?.user?.isAdmin) router.push('/');
  };

  const snackbarSuccess = <T,>(message: T) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const snackbarError = <T,>(message: T) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const onNotLoggedIn = <T,>(message: T) => {
    snackbarError(message);
    router.push(`/login?redirect=${router.asPath}`);
  };

  /**
   * Add product to user's favorites list. If user is not logged in,
   * redirect to login page.
   * @param id slug of product
   */
  const addFavoriteHandler = async (id: string) => {
    if (!data?.user)
      return onNotLoggedIn(notificationMessages.FAVORITES_ADD_NOT_LOGGED);
    try {
      await axios.put(apiRoutes.USER_FAVORITE, { id });
      snackbarSuccess(notificationMessages.FAVORITES_ADD_SUCCESS);
    } catch (error: unknown) {
      if (isAxiosError<{ message: string }>(error))
        snackbarError(`${error.response?.data.message}`);
      else {
        snackbarError(`Unexpected error`);
      }
    }
  };

  const filterQuery = (queryOpts: Record<string, string | string[]>) => {
    const path = router.pathname;
    const currentQuery = router.query;

    setTimeout(() => {
      router.push({
        // TODO: push without scrolling to top https://stackoverflow.com/questions/65902664/next-js-router-push-without-scrolling-to-the-top
        pathname: path,
        query: { ...currentQuery, ...queryOpts },
      });
    }, 0.5);
  };

  return (
    <Context.Provider
      value={{
        mdMin,
        mdMax,
        smMin,
        smList,

        addFavoriteHandler,
        onNotAdmin,
        onNotLoggedIn,
        snackbarError,
        snackbarSuccess,
        filterQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSharedContext = () => React.useContext(Context);
