import React from 'react';
import { ProductCart } from './';

export const BestSeller = (): JSX.Element => {
  return (
    <div className="bestseller">
      <h2 className="bestseller__header common-header">Best seller</h2>
      <nav className="bestseller__navigation">
        <a href="/" className="bestseller__link bestseller__link_active">
          all
        </a>
        <a href="/" className="bestseller__link">
          bags
        </a>
        <a href="/" className="bestseller__link">
          sneakers
        </a>
        <a href="/"  className="bestseller__link">
          belt
        </a>
        <a href="/" className="bestseller__link">
          sunglasses
        </a>
      </nav>
      <ProductCart />
      <button className="bestseller__loadmore">load more</button>
    </div>
  );
};

export default BestSeller;
