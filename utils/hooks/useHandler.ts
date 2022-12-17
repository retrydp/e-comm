import axios from 'axios';
import apiRoutes from 'constants/apiRoutes';
import notificationMessages from 'constants/notificationMessages';
import { useSession } from 'next-auth/react';
import { isAxiosError } from 'utils/errorHandler';
import useAccessProvider from './useAccessProvider';
import useInform from './useInform';

const useHandler = () => {
  const { data } = useSession();
  const { onNotLoggedIn } = useAccessProvider();
  const { snackbarError, snackbarSuccess } = useInform();
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

  return { addFavoriteHandler };
};

export default useHandler;
