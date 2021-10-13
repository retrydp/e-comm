import React from 'react';
import { ProductList } from '../components';
import { useRouter, NextRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps, GetStaticPropsResult } from 'next';
import { Products, ProductProps } from '../types';
import { string } from 'yup';

const ProductWrapper: React.FC<ProductProps> = ({ routerQueryType }): JSX.Element => {
  const router: NextRouter = useRouter();
  const availableProducts: Products = ['bags', 'sneakers', 'belts'];

  React.useEffect(() => {
    if (!availableProducts.includes(routerQueryType as string) && router.isReady) router.push('/');
  }, [router]);

  return (
    <>
      <Head>
        <title>{(routerQueryType as string).toUpperCase()}</title>
      </Head>
      <ProductList />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { routerQueryType: context.query },
  };
};

export default ProductWrapper;
