import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { change } from '../store/currentActiveTab';
import { useAppDispatch, useAppSelector } from '../store/';

const HeadNavigation: React.FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { activeTab } = useAppSelector((store) => store);

  /**
   * Provide classnames for a navigation tab according to URL params, triggers activation if needed.
   * @param tab Value which we compare with URL params (type/pathname).
   * @returns Classes for active element.
   */
  const generateCls = (tab: string): string => {
    return classNames('hnav__item', {
      'hnav__item-active': activeTab === tab,
    });
  };

  React.useEffect(() => {
    //set active tab, when user comes exactly from address line

    if (router.query.type) dispatch(change(router.query.type));
    else if (router.pathname) dispatch(change(router.pathname));
  }, [router]);

  return (
    <div className="hnav">
      <a className="hnav__logo logo" href="/">
        <svg className="logo__icon" width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="0.00244141" width="44" height="44" rx="16" fill="#40BFFF" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.0619 20.274C32.0165 21.2286 32.0165 22.7763 31.0619 23.7309L23.7285 31.0643C22.7739 32.0189 21.2262 32.0189 20.2716 31.0643L12.9382 23.7309C11.9836 22.7763 11.9836 21.2286 12.9382 20.274L20.2716 12.9406C21.2262 11.986 22.7739 11.986 23.7285 12.9406L31.0619 20.274ZM22.0001 18.1261L18.1237 22.0024L22.0001 25.8788L25.8764 22.0024L22.0001 18.1261Z"
            fill="white"
          />
        </svg>
        <span className="logo__text">E-Comm</span>
      </a>
      <nav className="/hnav__items">
        <Link href={{ pathname: '/' }}>
          <a className={generateCls('/')}>home</a>
        </Link>

        <Link href={{ pathname: '/product', query: { type: 'bags' } }}>
          <a className={generateCls('bags')}>bags</a>
        </Link>

        <Link href={{ pathname: '/product', query: { type: 'sneakers' } }}>
          <a className={generateCls('sneakers')}>sneakers</a>
        </Link>

        <Link href={{ pathname: '/product', query: { type: 'belts' } }}>
          <a className={generateCls('belts')}>belts</a>
        </Link>

        <Link href={{ pathname: '/contacts' }}>
          <a className={generateCls('/contacts')}>contacts</a>
        </Link>
      </nav>
    </div>
  );
};

export default HeadNavigation;
