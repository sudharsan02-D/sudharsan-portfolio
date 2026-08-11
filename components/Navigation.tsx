"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaCode, FaEnvelope, FaRobot, FaCrosshairs, FaTimes, FaSpinner } from "react-icons/fa"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showRecruiterMode, setShowRecruiterMode] = useState(false)

  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScrollSpy)
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-neon text-glow cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Portfolio.
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-2 py-1 transition-all duration-300 ${
                  activeSection === section.id
                    ? "text-neon text-glow"
                    : "text-gray-300 hover:text-neon"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-neon"
                  />
                )}
              </motion.button>
            ))}
            <motion.button
              onClick={() => document.dispatchEvent(new CustomEvent('openAIChat'))}
              className="relative px-2 py-1 transition-all duration-300 text-neon text-glow"
              whileHover={{ scale: 1.1 }}
            >
              <span className="flex items-center gap-2">
                <FaRobot />
                Ask AI
              </span>
            </motion.button>
            <motion.button
              onClick={() => setShowRecruiterMode(true)}
              className="relative px-2 py-1 transition-all duration-300 text-neon text-glow"
              whileHover={{ scale: 1.1 }}
            >
              <span className="flex items-center gap-2">
                <FaCrosshairs />
                Recruiter Mode
              </span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a
              href="https://github.com/sudharsan02-D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon transition-colors"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sudharsan-m-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="https://leetcode.com/u/sudharsan_d02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-neon transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaCode size={20} />
            </motion.a>
            <motion.a
              href="mailto:sudharsan022601@gmail.com"
              className="text-gray-300 hover:text-neon transition-colors"
              whileHover={{ scale: 1.2 }}
            >
              <FaEnvelope size={20} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Recruiter Mode Modal */}
      {showRecruiterMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-neon text-glow">🎯 Recruiter Mode</h2>
              <motion.button
                onClick={() => setShowRecruiterMode(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-neon transition-colors"
              >
                <FaTimes size={24} />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Professional Summary</h3>
                <p className="text-gray-300">
                  Sudharsan is a 3rd-year Computer Science and Engineering student with skills
in Java, C, MySQL, web development, UI/UX design, and Machine Learning.
He is passionate about learning new technologies, solving problems, and
building practical projects.
                </p>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Core Technical Skills</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-neon font-semibold mb-2">Frontend</h4>
                    <p className="text-gray-300 text-sm"> HTML, CSS, JavaScript,React</p>
                  </div>
                  <div>
                    <h4 className="text-neon font-semibold mb-2">Backend</h4>
                    <p className="text-gray-300 text-sm">Node.js</p>
                  </div>
                  <div>
                    <h4 className="text-neon font-semibold mb-2">AI/ML</h4>
                    <p className="text-gray-300 text-sm">Python,OpenAI API</p>
                  </div>
                  <div>
                    <h4 className="text-neon font-semibold mb-2">Databases</h4>
                    <p className="text-gray-300 text-sm">MongoDB, P MySQL</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Quick AI Insights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <RecruiterAIButton 
                    title="Best AI Projects"
                    summaryType="ai-engineer"
                    icon="🤖"
                  />
                  <RecruiterAIButton 
                    title="Best Full Stack Projects"
                    summaryType="fullstack"
                    icon="💻"
                  />
                  <RecruiterAIButton 
                    title="Why Hire Sudharsan?"
                    summaryType="hire"
                    icon="⭐"
                  />
                  <RecruiterAIButton 
                    title="30-Second Summary"
                    summaryType="summary"
                    icon="⚡"
                  />
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">Contact & Links</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="mailto:sudharsan022601@gmail.com" className="px-4 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-colors">
                    📧 Email
                  </a>
                  <a href="https://github.com/sudharsan02-D" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-colors">
                    💻 GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/sudharsan-m-cse" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-colors">
                    💼 LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.nav>
  )
}

function RecruiterAIButton({ title, summaryType, icon }: { title: string; summaryType: string; icon: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)

  const handleClick = async () => {
    setIsLoading(true)
    setResponse(null)
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "recruiter-summary",
          summaryType
        })
      })
      
      const data = await res.json()
      setResponse(data.message || "No response available")
    } catch (error) {
      setResponse("Error generating response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <motion.button
        onClick={handleClick}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-4 py-3 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span className="text-xl">{icon}</span>
        <span className="font-semibold">{title}</span>
        {isLoading && <FaSpinner className="animate-spin ml-auto" />}
      </motion.button>
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-background/50 rounded-lg text-gray-300 text-sm"
        >
          {response}
        </motion.div>
      )}
    </div>
  )
}
