import { motion } from 'framer-motion';
import { MdEdit, MdDelete, MdRepeat } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { formatCurrency } from '../../utils/currencyFormatter';
import './TransactionCard.css';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { title, amount, category, type, date, notes, recurring } = transaction;

  return (
    <motion.div
      className={`transaction-card ${type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <div className="tc-left">
        <div className="tc-category-badge">{category}</div>
        <div className="tc-info">
          <h4 className="tc-title">
            {title}
            {recurring && <MdRepeat className="recurring-icon" title="Recurring" />}
          </h4>
          <p className="tc-date">{format(parseISO(date), 'dd MMM yyyy')}</p>
          {notes && <p className="tc-notes">{notes}</p>}
        </div>
      </div>
      <div className="tc-right">
        <span className={`tc-amount ${type}`}>
          {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
        </span>
        <div className="tc-actions">
          <button className="tc-btn edit" onClick={() => onEdit(transaction)} title="Edit">
            <MdEdit />
          </button>
          <button className="tc-btn delete" onClick={() => onDelete(transaction.id)} title="Delete">
            <MdDelete />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
