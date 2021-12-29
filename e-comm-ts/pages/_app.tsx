// import '../styles/index.scss';
// import { Header, HeadNavigation, Footer } from '../components';
// import { useRouter } from 'next/router';
import store from '../store';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  // const router = useRouter();

  // if (router.pathname === '/admin')
  //   return (
  //     <main>
  //       <Component {...pageProps} />
  //     </main>
  //   );

  return (
    <>
      <Provider store={store}>
        {/* <Header />
        <HeadNavigation />
        <main> */}
        <Component {...pageProps} />
        {/* </main>
        <Footer /> */}
      </Provider>
    </>
  );
};

export default MyApp;
