import React from 'react';
import { ExtendedItem } from './';

const ProductCartLine: React.FC = (): JSX.Element => {
  return (
    <div className="goods-line">
      <ExtendedItem />
      <ExtendedItem />
      <ExtendedItem />
    </div>
  );
};

export default ProductCartLine;
