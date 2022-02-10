import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';

const Sneakers: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="Sneakers">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Sneakers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await db.connect();
  const productDocs = await Product.find({
    category: 'shoes',
  }).lean();
  await db.disconnect();
  if (Object(productDocs).keys.length === 0) {
    return {
      notFound: true,
    };
  }
  const products = productDocs.map(db.convertDocToObj);
  return {
    props: { goods: products },
  };
};
