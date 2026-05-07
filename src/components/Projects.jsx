import React, { useState } from "react";
import "./Projects.css";

/* ===== PROJECT IMAGES ===== */

import ResortProject from "../assets/Projects/ResortProject.png";
import AIProctoringImg from "../assets/Projects/AIProctoring.png";
import AdminImg from "../assets/Projects/AdminLogin.png";
import TeacherImg from "../assets/Projects/TeacherLogin.png";

import ProctoringImg from "../assets/Projects/AIProctoring.png";

/* =========================================================
   🚀 MODERN PROJECT DATA
========================================================= */

const projects = [
  {
    title: "AI Based Online Proctored System",
    category: "AI + Security Platform",

    description:
      "An advanced AI-powered online examination monitoring system designed to ensure fair and secure digital assessments. Features include real-time face detection, suspicious movement tracking, tab-switch monitoring, automatic exam termination, activity logging, and intelligent behavior analysis.",

    tech: [
      "React",
      "JavaScript",
      "Python",
      "AI Monitoring",
      "Face Detection",
      "Node.js",
    ],

    image: AIProctoringImg,

    live: "#",
    github: "https://github.com/Atharva667/AI-Proctoring-System",

    featured: true,
  },

  {
    title: "Resort Management Website",
    category: "Full Stack Web Application",

    description:
      "A modern and responsive resort booking platform with elegant UI design, room availability management, optimized navigation, and smooth user experience focused on hospitality and customer engagement.",

    tech: ["HTML", "CSS", "JavaScript", "PHP"],

    image: ResortProject,

    live: "https://atharva-deshpande-portfolio.vercel.app",

    github: "https://github.com/Atharva667/GoldenSandsResort",
  },

  {
    title: "Library Management System",
    category: "Management System",

    description:
      "A smart library management solution featuring secure admin and teacher authentication, student management, and responsive dashboard interfaces for efficient book tracking and operations.",

    tech: ["HTML", "CSS", "JavaScript"],

    images: [AdminImg, TeacherImg],

    live: "#",
    github: "https://github.com/Atharva667/Online-Library-Management-System/tree/main",
  },
];

/* =========================================================
   🚀 MAIN COMPONENT
========================================================= */

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <span className="projects-subtitle">PORTFOLIO</span>

        <p>
          A collection of innovative projects focused on modern UI/UX,
          full-stack development, AI systems, and performance-driven web
          applications.
        </p>
      </div>

      <div className="projects-grid">

        {projects.map((project, index) => (
          <div className="project-card" key={index}>

            <div className="project-image">
              {project.images ? (
                <ImageSlider images={project.images} />
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>

            <div className="project-content">

              <span className="project-category">
                {project.category}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <div className="project-links">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

/* =========================================================
   🎞️ IMAGE SLIDER
========================================================= */

function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <button className="slide-btn left" onClick={prevSlide}>
        ‹
      </button>

      <img src={images[index]} alt="project" />

      <button className="slide-btn right" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
}

export default Projects;