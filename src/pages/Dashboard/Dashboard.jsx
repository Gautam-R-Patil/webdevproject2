import { motion } from 'framer-motion';
import { MdTrendingUp, MdTrendingDown, MdAccountBalance, MdCategory } from 'react-icons/md';
import useTransactions from '../../hooks/useTransactions';
import useBudget from '../../hooks/useBudget';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import SpendingPieChart from '../../components/Charts/SpendingPieChart';
import IncomeExpenseChart from '../../components/Charts/IncomeExpenseChart';
import { formatCurrency } from '../../utils/currencyFormatter';
import '../../components/Charts/Charts.css';
import './Dashboard.css';

const Dashboard = () => {
  const { allTransactions, totalIncome, totalExpenses, netBalance } = useTransactions();
  const { budget, currentMonthExpenses, remainingBudget, percentageUsed, isOverBudget } = useBudget();

  const topCategory = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const topCategoryName = Object.keys(topCategory).sort(
    (a, b) => topCategory[b] - topCategory[a]
  )[0] || 'N/A';

  const recentTransactions = allTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const statCards = [
    { label: 'Total Income', value: formatCurrency(totalIncome), icon: <MdTrendingUp />, color: '#4caf50' },
    { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: <MdTrendingDown />, color: '#f44336' },
    { label: 'Net Balance', value: formatCurrency(netBalance), icon: <MdAccountBalance />, color: '#2196f3' },
    { label: 'Top Category', value: topCategoryName, icon: <MdCategory />, color: '#ff9800' },
  ];

  return (
    <div className="dashboard">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h1>

      <div className="stat-cards">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-card-icon" style={{ background: `${card.color}20`, color: card.color }}>
              {card.icon}
            </div>
            <div className="stat-card-info">
              <span className="stat-card-label">{card.label}</span>
              <span className="stat-card-value">{card.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        <BudgetCard
          budget={budget.monthlyBudget}
          spent={currentMonthExpenses}
          remaining={remainingBudget}
          percentageUsed={percentageUsed}
          isOverBudget={isOverBudget}
        />

        <SpendingPieChart transactions={allTransactions} />
      </div>

      <div className="dashboard-full">
        <IncomeExpenseChart transactions={allTransactions} />
      </div>

      <div className="recent-section">
        <h3 className="section-title">Recent Transactions</h3>
        {recentTransactions.length === 0 ? (
          <p className="empty-text">No transactions yet. Add your first transaction!</p>
        ) : (
          <div className="recent-list">
            {recentTransactions.map((t) => (
              <div key={t.id} className={`recent-item ${t.type}`}>
                <div className="recent-item-left">
                  <span className="recent-item-title">{t.title}</span>
                  <span className="recent-item-category">{t.category}</span>
                </div>
                <span className={`recent-item-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
