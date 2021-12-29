import React from 'react';
import { GetServerSideProps } from 'next';
import { connectToDatabase } from '../../utils/database';
import { ObjectId } from 'bson';
import { FormattedFormDataStrict } from '../../types';

import classNames from 'classnames';

interface ProductRenderProps {
  product: ProductProps;
}

interface ProductProps extends Omit<FormattedFormDataStrict, 'brand' | 'lastModified' | 'createdAt'> {
  _id: string;
}

const ProductRender: React.FC<ProductRenderProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  const { salesCount, availableColors, productName, rating, comments, price, oldPrice, itemsInStock, category, shipping, availableSizes, description }: ProductProps = product;
  const [activeImg, setActiveImg] = React.useState<string>(availableColors[0].images[0]);

  return (
    <div className="product">
      <div className={classNames('goods-line__cart product__cart', { hot: salesCount > 20 })}>
        <div className="product__images">
          <img src={activeImg} alt="" className="goods-line__img product__img" />
          <div className="product__img-wrapper">
            {availableColors.map(({ images, color }) => {
              return images.map((image) => <img src={image} key={image} alt={color} className="product__item-pic" onClick={() => setActiveImg(image)} />);
            })}
          </div>
        </div>
        <div className="goods-line__inner product__inner">
          <span className="goods-line__title" title="Nike Air Max 270 React dsa dsa das">
            {productName}
          </span>
          <div className="goods-line__rating-tab">
            <div className="goods-line__rating">
              {Array.from({ length: 5 }, (_, idx) => {
                return (
                  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
                      fill={idx >= rating ? '#C1C8CE' : '#FFC600'}
                    />
                  </svg>
                );
              })}
            </div>
            <div className="goods-line__reviews">{comments?.length || 0} reviews</div>
            <button className="goods-line__review-submit">Submit a review</button>
          </div>
          <div className="goods-line__price-wrapper price-line-wrapper">
            <span className="price-line-wrapper__actual-price">${price}</span>
            {oldPrice && (
              <div>
                <span className="price-line-wrapper__old-price">${oldPrice}</span>
                <span className="price-line-wrapper__percent">{Math.round(100 - (oldPrice / 100) * price)}% Off</span>
              </div>
            )}
          </div>
          <div className="product__desc">
            <div className="product__wrapper">
              <div className="product__desc-text">Availability:</div>
              <div className="product__desc-value">{itemsInStock > 0 ? `In stoke` : `Not available`}</div>
            </div>
            <div className="product__wrapper">
              <div className="product__desc-text">Category:</div>
              <div className="product__desc-value">{category}</div>
            </div>
            <div className="product__wrapper">
              <div className="product__desc-text">{shipping}</div>
            </div>
          </div>
          <div className="product__desc">
            <div className="product__wrapper">
              <div className="product__desc-text">Select color:</div>
              <div className="product__desc-value product__desc-value_picker">
                <div className="color-picker__wrapper">
                  {availableColors.map(({ color }) => {
                    return (
                      <>
                        <input className="color-picker__input" type="radio" id={`colpick${color}`} name="colpick" value={color} defaultChecked />
                        <label htmlFor={`colpick${color}`} className="color-picker__actual" style={{ backgroundColor: color }}></label>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="product__wrapper">
              <div className="product__desc-text">Size:</div>
              <div className="product__desc-value">
                <select name="prodselect" id="prodselect" className="product__select">
                  {availableSizes.map((size) => {
                    return <option value="">{size}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="product__options">
            {/* add to cart & favorite buttons container */}
            <div className="cart-opts__button-wrapper">
              <button className="cart-opts__btn">
                <div className="cart-opts__icon">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.129 11.3337C13.5901 11.3329 14.0368 11.1722 14.3927 10.879C14.7487 10.5858 14.9919 10.1782 15.081 9.72577L16.081 4.72577C16.1389 4.43597 16.1319 4.13692 16.0604 3.85016C15.989 3.5634 15.8548 3.29605 15.6677 3.06732C15.4806 2.83859 15.2451 2.65412 14.9782 2.52728C14.7112 2.40044 14.4195 2.33436 14.124 2.33374H4.16799V1.33374C4.16799 1.06852 4.06262 0.814184 3.87508 0.626648C3.68754 0.439112 3.4332 0.33374 3.16799 0.33374H1.17699C0.911773 0.33374 0.657403 0.439112 0.469866 0.626648C0.28233 0.814184 0.176989 1.06852 0.176989 1.33374C0.176989 1.59896 0.28233 1.8533 0.469866 2.04083C0.657403 2.22837 0.911773 2.33374 1.17699 2.33374H2.17699V12.3337C1.78105 12.332 1.39348 12.4478 1.0634 12.6664C0.733323 12.8851 0.475558 13.1968 0.322802 13.5621C0.170046 13.9274 0.129158 14.3298 0.205309 14.7184C0.28146 15.1069 0.471224 15.4641 0.750567 15.7448C1.02991 16.0254 1.38626 16.2167 1.77446 16.2946C2.16267 16.3725 2.56528 16.3335 2.93126 16.1824C3.29724 16.0313 3.61012 15.7749 3.83028 15.4458C4.05044 15.1167 4.16798 14.7297 4.16799 14.3337H11.137C11.1386 14.7274 11.2567 15.1117 11.4766 15.4382C11.6964 15.7648 12.0081 16.0189 12.3722 16.1684C12.7363 16.3179 13.1366 16.3563 13.5225 16.2785C13.9084 16.2007 14.2625 16.0103 14.5403 15.7314C14.8181 15.4525 15.0071 15.0976 15.0833 14.7114C15.1595 14.3252 15.1196 13.9251 14.9686 13.5616C14.8176 13.1981 14.5623 12.8874 14.2349 12.6689C13.9074 12.4504 13.5226 12.3337 13.129 12.3337H4.16799V11.3337H13.129ZM14.129 4.33374L13.129 9.33374H4.16799V4.33374H14.124H14.129Z"
                      fill="#33A0FF"
                    />
                  </svg>
                </div>
                <div className="cart-opts__btn-text">Add to cart</div>
              </button>
              <button className="cart-opts__btn">
                <div className="cart-opts__icon">
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1512 2.33375C11.7287 2.3347 12.2938 2.50237 12.7784 2.8166C13.263 3.13082 13.6466 3.57826 13.8831 4.10517C14.1196 4.63208 14.199 5.21606 14.1117 5.787C14.0245 6.35793 13.7743 6.89153 13.3912 7.32374C12.8412 7.94374 8.15117 12.3337 8.15117 12.3337C8.15117 12.3337 3.45117 7.94373 2.90117 7.31373C2.41601 6.76853 2.14897 6.06356 2.15117 5.33375C2.15117 4.5381 2.46723 3.77502 3.02984 3.21241C3.59245 2.6498 4.35553 2.33375 5.15117 2.33375C5.94682 2.33375 6.7099 2.6498 7.27251 3.21241C7.83512 3.77502 8.15117 4.5381 8.15117 5.33375C8.15117 4.5381 8.46723 3.77502 9.02984 3.21241C9.59245 2.6498 10.3555 2.33375 11.1512 2.33375ZM11.1512 0.333748C10.069 0.331789 9.01573 0.68288 8.15117 1.33375C7.16082 0.602303 5.93542 0.261963 4.70971 0.377938C3.48399 0.493913 2.34413 1.05807 1.50854 1.96229C0.672942 2.8665 0.200341 4.04723 0.181265 5.27827C0.162188 6.50931 0.598028 7.70406 1.4052 8.63374C1.9672 9.27774 5.66618 12.7417 6.78618 13.7877C7.15667 14.1342 7.64492 14.3269 8.15215 14.3269C8.65938 14.3269 9.14769 14.1342 9.51818 13.7877C10.6342 12.7427 14.3182 9.28772 14.8872 8.64472C15.5241 7.92405 15.9396 7.03499 16.0839 6.08411C16.2283 5.13324 16.0953 4.16091 15.701 3.2837C15.3067 2.40649 14.6677 1.6616 13.8607 1.13837C13.0537 0.615146 12.1129 0.335792 11.1512 0.333748Z"
                      fill="#33A0FF"
                    />
                  </svg>
                </div>
              </button>
            </div>
            {/* add to cart & favorite buttons container */}
          </div>
        </div>
      </div>
      <div className="info-block">
        <div className="info-block__header">
          <div className="info-block__tab info-block__tab_active">Product Infomation</div>
          <div className="info-block__tab">
            Reviews <span>{comments?.length || 0}</span>
          </div>
          <div className="info-block__tab">Another tab</div>
        </div>
        <div className="info-block__text">{description}</div>
      </div>
    </div>
  );
};

export default ProductRender;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { db } = await connectToDatabase();

    const resp = await db.collection('products').findOne({ _id: new ObjectId(query.pid.toString()) });

    return {
      props: { product: JSON.parse(JSON.stringify(resp)) },
    };
  } catch (error) {
    return { props: {} };
  }
};