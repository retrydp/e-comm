import React from 'react';
import { useSnackbar } from 'notistack';
import { useAppSelector } from '../store';
import { RootState } from '../store';
import { useRouter } from 'next/router';

interface AppContextInterface {
  snackbar: ReturnType<typeof useSnackbar>['enqueueSnackbar'];
  userInfo: RootState['authStore']['userInfo'];
  onNotAdmin: () => void;
}

interface SharedContextProps {
  children: React.ReactNode;
}

const Context = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const SharedContext: React.FC<SharedContextProps> = ({ children }) => {
  const router = useRouter();
  const { enqueueSnackbar: snackbar } = useSnackbar();
  const {
    authStore: { userInfo },
  } = useAppSelector((store) => store);

  const onNotAdmin = () => {
    if (!userInfo?.isAdmin) router.push('/');
  };

  return (
    <Context.Provider value={{ snackbar, userInfo, onNotAdmin }}>
      {children}
    </Context.Provider>
  );
};

export const useSharedContext = () => React.useContext(Context);
