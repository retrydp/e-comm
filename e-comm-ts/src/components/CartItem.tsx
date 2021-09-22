import React from 'react';
import nike from '../assets/img/nike.png';

export const CartItem: React.FC = (): JSX.Element => {
  return (
    <tr className="cart-table__row">
      <td className="cart-table__item">
        <div className="cart-table__wrapper">
          <button className="cart-table__delete">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.62438 0.739028L8.86523 0.0319214L0.514619 7.8101L1.27377 8.5172L9.62438 0.739028Z" fill="#FF4252" />
              <path d="M8.86488 8.51701L9.62402 7.80991L1.27341 0.0317315L0.514261 0.738838L8.86488 8.51701Z" fill="#FF4252" />
            </svg>
          </button>
          <img src={nike} alt="" className="cart-table__img" />
          <div className="cart-table__name">Nike Airmax 270 react</div>
        </div>
      </td>
      <td className="cart-table__totalprice">$998</td>
      <td className="cart-table__qty">
        {/* common counter */}
        <div className="counter adapt">
          <button className="counter-btn counter-btn_clickable">
            <svg width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0067 0.19429H0.633789V2.32094H11.0067V0.19429Z" fill="#33A0FF" />
            </svg>
          </button>
          <button className="counter-btn">2</button>
          <button className="counter-btn counter-btn_clickable">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9559 3.19429H0.583008V5.32094H10.9559V3.19429Z" fill="#33A0FF" />
              <path d="M7.06543 8.51094L7.06543 0.00428772L4.47219 0.00428772V8.51094H7.06543Z" fill="#33A0FF" />
            </svg>
          </button>
        </div>
        {/* common counter */}
      </td>
      <td className="cart-table__price">$499</td>
    </tr>
  );
};
export default CartItem;
