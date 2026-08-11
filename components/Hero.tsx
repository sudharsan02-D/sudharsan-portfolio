"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaDownload,
  FaRobot,
} from "react-icons/fa"
import Image from "next/image"

export default function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(100)

  const roles = [
    "CSE Student",
    "Java Programmer",
    "Web Developer",
    "UI/UX Designer",
  ]

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length]

      const currentText = isDeleting
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1)

      setText(currentText)

      if (!isDeleting && currentText === currentRole) {
        setTypingSpeed(2000)
        setIsDeleting(true)
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(100)
      } else {
        setTypingSpeed(isDeleting ? 50 : 100)
      }
    }

    const typingTimer = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(typingTimer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-neon text-xl font-semibold"
            >
              Hello, It's Me
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white text-glow"
            >
              Sudharsan M
            </motion.h1>

            {/* Typing Roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-neon font-semibold"
            >
              <span>{text}</span>

              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-lg max-w-lg"
            >
              Motivated and enthusiastic Computer Science and Engineering
              student with a strong foundation in Java, C, MySQL, web
              development, UI/UX design, and Machine Learning.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center space-x-6"
            >

              {/* GitHub */}
              <motion.a
                href="https://github.com/sudharsan02-D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon transition-colors text-2xl"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaGithub />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/sudharsan-m-cse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-neon transition-colors text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin />
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:sudharsan022601@gmail.com"
                className="text-gray-300 hover:text-neon transition-colors text-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <FaEnvelope />
              </motion.a>

            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >

              {/* Resume Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open("/Sudharsan_M_Resume.pdf", "_blank")
                }
                className="px-8 py-3 bg-neon text-background font-semibold rounded-lg shadow-neon hover:shadow-neon-hover transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload />
                Download Resume
              </motion.button>

              {/* Contact Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-3 border-2 border-neon text-neon font-semibold rounded-lg hover:bg-neon hover:text-background transition-all duration-300"
              >
                Contact Me
              </motion.button>

              {/* AI Chat Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.dispatchEvent(new CustomEvent("openAIChat"))
                }
                className="px-8 py-3 bg-neon/10 border-2 border-neon/50 text-neon font-semibold rounded-lg hover:bg-neon/20 hover:border-neon transition-all duration-300 flex items-center gap-2"
              >
                <FaRobot />
                Ask AI
              </motion.button>

            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - PROFILE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >

              <div className="w-72 h-72 md:w-96 md:h-96 hexagon neon-border animate-float relative overflow-hidden bg-background">

                <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent" />

                <Image
                  src="/sudharsan-profile.jpeg"
                  alt="Sudharsan M"
                  fill
                  sizes="(max-width: 768px) 18rem, 24rem"
                  className="object-cover"
                  priority
                />

              </div>

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0, 229, 255, 0.5)",
                    "0 0 40px rgba(0, 229, 255, 0.7)",
                    "0 0 20px rgba(0, 229, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 hexagon -z-10 bg-neon/20 blur-xl"
              />

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}