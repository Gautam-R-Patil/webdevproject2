import { CATEGORIES } from '../../utils/currencyFormatter';
import './Filters.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={filters.category || 'All'}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Type</label>
        <select
          value={filters.type || 'All'}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select
          value={filters.sortBy || 'date'}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>
      </div>

      <div className="filter-group">
        <label>From</label>
        <input
          type="date"
          value={filters.dateFrom || ''}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>To</label>
        <input
          type="date"
          value={filters.dateTo || ''}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
