import { createContext, useContext, useState } from 'react'

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hello! I am **Citizen AI**, your guide to Indian government schemes.\n\nTell me about yourself — your age, income, state, and whether you are a student, farmer, entrepreneur, etc. — and I will find the best schemes for you!',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const openChat  = () => setIsOpen(true)
  const closeChat = () => setIsOpen(false)
  const toggleChat = () => setIsOpen(p => !p)

  const addMessage = (msg) => setMessages(prev => [...prev, msg])

  return (
    <ChatContext.Provider value={{
      isOpen, openChat, closeChat, toggleChat,
      messages, addMessage,
      isLoading, setIsLoading,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used inside ChatProvider')
  return ctx
}
