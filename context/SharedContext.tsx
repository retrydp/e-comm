import React from 'react';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '../store';
import { RootState } from '../store';
import { useRouter } from 'next/router';
import axios, { AxiosRequestConfig } from 'axios';
import apiRoutes from '../constants/apiRoutes';
import { useMediaQuery } from '@mui/material';
import notificationMessages from '../constants/notificationMessages';

interface AppContextInterface {
  userInfo: RootState['authStore']['userInfo'];
  onNotAdmin: () => void;
  addFavoriteHandler: (id: string) => Promise<void>;
  smMin: boolean;
  smMax: boolean;
  mdMin: boolean;
  mdMax: boolean;
  smList: boolean;
  onNotLoggedIn: (message: string) => void;
  snackbarSuccess: (message: string) => void;
  snackbarError: (message: string) => void;
  authHeader: AxiosRequestConfig<any>;
  authHeaderForm: AxiosRequestConfig<any>;
}

interface SharedContextProps {
  children: React.ReactNode;
}

const Context = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const SharedContext: React.FC<SharedContextProps> = ({ children }) => {
  const smMin = useMediaQuery('(min-width:600px)');
  const smMax = useMediaQuery('(max-width:600px)');
  const mdMin = useMediaQuery('(min-width:900px)');
  const mdMax = useMediaQuery('(max-width:900px)');
  const smList = useMediaQuery('(max-width:670px)');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);

  const onNotAdmin = () => {
    if (!userInfo?.isAdmin) router.push('/');
  };

  const snackbarSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const snackbarError = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const onNotLoggedIn = <T extends string>(message: T) => {
    snackbarError(message);
    router.push(`/login?redirect=${router.asPath}`);
  };

  const authHeader = {
    headers: { authorization: `Bearer ${userInfo?.token}` },
  };

  const authHeaderForm = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${userInfo?.token}`,
    },
  };

  /**
   * Add product to user's favorites list. If user is not logged in,
   * redirect to login page.
   * @param id slug of product
   */
  const addFavoriteHandler = async (id: string) => {
    if (!userInfo)
      return onNotLoggedIn(notificationMessages.FAVORITES_ADD_NOT_LOGGED);
    try {
      await axios.put(apiRoutes.USER_FAVORITE, { id }, authHeader);
      snackbarSuccess(notificationMessages.FAVORITES_ADD_SUCCESS);
    } catch (error: any) {
      snackbarError(`${error.response.data.message || error.toString()}`);
    }
  };

  return (
    <Context.Provider
      value={{
        mdMin,
        mdMax,
        smMin,
        smMax,
        smList,
        userInfo,
        authHeader,
        authHeaderForm,
        addFavoriteHandler,
        onNotAdmin,
        onNotLoggedIn,
        snackbarError,
        snackbarSuccess,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useSharedContext = () => React.useContext(Context);
