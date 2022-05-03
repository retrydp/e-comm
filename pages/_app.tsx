import store from '../store';
import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </Provider>
    </>
  );
};

export default MyApp;
