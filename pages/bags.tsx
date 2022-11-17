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
  setProductsQuantity,
} from '../store/displayInterface';

const PAGE = 'bags';

const Bags: React.FC<GoodsProps> = ({
  goods,
  minPrice,
  maxPrice,
  availableColors,
  availableBrands,
  productsQuantity,
}) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setMinMaxPrice([minPrice, maxPrice]));
    dispatch(setAvailableBrands(availableBrands));
    dispatch(setAvailableColors(availableColors));
    dispatch(setProductsQuantity(productsQuantity));
  }, [minPrice, maxPrice, productsQuantity]);
  return (
    <Layout title={PAGE}>
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default Bags;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await db.dbConnect();
  const {
    brand,
    colors,
    minPrice: minQueryPrice,
    maxPrice: maxQueryPrice,
    quantity,
  } = ctx.query;

  const overallPrices = await Product.aggregate([
    { $match: { category: PAGE } },
    {
      $group: {
        _id: null,
        maxValue: { $max: '$price' },
        minValue: { $min: '$price' },
      },
    },
  ]);

  const minPrice = Math.floor(overallPrices[0].minValue);
  const maxPrice = Math.floor(overallPrices[0].maxValue);
  const queryParams = {
    category: PAGE,
    brand: brand === 'all' || !brand ? { $exists: true } : brand,
    color: colors?.length ? colors : { $exists: true },
    price: {
      $gt: minQueryPrice || minPrice,
      $lt: maxQueryPrice || maxPrice,
    },
  };

  const productDocsWithNoFilters = await Product.find(queryParams).lean();

  const productDocs = await Product.find(queryParams)
    .lean()
    .limit(parseInt(quantity as string) || 12);

  const uniqueValues = await Product.aggregate([
    { $match: { category: PAGE } },
    {
      $group: {
        _id: null,
        availableColors: { $addToSet: '$color' },
        availableBrands: { $addToSet: '$brand' },
      },
    },
  ]);
  const { availableColors, availableBrands } = uniqueValues[0];

  const products = productDocs.map(db.convertDocToObj);
  const productsQuantity = productDocsWithNoFilters.map(
    db.convertDocToObj
  ).length;
  return {
    props: {
      goods: products,
      minPrice,
      maxPrice,
      availableColors,
      availableBrands,
      productsQuantity,
    },
  };
};
