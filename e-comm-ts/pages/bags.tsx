import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';

const Bags: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="Bags">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Bags;

export async function getStaticProps() {
  await db.connect();
  const productDocs = await Product.find({
    category: 'bags',
  }).lean();
  await db.disconnect();
  return {
    props: { goods: productDocs.map(db.convertDocToObj) },
  };
}
