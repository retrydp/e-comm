import React from 'react';
import Head from 'next/head';
import AdminForm from '../../components/AdminForm';
import { FormValues } from '../../types';
import { ADD_NEW_PRODUCT } from '../../constants/apiVars';
import axios from 'axios';

const AdminPannel: React.FC = (): JSX.Element => {
  const getFormData = async (values: FormValues) => {
    const fakeValues = {
      productName: 'dsa',
      brand: 'dsa',
      category: 'dsa',
      availableColors: [
        {
          color: 'dsa',
          images: '',
        },
      ],
      availableSizes: 'dsa',
      description: 'dsa',
      price: 'dsa',
      oldPrice: '432',
      shipping: 'dsa',
      itemsInStock: '',
    };

    await axios
      .post('http://localhost:3000/api', { action: ADD_NEW_PRODUCT, fakeValues })
      .then((responce) => console.log(responce.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>Admin pannel</title>
      </Head>
      <div className="admin-pannel">
        <aside className="menu">
          <div className="menu__header">
            <svg className="menu__icon" width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.00244141" width="44" height="44" rx="16" fill="#40BFFF" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.0619 20.274C32.0165 21.2286 32.0165 22.7763 31.0619 23.7309L23.7285 31.0643C22.7739 32.0189 21.2262 32.0189 20.2716 31.0643L12.9382 23.7309C11.9836 22.7763 11.9836 21.2286 12.9382 20.274L20.2716 12.9406C21.2262 11.986 22.7739 11.986 23.7285 12.9406L31.0619 20.274ZM22.0001 18.1261L18.1237 22.0024L22.0001 25.8788L25.8764 22.0024L22.0001 18.1261Z"
                fill="white"
              />
            </svg>
            <div className="menu__header-text">Admin Panel</div>
          </div>
          <nav className="menu__navigation">
            <ul className="menu__list">
              <li className="menu__item menu__item_active">
                <svg className="menu__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5232 8.94116H8.54412L13.1921 13.5891C13.3697 13.7667 13.6621 13.7812 13.8447 13.6091C14.9829 12.5367 15.7659 11.0912 15.9956 9.46616C16.035 9.18793 15.8041 8.94116 15.5232 8.94116ZM15.0576 7.03528C14.8153 3.52176 12.0076 0.714119 8.49412 0.471767C8.22589 0.453237 8 0.679413 8 0.948236V7.5294H14.5815C14.8503 7.5294 15.0762 7.30352 15.0576 7.03528ZM6.58824 8.94116V1.96206C6.58824 1.68118 6.34147 1.45029 6.06353 1.48971C2.55853 1.985 -0.120585 5.04705 0.00412089 8.71675C0.132356 12.4856 3.37736 15.5761 7.14794 15.5288C8.6303 15.5103 10 15.0326 11.1262 14.2338C11.3585 14.0691 11.3738 13.727 11.1724 13.5256L6.58824 8.94116Z" />
                </svg>
                <a href="" className="menu__link">
                  Overview
                </a>
              </li>

              <li className="menu__item">
                <svg className="menu__logo" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4 5.2C3.2825 5.2 4 4.4825 4 3.6C4 2.7175 3.2825 2 2.4 2C1.5175 2 0.8 2.7175 0.8 3.6C0.8 4.4825 1.5175 5.2 2.4 5.2ZM13.6 5.2C14.4825 5.2 15.2 4.4825 15.2 3.6C15.2 2.7175 14.4825 2 13.6 2C12.7175 2 12 2.7175 12 3.6C12 4.4825 12.7175 5.2 13.6 5.2ZM14.4 6H12.8C12.36 6 11.9625 6.1775 11.6725 6.465C12.68 7.0175 13.395 8.015 13.55 9.2H15.2C15.6425 9.2 16 8.8425 16 8.4V7.6C16 6.7175 15.2825 6 14.4 6ZM8 6C9.5475 6 10.8 4.7475 10.8 3.2C10.8 1.6525 9.5475 0.400002 8 0.400002C6.4525 0.400002 5.2 1.6525 5.2 3.2C5.2 4.7475 6.4525 6 8 6ZM9.92 6.8H9.7125C9.1925 7.05 8.615 7.2 8 7.2C7.385 7.2 6.81 7.05 6.2875 6.8H6.08C4.49 6.8 3.2 8.09 3.2 9.68V10.4C3.2 11.0625 3.7375 11.6 4.4 11.6H11.6C12.2625 11.6 12.8 11.0625 12.8 10.4V9.68C12.8 8.09 11.51 6.8 9.92 6.8ZM4.3275 6.465C4.0375 6.1775 3.64 6 3.2 6H1.6C0.7175 6 0 6.7175 0 7.6V8.4C0 8.8425 0.3575 9.2 0.8 9.2H2.4475C2.605 8.015 3.32 7.0175 4.3275 6.465Z" />
                </svg>
                <a href="" className="menu__link">
                  Database
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="body">
          <h2 className="body__title">Overview</h2>
          <AdminForm getFormData={getFormData} />
        </main>
      </div>
    </>
  );
};

export default AdminPannel;
