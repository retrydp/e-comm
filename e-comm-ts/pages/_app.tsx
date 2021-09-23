import '../styles/index.scss';
import { Header, HeadNavigation, Footer } from '../components';

import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <Header />
      <HeadNavigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
