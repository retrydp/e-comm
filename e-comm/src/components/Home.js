import React from "react";
import img from "../assets/img/bag.png";
import img2 from "../assets/img/Product2.png";
import BestSeller from "./BestSeller";

const Home = () => {
  return (
    <div className="home">
      <div className="home__offer-banner">
        <div className="home__wrapper">
          <h1 className="home__offer-text">Super Flash Sale 50% Off</h1>
        </div>
      </div>
      <div className="home__wrapper">
        <div className="home__promo-block promo">
          <div className="promo__cart">
            <div className="promo__item-name">FS - QUILTEDMAXI CROSS BAG</div>

            <img src={img} alt="" className="promo__item-img" />
            <div className="promo__prices">
              <div className="promo__old-price">$534,33</div>
              <span className="promo__percent">24% Off</span>
              <div className="promo__actual-price">$299,43</div>
            </div>
          </div>
          <div className="promo__cart">
            <div className="promo__item-name">FS - QUILTEDMAXI CROSS BAG</div>

            <img src={img} alt="" className="promo__item-img" />
            <div className="promo__prices">
              <div className="promo__old-price">$534,33</div>
              <span className="promo__percent">24% Off</span>
              <div className="promo__actual-price">$299,43</div>
            </div>
          </div>
          <div className="promo__cart">
            <div className="promo__item-name">FS - QUILTEDMAXI CROSS BAG</div>

            <img src={img2} alt="" className="promo__item-img" />
            <div className="promo__prices">
              <div className="promo__old-price">$534,33</div>
              <span className="promo__percent">24% Off</span>
              <div className="promo__actual-price">$299,43</div>
            </div>
          </div>
        </div>
      </div>
      <BestSeller />
    </div>
  );
};

export default Home;
