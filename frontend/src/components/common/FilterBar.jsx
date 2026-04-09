import SearchBar from './SearchBar'
import { STATES } from '../../data/schemes'
import './FilterBar.css'

export default function FilterBar({ search, setSearch, state, setState, income, setIncome, onReset }) {
  return (
    <div className="filter-bar">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name, eligibility..."
        className="filter-bar__search"
      />

      <div className="filter-bar__selects">
        <select
          className="filter-select"
          value={state}
          onChange={e => setState(e.target.value)}
        >
          {STATES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          className="filter-select"
          type="number"
          value={income}
          onChange={e => setIncome(e.target.value)}
          placeholder="Max income (₹)"
        />

        {(search || state || income) && (
          <button className="filter-reset" onClick={onReset}>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}
