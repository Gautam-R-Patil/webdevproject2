import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/financeContextDef';
import { parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

const useTransactions = (filters = {}) => {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } =
    useContext(FinanceContext);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          (t.notes && t.notes.toLowerCase().includes(query))
      );
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.type && filters.type !== 'All') {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.dateFrom && filters.dateTo) {
      result = result.filter((t) => {
        const txDate = parseISO(t.date);
        return isWithinInterval(txDate, {
          start: startOfDay(parseISO(filters.dateFrom)),
          end: endOfDay(parseISO(filters.dateTo)),
        });
      });
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case 'date':
            return new Date(b.date) - new Date(a.date);
          case 'amount':
            return b.amount - a.amount;
          case 'category':
            return a.category.localeCompare(b.category);
          default:
            return 0;
        }
      });
    } else {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [transactions, filters]);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  const netBalance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  );

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    totalIncome,
    totalExpenses,
    netBalance,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
};

export default useTransactions;
