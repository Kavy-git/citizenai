const { ALL_SCHEMES, CATEGORIES } = require('../data/schemes')

// GET /api/health
const healthCheck = (req, res) => {
  res.json({
    success:   true,
    status:    'OK',
    service:   'Citizen AI Backend',
    version:   '1.0.0',
    timestamp: new Date().toISOString(),
    stats: {
      totalSchemes:    ALL_SCHEMES.length,
      totalCategories: CATEGORIES.length,
    },
  })
}

module.exports = { healthCheck }
