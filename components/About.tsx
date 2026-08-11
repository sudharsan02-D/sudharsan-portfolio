"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FaCode, FaLaptopCode, FaTrophy } from "react-icons/fa"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { icon: FaCode, value: "1+", label: "Freelance Project" },
    { icon: FaLaptopCode, value: "2+", label: "Hackathons Participated" },
    { icon: FaTrophy, value: "2+", label: "Poster Competitions" },
  ]

  return (
    <section id="about" className="py-20 px-6">
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
            About <span className="text-neon">Me</span>
          </h2>

          <div className="w-24 h-1 bg-neon mx-auto shadow-neon" />
        </motion.div>

        {/* About Content + Education */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I am a motivated and enthusiastic Computer Science and Engineering
              student with a strong foundation in Java, C, MySQL, web
              development, UI/UX design, and Machine Learning. I am passionate
              about learning new technologies and improving my problem-solving
              and technical skills.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              Currently, I am pursuing my Computer Science and Engineering
              degree at Kongunadu College of Engineering and Technology. I have
              gained practical exposure through hackathons, poster design
              competitions, freelance project work, and an internship in the
              GIS domain.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              My major project is the Machine Learning Based Smart Driver
              Safety and Emergency Monitoring System. My goal is to continuously
              improve my technical knowledge, gain industry experience, and
              contribute to meaningful software projects.
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-neon mb-6">
              Education
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-neon pl-4">

                <h4 className="text-xl font-semibold text-white">
                  B.E. Computer Science and Engineering
                </h4>

                <p className="text-gray-400">
                  Kongunadu College of Engineering and Technology
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Currently 3rd Year
                </p>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-8 rounded-2xl text-center"
            >

              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <stat.icon className="text-5xl text-neon" />
              </motion.div>

              <motion.h3
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                }}
                className="text-4xl font-bold text-white text-glow mb-2"
              >
                {stat.value}
              </motion.h3>

              <p className="text-gray-300">
                {stat.label}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}