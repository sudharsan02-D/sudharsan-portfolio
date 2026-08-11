"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: "Internship - GIS",
      company: "Tetrarays Private Limited",
      period: "14 Days",
      description:
        "Completed a 14-day internship at Tetrarays Private Limited in the GIS domain, gaining practical exposure and industry experience.",
    },
    {
      title: "Freelance Project Work",
      company: "Freelance",
      period: "1+ Project",
      description:
        "Completed 1+ freelance project work, gaining practical experience in applying technical and design skills to real-world requirements.",
    },
  ]

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white text-glow mb-4">
            My <span className="text-neon">Experience</span>
          </h2>

          <div className="w-24 h-1 bg-neon mx-auto shadow-neon" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-neon shadow-neon transform -translate-x-1/2"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
              }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`flex-1 ${
                  index % 2 === 0
                    ? "md:text-right md:pr-12"
                    : "md:text-left md:pl-12"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  {/* Title */}
                  <div
                    className={`flex items-center gap-2 mb-2 ${
                      index % 2 === 0
                        ? "md:justify-end"
                        : "md:justify-start"
                    }`}
                  >
                    <FaBriefcase className="text-neon" />

                    <h3 className="text-xl font-bold text-white">
                      {exp.title}
                    </h3>
                  </div>

                  {/* Company */}
                  <p className="text-neon font-semibold mb-2">
                    {exp.company}
                  </p>

                  {/* Period */}
                  <div
                    className={`flex items-center gap-2 text-gray-400 text-sm mb-3 ${
                      index % 2 === 0
                        ? "md:justify-end"
                        : "md:justify-start"
                    }`}
                  >
                    <FaCalendarAlt />
                    <span>{exp.period}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300">
                    {exp.description}
                  </p>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2 + 0.3,
                }}
                className="absolute left-8 md:left-1/2 w-4 h-4 bg-neon rounded-full shadow-neon transform -translate-x-1/2 z-10"
              />

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}