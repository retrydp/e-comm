const commonConst = {
  DEFAULT_LIMIT: '12',
  QUANTITY_VALUES: ['12', '24', '48', '60'],
  TAXES: 0.2,
  SHIPPING_PRICE: 10,
  SORT_PARAMS: {
    popular: { rating: 'desc' },
    new: { createdAt: 'desc' },
    asc: { price: 'asc' },
    desc: { price: 'desc' },
  },
  AVAILABLE_CATEGORIES: ['bags', 'sneakers', 'belts'],
};

export const menuItems = [
  { title: 'home', path: '/' },
  { title: 'bags', path: '/loading?category=bags' },
  { title: 'sneakers', path: '/loading?category=sneakers' },
  { title: 'belts', path: '/loading?category=belts' },
  { title: 'contacts', path: '/contacts' },
] as const;

export default commonConst;
