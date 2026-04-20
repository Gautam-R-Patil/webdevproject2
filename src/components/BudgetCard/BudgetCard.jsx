import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/currencyFormatter';
import './BudgetCard.css';

const BudgetCard = ({ budget, spent, remaining, percentageUsed, isOverBudget }) => {
  return (
    <motion.div
      className="budget-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="budget-card-title">Monthly Budget Overview</h3>

      <div className="budget-stats">
        <div className="budget-stat">
          <span className="stat-label">Budget</span>
          <span className="stat-value">{formatCurrency(budget)}</span>
        </div>
        <div className="budget-stat">
          <span className="stat-label">Spent</span>
          <span className="stat-value spent">{formatCurrency(spent)}</span>
        </div>
        <div className="budget-stat">
          <span className="stat-label">Remaining</span>
          <span className={`stat-value ${isOverBudget ? 'over' : 'remaining'}`}>
            {formatCurrency(Math.abs(remaining))}
            {isOverBudget && ' over'}
          </span>
        </div>
      </div>

      <div className="budget-progress-container">
        <div className="budget-progress-bar">
          <motion.div
            className={`budget-progress-fill ${isOverBudget ? 'over' : ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="budget-percentage">{percentageUsed.toFixed(1)}%</span>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
