const User       = require('../models/user')
const SchemeView = require('../models/SchemeView')

const getSaved = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('savedSchemes')
    res.json({ success: true, savedSchemes: user.savedSchemes })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const saveScheme = async (req, res) => {
  try {
    const { schemeId, schemeName, category } = req.body
    const user = await User.findById(req.user._id)

    if (user.savedSchemes.find(s => s.schemeId === schemeId))
      return res.status(400).json({ success: false, error: 'Scheme already saved.' })

    user.savedSchemes.push({ schemeId, schemeName, category })
    await user.save()

    await SchemeView.findOneAndUpdate(
      { schemeId },
      { $inc: { saves: 1 }, schemeName, category },
      { upsert: true }
    )

    res.json({ success: true, message: 'Scheme saved!', savedSchemes: user.savedSchemes })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const removeSaved = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.savedSchemes = user.savedSchemes.filter(s => s.schemeId !== req.params.schemeId)
    await user.save()
    res.json({ success: true, message: 'Scheme removed.', savedSchemes: user.savedSchemes })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { age, state, occupation, income, category } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profile: { age, state, occupation, income, category } },
      { new: true }
    ).select('-password')
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const getChatHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('chatHistory')
    res.json({ success: true, chatHistory: user.chatHistory.slice(-50) })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

const saveChatMessage = async (req, res) => {
  try {
    const { role, content } = req.body
    await User.findByIdAndUpdate(req.user._id, {
      $push: { chatHistory: { role, content } }
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
}

module.exports = { getSaved, saveScheme, removeSaved, updateProfile, getChatHistory, saveChatMessage }