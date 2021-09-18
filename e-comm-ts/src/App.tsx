import React from 'react';

import { Header, HeadNavigation, Home, Footer, ProductList, Product } from './components';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <HeadNavigation />
      <Home />
      <ProductList />
      <Product />
      <Footer />
    </>
  );
};

export default App;
