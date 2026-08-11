"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaTimes, FaSpinner, FaMagic } from "react-icons/fa"
import ReactMarkdown from "react-markdown"

interface ProjectExplainerProps {
  projectName: string
  isOpen: boolean
  onClose: () => void
}

export default function ProjectExplainer({ projectName, isOpen, onClose }: ProjectExplainerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleExplain = async () => {
    setIsLoading(true)
    setExplanation(null)
    setError(null)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project-explanation",
          projectName
        })
      })

      const data = await response.json()
      
      if (data.error) {
        setError(data.message || "Error generating explanation")
      } else {
        setExplanation(data.message || "No explanation available")
      }
    } catch (err) {
      setError("Failed to generate explanation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setExplanation(null)
      setError(null)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-neon/10 border-b border-neon/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-neon/20 rounded-full flex items-center justify-center"
                >
                  <FaMagic className="text-neon text-xl" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AI Project Explainer</h3>
                  <p className="text-neon text-sm">{projectName}</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-neon transition-colors p-2"
              >
                <FaTimes size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {!explanation && !error && !isLoading && (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-4"
                  >
                    <FaMagic className="text-6xl text-neon/50" />
                  </motion.div>
                  <p className="text-gray-300 mb-6">
                    Get an AI-powered explanation of this project, including its architecture, technologies, and technical details.
                  </p>
                  <motion.button
                    onClick={handleExplain}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-neon text-background font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <FaMagic />
                    Generate Explanation
                  </motion.button>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <FaSpinner className="animate-spin text-4xl text-neon mb-4 mx-auto" />
                  <p className="text-gray-300">Analyzing project...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <div className="text-red-400 mb-4">{error}</div>
                  <motion.button
                    onClick={handleExplain}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-colors"
                  >
                    Try Again
                  </motion.button>
                </div>
              )}

              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert max-w-none"
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }: any) => (
                        <p className="text-gray-300 mb-4 last:mb-0">{children}</p>
                      ),
                      h1: ({ children }: any) => (
                        <h1 className="text-2xl font-bold text-neon mb-4">{children}</h1>
                      ),
                      h2: ({ children }: any) => (
                        <h2 className="text-xl font-bold text-neon mb-3">{children}</h2>
                      ),
                      h3: ({ children }: any) => (
                        <h3 className="text-lg font-bold text-white mb-2">{children}</h3>
                      ),
                      ul: ({ children }: any) => (
                        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                      ),
                      ol: ({ children }: any) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                      ),
                      li: ({ children }: any) => (
                        <li className="text-gray-300">{children}</li>
                      ),
                      strong: ({ children }: any) => (
                        <strong className="text-neon">{children}</strong>
                      ),
                      code: ({ children }: any) => (
                        <code className="bg-neon/10 px-2 py-1 rounded text-neon">{children}</code>
                      ),
                      pre: ({ children }: any) => (
                        <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto mb-4 border border-neon/20">{children}</pre>
                      )
                    }}
                  >
                    {explanation}
                  </ReactMarkdown>
                  
                  <motion.button
                    onClick={handleExplain}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-colors"
                  >
                    Regenerate Explanation
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
