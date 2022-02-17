import store from '../store';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SnackbarProvider>
    </>
  );
};

export default MyApp;
