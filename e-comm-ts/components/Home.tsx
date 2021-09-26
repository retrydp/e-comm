import React from 'react';
import img from '../public/assets/img/bag.png'; //temp img
import img2 from '../public/assets/img/Product2.png'; //temp img
import shoe from '../public/assets/img/shoe.png'; //temp img
import nikelogo from '../public/assets/img/nike-logo.png';
import figmalogo from '../public/assets/img/figma-logo.png';
import kronoslogo from '../public/assets/img/kronos-logo.png';
import Head from 'next/head';
import { BestSeller } from './';

const Home: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>E-comm</title>
      </Head>
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
              <img src={img.src} alt="" className="promo__item-img" />
              <div className="promo__prices">
                <div className="promo__old-price">$534,33</div>
                <span className="promo__percent">24% Off</span>
                <div className="promo__actual-price">$299,43</div>
              </div>
            </div>

            <div className="promo__cart">
              <div className="promo__item-name">FS - QUILTEDMAXI CROSS BAG</div>
              <img src={img.src} alt="" className="promo__item-img" />
              <div className="promo__prices">
                <div className="promo__old-price">$534,33</div>
                <span className="promo__percent">24% Off</span>
                <div className="promo__actual-price">$299,43</div>
              </div>
            </div>

            <div className="promo__cart">
              <div className="promo__item-name">FS - QUILTEDMAXI CROSS BAG</div>
              <img src={img2.src} alt="" className="promo__item-img" />
              <div className="promo__prices">
                <div className="promo__old-price">$534,33</div>
                <span className="promo__percent">24% Off</span>
                <div className="promo__actual-price">$299,43</div>
              </div>
            </div>
          </div>
        </div>
        <BestSeller />
        {/* banner used in common */}
        <div className="shopbanner adapted-banner">
          <div className="shopbanner__wrapper">
            <h2 className="shopbanner__header">Adidas Men Running Sneakers</h2>
            <p className="shopbanner__text">Performance and design. Taken right to the edge.</p>
            <button className="shopbanner__btn">shop now</button>
          </div>
          <img src={shoe.src} alt="" className="shopbanner__img" />
        </div>
        {/* banner used in common */}
        <div className="home__benefits benefits">
          <div className="benefits__item">
            <svg className="benefits__img" width="101" height="67" viewBox="0 0 101 67" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100.816 34.1226C100.816 34.1037 100.816 34.0849 100.816 34.066C100.808 33.4582 100.56 32.8783 100.126 32.4523C99.6927 32.0262 99.1085 31.7884 98.5007 31.7905H97.8922L88.4808 13.6113C88.2849 13.2341 87.9888 12.9183 87.6251 12.6985C87.2613 12.4787 86.844 12.3634 86.419 12.3655H70.3607L70.973 7.50889C71.0732 6.58026 70.9752 5.64092 70.6854 4.75299C70.3956 3.86506 69.9207 3.04877 69.2919 2.35808C68.6631 1.66739 67.8949 1.11804 67.038 0.746371C66.1811 0.374699 65.2551 0.189171 64.3211 0.202043H14.4806C13.8717 0.205298 13.2856 0.434005 12.8354 0.844024C12.3852 1.25404 12.1029 1.8163 12.0429 2.42226L11.54 6.42267H39.9402C40.3753 6.42042 40.8063 6.50592 41.2076 6.67405C41.6088 6.84218 41.972 7.08949 42.2755 7.4012C42.579 7.7129 42.8165 8.08261 42.9739 8.4882C43.1312 8.8938 43.2052 9.32697 43.1913 9.7618C43.1637 10.6536 42.7912 11.4999 42.1522 12.1227C41.5133 12.7455 40.6577 13.0961 39.7655 13.1009H30.2937V13.1148H2.48442C1.85412 13.118 1.2496 13.3654 0.797849 13.8049C0.346099 14.2445 0.0822734 14.842 0.0617918 15.472C0.051637 15.7797 0.103691 16.0863 0.214836 16.3735C0.32598 16.6606 0.49393 16.9223 0.708626 17.143C0.923322 17.3637 1.18035 17.5388 1.46431 17.6578C1.74827 17.7768 2.05333 17.8372 2.36121 17.8355H39.1846C40.0217 17.9628 40.7832 18.3924 41.3248 19.0432C41.8665 19.694 42.1508 20.5207 42.124 21.367C42.0939 22.3179 41.698 23.2205 41.0188 23.8866C40.3395 24.5527 39.4294 24.931 38.4781 24.9425H13.0965C12.4584 24.9458 11.8466 25.1967 11.39 25.6423C10.9334 26.0879 10.6676 26.6934 10.6487 27.3312C10.6382 27.6421 10.6906 27.9519 10.8027 28.2421C10.9148 28.5322 11.0844 28.7968 11.3012 29.0198C11.5181 29.2429 11.7777 29.4199 12.0646 29.5401C12.3514 29.6604 12.6597 29.7216 12.9707 29.7199H38.0594C38.9046 29.8363 39.6769 30.2609 40.2282 30.912C40.7796 31.563 41.071 32.3948 41.0466 33.2476C41.0166 34.203 40.6173 35.1096 39.9327 35.7766C39.2481 36.4437 38.3314 36.8192 37.3755 36.8243H8.59693H6.17808C5.54005 36.8276 4.92824 37.0785 4.47161 37.5241C4.01497 37.9697 3.7492 38.5752 3.73031 39.213C3.71981 39.5239 3.77219 39.8337 3.88432 40.1239C3.99645 40.414 4.16601 40.6786 4.38284 40.9016C4.59967 41.1247 4.85931 41.3017 5.14619 41.422C5.43307 41.5423 5.74128 41.6034 6.05236 41.6017H8.13931L7.32339 50.1431C7.22331 51.0716 7.32145 52.0108 7.61134 52.8986C7.90122 53.7864 8.37624 54.6025 9.00499 55.2931C9.63375 55.9836 10.4019 56.5329 11.2587 56.9044C12.1155 57.276 13.0414 57.4616 13.9752 57.4487H15.7768C16.1996 59.8689 17.4652 62.0613 19.3495 63.6377C21.2338 65.2142 23.6153 66.0729 26.072 66.0618C28.5709 66.0444 30.9909 65.1847 32.9408 63.6217C34.8907 62.0588 36.2564 59.8839 36.8173 57.4487H59.2848C61.0782 57.4327 62.8084 56.784 64.1703 55.617C65.4229 56.8103 67.0919 57.4675 68.8219 57.4487H69.1915C69.6143 59.8689 70.8799 62.0613 72.7642 63.6377C74.6485 65.2142 77.03 66.0729 79.4867 66.0618C81.9856 66.0444 84.4056 65.1847 86.3555 63.6217C88.3054 62.0588 89.6712 59.8839 90.232 57.4487H91.7118C93.6191 57.412 95.4474 56.6804 96.8536 55.3913C98.2598 54.1023 99.1472 52.3443 99.3493 50.4473L100.803 34.3552C100.803 34.3338 100.803 34.3124 100.803 34.2898C100.803 34.2672 100.809 34.2244 100.81 34.1905C100.811 34.1565 100.816 34.1414 100.816 34.1226ZM26.1965 61.2882C25.4199 61.2916 24.6505 61.1386 23.9344 60.8382C23.2182 60.5378 22.5698 60.0963 22.028 59.5399C21.4862 58.9835 21.062 58.3237 20.7807 57.5998C20.4994 56.8759 20.3668 56.1028 20.3907 55.3265C20.4421 53.7348 21.1078 52.2247 22.2484 51.1132C23.389 50.0017 24.9157 49.3751 26.5083 49.3649C27.2849 49.3615 28.0542 49.5145 28.7704 49.8149C29.4866 50.1153 30.1349 50.5568 30.6768 51.1132C31.2186 51.6696 31.6428 52.3294 31.9241 53.0533C32.2054 53.7772 32.338 54.5503 32.314 55.3265C32.2627 56.9183 31.5969 58.4284 30.4564 59.5399C29.3158 60.6514 27.7891 61.278 26.1965 61.2882ZM79.6137 61.2882C78.8371 61.2916 78.0678 61.1386 77.3516 60.8382C76.6354 60.5378 75.9871 60.0963 75.4452 59.5399C74.9034 58.9835 74.4792 58.3237 74.1979 57.5998C73.9166 56.8759 73.784 56.1028 73.808 55.3265C73.8593 53.7348 74.5251 52.2247 75.6656 51.1132C76.8062 50.0017 78.3329 49.3751 79.9255 49.3649C80.7021 49.3615 81.4715 49.5145 82.1876 49.8149C82.9038 50.1153 83.5522 50.5568 84.094 51.1132C84.6358 51.6696 85.06 52.3294 85.3413 53.0533C85.6226 53.7772 85.7552 54.5503 85.7313 55.3265C85.6799 56.9183 85.0142 58.4284 83.8736 59.5399C82.733 60.6514 81.2063 61.278 79.6137 61.2882ZM94.6033 50.1381C94.5234 50.8224 94.2 51.4553 93.6923 51.921C93.1845 52.3868 92.5262 52.6544 91.8375 52.6751H90.2383C89.7105 50.3722 88.4146 48.3175 86.5638 46.849C84.7131 45.3805 82.4176 44.5856 80.055 44.5951C77.6501 44.6118 75.3155 45.4085 73.4021 46.8655C71.4887 48.3226 70.0998 50.3612 69.4442 52.6751H68.9527C68.668 52.6816 68.3851 52.6279 68.1226 52.5176C67.86 52.4074 67.6236 52.243 67.4289 52.0352C67.2383 51.8199 67.095 51.567 67.0083 51.2928C66.9217 51.0186 66.8937 50.7293 66.926 50.4436L69.9333 17.1277H76.8391L75.7453 29.2597C75.645 30.1884 75.743 31.1277 76.0328 32.0156C76.3226 32.9036 76.7976 33.7199 77.4264 34.4105C78.0552 35.1012 78.8234 35.6506 79.6803 36.0222C80.5372 36.3939 81.4632 36.5795 82.3972 36.5666H95.8279L94.6033 50.1381Z"
                fill="#FF6875"
              />
            </svg>

            <h3 className="benefits__header">FREE SHIPPING</h3>
            <p className="benefits__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="benefits__item">
            <svg className="benefits__img" width="70" height="79" viewBox="0 0 70 79" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M56.0753 16.7089L52.3037 21.5529C57.6497 25.6968 61.334 31.6191 62.6883 38.2462C64.0427 44.8733 62.9775 51.7662 59.6859 57.6754C56.3944 63.5845 51.0943 68.1185 44.7468 70.4554C38.3992 72.7922 31.4244 72.7772 25.087 70.4129C18.7496 68.0487 13.4692 63.4919 10.2032 57.5686C6.93711 51.6453 5.9017 44.7478 7.28464 38.1266C8.66759 31.5055 12.3773 25.5991 17.7412 21.4783C23.1052 17.3576 29.7681 15.2953 36.522 15.6654L31.2154 21.2323L35.1517 24.9888L43.5284 16.1884L47.2811 12.2471L43.3511 8.50568L34.557 0.127686L30.8018 4.06901L36.5296 9.52527C27.7441 9.1252 19.1391 12.1054 12.4828 17.8533C5.82655 23.6012 1.62469 31.6804 0.740705 40.4304C-0.143281 49.1804 2.35776 57.9367 7.72986 64.8999C13.102 71.863 20.937 76.504 29.625 77.8692C31.4177 78.1526 33.2299 78.2951 35.0448 78.2954C42.2099 78.2776 49.1908 76.0237 55.0136 71.8482C60.8363 67.6727 65.2105 61.7838 67.526 55.0031C69.8415 48.2224 69.9827 40.888 67.93 34.0232C65.8773 27.1584 61.733 21.1055 56.0753 16.7089Z"
                fill="#FF6875"
              />
              <path
                d="M38.3416 61.4327V57.8999C42.5306 57.4323 46.6052 54.7871 46.6052 49.7633C46.6052 42.938 40.2588 42.156 35.6235 41.5852C32.6603 41.2307 30.391 40.8196 30.391 39.0243C30.391 36.5275 33.9112 36.2585 35.4198 36.2585C37.6652 36.2585 40.0614 37.3145 40.8761 38.661L41.1124 39.0532L45.7641 36.8984L45.534 36.4295C44.8436 35.0645 43.8234 33.8934 42.5659 33.0225C41.3084 32.1516 39.8534 31.6084 38.3328 31.4421V28.3306H32.8891V31.4271C27.8138 32.1814 24.799 34.9925 24.799 39.0231C24.799 45.5945 30.7657 46.2608 35.1194 46.7498C38.9991 47.2074 40.8044 48.1654 40.8044 49.7671C40.8044 52.8183 36.579 53.0559 35.284 53.0559C32.4013 53.0559 29.6266 51.6177 28.817 49.7068L28.6171 49.2353L23.5657 51.3763L23.7668 51.8478C25.2642 55.3541 28.4964 57.5504 32.8954 58.0697V61.4327H38.3416Z"
                fill="#FF6875"
              />
            </svg>

            <h3 className="benefits__header">100% REFUND</h3>
            <p className="benefits__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
          <div className="benefits__item">
            <svg className="benefits__img" width="69" height="89" viewBox="0 0 69 89" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.515381 70.4012V88.9663H68.183V70.4012C68.1803 68.3314 67.3569 66.3472 65.8934 64.8836C64.4298 63.42 62.4456 62.5967 60.3758 62.594H8.3226C6.25282 62.5967 4.26856 63.42 2.805 64.8836C1.34144 66.3472 0.518042 68.3314 0.515381 70.4012H0.515381ZM5.72019 70.4012C5.72119 69.7113 5.99569 69.05 6.48352 68.5621C6.97135 68.0743 7.63271 67.7998 8.3226 67.7988H10.925V83.7653H5.72019V70.4012ZM16.1311 67.7988H22.8609L34.3492 79.2871L45.8375 67.7988H52.5635V83.7653H16.1311V67.7988ZM62.9782 70.4012V83.7615H57.7734V67.795H60.3758C61.0663 67.796 61.7282 68.0711 62.2162 68.5597C62.7041 69.0484 62.9782 69.7107 62.9782 70.4012ZM38.4766 67.7988L34.3492 71.9262L30.2218 67.7988H38.4766Z"
                fill="#FF6875"
              />
              <path
                d="M53.8207 52.1792H57.7771V46.9744H60.3795C62.4493 46.9717 64.4336 46.1483 65.8971 44.6848C67.3607 43.2212 68.1841 41.237 68.1868 39.1672V33.9624C68.1864 24.9886 64.6213 16.3825 58.2756 10.0373C51.93 3.6921 43.3236 0.127596 34.3498 0.12793C25.376 0.128263 16.7699 3.6934 10.4247 10.0391C4.07955 16.3847 0.515047 24.9911 0.515381 33.9649L0.515381 39.1697C0.518042 41.2395 1.34144 43.2237 2.805 44.6873C4.26856 46.1508 6.25282 46.9742 8.3226 46.9769H12.2652C13.7126 51.0761 16.2726 54.6914 19.6585 57.418C23.0443 60.1446 27.1224 61.8748 31.4359 62.4148C35.7495 62.9548 40.1282 62.2833 44.0817 60.4755C48.0353 58.6678 51.4075 55.7951 53.8207 52.1792ZM60.3795 41.7683H57.6263C57.7232 40.9042 57.7719 40.0354 57.7721 39.1659V33.9611C57.7719 33.0916 57.7232 32.2228 57.6263 31.3587H60.3745C61.0644 31.3597 61.7258 31.6342 62.2136 32.122C62.7014 32.6099 62.9759 33.2712 62.9769 33.9611V39.1659C62.9773 39.8567 62.7033 40.5193 62.2154 41.0082C61.7274 41.4972 61.0653 41.7724 60.3745 41.7733L60.3795 41.7683ZM34.3492 5.33589C40.6069 5.34394 46.6902 7.39849 51.6714 11.1862C56.6526 14.9739 60.2583 20.2869 61.9385 26.3148C61.4242 26.2101 60.9006 26.1574 60.3758 26.1577H56.4319C54.8174 21.5909 51.8267 17.637 47.8718 14.8405C43.9169 12.044 39.1923 10.5423 34.3486 10.5423C29.5048 10.5423 24.7802 12.044 20.8253 14.8405C16.8704 17.637 13.8797 21.5909 12.2652 26.1577H8.3226C7.79774 26.1574 7.2742 26.2101 6.7599 26.3148C8.44009 20.2869 12.0457 14.9739 17.0269 11.1862C22.0081 7.39849 28.0915 5.34394 34.3492 5.33589ZM49.2948 23.5603C47.612 25.9642 45.3757 27.928 42.7745 29.2859C40.1732 30.6438 37.2835 31.3561 34.3492 31.3625H16.3171C16.8382 27.7439 18.4362 24.366 20.9033 21.6681C23.3705 18.9702 26.5924 17.0773 30.1501 16.2356C33.7077 15.3939 37.4363 15.6424 40.8508 16.9487C44.2653 18.2551 47.2075 20.5589 49.2948 23.5603ZM8.3226 41.7733C7.63271 41.7724 6.97135 41.4979 6.48352 41.01C5.99569 40.5222 5.72119 39.8608 5.72019 39.1709V33.9661C5.72119 33.2762 5.99569 32.6149 6.48352 32.1271C6.97135 31.6392 7.63271 31.3647 8.3226 31.3637H11.0759C10.979 32.2278 10.9303 33.0966 10.93 33.9661V39.1709C10.9303 40.0404 10.979 40.9093 11.0759 41.7733H8.3226ZM16.1298 39.1709V36.5685H34.3492C37.6447 36.5624 40.902 35.8636 43.91 34.5173C46.9179 33.171 49.6092 31.2073 51.8092 28.7538C52.315 30.4445 52.5712 32.2001 52.5698 33.9649V39.1697C52.5726 41.8708 51.9713 44.5383 50.8097 46.9769H42.1564L39.8658 44.6913C38.4014 46.1554 36.4155 46.9779 34.3448 46.9779C32.2741 46.9779 30.2881 46.1554 28.8238 44.6913L25.144 48.3711C27.3588 50.5859 30.2982 51.9276 33.4226 52.1497C36.547 52.3719 39.6467 51.4597 42.1526 49.5806V52.1792H47.0809C44.5196 54.6883 41.2745 56.3853 37.7527 57.0575C34.2308 57.7296 30.5888 57.347 27.2835 55.9577C23.9782 54.5683 21.1566 52.234 19.1726 49.2475C17.1887 46.2609 16.1306 42.7551 16.1311 39.1697L16.1298 39.1709Z"
                fill="#FF6875"
              />
            </svg>

            <h3 className="benefits__header">SUPPORT 24/7</h3>
            <p className="benefits__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
        <div className="home__news news">
          <h2 className="news__header common-header">LATEST NEWS</h2>
          <div className="news__wrapper">
            <div className="news__item">
              <div className="news__inner">
                <img src={nikelogo.src} alt="" className="news__img" />
                <div className="news__date">01 Jan, 2015</div>
                <h3 className="news__header">Fashion Industry</h3>
                <p className="news__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>

            <div className="news__item">
              <div className="news__inner">
                <img src={figmalogo.src} alt="" className="news__img" />
                <div className="news__date">01 Jan, 2015</div>
                <h3 className="news__header">Best Design Tools</h3>
                <p className="news__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>

            <div className="news__item">
              <div className="news__inner">
                <img src={kronoslogo.src} alt="" className="news__img" />
                <div className="news__date">01 Jan, 2015</div>
                <h3 className="news__header">HR Community</h3>
                <p className="news__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
          </div>
        </div>
        {/* common search block */}
        <div className="search">
          <div className="search__wrapper">
            <input className="search__query" type="text" placeholder="Search query..." />
            <button className="search__submit">Search</button>
          </div>
        </div>
        {/* common search block */}
      </div>
    </>
  );
};

export default Home;
