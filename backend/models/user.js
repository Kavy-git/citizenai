const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
{
  name: { type: String, required: true, trim: true },

  email: { type: String, required: true, unique: true, lowercase: true, trim: true },

  password: { type: String, minlength: 6 },

  googleId: { type: String },

  avatar: { type: String, default: '' },

  savedSchemes: [
    {
      schemeId: { type: String, required: true },
      schemeName: { type: String, required: true },
      category: { type: String },
      savedAt: { type: Date, default: Date.now },
    },
  ],

  profile: {
    age: { type: Number },
    state: { type: String },
    occupation: { type: String },
    income: { type: Number },
    category: { type: String },
  },

  chatHistory: [
    {
      role: { type: String, enum: ['user', 'assistant'] },
      content: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  isAdmin: { type: Boolean, default: false },

},
{ timestamps: true }
)


// 🔐 HASH PASSWORD BEFORE SAVE
userSchema.pre('save', async function () {

  try {

    // Skip if password does not exist (Google login)
    if (!this.password) return

    // Skip if password not modified
    if (!this.isModified('password')) return

    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)

  } catch (err) {

    console.error("Password Hash Error:", err)
    throw err

  }

})


// 🔐 COMPARE PASSWORD
userSchema.methods.comparePassword = async function (candidatePassword) {

  try {

    if (!this.password) return false

    return await bcrypt.compare(candidatePassword, this.password)

  } catch (err) {

    console.error("Password Compare Error:", err)
    return false

  }

}

module.exports = mongoose.model('User', userSchema)