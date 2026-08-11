"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  FaJava,
  FaCode,
  FaHtml5,
  FaDatabase,
  FaPaintBrush,
  FaPython,
} from "react-icons/fa"
import { SiC, SiFigma, } from "react-icons/si"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  })

  const skillCategories = [
    {
      title: "Programming",
      icon: FaCode,
      skills: [
        { name: "Java", icon: FaJava, level: "Intermediate" },
        { name: "C", icon: SiC, level: "Intermediate" },
        { name: "Python", icon: FaPython, level: "Basic" },
      ],
    },
    {
      title: "Web Development",
      icon: FaHtml5,
      skills: [
        { name: "HTML", icon: FaHtml5, level: "Basic" },
      ],
    },
    {
      title: "Database",
      icon: FaDatabase,
      skills: [
        { name: "MySQL", icon: FaDatabase, level: "Intermediate" },
      ],
    },
    {
      title: "UI/UX & Design",
      icon: FaPaintBrush,
      skills: [
        { name: "Figma", icon: SiFigma, level: "Basic" },
        { name: "Photoshop", icon: FaPaintBrush, level: "Basic" },
        { name: "Canva", icon: FaPaintBrush, level: "Good" },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-glow mb-4">
            My <span className="text-neon">Skills</span>
          </h2>

          <div className="w-24 h-1 bg-neon mx-auto shadow-neon" />

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            A growing technical skill set focused on programming, web
            development, databases, and UI/UX design.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: categoryIndex * 0.15,
                }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <CategoryIcon className="text-3xl text-neon" />

                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.skills.map((skill) => {
                    const SkillIcon = skill.icon

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-background/50 border border-neon/20 rounded-xl p-4 text-center hover:border-neon/50 hover:shadow-neon transition-all duration-300"
                      >
                        <SkillIcon className="text-3xl text-neon mb-2 mx-auto" />

                        <p className="text-gray-200 text-sm font-medium">
                          {skill.name}
                        </p>

                        <p className="text-gray-500 text-xs mt-1">
                          {skill.level}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}