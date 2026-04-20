import { createContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadInitialTransactions, saveTransactions, loadBudget, saveBudget } from '../services/api';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ monthlyBudget: 50000 });

  useEffect(() => {
    const storedTransactions = loadInitialTransactions();
    setTransactions(storedTransactions);
    const storedBudget = loadBudget();
    setBudget(storedBudget);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: uuidv4(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTransactions(updated);
      return updated;
    });
  }, []);

  const updateTransaction = useCallback((id, updatedData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedData } : t))
    );
  }, []);

  const updateBudget = useCallback((newBudget) => {
    setBudget(newBudget);
    saveBudget(newBudget);
  }, []);

  const value = {
    transactions,
    budget,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    updateBudget,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
