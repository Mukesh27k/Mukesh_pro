"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, Github, X, Eye, ChevronLeft, ChevronRight, ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  title: string
  description: string
  images: string[]
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  // Auto-slide carousel images on hover
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovered && !showModal && project.images?.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isHovered, showModal, project.images])

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (project.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (project.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  // Ensure there's at least one image to prevent rendering errors
  const images = project.images || []

  return (
    <>
      <div
        ref={cardRef}
        className="perspective-1000 group cursor-pointer h-full flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setShowModal(true)}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <div
          className={cn(
            "preserve-3d relative flex flex-col flex-1 overflow-hidden rounded-2xl glass shadow-lg transition-all duration-300 border border-transparent group-hover:border-accent-blue/30",
            isHovered && "shadow-xl shadow-accent-blue/10"
          )}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
            transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
          }}
        >
          {/* Dynamic spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
            }}
          />

          {/* Carousel Image Container */}
          <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
            {images.length > 0 && (
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {imageErrors[currentImageIndex] ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/50 text-muted-foreground transition-all duration-700 group-hover:scale-105">
                      <ImageOff className="h-10 w-10 mb-2 opacity-50" />
                      <span className="text-xs font-medium uppercase tracking-wider opacity-75">Unavailable</span>
                    </div>
                  ) : (
                    <Image
                      src={images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 2 && currentImageIndex === 0}
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      onError={() => setImageErrors(prev => ({ ...prev, [currentImageIndex]: true }))}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-transparent transition-colors duration-300 group-hover:bg-black/10 z-10 pointer-events-none" />
            
            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                Featured
              </div>
            )}

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === currentImageIndex ? "w-4 bg-accent-blue" : "w-1.5 bg-accent-blue/40"
                    )}
                  />
                ))}
              </div>
            )}

            {/* Left/Right Arrows on Hover */}
            {images.length > 1 && (
              <div className="absolute inset-0 z-20 flex items-center justify-between px-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                <button
                  onClick={prevImage}
                  className="flex h-8 w-8 items-center justify-center rounded-full glass text-foreground transition-all hover:bg-accent-blue/20 hover:text-accent-blue shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="flex h-8 w-8 items-center justify-center rounded-full glass text-foreground transition-all hover:bg-accent-blue/20 hover:text-accent-blue shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Action buttons preview overlay container */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue text-white shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-white shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="View source code"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 p-6 flex flex-col flex-1">
            <h3 className="mb-3 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent-blue">
              {project.title}
            </h3>
            <p className="mb-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
            
            {/* Read More inline expand clue */}
            <span className="mb-5 text-sm font-semibold text-accent-blue opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex items-center gap-1">
              Read More <ChevronRight className="h-3.5 w-3.5" />
            </span>

            {/* Tech stack */}
            <div className="mb-2 mt-auto flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent-blue transition-all duration-300 group-hover:bg-accent-blue group-hover:text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-accent-blue to-accent-indigo transition-all duration-500 group-hover:w-full" />
        </div>
      </div>

      {/* Full Screen Interactive Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setShowModal(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" />
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass shadow-2xl scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition-all duration-300 hover:bg-accent-blue/20 hover:text-accent-blue shadow-md"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Carousel Image */}
              <div className="relative h-64 sm:h-[400px] bg-secondary/30">
                {images.length > 0 && (
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      {imageErrors[currentImageIndex] ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary/50 text-muted-foreground">
                          <ImageOff className="h-16 w-16 mb-4 opacity-50" />
                          <span className="text-sm font-medium uppercase tracking-wider opacity-75">Preview Unavailable</span>
                        </div>
                      ) : (
                        <Image
                          src={images[currentImageIndex]}
                          alt={`${project.title} - Full Image ${currentImageIndex + 1}`}
                          fill
                          sizes="100vw"
                          priority
                          className="object-cover"
                          onError={() => setImageErrors(prev => ({ ...prev, [currentImageIndex]: true }))}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />

                {/* Arrow Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full glass text-foreground transition-all hover:bg-accent-blue/20 hover:text-accent-blue shadow-lg"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full glass text-foreground transition-all hover:bg-accent-blue/20 hover:text-accent-blue shadow-lg"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>
                  </>
                )}
                
                {/* Dots indicator for modal */}
                {images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                           e.stopPropagation();
                           setCurrentImageIndex(i);
                        }}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          i === currentImageIndex ? "w-6 h-2 bg-accent-blue" : "w-2 h-2 bg-accent-blue/40 hover:bg-accent-blue/60"
                        )}
                      />
                    ))}
                  </div>
                )}
                
                {project.featured && (
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    Featured Project
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 relative z-20 bg-background/50 backdrop-blur-xl rounded-b-3xl">
                <h3 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
                  {project.title}
                </h3>
                
                <p className="mb-10 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="mb-10">
                  <p className="mb-4 text-sm font-semibold text-accent-blue uppercase tracking-wider">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-accent-light px-5 py-2.5 text-sm font-semibold text-accent-blue border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-4 sm:flex-row border-t border-border pt-8 mt-8">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-indigo px-6 py-4 font-semibold text-white shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <ExternalLink className="h-5 w-5" />
                      View Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-glass-border glass px-6 py-4 font-semibold text-foreground transition-all duration-300 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
                    >
                      <Github className="h-5 w-5" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
