import axios from 'axios';

const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';

export const fetchExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await axios.get(`${EXCHANGE_API_BASE}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return null;
  }
};

const SAMPLE_TRANSACTIONS = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 50000,
    category: 'Utilities',
    type: 'income',
    date: '2026-04-01',
    notes: 'April salary',
    recurring: true,
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 3500,
    category: 'Food',
    type: 'expense',
    date: '2026-04-03',
    notes: 'Weekly groceries from BigBasket',
    recurring: false,
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: 649,
    category: 'Subscriptions',
    type: 'expense',
    date: '2026-04-05',
    notes: 'Monthly Netflix plan',
    recurring: true,
  },
  {
    id: '4',
    title: 'Uber Rides',
    amount: 1200,
    category: 'Travel',
    type: 'expense',
    date: '2026-04-07',
    notes: 'Office commute',
    recurring: false,
  },
  {
    id: '5',
    title: 'Rent Payment',
    amount: 15000,
    category: 'Rent',
    type: 'expense',
    date: '2026-04-01',
    notes: 'Monthly rent',
    recurring: true,
  },
  {
    id: '6',
    title: 'Freelance Project',
    amount: 20000,
    category: 'Utilities',
    type: 'income',
    date: '2026-04-10',
    notes: 'Web development project',
    recurring: false,
  },
  {
    id: '7',
    title: 'Gym Membership',
    amount: 2000,
    category: 'Health',
    type: 'expense',
    date: '2026-04-02',
    notes: 'Monthly gym fee',
    recurring: true,
  },
  {
    id: '8',
    title: 'Movie Tickets',
    amount: 800,
    category: 'Entertainment',
    type: 'expense',
    date: '2026-04-12',
    notes: 'Weekend movie with friends',
    recurring: false,
  },
  {
    id: '9',
    title: 'Electricity Bill',
    amount: 2500,
    category: 'Utilities',
    type: 'expense',
    date: '2026-04-15',
    notes: 'Monthly electricity',
    recurring: true,
  },
  {
    id: '10',
    title: 'New Shoes',
    amount: 4500,
    category: 'Shopping',
    type: 'expense',
    date: '2026-04-08',
    notes: 'Running shoes from Nike',
    recurring: false,
  },
];

export const loadInitialTransactions = () => {
  const stored = localStorage.getItem('finance_transactions');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('finance_transactions', JSON.stringify(SAMPLE_TRANSACTIONS));
  return SAMPLE_TRANSACTIONS;
};

export const saveTransactions = (transactions) => {
  localStorage.setItem('finance_transactions', JSON.stringify(transactions));
};

export const loadBudget = () => {
  const stored = localStorage.getItem('finance_budget');
  if (stored) {
    return JSON.parse(stored);
  }
  const defaultBudget = { monthlyBudget: 50000 };
  localStorage.setItem('finance_budget', JSON.stringify(defaultBudget));
  return defaultBudget;
};

export const saveBudget = (budget) => {
  localStorage.setItem('finance_budget', JSON.stringify(budget));
};
