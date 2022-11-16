import store from '../store';import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { SharedContext } from '../context/SharedContext';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../config/createEmotionCache';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FC<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <SharedContext>
            <Component {...pageProps} />
          </SharedContext>
        </SnackbarProvider>
      </Provider>
    </CacheProvider>
  );
};

export default MyApp;
