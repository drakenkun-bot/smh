"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function InteractiveSandParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const isMobile = window.innerWidth < 768
      const particleCount = isMobile
        ? Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
        : Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: isMobile ? Math.random() * 2.5 + 1.5 : Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.5 ? "#00ff99" : "#0099ff",
        })
      }

      particlesRef.current = particles
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const isMobile = window.innerWidth < 768
      const repelDistance = isMobile ? 80 : 100
      const attractMinDistance = isMobile ? 150 : 200
      const attractMaxDistance = isMobile ? 250 : 300

      particles.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Mouse interaction - repel particles
        if (distance < repelDistance) {
          const force = (repelDistance - distance) / repelDistance
          particle.vx -= (dx / distance) * force * 0.5
          particle.vy -= (dy / distance) * force * 0.5
        }

        // Mouse attraction when far away
        if (distance > attractMinDistance && distance < attractMaxDistance) {
          const force = 0.001
          particle.vx += dx * force
          particle.vy += dy * force
        }

        // Apply velocity
        particle.x += particle.vx
        particle.y += particle.vy

        // Add some randomness
        particle.vx += (Math.random() - 0.5) * 0.02
        particle.vy += (Math.random() - 0.5) * 0.02

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Boundary conditions
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.shadowBlur = isMobile ? 8 : 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        const connectionDistance = isMobile ? 60 : 80
        // Draw connections to nearby particles
        particles.forEach((otherParticle) => {
          if (particle === otherParticle) return

          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.save()
            ctx.globalAlpha = ((connectionDistance - distance) / connectionDistance) * 0.3
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchstart", handleTouchMove, { passive: false })

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
