import React from "react";

const ProductList = () => {
  return (
    <div className="product-list">
      <div className="product-list__bread-crumbs"></div>
      <div className="product-list__wrapper">
        <aside className="product-list__menu aside-menu">
          <div className="aside-menu__brands">
            <h3 className="aside-menu__header"></h3>
            <div className="aside-menu__brand">
              <div className="aside-menu__brandname"></div>
              <div className="aside-menu__count"></div>
            </div>
            <div className="aside-menu__brand">
              <div className="aside-menu__brandname"></div>
              <div className="aside-menu__count"></div>
            </div>
            <div className="aside-menu__brand">
              <div className="aside-menu__brandname"></div>
              <div className="aside-menu__count"></div>
            </div>
          </div>
          <div className="aside-menu__price-set"></div>
          <div className="aside-menu__color-set"></div>
        </aside>
        <div className="product-list__inner">
          <div className="product-list__banner"></div>
          <div className="product-list__sort"></div>
          <div className="product-list__group">
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
            <div className="product-list__item"></div>
          </div>
          <div className="product-list__pagination"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
