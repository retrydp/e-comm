import React from 'react';
import { ProductList } from '../components';
import { useRouter, NextRouter } from 'next/router';
import Head from 'next/head';
import { GetServerSideProps, GetStaticPropsResult } from 'next';
import { Products, ProductProps } from '../types';

const ProductWrapper: React.FC<ProductProps> = ({ routerQueryType }): JSX.Element => {
  const router: NextRouter = useRouter();
  const availableProducts: Products = ['bags', 'sneakers', 'belts'];

  React.useEffect(() => {
    if (!availableProducts.includes(routerQueryType) && router.isReady) router.push('/');
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{routerQueryType.toUpperCase()}</title>
      </Head>
      <ProductList />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context): Promise<GetStaticPropsResult<ProductProps>> => {
  const { type } = context.query;

  return {
    props: { routerQueryType: type as string },
  };
};
export default ProductWrapper;