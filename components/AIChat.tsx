"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaMicrophone,
  FaSpinner,
} from "react-icons/fa"
import ReactMarkdown from "react-markdown"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedQuestions = [
  "What does Sudharsan build?",
  "What are his technical skills?",
  "Tell me about his project",
  "Why hire Sudharsan?",
  "What is his experience?",
  "Contact Sudharsan",
]

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sudharsan AI. Ask me anything about Sudharsan's skills, projects, experience, education, or background.",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleOpenAIChat = () => setIsOpen(true)

    document.addEventListener("openAIChat", handleOpenAIChat)

    return () => {
      document.removeEventListener("openAIChat", handleOpenAIChat)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input

    if (!textToSend.trim()) return

    const userMessage: Message = {
      role: "user",
      content: textToSend,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        role: "assistant",
        content:
          data.message ||
          "I apologize, but something went wrong. Please try again.",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I'm Sudharsan AI. Ask me anything about Sudharsan's skills, projects, experience, education, or background.",
      },
    ])
  }

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-neon text-background rounded-full shadow-neon hover:shadow-neon-hover flex items-center justify-center text-2xl transition-all duration-300"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <FaRobot />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md max-h-[80vh] glass rounded-2xl overflow-hidden shadow-neon"
          >
            {/* Header */}
            <div className="bg-neon/10 border-b border-neon/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-10 h-10 bg-neon/20 rounded-full flex items-center justify-center"
                  >
                    <FaRobot className="text-neon" />
                  </motion.div>

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-neon/20 rounded-full blur-md"
                  />
                </div>

                <div>
                  <h3 className="text-white font-bold">
                    Sudharsan AI
                  </h3>

                  <p className="text-neon text-sm">
                    Portfolio Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear Chat */}
                <motion.button
                  onClick={clearChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-neon transition-colors p-2"
                  title="Clear chat"
                >
                  Clear
                </motion.button>

                {/* Close */}
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-neon transition-colors p-2"
                  title="Close chat"
                >
                  <FaTimes />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-neon text-background"
                        : "bg-background/50 border border-neon/20 text-white"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ children }: any) => (
                            <p className="mb-2 last:mb-0">
                              {children}
                            </p>
                          ),

                          ul: ({ children }: any) => (
                            <ul className="list-disc list-inside mb-2">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }: any) => (
                            <ol className="list-decimal list-inside mb-2">
                              {children}
                            </ol>
                          ),

                          li: ({ children }: any) => (
                            <li className="ml-2">
                              {children}
                            </li>
                          ),

                          strong: ({ children }: any) => (
                            <strong className="text-neon">
                              {children}
                            </strong>
                          ),

                          code: ({ children }: any) => (
                            <code className="bg-neon/10 px-1 py-0.5 rounded text-neon">
                              {children}
                            </code>
                          ),

                          pre: ({ children }: any) => (
                            <pre className="bg-background/50 p-2 rounded-lg overflow-x-auto mb-2">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-background/50 border border-neon/20 p-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <FaSpinner className="animate-spin text-neon" />

                      <span className="text-gray-400">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map(
                  (question, index) => (
                    <motion.button
                      key={index}
                      onClick={() =>
                        handleSend(question)
                      }
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon hover:bg-neon/20 transition-colors"
                    >
                      {question}
                    </motion.button>
                  )
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neon/20">
              <div className="flex items-center gap-2">

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background/50 border border-neon/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-neon focus:shadow-neon outline-none resize-none transition-all duration-300"
                  rows={1}
                  disabled={isLoading}
                />

                {/* Send */}
                <motion.button
                  onClick={() => handleSend()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={
                    isLoading || !input.trim()
                  }
                  className="w-12 h-12 bg-neon text-background rounded-xl flex items-center justify-center shadow-neon hover:shadow-neon-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaPaperPlane />
                  )}
                </motion.button>

                {/* Voice */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled
                  className="w-12 h-12 bg-background/50 border border-neon/20 rounded-xl flex items-center justify-center text-gray-400 disabled:opacity-50"
                  title="Voice coming soon"
                >
                  <FaMicrophone />
                </motion.button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}