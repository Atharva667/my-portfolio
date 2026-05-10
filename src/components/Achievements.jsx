import { motion } from "framer-motion";
import { useState } from "react";

import reactCertificate from "../assets/react-certificate.png";
import javaCertificate from "../assets/java.png";
 import TrainingCert from "../assets/Industrial Training Certificate.jpeg";
import DataScienceCert from "../assets/DataScienceCertificate.png";

const achievementsList = [

  {
    title: "Python Development Certificate",
    source: "Coursera",

    description:
      "Successfully completed React development certification focused on components, hooks, routing, UI building, and frontend architecture.",

    image: reactCertificate,

    color: "from-blue-500 via-cyan-500 to-indigo-500",
  },

  {
    title: "Basic Java Programming Certificate",
    source: "HackerRank",

    description:
      "Completed Java programming certification covering OOP concepts, problem solving, algorithms, and backend fundamentals.",

    image: javaCertificate,

    color: "from-orange-500 via-pink-500 to-red-500",
  },

  {
    title: "Industrial Training Certificate (Testing)",
    source: "Vision Academy",

    description:
      "Successfully completed 12 weeks of Industrial Training in JMeter,Jenkins, AWS, Jira, Auth0, Postman, and GitHub with practical industry-oriented learning.",

    image: TrainingCert,

    color: "from-yellow-500 via-amber-500 to-orange-500",
  },

  {
    title: "Data Science Challenge Certificate",
    source: "Mandi Hariyanna Academy",

    description:
      "Successfully completed the Data Science Challenge demonstrating proficiency in statistics, machine learning algorithms, and data analysis.",

    image: DataScienceCert,

    color: "from-purple-500 via-fuchsia-500 to-pink-500",
  },

];
const Achievements = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (

    <section
      id="achievements"
      className="relative px-5 sm:px-8 pt-12 pb-24 overflow-hidden"
    >

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="text-purple-500 tracking-[0.3em] uppercase text-sm font-medium">
            Achievements
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
            Certifications & Recognition
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-[var(--subtext)] leading-relaxed">
            Certifications and achievements that reflect technical growth,
            continuous learning, and professional skill development.
          </p>

        </motion.div>

        {/* Horizontal Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {achievementsList.map((achievement, index) => (

            <motion.div
              key={index}

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}

              viewport={{ once: true }}

              whileHover={{
                y: -6,
              }}

              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(0,0,0,0.12)]
              "
            >

              {/* Gradient Glow */}
              <div
                className={`
                  absolute
                  inset-0
                  opacity-10
                  bg-gradient-to-br
                  ${achievement.color}
                `}
              />

              <div className="relative z-10 p-6 sm:p-7">

                {/* Top */}
                <div className="flex flex-col md:flex-row gap-6 items-center">

                  {/* Certificate Preview */}
                  <motion.img

                    whileHover={{
                      scale: 1.03,
                    }}

                    transition={{
                      duration: 0.3,
                    }}

                    src={achievement.image}
                    alt={achievement.title}

                    onClick={() => setSelectedImage(achievement.image)}

                    className="
                      w-full
                      md:w-[240px]
                      rounded-2xl
                      border
                      border-white/10
                      cursor-pointer
                      object-cover
                      shadow-lg
                    "
                  />

                  {/* Content */}
                  <div className="flex-1">

                    <div
                      className={`
                        inline-flex
                        items-center
                        px-4
                        py-1.5
                        rounded-full
                        text-sm
                        font-medium
                        bg-gradient-to-r
                        ${achievement.color}
                        text-white
                      `}
                    >
                      {achievement.source}
                    </div>

                    <h3 className="mt-5 text-2xl font-bold tracking-tight">
                      {achievement.title}
                    </h3>

                    <p className="mt-4 text-[var(--subtext)] leading-relaxed">
                      {achievement.description}
                    </p>

                    <button
                      onClick={() => setSelectedImage(achievement.image)}
                      className="
                        mt-6
                        px-5
                        py-3
                        rounded-2xl
                        bg-white/5
                        border
                        border-white/10
                        hover:bg-white/10
                        transition-all
                        duration-300
                        font-medium
                      "
                    >
                      View Certificate
                    </button>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
 {/* Fullscreen Modal */}
{selectedImage && (

  <div

    onClick={() => setSelectedImage(null)}

    className="
      fixed
      inset-0
      z-[99999]
      bg-black/30
      backdrop-blur-xl


      flex
      items-center
      justify-center

      overflow-hidden
      m-0
      p-0
    "
  >

    {/* Wrapper */}
    <div

      onClick={(e) => e.stopPropagation()}

    className="
  relative
  flex
  items-center
  justify-center
"
    >

      {/* Close Button */}
      <button

        onClick={() => setSelectedImage(null)}

        className="
          absolute
          top-6
          right-6

          w-12
          h-12

          rounded-full
          bg-zinc-900/90

          border
          border-white/10

          text-white
          text-2xl
          font-bold

          hover:bg-zinc-800

          transition-all
          duration-300

          z-10
        "
      >
        ×
      </button>

      {/* Certificate Image */}
      <motion.img

        initial={{
          opacity: 0,
          scale: 0.92,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        transition={{
          duration: 0.3,
        }}

        src={selectedImage}

        alt="Certificate Preview"

     className="
  w-[90vw]
  md:w-[80vw]
  lg:w-[70vw]

  h-auto

  object-contain

  rounded-2xl
  bg-white

  shadow-[0_20px_80px_rgba(0,0,0,0.55)]
"
      />

    </div>

  </div>

)}

    </section>
  );
};

export default Achievements;