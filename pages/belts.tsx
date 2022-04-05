import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';

const Belts: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="belts">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Belts;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.dbConnect();
  const productDocs = await Product.find({
    category: 'belts',
  }).lean();

  const products = productDocs.map(db.convertDocToObj);
  return {
    props: { goods: products },
  };
};
