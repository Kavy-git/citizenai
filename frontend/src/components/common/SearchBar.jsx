import './SearchBar.css'

export default function SearchBar({ value, onChange, placeholder = 'Search schemes...', className = '' }) {
  return (
    <div className={`searchbar ${className}`}>
      <span className="searchbar__icon">🔍</span>
      <input
        className="searchbar__input"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button className="searchbar__clear" onClick={() => onChange('')} aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}
