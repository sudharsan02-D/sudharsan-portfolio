"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FaTrophy, FaMedal, FaStar, FaAward } from "react-icons/fa"

export default function Achievements() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const achievements = [
    {
      icon: FaTrophy,
      title: "5+ DSA Problems Solved",
      description: "Consistently solving algorithmic challenges on LeetCode and other platforms",
    },
    {
      icon: FaStar,
      title: "AI-Powered Applications",
      description: "Built multiple applications integrating OpenAI, Claude, and custom ML models",
    },
    {
      icon: FaMedal,
      title: "Full Stack Development",
      description: "Developed end-to-end web applications using advanced tools",
    },
    {
      icon: FaAward,
      title: "Machine Learning Projects",
      description: "Implemented predictive models and data analysis solutions for real-world problems",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-glow mb-4">
            My <span className="text-neon">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-neon mx-auto shadow-neon" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-8 rounded-2xl"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <achievement.icon className="text-5xl text-neon" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">{achievement.title}</h3>
              <p className="text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
