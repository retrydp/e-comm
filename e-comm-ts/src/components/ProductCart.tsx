import React from 'react';
import { GridItem } from './';

export const ProductCart: React.FC = (): JSX.Element => {
  return (
    <div className="goods">
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </div>
  );
};

export default ProductCart;
