import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import shoe from '../public/assets/img/shoe.png';
import { ProductCart, Slider, ProductCartLine } from './';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { TemplateType, Template, SliderValues } from '../types';

export const ProductList: React.FC = (): JSX.Element => {
  const [template, setTemplate] = useState<Template>({
    value: 'grid',
  });

  const [range, setRange] = useState<SliderValues>({
    minValue: 0,
    maxValue: 1500,
  });

  /**
   * Switch between grid and extended layouts
   * @param style Desirable display method
   */
  const visibilityHandler = (style: TemplateType): void => {
    setTemplate({
      value: style,
    });
  };

  /**
   * Delaying user`s entries for a range-type input & setting it to state
   */
  const sliderHandler = debounce((values: number[]): void => {
    const [minValue, maxValue] = values;

    setRange({
      minValue,
      maxValue,
    });
  }, 200);

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
            <div className="price-picker__available-prices">
              $<div className="price-picker__min">{range.minValue}</div> - <div className="price-picker__max">{range.maxValue}</div>
            </div>
          </div>
          <Slider handler={sliderHandler} />
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
        <div className="shopbanner shopbanner_inner adapted-banner">
          <div className="shopbanner__wrapper shopbanner__wrapper_inner">
            <h2 className="shopbanner__header">Adidas Men Running Sneakers</h2>
            <p className="shopbanner__text">Performance and design. Taken right to the edge.</p>
            <button className="shopbanner__btn">shop now</button>
          </div>
          <img src={shoe.src} alt="" className="shopbanner__img" />
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
            <button
              className={classNames('view-change__btn', 'view-change__btn_grid', {
                'view-change__btn_active': template.value === 'grid',
              })}
              onClick={() => visibilityHandler('grid')}
            >
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

            <button
              className={classNames('view-change__btn', 'view-change__btn_line', {
                'view-change__btn_active': template.value === 'extended',
              })}
              onClick={() => visibilityHandler('extended')}
            >
              <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0357 0.83374H0.141113V2.83374H20.0357V0.83374Z" fill="#C1C8CE" />
                <path d="M20.0357 7.83374H0.141113V9.83374H20.0357V7.83374Z" fill="#C1C8CE" />
                <path d="M20.0357 14.8337H0.141113V16.8337H20.0357V14.8337Z" fill="#C1C8CE" />
              </svg>
            </button>
          </div>
        </div>

        {template.value === 'extended' && <ProductCartLine />}
        {template.value === 'grid' && <ProductCart />}

        <ReactPaginate
          pageCount={5}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          containerClassName="pagination-bar"
          pageClassName="pagination-bar__page"
          nextLinkClassName="pagination-bar__next-link"
          nextClassName="pagination-bar__next"
          previousLinkClassName="pagination-bar__prev-link"
          previousClassName="pagination-bar__prev"
          activeClassName="pagination-bar__link_active"
          pageLinkClassName="pagination-bar__link"
          onPageChange={(num) => console.log(num)}
        />
      </main>
    </div>
  );
};

export default ProductList;
