import { MdSearch } from 'react-icons/md';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search transactions...' }) => {
  return (
    <div className="search-bar">
      <MdSearch className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
