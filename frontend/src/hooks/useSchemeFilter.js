import { useState, useMemo } from 'react'

/**
 * useSchemeFilter
 * Manages local search + filter state for a list of schemes.
 * @param {Array} schemes - The initial list of schemes to filter
 */
export function useSchemeFilter(schemes = []) {
  const [search, setSearch]   = useState('')
  const [state, setState]     = useState('')
  const [income, setIncome]   = useState('')

  const filtered = useMemo(() => {
    return schemes.filter(s => {
      const matchSearch = !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.eligibility.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some(t => t.includes(search.toLowerCase()))

      const matchState = !state || state === 'All India' ||
        s.state === 'All India' || s.state === state

      const matchIncome = !income || s.maxIncome >= Number(income)

      return matchSearch && matchState && matchIncome
    })
  }, [schemes, search, state, income])

  const reset = () => {
    setSearch('')
    setState('')
    setIncome('')
  }

  return { filtered, search, setSearch, state, setState, income, setIncome, reset }
}
