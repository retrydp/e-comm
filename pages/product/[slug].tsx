import React from 'react';
import { GetServerSideProps } from 'next';
import db from '../../utils/database';
import Product from '../../models/Product';
import { ProductSchema } from '../../models/Product';
import { Layout } from '../../components';

interface ProductScreenProps {
  product?: ProductSchema;
}
type AlowedCategories = 'Bags' | 'Sneakers' | 'Belts';

const ProductScreen: React.FC<ProductScreenProps> = ({ product }) => {
  return (
    <Layout
      customTitle={product?.name || 'Product not found'}
      title={
        product
          ? ((product.category[0].toUpperCase() +
              product.category.slice(1)) as AlowedCategories)
          : 'Home'
      }
    >
      {JSON.stringify(product) || 'Product not found'}
    </Layout>
  );
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  await db.connect();
  const productDoc = await Product.findOne({
    slug,
  }).lean();
  await db.disconnect();
  if (productDoc) {
    const product = db.convertDocToObj(productDoc);
    return {
      props: { product },
    };
  }
  return {
    props: {},
  };
};
