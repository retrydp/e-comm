import '../styles/index.scss';
import { Header, HeadNavigation, Footer } from '../components';
import { NextRouter, useRouter } from 'next/router';

import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const router: NextRouter = useRouter();

  if (router.pathname === '/admin')
    return (
      <main>
        <Component {...pageProps} />
      </main>
    );

  return (
    <>
      <Header />
      <HeadNavigation />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};

export default MyApp;
