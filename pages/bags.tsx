import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';

const Bags: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="bags">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Bags;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.dbConnect();
  const productDocs = await Product.find({
    category: 'bags',
  }).lean();

  const products = productDocs.map(db.convertDocToObj);
  return {
    props: { goods: products },
  };
};
