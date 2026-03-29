"use client"

import { useEffect, useRef, useState } from "react"
import { TypingEffect } from "./typing-effect"
import { ProjectCard } from "./project-card"
import { Mail, Github, Linkedin, ArrowRight, Code2, Brain, Layout, Terminal, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// Animation hook with scroll animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1, rootMargin: "-50px" }
    )

    if (ref.current) {
      const elements = ref.current.querySelectorAll(".animate-on-scroll")
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return ref
}

// Hero Section
export function HeroSection() {
  const roles = ["Building Web","Exploring AI ","Solving Problems"]

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6 pt-20"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Greeting */}
        <p className="mb-6 text-sm font-semibold tracking-widest text-accent-blue uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="mb-8 text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <span className="gradient-text">Mukesh K</span>
        </h1>

        {/* Typing Effect */}
        <div className="mb-10 flex h-12 items-center justify-center text-2xl font-medium text-muted-foreground sm:text-3xl md:h-14 md:text-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <TypingEffect words={roles} className="text-foreground" />
        </div>

        {/* Description */}
        <p className="mx-auto mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Driven by curiosity, creating things that go beyond just existing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-[400ms]">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo px-8 py-4 font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-accent-blue bg-transparent backdrop-blur-sm px-8 py-4 font-semibold text-accent-blue shadow-md transition-all duration-300 hover:bg-accent-blue hover:text-white hover:shadow-lg hover:-translate-y-0.5"
          >
            Contact Me
            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-14 w-8 rounded-full border-2 border-border p-2">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-accent-blue animate-pulse" />
          </div>
        </div>
      </div>

      {/* Background decorations - subtle light gradients */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-accent-blue/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-accent-indigo/5 blur-[120px]" />
    </section>
  )
}

