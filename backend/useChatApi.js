// ─────────────────────────────────────────────────────────────
//  useChatApi.js  —  Calls YOUR backend, not Anthropic directly
//  Backend keeps the API key safe on the server side
// ─────────────────────────────────────────────────────────────

import { useChat } from '../context/ChatContext'

// Change this to your deployed backend URL in production
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export function useChatApi() {
  const { addMessage, setIsLoading, messages } = useChat()

  const sendMessage = async (userText) => {
    if (!userText.trim()) return

    const userMsg = { role: 'user', content: userText }
    addMessage(userMsg)
    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role:    m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server error')
      }

      addMessage({ role: 'assistant', content: data.reply })
    } catch (err) {
      addMessage({
        role: 'assistant',
        content: `⚠️ ${err.message || 'Connection error. Please check your internet and try again.'}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { sendMessage }
}
