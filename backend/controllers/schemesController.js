const { CATEGORIES, SCHEMES, ALL_SCHEMES, STATES } = require('../data/schemes')

// GET /api/schemes/categories
const getCategories = (req, res) => {
  res.json({ success: true, data: CATEGORIES })
}

// GET /api/schemes/states
const getStates = (req, res) => {
  res.json({ success: true, data: STATES })
}

// GET /api/schemes/:category
const getSchemesByCategory = (req, res) => {
  const { category } = req.params
  const { state, maxIncome, search } = req.query

  if (!SCHEMES[category]) {
    return res.status(404).json({ success: false, error: `Category '${category}' not found.` })
  }

  let results = [...SCHEMES[category]]

  // Filter by state
  if (state && state !== 'All India') {
    results = results.filter(s => s.state === 'All India' || s.state === state)
  }

  // Filter by income
  if (maxIncome) {
    const income = Number(maxIncome)
    if (!isNaN(income)) {
      results = results.filter(s => s.maxIncome >= income)
    }
  }

  // Filter by search keyword
  if (search) {
    const q = search.toLowerCase()
    results = results.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.eligibility.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.ministry.toLowerCase().includes(q)
    )
  }

  res.json({ success: true, count: results.length, data: results })
}

// GET /api/schemes/search?q=keyword
const searchAllSchemes = (req, res) => {
  const { q } = req.query

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Search query must be at least 2 characters.' })
  }

  const query = q.toLowerCase()
  const results = ALL_SCHEMES.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.eligibility.toLowerCase().includes(query) ||
    s.tags.some(t => t.toLowerCase().includes(query)) ||
    s.ministry.toLowerCase().includes(query) ||
    s.benefit.toLowerCase().includes(query)
  )

  res.json({ success: true, count: results.length, data: results })
}

// GET /api/schemes/scheme/:id
const getSchemeById = (req, res) => {
  const { id } = req.params
  const scheme = ALL_SCHEMES.find(s => s.id === id)

  if (!scheme) {
    return res.status(404).json({ success: false, error: `Scheme '${id}' not found.` })
  }

  res.json({ success: true, data: scheme })
}

// POST /api/schemes/eligibility  — check eligibility from profile
const checkEligibility = (req, res) => {
  const { age, income, gender, occupation, education, state } = req.body

  if (!age || !occupation) {
    return res.status(400).json({ success: false, error: 'Age and occupation are required.' })
  }

  const ageNum    = Number(age)
  const incomeNum = Number(income) || 999999

  // Map occupation → relevant categories
  const categoryMap = {
    student:     ['students'],
    farmer:      ['farmers'],
    unemployed:  ['jobs'],
    employed:    ['jobs'],
    selfemployed:['startups', 'jobs'],
    business:    ['startups'],
    homemaker:   ['women'],
    retired:     ['seniors'],
  }

  const occupationKey = (occupation || '').toLowerCase().replace(/\s/g, '')
  let relevantCategories = categoryMap[occupationKey] || Object.keys(SCHEMES)

  // Add seniors if age >= 60
  if (ageNum >= 60 && !relevantCategories.includes('seniors')) {
    relevantCategories.push('seniors')
  }

  // Add women if gender is female
  if ((gender || '').toLowerCase() === 'female' && !relevantCategories.includes('women')) {
    relevantCategories.push('women')
  }

  // Always include disabled if relevant (we can't infer, so skip unless explicitly stated)
  let matched = []

  relevantCategories.forEach(cat => {
    if (!SCHEMES[cat]) return
    const filtered = SCHEMES[cat].filter(s => {
      // Income filter
      if (s.maxIncome < incomeNum && s.maxIncome !== 999999) return false
      // State filter
      if (state && state !== 'All India' && s.state !== 'All India' && s.state !== state) return false
      return true
    })
    filtered.forEach(s => matched.push({ ...s, category: cat }))
  })

  // Deduplicate
  const seen = new Set()
  matched = matched.filter(s => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })

  res.json({ success: true, count: matched.length, profile: { age, income, gender, occupation, state }, data: matched })
}

module.exports = {
  getCategories,
  getStates,
  getSchemesByCategory,
  searchAllSchemes,
  getSchemeById,
  checkEligibility,
}
