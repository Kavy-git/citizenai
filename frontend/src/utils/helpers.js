/**
 * Format a number as Indian Rupees
 * @param {number} amount
 */
export const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)

/**
 * Truncate a string to maxLength with ellipsis
 */
export const truncate = (str, maxLength = 80) =>
  str?.length > maxLength ? str.slice(0, maxLength) + '...' : str

/**
 * Get current year
 */
export const currentYear = () => new Date().getFullYear()

/**
 * Highlight search matches in text — returns segments [{text, highlight}]
 */
export const highlight = (text = '', query = '') => {
  if (!query) return [{ text, highlight: false }]
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.split(regex).map(part => ({
    text: part,
    highlight: regex.test(part),
  }))
}

/**
 * Debounce a function call
 */
export const debounce = (fn, delay = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Bold markdown parser — returns segments with bold flag
 * Parses **text** into bold
 */
export const parseBold = (text = '') => {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) => ({ text: part, bold: i % 2 === 1 }))
}
