import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useTransactions from '../../hooks/useTransactions';
import useCurrency from '../../hooks/useCurrency';
import SpendingPieChart from '../../components/Charts/SpendingPieChart';
import MonthlyTrendChart from '../../components/Charts/MonthlyTrendChart';
import IncomeExpenseChart from '../../components/Charts/IncomeExpenseChart';
import { formatCurrency } from '../../utils/currencyFormatter';
import '../../components/Charts/Charts.css';
import './Analytics.css';

const Analytics = () => {
  const { allTransactions, totalIncome, totalExpenses, netBalance } = useTransactions();
  const { rates, selectedCurrency, setSelectedCurrency, loading } = useCurrency();

  const currencies = useMemo(() => {
    if (!rates) return ['INR', 'USD', 'EUR', 'GBP'];
    return Object.keys(rates).filter((c) =>
      ['INR', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'].includes(c)
    );
  }, [rates]);

  const recurringExpenses = allTransactions.filter(
    (t) => t.type === 'expense' && t.recurring
  );

  const recurringTotal = recurringExpenses.reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Analytics
        </motion.h1>

        <div className="currency-selector">
          <label>Currency:</label>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            disabled={loading}
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {loading && <span className="loading-text">Loading rates...</span>}
        </div>
      </div>

      <div className="analytics-summary">
        <motion.div
          className="summary-card income"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="summary-label">Total Income</span>
          <span className="summary-value">{formatCurrency(totalIncome)}</span>
        </motion.div>
        <motion.div
          className="summary-card expense"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value">{formatCurrency(totalExpenses)}</span>
        </motion.div>
        <motion.div
          className="summary-card balance"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="summary-label">Net Balance</span>
          <span className="summary-value">{formatCurrency(netBalance)}</span>
        </motion.div>
      </div>

      <div className="charts-grid">
        <SpendingPieChart transactions={allTransactions} />
        <MonthlyTrendChart transactions={allTransactions} />
      </div>

      <div className="charts-full">
        <IncomeExpenseChart transactions={allTransactions} />
      </div>

      <motion.div
        className="recurring-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="section-title">
          Recurring Expenses
          <span className="recurring-total">{formatCurrency(recurringTotal)}/month</span>
        </h3>
        {recurringExpenses.length === 0 ? (
          <p className="empty-text">No recurring expenses tracked.</p>
        ) : (
          <div className="recurring-list">
            {recurringExpenses.map((t) => (
              <div key={t.id} className="recurring-item">
                <div className="recurring-item-info">
                  <span className="recurring-item-title">{t.title}</span>
                  <span className="recurring-item-category">{t.category}</span>
                </div>
                <span className="recurring-item-amount">{formatCurrency(t.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Analytics;
