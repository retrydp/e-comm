import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';

const Sneakers: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="Sneakers">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Sneakers;

export async function getServerSideProps() {
  await db.connect();
  const productDocs = await Product.find({
    category: 'shoes',
  }).lean();
  await db.disconnect();
  return {
    props: { goods: productDocs.map(db.convertDocToObj) },
  };
}
