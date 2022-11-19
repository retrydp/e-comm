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

const PAGE_NAME = 'bags';

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
    <Layout title={PAGE_NAME}>
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
    page,
  } = ctx.query;

  const overallPrices = await Product.aggregate([
    { $match: { category: PAGE_NAME } },
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
    category: PAGE_NAME,
    brand: brand === 'all' || !brand ? { $exists: true } : brand,
    color: colors?.length ? colors : { $exists: true },
    price: {
      $gt: minQueryPrice || minPrice,
      $lt: maxQueryPrice || maxPrice,
    },
  };
  const productDocsWithNoFilters = await Product.find(queryParams).lean();
  const productsQuantity = productDocsWithNoFilters.map(
    db.convertDocToObj
  ).length;
  const DEFAULT_LIMIT = 12;
  const parseHandler = (param: string | string[]) => parseInt(param as string);
  const multiplyValues = parseHandler(quantity) * (parseHandler(page) - 1);
  const pagesToSkip = !isNaN(multiplyValues) ? multiplyValues : 0;
  const productDocs = await Product.find(queryParams)
    .lean()
    .limit(parseHandler(quantity) || DEFAULT_LIMIT)
    .skip(pagesToSkip);

  const uniqueValues = await Product.aggregate([
    { $match: { category: PAGE_NAME } },
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
