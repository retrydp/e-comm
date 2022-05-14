import React from 'react';
import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';
import { useAppDispatch } from '../store';
import { setMinMaxPrice, setSliderValue } from '../store/displayInterface';

const PAGE = 'sneakers';

const Sneakers: React.FC<GoodsProps> = ({ goods, minPrice, maxPrice }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setMinMaxPrice([minPrice, maxPrice]));
    dispatch(setSliderValue([minPrice, maxPrice]));
  }, []);

  return (
    <Layout title={PAGE}>
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Sneakers;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.dbConnect();
  const productDocs = await Product.find({
    category: `${PAGE}`,
  }).lean();
  const prices = await Product.aggregate([
    { $match: { category: `${PAGE}` } },
    {
      $group: {
        _id: null,
        maxValue: { $max: '$price' },
        minValue: { $min: '$price' },
      },
    },
  ]);
  const minPrice = Math.floor(prices[0].minValue);
  const maxPrice = Math.floor(prices[0].maxValue);

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      goods: products,
      minPrice,
      maxPrice,
    },
  };
};
