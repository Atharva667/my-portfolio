// 🔹 React core
import React, { useState, useEffect, useRef, lazy, Suspense } from "react";

// 🔹 Styles
import "./App.css";

// 🔹 Icons & libs
import { Moon, Sun } from "lucide-react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// 🔹 Hooks
import useIntersectionObserver from "./hooks/useIntersectionObserver";

// 🔹 Lazy-loaded components (HEAVY sections)
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));
 const Skills = lazy(() => import("./components/Skills.jsx"));
 const Education = lazy(() => import("./components/Education.jsx"));
const Achievements = lazy(() => import("./components/Achievements.jsx"));
 const Projects = lazy(() => import("./components/Projects.jsx"));








const Header = ({ isScrolled, theme, toggleTheme }) => {

    // --- NEW: State to manage if the mobile menu is open or closed ---
    const [isNavOpen, setIsNavOpen] = useState(false);

    // --- NEW: Function to close the nav, used by the links ---
    const closeNav = () => setIsNavOpen(false);

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <nav className="nav">
                <a href="#home" className="nav-logo" onClick={closeNav}>Atharva.</a>


                {/* --- NEW: This is the 3-line hamburger button --- */}
                <div className={`hamburger ${isNavOpen ? 'hamburger-open' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>



                </div>


                {/* --- UPDATED: Your nav links now have a special class and onClick handlers --- */}
                <ul className={`nav-links ${isNavOpen ? 'nav-links-open' : ''}`}>
                    <li><a href="#projects" onClick={closeNav}>Projects</a></li>  {/* ✅ ADD */}
                    <li><a href="#skills" onClick={closeNav}>Skills</a></li>
                    <li><a href="#education" onClick={closeNav}>Education</a></li>
                    <li><a href="#about" onClick={closeNav}>About</a></li>
                    <li><a href="#achievements" onClick={closeNav}>Achievements</a></li>
                    <li><a href="#contact" onClick={closeNav}>Contact</a></li>
                    <li className="theme-toggle">
                        <button
                            aria-label="Toggle theme"
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                        >
                            {theme === "dark" ? (
                                <Sun size={18} />
                            ) : (
                                <Moon size={18} />
                            )}
                        </button>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

const Section = ({ children, id, className = '' }) => {
    const [elementRef, entry] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px' });
    const isVisible = entry?.isIntersecting;

    return (
        <section ref={elementRef} id={id} className={`section ${className} ${isVisible ? 'section-visible' : ''}`}>
            {children}
        </section>
    );
};


function App() {
    const [captchaToken, setCaptchaToken] = useState(null);

    const getInitialTheme = () => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);



    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };


    const [isScrolled, setIsScrolled] = useState(false);


    // --- Typing Animation Logic ---
    const [typedText, setTypedText] = useState('');
    const wordsToType = useRef(["Web", "Full-Stack", "Software", "Python"]);
    const typingDelay = 150;
    const erasingDelay = 100;
    const newWordDelay = 2000;

    // --- NEW: STATE FOR SCROLL TO TOP BUTTON ---
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = wordsToType.current[wordIndex];
            let displayText;

            if (isDeleting) {
                displayText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            setTypedText(displayText);

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, newWordDelay);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % wordsToType.current.length;
                setTimeout(type, typingDelay + 500);
            } else {
                setTimeout(type, isDeleting ? erasingDelay : typingDelay);
            }
        }

        const timeoutId = setTimeout(type, newWordDelay);
        return () => clearTimeout(timeoutId);
    }, []);

    // Effect for handling header scroll state
    useEffect(() => {
        const handleScroll = () => {
            // Logic for header
            setIsScrolled(window.scrollY > 50);

            // --- NEW: Logic for scroll-to-top button visibility ---
            if (window.scrollY > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Empty array ensures this effect runs only once on mount and unmount
    const handleContactSubmit = (e) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please verify that you are not a robot");
            return;
        }




        const email = formData.email.toLowerCase().trim();

        // ✅ Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        // 🥉 BASIC FILTERING – block fake/temporary email domains
        const blockedDomains = [
            "mailinator.com",
            "tempmail.com",
            "10minutemail.com",
            "guerrillamail.com",
            "fakeinbox.com",
            "trashmail.com",
            "yopmail.com",
            "dispostable.com",
            "getnada.com",
            "abc@gmail.com",
            "aa@gmail.com",
            "aaa@gmail.com",
            "tempmail.com",
            "10minutemail.com",
            "guerrillamail.com",
            "guerrillamail.net",
            "guerrillamail.org",
            "guerrillamail.de",
            "guerrillamail.biz",
            "yopmail.com",
            "yopmail.net",
            "yopmail.fr",
            "fakeinbox.com",
            "trashmail.com",
            "trashmail.net",
            "dispostable.com",
            "getnada.com",
            "maildrop.cc",
            "mintemail.com",
            "temp-mail.org",
            "temp-mail.io",
            "tempail.com",
            "tempmail.plus",
            "emailondeck.com",
            "throwawaymail.com",
            "spamgourmet.com",
            "anonaddy.com",
            "anonaddy.me",
            "simplelogin.com",
            "simplelogin.io",

            // 🧪 Testing / Fake providers
            "example.com",
            "example.net",
            "example.org",
            "test.com",
            "test.net",
            "testmail.com",

            // 🤖 Bot-heavy domains
            "robotmail.com",
            "botmail.com",
            "spamtrap.com",

            // 🧨 One-time inboxes
            "sharklasers.com",
            "grr.la",
            "guerrillamailblock.com",
            "spam4.me",
            "tempinbox.com",
            "moakt.com",
            "mytemp.email",
            "dropmail.me",
            "burnermail.io",

            // 🕳️ Privacy relay (commonly abused)
            "privaterelay.appleid.com"
        ];

        const emailDomain = email.split("@")[1];

        if (blockedDomains.includes(emailDomain)) {
            alert("Temporary or fake email addresses are not allowed.");
            return;
        }

        // ✅ Everything OK → send email
        setFormStatus('sending');

        const SERVICE_ID = 'service_9pplkpa';
        const TEMPLATE_ID = 'template_lypj7f4';
        const PUBLIC_KEY = 'qVjm8JACAZdezi3eb';

        emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                name: formData.name,        // ✅ matches {{name}}
                email: email,               // ✅ matches {{email}}
                message: formData.message,  // ✅ matches {{message}}
                title: "New Contact Message",
                'g-recaptcha-response': captchaToken
            },
            PUBLIC_KEY
        )

            .then(() => {
                setFormStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setFormStatus(''), 5000);
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                setFormStatus('error');
                setTimeout(() => setFormStatus(''), 5000);
            });
    };

    // --- NEW: FUNCTION TO SCROLL TO TOP ---
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="App">
            <Header
                isScrolled={isScrolled}
                theme={theme}
                setTheme={setTheme}
                toggleTheme={toggleTheme}

            />

            <div id="home" className="hero">
                <div className="hero-content">
                    <div className="typing-container">
                        <h1>
                            Hello, It's Me<br />
                            I'm Atharva Deshpande, <br />a{' '}
                            <span className="typed-text">{typedText}</span>
                            <span className="cursor">&nbsp;</span>
                            Developer
                        </h1>
                        <p>A passionate developer dedicated to bringing ideas to life. I specialize in crafting beautiful, intuitive, and highly functional websites and applications from concept to completion.</p>
                    </div>
                    <a href="#skills" className="cta-button">View My Skills</a>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/atharva-deshpande-223926332/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin className="social-icon" />
                        </a>
                        <a href="mailto:atharvadeshpande2006@gmail.com" aria-label="Email">
                            <FaEnvelope className="social-icon" />
                        </a>
                    </div>

                </div>
            </div>

            <main>
                {/* 🔥 PROJECTS SECTION – RIGHT AFTER HERO */}
                <Section id="projects">
                    <h2>My Projects</h2>
                    <Suspense fallback={<div className="loader">Loading projects...</div>}>
                        <Projects />
                    </Suspense>
                </Section>

                <Section id="skills">
                    <Suspense fallback={<div className="loader">Loading skills...</div>}>
                        <Skills />
                    </Suspense>
                </Section>


                <Section id="education">
                    <Suspense fallback={<div className="loader">Loading education...</div>}>
                        <Education />
                    </Suspense>
                </Section>


               <Section id="about">

    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl px-6 sm:px-10 py-14">

        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10">

            {/* Heading */}
            <div className="text-center">

                <p className="text-purple-500 uppercase tracking-[0.35em] text-sm font-medium">
                    About Me
                </p>

                <h2 className="mt-3 text-1xl sm:text-3xl font-black tracking-tight leading-tight">
                    Developer • Designer • Problem Solver<br />
                </h2>

                <p className="mt-6 max-w-3xl mx-auto text-zinc-400 leading-relaxed text-base sm:text-lg">
                    I’m Atharva Deshpande, a passionate Information Technology student
                    and developer focused on creating modern, responsive, and visually
                    engaging digital experiences. I enjoy transforming ideas into
                    real-world applications through clean code, creative UI/UX design,
                    and efficient problem-solving.
                </p>

            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">

                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-xl">

                    <h3 className="text-4xl font-black text-purple-400">
                        10+
                    </h3>

                    <p className="mt-3 text-zinc-400">
                        Technologies & Tools
                    </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-xl">

                    <h3 className="text-4xl font-black text-blue-400">
                        5+
                    </h3>

                    <p className="mt-3 text-zinc-400">
                        Real-World Projects
                    </p>

                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-7 text-center backdrop-blur-xl">

                    <h3 className="text-4xl font-black text-pink-400">
                        2026
                    </h3>

                    <p className="mt-3 text-zinc-400">
                        Diploma Graduation Year
                    </p>

                </div>

            </div>

            {/* Bottom Content */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <h3 className="text-2xl font-bold">
                        What I Focus On
                    </h3>

                    <ul className="mt-6 space-y-4 text-zinc-400 leading-relaxed">

                        <li>
                            ✦ Modern React & Frontend Development
                        </li>

                        <li>
                            ✦ Responsive UI/UX Design
                        </li>

                        <li>
                            ✦ Java & Software Development
                        </li>

                        <li>
                            ✦ API Integration & Backend Basics
                        </li>

                        <li>
                            ✦ Performance Optimization & Clean Architecture
                        </li>

                    </ul>

                </div>

                {/* Right */}
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-xl">

                    <h3 className="text-2xl font-bold">
                        My Vision
                    </h3>

                    <p className="mt-6 text-zinc-400 leading-relaxed">
                        My goal is to continuously grow as a developer by learning
                        advanced technologies, building impactful applications,
                        and creating user experiences that combine performance,
                        creativity, and functionality.
                    </p>

                    <p className="mt-5 text-zinc-400 leading-relaxed">
                        I believe great software is not only about writing code —
                        it’s about solving problems, delivering value, and creating
                        experiences people genuinely enjoy using.
                    </p>

                </div>

            </div>

        </div>

    </div>

</Section>

                <Section id="achievements">
                    <Suspense fallback={<div className="loader">Loading achievements...</div>}>
                        <Achievements />
                    </Suspense>
                </Section>

                <Section id="contact">

    <div className="
relative
overflow-hidden

max-w-6xl
mx-auto

rounded-[28px]
border
border-white/10

bg-white/5
backdrop-blur-xl

px-5
sm:px-8
lg:px-10

py-10
lg:py-12
">

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10">

            {/* Heading */}
            <div className="text-center">

                <p className="text-cyan-400 uppercase tracking-[0.35em] text-sm font-medium">
                    Contact
                </p>

                <h2 className="mt-3 text-3xl sm:text-5xl  font-black tracking-tight leading-tight">
                    Let’s Build Something Amazing
                </h2>

                <p className="mt-6 max-w-3xl mx-auto text-zinc-400 leading-relaxed text-base sm:text-lg">
                    Have a project idea, collaboration opportunity, or just want to connect?
                    I’m always open to discussing creative ideas, development work,
                    and exciting opportunities.
                </p>

            </div>

            {/* Main Grid */}
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT SIDE */}
                <div className="space-y-6">

                    {/* Email Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl">
                                <FaEnvelope />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">
                                    Email
                                </h3>

                                <p className="text-zinc-400 mt-1 break-all">
                                    atharvadeshpande2006@gmail.com
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* LinkedIn Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl">
                                <FaLinkedin />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold">
                                    LinkedIn
                                </h3>

                                <a
                                    href="https://www.linkedin.com/in/atharva-deshpande-223926332/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-400 mt-1 block hover:text-white transition-all duration-300 break-all"
                                >
                                    Connect with me professionally
                                </a>
                            </div>

                        </div>

                    </div>

                    {/* Extra Info Card */}
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 backdrop-blur-xl">

                        <h3 className="text-2xl font-bold">
                            Available For
                        </h3>

                        <div className="mt-6 flex flex-wrap gap-3">

                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                                Web Development
                            </span>

                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                                UI/UX Design
                            </span>

                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                                Java Projects
                            </span>

                            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                                Freelance Work
                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE FORM */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <form onSubmit={handleContactSubmit} className="space-y-5">

                        <div>

                            <label className="block mb-3 text-sm text-zinc-400">
                                Your Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                disabled={formStatus === 'sending'}
                                className="
                                    w-full
                                    rounded-2xl
                                    border border-white/10
                                    bg-white/5
                                    px-5
                                    py-4
                                    outline-none
                                    focus:border-cyan-400
                                    transition-all
                                    duration-300
                                "
                            />

                        </div>

                        <div>

                            <label className="block mb-3 text-sm text-zinc-400">
                                Your Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                disabled={formStatus === 'sending'}
                                className="
                                    w-full
                                    rounded-2xl
                                    border border-white/10
                                    bg-white/5
                                    px-5
                                    py-4
                                    outline-none
                                    focus:border-cyan-400
                                    transition-all
                                    duration-300
                                "
                            />

                        </div>

                        <div>

                            <label className="block mb-3 text-sm text-zinc-400">
                                Message
                            </label>

                            <textarea
                                name="message"
                                rows="6"
                                placeholder="Write your message..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                disabled={formStatus === 'sending'}
                                className="
                                    w-full
                                    rounded-2xl
                                    border border-white/10
                                    bg-white/5
                                    px-5
                                    py-4
                                    outline-none
                                    resize-none
                                    focus:border-cyan-400
                                    transition-all
                                    duration-300
                                "
                            ></textarea>

                        </div>

                        <Suspense fallback={<div style={{ height: 78 }} />}>
                            <ReCAPTCHA
                                sitekey="6Le4w1UsAAAAANOuf-wY0Xrb87R9zR7aPOjgaXra"
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </Suspense>

                        <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="
                                w-full
                                rounded-2xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-purple-500
                                py-4
                                font-bold
                                text-white
                                transition-all
                                duration-300
                                hover:scale-[1.02]
                                hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]
                            "
                        >
                            {formStatus === 'sending'
                                ? 'Sending Message...'
                                : 'Send Message'}
                        </button>

                        {formStatus === 'success' && (
                            <p className="text-green-400 text-center">
                                ✓ Message sent successfully!
                            </p>
                        )}

                        {formStatus === 'error' && (
                            <p className="text-red-400 text-center">
                                ✗ Failed to send message.
                            </p>
                        )}

                    </form>

                </div>

            </div>

        </div>

    </div>

</Section>
            </main>

            <footer>
                <p>&copy; {new Date().getFullYear()} Atharva Deshpande | All Rights Reserved.</p>
            </footer>

            {/* --- NEW: SCROLL TO TOP BUTTON JSX --- */}
            {showScrollTopButton && (
                <button onClick={scrollTop} className="scroll-top-btn">
                    ↑
                </button>
            )}
        </div>


    );

}



export default App;