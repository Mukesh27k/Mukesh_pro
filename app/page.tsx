"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { ParticlesBackground } from "@/components/particles-background"
import { Loader } from "@/components/loader"
import {
  HeroSection,
  AboutSection,
  TechStackSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  BackToTop,
} from "@/components/sections"

export default function Portfolio() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      // Update scroll progress
      const progressBar = document.getElementById("scroll-progress")
      if (progressBar) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        progressBar.style.width = `${scrollPercent}%`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Loader />
      <ParticlesBackground />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {showBackToTop && <BackToTop />}
    </>
  )
}
