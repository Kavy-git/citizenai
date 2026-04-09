import { useChat } from '../context/ChatContext'

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
        body:    JSON.stringify({ messages: [...messages, userMsg] }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server error')
      }

      addMessage({ role: 'assistant', content: data.reply })

      // ── Save to MongoDB if logged in ──
      const token = localStorage.getItem('citizen_ai_token')
      if (token) {
        const headers = {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        }
        await fetch(`${BACKEND_URL}/api/user/history`, {
          method: 'POST', headers,
          body: JSON.stringify({ role: 'user', content: userText }),
        })
        await fetch(`${BACKEND_URL}/api/user/history`, {
          method: 'POST', headers,
          body: JSON.stringify({ role: 'assistant', content: data.reply }),
        })
      }

    } catch (err) {
      addMessage({
        role:    'assistant',
        content: '⚠️ ' + (err.message || 'Connection error. Make sure backend is running.'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { sendMessage }
}