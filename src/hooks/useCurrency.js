import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '../services/api';
import { formatCurrency } from '../utils/currencyFormatter';

const useCurrency = () => {
  const [rates, setRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      const data = await fetchExchangeRates('INR');
      if (data) {
        setRates(data.rates);
      }
      setLoading(false);
    };
    loadRates();
  }, []);

  const convert = useCallback(
    (amount, toCurrency = selectedCurrency) => {
      if (!rates || toCurrency === 'INR') return amount;
      return amount * (rates[toCurrency] || 1);
    },
    [rates, selectedCurrency]
  );

  const format = useCallback(
    (amount) => {
      const converted = convert(amount);
      return formatCurrency(converted, selectedCurrency);
    },
    [convert, selectedCurrency]
  );

  return {
    rates,
    selectedCurrency,
    setSelectedCurrency,
    convert,
    format,
    loading,
  };
};

export default useCurrency;
