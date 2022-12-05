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

export default commonConst;
