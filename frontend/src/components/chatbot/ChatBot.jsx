import { useRef, useEffect, useState } from 'react'
import { useChat } from '../../context/ChatContext'
import { useChatApi } from '../../hooks/useChatApi'
import { parseBold } from '../../utils/helpers'
import './ChatBot.css'

export default function ChatBot() {

  const { isOpen, closeChat, toggleChat, messages, isLoading } = useChat()
  const { sendMessage } = useChatApi()

  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])


  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }


  // 🎤 Voice input (SAFE VERSION)
  const handleVoice = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang = "en-IN"
    recognition.interimResults = false
    recognition.continuous = false

    setListening(true)

    recognition.start()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)   // only fills textbox
    }

    recognition.onend = () => {
      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
    }
  }


  const renderText = (text) => {
    return text.split('\n').map((line, li) => (
      <span key={li}>
        {parseBold(line).map((seg, i) =>
          seg.bold
            ? <strong key={i} style={{ color: 'var(--color-primary)' }}>{seg.text}</strong>
            : <span key={i}>{seg.text}</span>
        )}
        {li < text.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-fab ${isOpen ? 'chat-fab--open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? '✕' : '💬'}
      </button>


      {isOpen && (
        <div className="chatbot animate-fadeUp">

          {/* Header */}
          <div className="chatbot__header">
            <div className="chatbot__avatar">🏛️</div>

            <div className="chatbot__info">
              <div className="chatbot__name">Citizen AI</div>
              <div className="chatbot__status">
                {listening ? "Listening..." : "Online — Ask me anything"}
              </div>
            </div>

            <button
              className="chatbot__close"
              onClick={closeChat}
            >
              ✕
            </button>
          </div>


          {/* Messages */}
          <div className="chatbot__messages">

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot__msg chatbot__msg--${msg.role}`}
              >

                {msg.role === 'assistant' && (
                  <div className="chatbot__msg-avatar">🏛️</div>
                )}

                <div className="chatbot__bubble">
                  {renderText(msg.content)}
                </div>

              </div>
            ))}


            {isLoading && (
              <div className="chatbot__msg chatbot__msg--assistant">
                <div className="chatbot__msg-avatar">🏛️</div>
                <div className="chatbot__bubble chatbot__bubble--typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>


          {/* Quick prompts */}
          <div className="chatbot__quick">
            {['Schemes for farmers', 'Student scholarships', 'Women employment'].map(q => (
              <button
                key={q}
                className="chatbot__quick-btn"
                onClick={() => sendMessage(q)}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>


          {/* Input */}
          <div className="chatbot__input-row">

            <textarea
              className="chatbot__input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about any government scheme..."
              rows={1}
            />

            {/* 🎤 Mic */}
            <button
              className="chatbot__mic"
              onClick={handleVoice}
              disabled={isLoading}
            >
              🎤
            </button>

            {/* Send */}
            <button
              className="chatbot__send"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              →
            </button>

          </div>

        </div>
      )}
    </>
  )
}