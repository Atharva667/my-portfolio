import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const skillGroups = [
  {
    title: "Frontend",
    color: "from-blue-500 to-cyan-400",

    skills: [
      {
        name: "HTML",
        info:
          "Semantic page structure, accessibility, responsive layouts, and clean document architecture.",
      },

      {
        name: "CSS",
        info:
          "Modern styling, animations, responsive design systems, flexbox, grid, and visual polish.",
      },

      {
        name: "JavaScript",
        info:
          "Interactive UI logic, DOM manipulation, dynamic rendering, and frontend functionality.",
      },

      {
        name: "React",
        info:
          "Reusable components, state management, smooth UI architecture, and scalable frontend development.",
      },

      {
        name: "Tailwind CSS",
        info:
          "Utility-first modern styling for fast, responsive, and clean user interface development.",
      },

      {
        name: "Responsive UI",
        info:
          "Mobile-first layouts optimized for laptops, tablets, and smartphones.",
      },

      {
        name: "UI/UX",
        info:
          "Balanced spacing, visual hierarchy, interaction design, and premium user experience.",
      },
    ],
  },

  {
    title: "Backend",
    color: "from-purple-500 to-pink-500",

    skills: [
      {
        name: "Node.js",
        info:
          "Backend runtime for APIs, authentication systems, and server-side functionality.",
      },

      {
        name: "Java",
        info:
          "Object-oriented programming, desktop applications, and academic project development.",
      },

      {
        name: "Python",
        info:
          "Automation, scripting, networking projects, and problem-solving logic.",
      },
    ],
  },

  {
    title: "Databases",
    color: "from-indigo-500 to-purple-500",

    skills: [
      {
        name: "MySQL",
        info:
          "Structured relational database management for web applications and data storage.",
      },

      {
        name: "PostgreSQL",
        info:
          "Advanced SQL database system focused on performance and scalability.",
      },
    ],
  },

  {
    title: "Testing & Tools",
    color: "from-pink-500 to-orange-400",

    skills: [
      {
        name: "Software Testing",
        info:
          "Functional testing, UI testing, debugging workflows, and quality assurance basics.",
      },

      {
        name: "Postman",
        info:
          "API testing, request handling, response validation, and endpoint verification.",
      },

      {
        name: "Git",
        info:
          "Version control, commits, branching, and collaborative development workflow.",
      },

      {
        name: "GitHub",
        info:
          "Code hosting, project management, repository collaboration, and deployment integration.",
      },

      {
        name: "JMeter",
        info:
          "Performance testing, load testing, and stress testing for web applications.",
      },

      {
        name: "Jenkins",
        info:
          "Basic CI/CD workflow automation and integration pipeline understanding.",
      },
    ],
  },
];

const Skills = () => {

  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <section
      id="skills"
      className="relative px-5 sm:px-8 py-24 overflow-hidden"
    >



      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >

          <p className="text-indigo-500 uppercase tracking-[0.3em] text-sm font-medium">
            Expertise
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            My Skills
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[var(--subtext)] leading-relaxed">
            Technologies and tools I use to build fast,
            modern, and responsive digital experiences.
          </p>

        </motion.div>

        {/* Layout */}
        <div className="mt-20 space-y-14">

          {skillGroups.map((group, i) => (

            <motion.div
              key={i}

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.5,
                delay: i * 0.08,
              }}
            >

              {/* Top */}
              <div className="flex items-center gap-4 mb-6">

                <div
                  className={`
                    h-12
                    w-1.5
                    rounded-full
                    bg-gradient-to-b
                    ${group.color}
                  `}
                />

                <div>

                  <h3 className="text-2xl font-bold">
                    {group.title}
                  </h3>

                  <p className="text-sm text-[var(--subtext)] mt-1">
                    {group.skills.length} Technologies
                  </p>

                </div>

              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-4">

                {group.skills.map((skill, idx) => {

                  const isActive =
                    activeSkill === skill.name;

                  return (

                    <div key={idx} className="relative">

                      {/* Skill Button */}
                      <motion.button

                        whileHover={{
                          y: -4,
                          scale: 1.03,
                        }}

                        whileTap={{
                          scale: 0.98,
                        }}

                        onClick={() =>
                          setActiveSkill(
                            isActive
                              ? null
                              : skill.name
                          )
                        }

                        className="
                            relative
                            px-5
                            py-3
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            backdrop-blur-md
                            text-sm
                            font-medium
                            shadow-lg
                            hover:border-purple-500/30
                            hover:bg-white/10
                            transition-all
                            duration-300
                                  "
                      >

                        <div
                          className="
                            absolute
                            inset-0
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-500/0
                            via-purple-500/0
                            to-pink-500/0
                            hover:from-blue-500/5
                            hover:via-purple-500/5
                            hover:to-pink-500/5
                            transition
                            duration-300
                          "
                        />

                        <span className="relative z-10">
                          {skill.name}
                        </span>

                      </motion.button>

                      {/* Floating Info */}
                      <AnimatePresence>

                        {isActive && (

                          <motion.div

                            initial={{
                              opacity: 0,
                              y: 10,
                              scale: 0.96,
                            }}

                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                            }}

                            exit={{
                              opacity: 0,
                              y: 10,
                              scale: 0.96,
                            }}

                            transition={{
                              duration: 0.2,
                            }}

                            className={`
  absolute
  left-0
  top-[115%]
  z-50
  w-[260px]
  p-4
  rounded-2xl
  border
  backdrop-blur-xl
  shadow-[0_10px_40px_rgba(0,0,0,0.12)]

  ${document.body.dataset.theme === "light"
                                ? "bg-white border-black/10"
                                : "bg-zinc-900/95 border-white/10"
                              }
`}
                          >

                            <h4
                              className={`
                          font-semibold text-sm
                          ${document.body.dataset.theme === "light"
                                  ? "text-zinc-900"
                                  : "text-white"
                                }
                        `}
                            >
                              {skill.name}
                            </h4>

                            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {skill.info}
                            </p>

                          </motion.div>

                        )}

                      </AnimatePresence>

                    </div>
                  );
                })}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Skills;