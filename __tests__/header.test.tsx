import { render } from '@testing-library/react';import Component from '../components/Header';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import React from 'react';
import store from '../store';

describe('header test', () => {
  const tree = () =>
    render(
      <Provider store={store}>
        <Component />
      </Provider>
    );

  it('login button is present ', () => {
    const { getByLabelText } = tree();
    const loginButton = getByLabelText(/log in/i) as HTMLAnchorElement;
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.getAttribute('href')).toEqual('/login');
  });
  it('cart is present', () => {
    const { getByLabelText } = tree();
    const cartElement = getByLabelText(/user cart/i) as HTMLAnchorElement;
    expect(cartElement).toBeInTheDocument();
    expect(cartElement.getAttribute('href')).toEqual('/cart');
  });
  it('favorites is present', () => {
    const { getByLabelText } = tree();
    const favoritesElement = getByLabelText(/favorites/i) as HTMLAnchorElement;
    expect(favoritesElement).toBeInTheDocument();
    expect(favoritesElement.getAttribute('href')).toEqual('/favorites');
  });
  it('menu button is present', () => {
    const { getByLabelText } = tree();
    const menuButton = getByLabelText(/menu/i) as HTMLAnchorElement;
    expect(menuButton).toBeInTheDocument();
  });

  it('header matches snapshot', () => {
    const { asFragment } = tree();
    const firstRender = asFragment();
    expect(firstRender).toMatchSnapshot();
  });
});
