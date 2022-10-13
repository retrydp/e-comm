import React from 'react';import { Layout, GoodsWrapper } from '../components';
import { GoodsProps } from '../utils/types';
import db from '../utils/database';
import Product from '../models/Product';
import { GetServerSideProps } from 'next';
import { useAppDispatch } from '../store';
import {
  setMinMaxPrice,
  setAvailableBrands,
  setAvailableColors,
} from '../store/displayInterface';
import { isNull } from 'lodash';

const PAGE = 'bags';

const Bags: React.FC<GoodsProps> = ({
  goods,
  minPrice,
  maxPrice,
  availableColors,
  availableBrands,
}) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setMinMaxPrice([minPrice, maxPrice]));
    dispatch(setAvailableBrands(availableBrands));
    dispatch(setAvailableColors(availableColors));
  }, []);

  return (
    <Layout title={PAGE}>
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Bags;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await db.dbConnect();
  console.log(ctx);
  const { brand, colors } = ctx.query;

  const productDocs = await Product.find({
    category: `${PAGE}`,
    brand: brand === 'all' || !brand ? { $exists: true } : brand,
    color: colors?.length ? colors : { $exists: true },
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
  const uniqueValues = await Product.aggregate([
    { $match: { category: `${PAGE}` } },
    {
      $group: {
        _id: null,
        availableColors: { $addToSet: '$color' },
        availableBrands: { $addToSet: '$brand' },
      },
    },
  ]);
  const { availableColors, availableBrands } = uniqueValues[0];
  const minPrice = Math.floor(prices[0].minValue);
  const maxPrice = Math.floor(prices[0].maxValue);

  const products = productDocs.map(db.convertDocToObj);
  return {
    props: {
      goods: products,
      minPrice,
      maxPrice,
      availableColors,
      availableBrands,
    },
  };
};
