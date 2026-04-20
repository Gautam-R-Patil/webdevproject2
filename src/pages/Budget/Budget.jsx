import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { MdEdit, MdSave } from 'react-icons/md';
import useBudget from '../../hooks/useBudget';
import useTransactions from '../../hooks/useTransactions';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import { formatCurrency, CATEGORIES } from '../../utils/currencyFormatter';
import './Budget.css';

const Budget = () => {
  const { budget, updateBudget, currentMonthExpenses, remainingBudget, percentageUsed, isOverBudget } = useBudget();
  const { allTransactions } = useTransactions();
  const [editing, setEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.monthlyBudget);

  const handleSave = () => {
    const amount = Number(newBudget);
    if (amount > 0) {
      updateBudget({ monthlyBudget: amount });
      setEditing(false);
      toast.success('Budget updated successfully!');
    } else {
      toast.error('Please enter a valid budget amount');
    }
  };

  const categoryBreakdown = CATEGORIES.map((cat) => {
    const total = allTransactions
      .filter((t) => t.type === 'expense' && t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { category: cat, total };
  })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="budget-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Budget Tracking
      </motion.h1>

      <div className="budget-set-section">
        <div className="budget-set-card">
          <h3>Monthly Budget</h3>
          {editing ? (
            <div className="budget-edit-row">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="budget-input"
                autoFocus
              />
              <motion.button
                className="budget-save-btn"
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdSave /> Save
              </motion.button>
            </div>
          ) : (
            <div className="budget-display-row">
              <span className="budget-amount">{formatCurrency(budget.monthlyBudget)}</span>
              <motion.button
                className="budget-edit-btn"
                onClick={() => {
                  setNewBudget(budget.monthlyBudget);
                  setEditing(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdEdit /> Edit
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <BudgetCard
        budget={budget.monthlyBudget}
        spent={currentMonthExpenses}
        remaining={remainingBudget}
        percentageUsed={percentageUsed}
        isOverBudget={isOverBudget}
      />

      <motion.div
        className="category-breakdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="section-title">Category Breakdown</h3>
        {categoryBreakdown.length === 0 ? (
          <p className="empty-text">No expenses recorded yet.</p>
        ) : (
          <div className="category-list">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="category-item">
                <div className="category-item-info">
                  <span className="category-name">{item.category}</span>
                  <span className="category-amount">{formatCurrency(item.total)}</span>
                </div>
                <div className="category-bar">
                  <motion.div
                    className="category-bar-fill"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.total / (categoryBreakdown[0]?.total || 1)) * 100}%`,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Budget;
