"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Myself" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Works" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-secondary">
        <div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-indigo transition-all duration-150"
          style={{
            width: `${typeof window !== "undefined" ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 : 0}%`,
          }}
          id="scroll-progress"
        />
      </div>

      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          scrolled 
            ? "bg-background/80 backdrop-blur-xl py-4 shadow-md border-b border-border" 
            : "bg-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight transition-all duration-300"
          >
            <span className="gradient-text">MK</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-all duration-300",
                  activeSection === link.href.slice(1)
                    ? "text-accent-blue"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-accent-blue to-accent-indigo rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-all duration-300",
                mobileMenuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-all duration-300",
                mobileMenuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-0.5 w-6 bg-foreground transition-all duration-300",
                mobileMenuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden",
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          )}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-2xl font-semibold transition-all duration-300",
                activeSection === link.href.slice(1)
                  ? "gradient-text"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{
                transitionDelay: mobileMenuOpen ? `${i * 50}ms` : "0ms",
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: mobileMenuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
