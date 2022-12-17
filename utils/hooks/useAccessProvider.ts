import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useInform from './useInform';

const useAccessProvider = () => {
  const { data } = useSession();
  const router = useRouter();
  const { snackbarError } = useInform();
  const onNotAdmin = () => {
    if (!data?.user?.isAdmin) router.push('/');
  };

  const onNotLoggedIn = <T>(message: T) => {
    snackbarError(message);
    router.push(`/login?redirect=${router.asPath}`);
  };

  return { onNotAdmin, onNotLoggedIn };
};

export default useAccessProvider;
