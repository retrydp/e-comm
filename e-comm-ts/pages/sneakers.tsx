import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';
import data from '../utils/data';

const Sneakers: React.FC<GoodsProps> = ({ goods }) => {
  return (
    <Layout title="Sneakers">
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Sneakers;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // await db.connect();
  // const productDocs = await Product.find({
  //   category: 'shoes',
  // }).lean();
  // await db.disconnect();

  // const products = productDocs.map(db.convertDocToObj);
  // return {
  //   props: { goods: products },
  // };
  return {
    props: { goods: data.products },
  };
};
