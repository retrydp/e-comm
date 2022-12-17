import { useSnackbar } from 'notistack';

const useInform = () => {
  const { enqueueSnackbar } = useSnackbar();
  const snackbarSuccess = <T>(message: T) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const snackbarError = <T>(message: T) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  return { snackbarError, snackbarSuccess };
};

export default useInform;
