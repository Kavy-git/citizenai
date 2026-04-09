const express = require('express')
const router  = express.Router()
const {
  getCategories,
  getStates,
  getSchemesByCategory,
  searchAllSchemes,
  getSchemeById,
  checkEligibility,
} = require('../controllers/schemesController')

// GET  /api/schemes/categories        → all 7 categories
router.get('/categories', getCategories)

// GET  /api/schemes/states            → all Indian states list
router.get('/states', getStates)

// GET  /api/schemes/search?q=keyword  → search across all schemes
router.get('/search', searchAllSchemes)

// POST /api/schemes/eligibility       → match schemes to user profile
router.post('/eligibility', checkEligibility)

// GET  /api/schemes/scheme/:id        → single scheme by id
router.get('/scheme/:id', getSchemeById)

// GET  /api/schemes/:category         → schemes by category (+ filter query params)
//      ?state=Karnataka&maxIncome=200000&search=scholarship
router.get('/:category', getSchemesByCategory)

module.exports = router
