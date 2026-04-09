import { createContext, useContext, useState } from 'react'
import { ALL_SCHEMES, SCHEMES } from '../data/schemes'

const SchemeContext = createContext(null)

export function SchemeProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [filters, setFilters] = useState({ state: '', income: '', gender: '' })

  const getSchemesByCategory = (catId) => SCHEMES[catId] || []

  const searchAllSchemes = (query) => {
    if (!query) return ALL_SCHEMES
    const q = query.toLowerCase()
    return ALL_SCHEMES.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.eligibility.toLowerCase().includes(q) ||
      s.tags.some(t => t.includes(q))
    )
  }

  const filterSchemes = (list, overrides = {}) => {
    const f = { ...filters, ...overrides }
    return list.filter(s => {
      if (f.state && f.state !== 'All India' && s.state !== 'All India' && s.state !== f.state) return false
      if (f.income && s.maxIncome < Number(f.income)) return false
      return true
    })
  }

  return (
    <SchemeContext.Provider value={{
      searchQuery, setSearchQuery,
      activeCategory, setActiveCategory,
      filters, setFilters,
      getSchemesByCategory,
      searchAllSchemes,
      filterSchemes,
    }}>
      {children}
    </SchemeContext.Provider>
  )
}

export const useSchemes = () => {
  const ctx = useContext(SchemeContext)
  if (!ctx) throw new Error('useSchemes must be used inside SchemeProvider')
  return ctx
}
