import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';

const Sneakers: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="sneakers">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Sneakers;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.dbConnect();
  const productDocs = await Product.find({
    category: 'sneakers',
  }).lean();

  const products = productDocs.map(db.convertDocToObj);
  return {
    props: { goods: products },
  };
};
