import React from 'react';
import { CartItem } from './';

const Cart: React.FC = (): JSX.Element => {
  return (
    <div className="cart">
      <table className="cart-table">
        <thead className="cart-table__head">
          <tr className="cart-table__head-row">
            <th className="cart-table__head-item cart-table__head-item_product">product</th>
            <th className="cart-table__head-item">price</th>
            <th className="cart-table__head-item">qty</th>
            <th className="cart-table__head-item">unit price</th>
          </tr>
        </thead>
        <tbody>
          <CartItem />
          <CartItem />
        </tbody>
      </table>
      <div className="check-out">
        <div className="check-out__prices">
          <div className="check-out__prices-text">Subtotal</div>
          <div className="check-out__prices-value">$998</div>
        </div>
        <div className="check-out__prices">
          <div className="check-out__prices-text">Shippinf fee</div>
          <div className="check-out__prices-value">$20</div>
        </div>
        <div className="check-out__total">
          <div className="check-out__total-text">total</div>
          <div className="check-out__total-value">$118</div>
        </div>
        <button className="common-btn">Check out</button>
      </div>
    </div>
  );
};

export default Cart;
