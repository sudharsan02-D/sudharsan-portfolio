"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaTimes } from "react-icons/fa"

interface ProjectSearchProps {
  projects: any[]
  onFilteredProjects: (projects: any[]) => void
}

export default function ProjectSearch({ projects, onFilteredProjects }: ProjectSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      onFilteredProjects(projects)
      return
    }

    setIsSearching(true)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project-search",
          searchQuery: query
        })
      })

      const data = await response.json()
      
      if (data.projects && Array.isArray(data.projects)) {
        onFilteredProjects(data.projects)
      } else {
        // Fallback to local search if AI search fails
        const lowerQuery = query.toLowerCase()
        const filtered = projects.filter(project => {
          const searchableText = [
            project.title,
            project.description,
            ...project.tech
          ].join(" ").toLowerCase()
          return searchableText.includes(lowerQuery)
        })
        onFilteredProjects(filtered)
      }
    } catch (error) {
      // Fallback to local search on error
      const lowerQuery = query.toLowerCase()
      const filtered = projects.filter(project => {
        const searchableText = [
          project.title,
          project.description,
          ...project.tech
        ].join(" ").toLowerCase()
        return searchableText.includes(lowerQuery)
      })
      onFilteredProjects(filtered)
    } finally {
      setIsSearching(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    onFilteredProjects(projects)
  }

  const suggestedSearches = [
    "AI projects",
    "MERN projects",
    "Python projects",
    "FastAPI projects",
    "React projects",
    "Machine learning"
  ]

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-all duration-300 flex items-center gap-2"
      >
        <FaSearch />
        <span className="hidden sm:inline">Search Projects</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="glass-card rounded-2xl max-w-2xl w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neon text-glow">AI Project Search</h3>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-neon transition-colors p-2"
                >
                  <FaTimes size={24} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search projects... (e.g., 'AI projects', 'MERN projects')"
                    className="w-full px-4 py-3 pl-12 bg-background/50 border border-neon/20 rounded-xl text-white placeholder-gray-400 focus:border-neon focus:shadow-neon outline-none transition-all duration-300"
                  />
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  {query && (
                    <motion.button
                      onClick={handleClear}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon transition-colors"
                    >
                      <FaTimes />
                    </motion.button>
                  )}
                </div>

                <motion.button
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-neon text-background font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Search with AI
                    </>
                  )}
                </motion.button>

                <div>
                  <p className="text-gray-400 text-sm mb-3">Suggested searches:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSearches.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setQuery(suggestion)
                          handleSearch()
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-neon/10 border border-neon/20 rounded-full text-xs text-neon hover:bg-neon/20 transition-colors"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
