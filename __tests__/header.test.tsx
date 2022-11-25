import { render } from '@testing-library/react';
import Component from '../components/Header';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import React from 'react';
import store from '../store';

// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: { page: 1, quantity: 12 },
//       asPath: '',
//     };
//   },
// }));

describe('header test', () => {
  const tree = () =>
    render(
      <Provider store={store}>
        <Component />
      </Provider>
    );

  it('login button is present ', () => {
    const { getByText } = tree();
    expect(getByText('Log In')).toBeInTheDocument();
  });
  it('cart is present', () => {
    const { getByTestId } = tree();
    expect(getByTestId('ShoppingCartOutlinedIcon')).toBeInTheDocument();
  });
  it('favorites is present', () => {
    const { getByTestId } = tree();
    expect(getByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });
  it('menu is present', () => {
    const { getByTestId } = tree();
    expect(getByTestId('MenuIcon')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = tree();
    const firstRender = asFragment();
    expect(firstRender).toMatchSnapshot();
  });
});
