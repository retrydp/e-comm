import React from 'react';
import { Layout, GoodsWrapper } from '../../components';
import { GoodsProps, NavTitles } from '../../utils/types';
import db from '../../utils/database';
import Product from '../../models/Product';
import { GetServerSideProps } from 'next';
import { useAppDispatch } from '../../store';
import {
  setMinMaxPrice,
  setAvailableBrands,
  setAvailableColors,
  setProductsQuantity,
} from '../../store/displayInterface';
import commonConst from '../../constants/common';

const CategoryPresentation: React.FC<GoodsProps & { category: NavTitles }> = ({
  goods,
  minPrice,
  maxPrice,
  availableColors,
  availableBrands,
  productsQuantity,
  category,
}) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setMinMaxPrice([minPrice, maxPrice]));
    dispatch(setAvailableBrands(availableBrands));
    dispatch(setAvailableColors(availableColors));
    dispatch(setProductsQuantity(productsQuantity));
  }, [minPrice, maxPrice, productsQuantity]);

  return (
    <Layout title={category}>
      <GoodsWrapper goods={goods} />
    </Layout>
  );
};

export default CategoryPresentation;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await db.dbConnect();
  const {
    brand,
    colors,
    minPrice: minQueryPrice,
    maxPrice: maxQueryPrice,
    quantity,
    page,
    sort,
    category,
  } = ctx.query;

  const validateCategory = (value: typeof category) => {
    const parsedCategory = commonConst.AVAILABLE_CATEGORIES.includes(
      value as string
    );

    return parsedCategory;
  };

  if (!validateCategory(category)) {
    return {
      notFound: true,
    };
  }

  const uniqueValues = await Product.aggregate([
    {
      $match: {
        category,
      },
    },
    {
      $group: {
        _id: null,
        availableColors: { $addToSet: '$color' },
        availableBrands: { $addToSet: '$brand' },
      },
    },
  ]);
  const { availableColors, availableBrands } = uniqueValues[0];

  const overallPrices = await Product.aggregate([
    { $match: { category } },
    {
      $group: {
        _id: null,
        maxValue: { $max: '$price' },
        minValue: { $min: '$price' },
      },
    },
  ]);

  const parseHandler = (param: string | string[]) => parseInt(param as string);

  const validateSorting = (value: string) => {
    if (!(value in commonConst.SORT_PARAMS)) {
      return commonConst.SORT_PARAMS['new'];
    }

    return commonConst.SORT_PARAMS[value];
  };

  const minPrice = Math.floor(overallPrices[0].minValue);
  const maxPrice = Math.floor(overallPrices[0].maxValue);

  const validatePrices = (value: string): number => {
    const validatedPrices = { minPrice, maxPrice };
    if (
      parseHandler(minQueryPrice) >= minPrice ||
      !isNaN(parseHandler(minQueryPrice))
    ) {
      validatedPrices.minPrice = parseHandler(minQueryPrice);
    }
    if (
      parseHandler(maxQueryPrice) <= maxPrice ||
      !isNaN(parseHandler(maxQueryPrice))
    ) {
      validatedPrices.maxPrice = parseHandler(maxQueryPrice);
    }

    return validatedPrices[value];
  };
  const validateBrand = (value: string) => {
    if (value === 'all' || !value || !availableBrands.includes(value)) {
      return { $exists: true };
    }

    return value;
  };
  const queryParams = {
    category,
    brand: validateBrand(brand as string),
    color: colors?.length ? colors : { $exists: true },
    price: {
      $gt: validatePrices('minPrice'),
      $lt: validatePrices('maxPrice'),
    },
  };
  const productDocsWithNoFilters = await Product.find(queryParams).lean();
  //calculate amount of products
  const productsQuantity = productDocsWithNoFilters.map(
    db.convertDocToObj
  ).length;
  const quantityFromQuery = quantity || commonConst.DEFAULT_LIMIT;
  const calculatedSkipLimit =
    parseHandler(quantityFromQuery) * (parseHandler(page) - 1);
  const pagesToSkip = !isNaN(calculatedSkipLimit) ? calculatedSkipLimit : 0;
  //query  to db
  const productDocs = await Product.find(queryParams)
    .lean()
    .sort(validateSorting(sort as string))
    .limit(parseHandler(quantityFromQuery))
    .skip(pagesToSkip);

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      goods: products,
      minPrice,
      maxPrice,
      availableColors,
      availableBrands,
      productsQuantity,
      category,
    },
  };
};
