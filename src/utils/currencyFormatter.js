export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
];

export const CATEGORY_COLORS = {
  Food: '#FF6384',
  Travel: '#36A2EB',
  Rent: '#FFCE56',
  Shopping: '#4BC0C0',
  Entertainment: '#9966FF',
  Health: '#FF9F40',
  Utilities: '#C9CBCF',
  Subscriptions: '#7BC8A4',
};
