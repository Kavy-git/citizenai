const mongoose = require('mongoose')

const schemeViewSchema = new mongoose.Schema({
  schemeId:   { type: String, required: true, unique: true },
  schemeName: { type: String, required: true },
  category:   { type: String },
  views:      { type: Number, default: 0 },
  saves:      { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('SchemeView', schemeViewSchema)