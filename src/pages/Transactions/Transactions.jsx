import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import useTransactions from '../../hooks/useTransactions';
import useDebounce from '../../hooks/useDebounce';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import './Transactions.css';

const Transactions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    sortBy: 'date',
    dateFrom: '',
    dateTo: '',
  });

  const debouncedSearch = useDebounce(searchQuery);

  const { transactions, deleteTransaction } = useTransactions({
    ...filters,
    search: debouncedSearch,
  });

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleDelete = useCallback(
    (id) => {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully!');
    },
    [deleteTransaction]
  );

  const handleEdit = useCallback(
    (transaction) => {
      navigate('/transactions/new', { state: { transaction } });
    },
    [navigate]
  );

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Transactions
        </motion.h1>
        <motion.button
          className="add-btn"
          onClick={() => navigate('/transactions/new')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdAdd /> Add Transaction
        </motion.button>
      </div>

      <div className="transactions-controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No transactions found. Try adjusting your filters or add a new transaction.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {transactions.map((t) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Transactions;
