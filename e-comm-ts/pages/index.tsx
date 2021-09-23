import React from 'react';

import { Header, HeadNavigation, Home, Footer, ProductList, Product, Cart } from '../components';

const Index = (): JSX.Element => {
  return (
    <>
      <Header />
      <HeadNavigation />
      <Home />
      <ProductList />
      <Product />
      <Cart />
      <Footer />
    </>
  );
};

export default Index;
