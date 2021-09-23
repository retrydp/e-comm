import React from 'react';
import { ProductList } from '../components';
import { useRouter } from 'next/router';
import Head from 'next/head';

type Products = string[];

const ProductWrapper: React.FC = (): JSX.Element => {
  const router = useRouter();
  const availableProducts: Products = ['bags', 'sneakers', 'belts'];
  const productTypeFromUrl: string = router.query.type as string;

  React.useEffect(() => {
    if (!availableProducts.includes(productTypeFromUrl) && router.isReady) router.push('/');
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{productTypeFromUrl}</title>
      </Head>
      <ProductList />
    </>
  );
};

export default ProductWrapper;
