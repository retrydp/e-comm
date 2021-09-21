import React from 'react';
import shoe from '../assets/img/shoe.png';
import { ProductCart, Slider, ProductCartLine } from './';

export const ProductList = (): JSX.Element => {
  return (
    <div className="product-list">
      <aside className="side-panel">
        <div className="brand-list">
          <h3 className="brand-list__text">brand</h3>
          <div className="brand-list__wrapper brand-list__wrapper_active">
            <div className="brand-list__company">Adidas</div>
            <div className="brand-list__goods-count">1</div>
          </div>

          <div className="brand-list__wrapper">
            <div className="brand-list__company">Nike</div>
            <div className="brand-list__goods-count">2</div>
          </div>

          <div className="brand-list__wrapper">
            <div className="brand-list__company">Puma</div>
            <div className="brand-list__goods-count">3</div>
          </div>
        </div>
        <div className="price-picker">
          <h3 className="price-picker__text">prices</h3>
          <div className="price-picker__ranger">
            <span>Ranger:</span>
            <div className="price-picker__available-prices">$13.99 - $25.99</div>
          </div>
          <Slider />
        </div>
        {/* Color picker element styles */}
        <div className="color-picker">
          <div className="color-picker__text">color</div>
          <div className="color-picker__wrapper">
            <input className="color-picker__input" type="radio" id="colorpick2" name="colorpick" value="red" defaultChecked />
            <label htmlFor="colorpick2" className="color-picker__actual" style={{ backgroundColor: 'red' }}></label>

            <input className="color-picker__input" type="radio" id="colorpick1" name="colorpick" value="blue" />
            <label htmlFor="colorpick1" className="color-picker__actual" style={{ backgroundColor: 'blue' }}></label>

            <input className="color-picker__input" type="radio" id="colorpick3" name="colorpick" value="black" />
            <label htmlFor="colorpick3" className="color-picker__actual" style={{ backgroundColor: 'black' }}></label>

            <input className="color-picker__input" type="radio" id="colorpick4" name="colorpick" value="yellow" />
            <label htmlFor="colorpick4" className="color-picker__actual" style={{ backgroundColor: 'yellow' }}></label>

            <input className="color-picker__input" type="radio" id="colorpick5" name="colorpick" value="purple" />
            <label htmlFor="colorpick5" className="color-picker__actual" style={{ backgroundColor: 'purple' }}></label>

            <input className="color-picker__input" type="radio" id="colorpick6" name="colorpick" value="grey" />
            <label htmlFor="colorpick6" className="color-picker__actual" style={{ backgroundColor: 'grey' }}></label>
          </div>
        </div>
        {/* Color picker element styles */}
      </aside>
      <main className="main-list-content">
        {/* banner used in common */}
        <div className="shopbanner shopbanner_inner">
          <div className="shopbanner__wrapper shopbanner__wrapper_inner">
            <h2 className="shopbanner__header">Adidas Men Running Sneakers</h2>
            <p className="shopbanner__text">Performance and design. Taken right to the edge.</p>
            <button className="shopbanner__btn">shop now</button>
          </div>
          <img src={shoe} alt="" className="shopbanner__img" />
        </div>
        {/* banner used in common */}
        <div className="sortbar">
          <div className="sortbar__selection-items">
            <div className="sortbar__total-count">13 items</div>
            <div className="sortbar__sort-by-name">
              Sort By
              <select className="sortbar__select">
                <option>Name</option>
              </select>
            </div>
            <div className="sortbar__show-count">
              Show
              <select className="sortbar__select">
                <option>12</option>
              </select>
            </div>
          </div>
          <div className="view-change">
            <button className="view-change__btn view-change__btn_grid view-change__btn_active">
              <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29894 0.83374H0.87793V4.83374H5.29894V0.83374Z" fill="#C1C8CE" />
                <path d="M5.29894 8.83374H0.87793V12.8337H5.29894V8.83374Z" fill="#C1C8CE" />
                <path d="M5.29894 16.8337H0.87793V20.8337H5.29894V16.8337Z" fill="#C1C8CE" />
                <path d="M14.1417 0.83374H9.7207V4.83374H14.1417V0.83374Z" fill="#C1C8CE" />
                <path d="M14.1417 8.83374H9.7207V12.8337H14.1417V8.83374Z" fill="#C1C8CE" />
                <path d="M9.7207 16.8337H14.1417V20.8337H9.7207V16.8337Z" fill="#C1C8CE" />
                <path d="M22.9835 0.83374H18.5625V4.83374H22.9835V0.83374Z" fill="#C1C8CE" />
                <path d="M22.9835 8.83374H18.5625V12.8337H22.9835V8.83374Z" fill="#C1C8CE" />
                <path d="M22.9835 16.8337H18.5625V20.8337H22.9835V16.8337Z" fill="#C1C8CE" />
              </svg>
            </button>
            <button className="view-change__btn view-change__btn_line">
              <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0357 0.83374H0.141113V2.83374H20.0357V0.83374Z" fill="#C1C8CE" />
                <path d="M20.0357 7.83374H0.141113V9.83374H20.0357V7.83374Z" fill="#C1C8CE" />
                <path d="M20.0357 14.8337H0.141113V16.8337H20.0357V14.8337Z" fill="#C1C8CE" />
              </svg>
            </button>
          </div>
        </div>
        <ProductCart />
        <ProductCartLine />
        <div className="pagination-bar">
          <button className="pagination-bar__link">1</button>
          <button className="pagination-bar__link pagination-bar__link_active">2</button>
          <button className="pagination-bar__link">3</button>
          <button className="pagination-bar__link">4</button>
          <button className="pagination-bar__link">5</button>
        </div>
      </main>
    </div>
  );
};

export default ProductList;