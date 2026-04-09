const fetch  = require('node-fetch')
const config = require('../config')

const sendMessage = async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'messages array is required.',
    })
  }

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: config.SYSTEM_PROMPT,
            },
            ...messages,
          ],
          temperature: 0.6,
          max_tokens: config.MAX_TOKENS || 500,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Groq API Error:', data)
      return res.status(500).json({
        success: false,
        error: data?.error?.message || 'Groq API error',
      })
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      'Sorry, I could not generate a response.'

    res.json({ success: true, reply })

  } catch (err) {
    console.error('[Chat Controller Error]', err)
    res.status(500).json({
      success: false,
      error: 'Server error while calling Groq API.',
    })
  }
}

module.exports = { sendMessage }