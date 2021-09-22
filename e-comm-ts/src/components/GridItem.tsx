import React from 'react';
import nike from '../assets/img/nike.png'; //temp

const GridItem: React.FC = (): JSX.Element => {
  return (
    <div className="goods__cart">
      <img src={nike} alt="" className="goods__img" />
      <div className="goods__inner">
        <span className="goods__title" title="Nike Air Max 270 React dsa dsa das">
          Nike Air Max 270 React
        </span>
        <div className="goods__rating">
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
              fill="#FFC600"
            />
          </svg>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
              fill="#FFC600"
            />
          </svg>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
              fill="#FFC600"
            />
          </svg>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
              fill="#FFC600"
            />
          </svg>
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.2428 5.927L9.9913 9.44897L11.242 15.173L7.1111 11.715L2.71407 14.989L4.41286 9.32898L0.446777 5.62903L5.62724 5.58899L7.5739 0.0280762L9.07709 5.66406L14.2428 5.927Z"
              fill="#C1C8CE"
            />
          </svg>
        </div>
        <div className="goods__price-wrapper price-wrapper">
          <span className="price-wrapper__actual-price">$299,43</span>
          <span className="price-wrapper__old-price">$534,33</span>
          <span className="price-wrapper__percent">24% Off</span>
        </div>
      </div>
    </div>
  );
};
export default GridItem;
