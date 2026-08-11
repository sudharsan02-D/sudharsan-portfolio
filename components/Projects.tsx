"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  FaGithub,
  FaExternalLinkAlt,
  FaPython,
  FaEye,
  FaBrain,
} from "react-icons/fa"
import { SiOpencv, SiScikitlearn } from "react-icons/si"

export default function Projects() {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  })

  const projects = [
    {
      title:
        "Machine Learning Based Smart Driver Safety and Emergency Monitoring System",

      description:
        "A machine learning and computer vision-based driver monitoring system designed to improve road safety by detecting driver drowsiness, distraction, and potential emergency situations. The system analyzes visual inputs using OpenCV and machine learning techniques to monitor driver behavior and identify safety risks.",

      technologies: [
        "Python",
        "Machine Learning",
        "OpenCV",
        "Computer Vision",
        "NumPy",
        "Pandas",
        "Scikit-learn",
      ],

      features: [
        "Driver Drowsiness Detection",
        "Driver Distraction Detection",
        "Emergency Detection",
        "Computer Vision-based Monitoring",
        "Machine Learning-based Analysis",
      ],

      github: "", // Add your GitHub repository link here
      live: "", // Add live demo link if available
    },
  ]

  return (
    <section id="projects" className="py-20 px-6">
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
            My <span className="text-neon">Projects</span>
          </h2>

          <div className="w-24 h-1 bg-neon mx-auto shadow-neon" />

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Projects built through practical learning and hands-on
            experimentation.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              {/* Project Header */}
              <div className="p-8">

                <div className="flex flex-col md:flex-row md:items-start gap-6">

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 shrink-0 rounded-2xl bg-neon/10 border border-neon/30 flex items-center justify-center"
                  >
                    <FaEye className="text-4xl text-neon" />
                  </motion.div>

                  {/* Title + Description */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                </div>

                {/* Features */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-neon mb-4">
                    Key Features
                  </h4>

                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-neon shadow-neon" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-neon mb-4">
                    Technologies Used
                  </h4>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="px-4 py-2 bg-neon/10 text-neon text-sm rounded-full border border-neon/20 hover:border-neon/50 transition-all"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.github || project.live) && (
                  <div className="flex flex-wrap gap-4 mt-8">

                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 bg-background/50 border border-neon/30 rounded-lg text-neon hover:border-neon hover:shadow-neon transition-all"
                      >
                        <FaGithub />
                        GitHub
                      </motion.a>
                    )}

                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 bg-neon/10 border border-neon/30 rounded-lg text-neon hover:bg-neon hover:text-background transition-all"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </motion.a>
                    )}

                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}