// About Section
export function AboutSection() {
  const ref = useScrollAnimation()

  return (
    <section id="about" className="relative py-32 px-6 bg-secondary/50" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent-blue uppercase">
            About Me
          </p>
          <h2 className="mb-20 text-4xl font-bold text-foreground sm:text-5xl">
            <span className="gradient-text">Who I Am</span>
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text content */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              <span className="text-accent-indigo font-semibold">Building systems that don’t just run, but think</span> 
            </p>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              I&apos;m someone who enjoys building things — from modern websites to AI-based solutions. 
              My interests lie in web development, data science, and machine learning.
              What started as curiosity has grown into a strong interest 
              in solving real-world problems using technology.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source
              projects, or learning about the latest advancements in AI.
            </p>
          </div>

          {/* Info cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { label: "I turn “what if” into “it works” ", value: "Beyond the Surface", icon: Code2 },
              { label: "Projects Completed", value: "15+", icon: Layout },
              { label: "I care more about the “why” than just the “how”", value: "Ideas → Reality", icon: Terminal },
              { label: "Every project is a step forward", value: "Growth Mindset", icon: Brain },
            ].map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 group relative overflow-hidden rounded-2xl glass p-8 shadow-lg hover:shadow-xl hover:-translate-y-1"
                )}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <item.icon className="mb-5 h-10 w-10 text-accent-blue transition-transform group-hover:scale-110" />
                <p className="text-4xl font-bold gradient-text mb-2">{item.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                <div className="absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-accent-light/50 blur-2xl transition-all group-hover:bg-accent-blue/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Tech Stack Section
export function TechStackSection() {
  const ref = useScrollAnimation()

  const techCategories = [
    {
      title: "Frontend & Backend",
      techs: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "TypeScript", "MongoDB", "MySQL", "Firebase", "Supabase", "Python (Flask)"],
      color: "blue",
    },
    {
      title: "Language & Tools",
      techs: ["Python", "c & c++", "VS Code", "Jupyter Notebook" ,"Google Colab", "postman"],
      color: "indigo",
    },
    {
      title: "AI & Data",
      techs: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Analysis"],
      color: "violet",
    },
  ]

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent-blue uppercase">
            My Skills
          </p>
          <h2 className="mb-8 text-4xl font-bold text-foreground sm:text-5xl">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mb-20 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The stack behind everything I build.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {techCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
              style={{ transitionDelay: `${catIndex * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl glass p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                {/* Category header */}
                <h3 className={cn(
                  "mb-8 text-lg font-bold",
                  category.color === "blue" && "text-accent-blue",
                  category.color === "indigo" && "text-accent-indigo",
                  category.color === "violet" && "text-violet-600"
                )}>
                  {category.title}
                </h3>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-3">
                  {category.techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-accent-blue hover:text-white hover:shadow-md cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Subtle glow effect */}
                <div className={cn(
                  "absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150",
                  category.color === "blue" && "bg-accent-blue/5 group-hover:bg-accent-blue/10",
                  category.color === "indigo" && "bg-accent-indigo/5 group-hover:bg-accent-indigo/10",
                  category.color === "violet" && "bg-violet-500/5 group-hover:bg-violet-500/10"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent-blue/3 blur-[150px]" />
    </section>
  )
}

// Projects Section
export function ProjectsSection() {
  const ref = useScrollAnimation()

  const projects = [
    {
      title: "SAR image colorization",
      description: "Synthetic Aperture Radar is a type of radar imaging technology that captures images of the Earth’s surface using microwave signals.converting SAR images into realistic colored images (SAR → RGB) using deep learning techniques to make them more understandable for humans.",
      images: [
        "/img/WhatsApp Image 2026-03-26 at 9.27.40 AM.jpeg",
        "/img/WhatsApp Image 2026-03-26 at 9.27.40 AM (1).jpeg"
      ],
      tech: ["Python", "NLP", "U-Net", "GAN","React","OpenCV"],
      githubUrl: "https://github.com/Mukesh27k/EEC_SAR_HACKTHON",
      featured: true,
    },
    {
      title: "Corporate website",
      description: "Developed a corporate website for Hazra Impex, an export-focused company connecting Indian farmers to global markets. The website highlights their commitment to sustainable sourcing, quality assurance, and transparent supply chains, presenting a strong digital presence for international clients.",
      images: [
        "/img/Screenshot 2026-03-29 204537.jpg",
        "/img/Screenshot 2026-03-29 204602.jpg",  
        "/img/Screenshot 2026-03-29 204630.jpg"    
      ],
      tech: ["React.js", "TypeScript", "Tailwind CSS / Bootstrap", "React Router"],
      liveUrl: "https://www.hazraimpex.com/",
      githubUrl: "https://github.com/Mukesh27k/Hezra",
      featured: true,
    },
    {
      title: "Place-Mate App",  
      description: "Developed Placemate, a smart placement assistant application designed to help students streamline their job preparation process. The app focuses on organizing placement-related activities such as tracking opportunities, managing resumes, and improving preparation efficiency using a structured and user-friendly interface.",
      images: [
        "/img/1 (1).png",
        "/img/1 (2).png",
        "/img/1 (3).png"
      ],
      tech: ["React.js", "Firebase","Node.js","AI Agent (OpenAI API)"],
      githubUrl: "https://github.com/Mukesh27k/Place_Mate",
    },
    {
      title: "Quotation Gen",
      description: "Quotation Generator web application with real-time currency conversion, enabling users to create accurate quotations in multiple currencies. The system integrates live exchange rates for dynamic price calculation, along with secure user authentication for managing and generating professional quotations efficiently.",
      images: [
        "/img/WhatsApp Image 2026-03-26 at 9.24.50 AM.jpeg",
        "/img/WhatsApp Image 2026-03-26 at 9.24.50 AM (1).jpeg",
        "/img/WhatsApp Image 2026-03-26 at 9.24.50 AM (2).jpeg"
      ],
      tech: ["Currency API", "JWT", "MongoDB", "Express.js"],
      githubUrl: "https://github.com/Mukesh27k/quot",
    },
    {
      title: "Resume parsing AI",
      description: "Resume Parsing & Ranking System that processes large volumes of resumes and automatically shortlists candidates based on job requirements. The system analyzes resumes, matches them with the given job profile, and ranks the top candidates, helping recruiters quickly identify the best-fit applicants.",
      images: [
        "/img/WhatsApp Image 2026-03-26 at 10.18.29 AM.jpeg",
        "/img/WhatsApp Image 2026-03-26 at 10.18.29 AM (1).jpeg",
        "/img/WhatsApp Image 2026-03-26 at 10.18.29 AM (2).jpeg"
      ],
      tech: ["Python", "NLP", "spaCy","TF-IDF"],
      githubUrl: "https://github.com/Mukesh27k/resume_project",
    },
    {
      title: "Coffee Shop Website",
      description: "coffee shop website showcasing menu, services, and brand identity with a clean and user-friendly design. The website focuses on providing an engaging experience for customers and improving the shop’s online presence.",
      images: [
        "/img/WhatsApp Image 2026-03-26 at 9.21.00 AM.jpeg",
        "/img/WhatsApp Image 2026-03-26 at 9.21.00 AM (1).jpeg",
        "/img/WhatsApp Image 2026-03-26 at 9.21.00 AM (2).jpeg"
      ],
      tech: ["HTML", "CSS", "JavaScript","Bootstrap"],
      githubUrl: "https://github.com/Mukesh27k/iGOLDz",
    },
  ]

  return (
    <section id="projects" className="relative py-32 px-6 bg-secondary/50" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent-blue uppercase">
            My Work
          </p>
          <h2 className="mb-8 text-4xl font-bold text-foreground sm:text-5xl">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="mb-20 max-w-2xl text-lg text-muted-foreground leading-relaxed">
           A thoughtfully curated collection of projects that reflects my journey
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 h-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-1/3 h-[700px] w-[700px] rounded-full bg-accent-indigo/3 blur-[150px]" />
    </section>
  )
}

// Experience Section
export function ExperienceSection() {
  const ref = useScrollAnimation()

  const experiences = [
    {
      title: "Digital Marketing",
      company: "iGOLDz Pvt. Ltd. ",
      period: "2022(august-nov)_part-time",
      description: "Delivered data-driven marketing campaigns to enhance engagement through analytics and content.",
      skills: ["Analytics", "Content Strategy", "Social Media"],
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      description: "Developed responsive web applications using modern technologies, focusing on performance optimization, and delivering impactful digital solutions for users",
      skills: ["React", "Next.js", "Tailwind CSS", "Node.js"],
    },
    {
      title: "AI intern",
      company: "Evolve Robot lab",
      period: "2023 (june-nov)",
      description: "Worked as an AI Intern, utilizing machine learning techniques and AI tools to analyze data, support model development, and contribute to real-world problem-solving.",
      skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
    },
    {
      title: "Data Science intern",
      company: "Phantom Technology Solutions",
      period: "2024(Feb-April)",
      description: "Worked as a Data Science Intern, applying machine learning techniques and statistical analysis to extract meaningful insights from complex datasets, and contributing to data-driven decision-making processes.",
      skills: ["Python", "Machine Learning", "Data Analysis","NLP"],
    },
  ]

  return (
    <section id="experience" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent-blue uppercase">
            Experience
          </p>
          <h2 className="mb-20 text-4xl font-bold text-foreground sm:text-5xl">
            <span className="gradient-text">My Journey</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-accent-blue via-accent-indigo to-violet-500 md:left-1/2 md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className={cn(
                "animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 relative mb-12 pl-10 md:mb-20 md:pl-0",
                index % 2 === 0 ? "md:pr-[calc(50%+2.5rem)] md:text-right" : "md:pl-[calc(50%+2.5rem)]"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                <div className="h-5 w-5 rounded-full border-4 border-accent-blue bg-background shadow-md" />
              </div>

              {/* Content card */}
              <div className="group rounded-2xl glass p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <span className="mb-3 inline-block rounded-full bg-accent-light px-4 py-1.5 text-xs font-semibold text-accent-blue">
                  {exp.period}
                </span>
                <h3 className="mb-2 text-xl font-bold text-foreground">{exp.title}</h3>
                <p className="mb-5 text-sm font-semibold text-accent-indigo">{exp.company}</p>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                <div className={cn("flex flex-wrap gap-2", index % 2 === 0 && "md:justify-end")}>
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
export function ContactSection() {
  const ref = useScrollAnimation()
  const formRef = useRef<HTMLFormElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const socials = [
    { icon: Mail, label: "Email", href: "mailto:Marshallmukesh02@gmail.com", value: "Marshallmukesh02@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/Mukesh27k", value: "github.com/mukeshk" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mukesh-k-38b3862b8/", value: "linkedin.com/in/mukeshk" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = new FormData(formRef.current!)
    const name = formData.get('from_name') as string
    const email = formData.get('from_email') as string
    const message = formData.get('message') as string
    
    // Replace with your WhatsApp number in international format (without +)
    const phoneNumber = '917604972742' // Your WhatsApp number
    
    const whatsappMessage = `*New Contact Form Message*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    formRef.current?.reset()
    setMessage('Opening WhatsApp...')
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-secondary/50" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent-blue uppercase">
            Get In Touch
          </p>
          <h2 className="mb-8 text-4xl font-bold text-foreground sm:text-5xl">
            <span className="gradient-text">Let&apos;s Work Together</span>
          </h2>
          <p className="mx-auto mb-20 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s create
            something amazing together.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact form */}
          <form
            ref={formRef}
            className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 space-y-6 rounded-2xl glass p-8 shadow-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                required
                className="w-full rounded-xl border border-border bg-secondary/30 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                required
                className="w-full rounded-xl border border-border bg-secondary/30 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-border bg-secondary/30 px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20 transition-all"
                placeholder="Tell me about your project..."
              />
            </div>
            {message && (
              <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo px-6 py-4 font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/30 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Send Message
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          {/* Social links */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 space-y-5">
            {socials.map((social, i) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl glass p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo text-white shadow-md transition-all group-hover:scale-110">
                  <social.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{social.label}</p>
                  <p className="text-sm text-muted-foreground">{social.value}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent-blue" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent-indigo/5 blur-[150px]" />
    </section>
  )
}

// Back to top button
export function BackToTop() {
  return (
    <a
      href="#home"
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo text-white shadow-lg shadow-accent-blue/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-accent-blue/40"
      aria-label="Back to top"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </a>
  )
}
