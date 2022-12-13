import { render, screen } from '@testing-library/react';
import Component from '../components/Header';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import React from 'react';
import store from '../store';
import { SharedContext } from '../context/SharedContext';
import { SnackbarProvider } from 'notistack';

describe('header test', () => {
  beforeEach(() =>
    render(
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <SharedContext>
            <Component />
          </SharedContext>
        </SnackbarProvider>
      </Provider>
    )
  );

  const getElementByLabel = <T extends HTMLElement = HTMLAnchorElement>(
    text: string | RegExp
  ) => screen.getByLabelText(text) as T;

  it('login button is present ', () => {
    const loginButton = getElementByLabel(/log in/i);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.getAttribute('href')).toEqual('/login');
  });
  it('cart is present', () => {
    const cartElement = getElementByLabel(/user cart/i);
    expect(cartElement).toBeInTheDocument();
    expect(cartElement.getAttribute('href')).toEqual('/cart');
  });
  it('favorites is present', () => {
    const favoritesElement = getElementByLabel(/favorites/i);
    expect(favoritesElement).toBeInTheDocument();
    expect(favoritesElement.getAttribute('href')).toEqual('/favorites');
  });
  it('menu button is present', () => {
    const menuButton = getElementByLabel(/menu/i);
    expect(menuButton).toBeInTheDocument();
  });
});
