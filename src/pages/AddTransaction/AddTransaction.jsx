import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useTransactions from '../../hooks/useTransactions';
import { CATEGORIES } from '../../utils/currencyFormatter';
import './AddTransaction.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be positive'),
  category: yup.string().required('Category is required'),
  type: yup.string().required('Type is required').oneOf(['income', 'expense']),
  date: yup.string().required('Date is required'),
  notes: yup.string(),
  recurring: yup.boolean(),
});

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editTransaction = location.state?.transaction;
  const { addTransaction, updateTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      recurring: false,
    },
  });

  useEffect(() => {
    if (editTransaction) {
      reset({
        title: editTransaction.title,
        amount: editTransaction.amount,
        category: editTransaction.category,
        type: editTransaction.type,
        date: editTransaction.date,
        notes: editTransaction.notes || '',
        recurring: editTransaction.recurring || false,
      });
    }
  }, [editTransaction, reset]);

  const onSubmit = (data) => {
    if (editTransaction) {
      updateTransaction(editTransaction.id, data);
      toast.success('Transaction updated successfully!');
    } else {
      addTransaction(data);
      toast.success('Transaction added successfully!');
    }
    navigate('/transactions');
  };

  return (
    <div className="add-transaction-page">
      <motion.h1
        className="page-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </motion.h1>

      <motion.form
        className="transaction-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input type="text" {...register('title')} placeholder="e.g. Grocery Shopping" />
            {errors.title && <span className="form-error">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" {...register('amount')} placeholder="e.g. 1500" />
            {errors.amount && <span className="form-error">{errors.amount.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select {...register('category')}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category.message}</span>}
          </div>

          <div className="form-group">
            <label>Type</label>
            <select {...register('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {errors.type && <span className="form-error">{errors.type.message}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input type="date" {...register('date')} />
            {errors.date && <span className="form-error">{errors.date.message}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" {...register('recurring')} />
              <span>Recurring Transaction</span>
            </label>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Notes</label>
          <textarea {...register('notes')} placeholder="Optional notes..." rows={3} />
        </div>

        <div className="form-actions">
          <motion.button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {editTransaction ? 'Update Transaction' : 'Add Transaction'}
          </motion.button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/transactions')}>
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddTransaction;
