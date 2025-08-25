"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/3d-scene"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })
const InteractiveSandParticles = dynamic(() => import("@/components/interactive-sand-particles"), { ssr: false })

interface ProjectData {
  name: string
  description: string
  link: string
}

const projects: ProjectData[] = [
  {
    name: "$TISM",
    description:
      "Actively supported community growth through shilling, raiding, and social engagement to drive momentum during key campaign phases.",
    link: "https://x.com/tismishere",
  },
  {
    name: "$W3W",
    description:
      "Community Manager for a Solana-based Web3 arcade gaming platform, leading engagement strategies, onboarding gamers, and managing social presence.",
    link: "https://x.com/w3wgamebox",
  },
  {
    name: "WAIFUVERSE",
    description:
      "Part of the marketing push for a high-potential memecoin, handling raids, meme content, and building awareness across CT.",
    link: "https://x.com/TMNR637532",
  },
  {
    name: "PvPBets",
    description:
      "Contributed to user acquisition and community growth for a Solana-based PvP prediction platform, focusing on targeted outreach and engagement.",
    link: "https://x.com/pvpbetsofficial",
  },
]

const skills = [
  "Community Growth",
  "Meme Contests",
  "Raids",
  "Influencer Outreach",
  "Thread Writing",
  "Telegram Engagement",
  "Solana Ecosystem",
  "FX Trading",
  "Degen Trading",
  "Community Moderation",
]

export default function CryptPainPortfolio() {
  const [isDark, setIsDark] = useState(true)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".slide-in, .fade-in")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Suspense fallback={null}>
        <Scene3D />
        <ParticleBackground />
        <InteractiveSandParticles />
      </Suspense>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border hologram-effect">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-primary to-accent overflow-hidden hover:scale-110 transition-all duration-300 pulse-glow floating">
              <img src="/dp.jpg" alt="CRYPT PAIN Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover-glow text-xs sm:text-sm px-2 sm:px-4"
            >
              <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} mr-1 sm:mr-2`}></i>
              <span className="hidden sm:inline">{isDark ? "LIGHT" : "DARK"}</span>
              <span className="sm:hidden">{isDark ? "☀️" : "🌙"}</span>
            </Button>
          </div>
        </div>
      </header>

      <nav className="fixed top-14 sm:top-16 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border hologram-effect">
        <div className="container mx-auto px-4 sm:px-6 py-2">
          <div className="flex justify-center gap-4 sm:gap-8 overflow-x-auto scrollbar-hide">
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-110 transform hover-glow relative whitespace-nowrap text-sm sm:text-base py-2 px-2"
              >
                {item}
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 rounded"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-28 sm:pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20">
          <section id="about" className="slide-in">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-primary neon-text floating">
                CRYPT PAIN
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed fade-in backdrop-blur-sm bg-card/20 p-4 sm:p-6 rounded-lg border border-border/50">
                I help Web3 projects grow from 0 to cult status through meme marketing, raid strategy, and organic hype.
                I've helped coins explode with real community energy and narrative.
              </p>
            </div>
          </section>

          <section id="skills" className="slide-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-primary neon-text floating">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-card/60 backdrop-blur-sm border border-border rounded-lg text-card-foreground font-medium hover:scale-105 hover:border-primary transition-all duration-300 fade-in hover-glow hologram-effect text-sm sm:text-base"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section id="projects" className="slide-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-primary neon-text floating">
              Projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="flip-card fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <Card className="h-full border-border hover:border-primary transition-all duration-300 bg-card/60 backdrop-blur-sm hologram-effect">
                        <CardContent className="p-6 sm:p-8 flex flex-col justify-center items-center h-full">
                          <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6 neon-text text-center">
                            {project.name}
                          </h3>
                          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-accent mb-3 sm:mb-4 rounded"></div>
                          <p className="text-muted-foreground text-center text-base sm:text-lg">Tap to learn more</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flip-card-back">
                      <Card className="h-full border-primary bg-card/80 backdrop-blur-md pulse-glow">
                        <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary neon-text">
                              {project.name}
                            </h3>
                            <p className="text-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                              {project.description}
                            </p>
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline text-sm sm:text-base"
                          >
                            <i className="fab fa-x-twitter"></i>
                            View Project
                          </a>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="slide-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-primary neon-text floating">
              Contact
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
              <a
                href="https://t.me/Painkium"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 text-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform hover-glow bg-card/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-border/50 hologram-effect justify-center"
              >
                <i className="fab fa-telegram text-2xl sm:text-3xl"></i>
                <span className="font-medium text-lg sm:text-xl">Telegram</span>
              </a>
              <a
                href="https://x.com/cryqt_pain"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 text-foreground hover:text-primary transition-all duration-300 hover:scale-110 transform hover-glow bg-card/40 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-border/50 hologram-effect justify-center"
              >
                <i className="fab fa-x-twitter text-2xl sm:text-3xl"></i>
                <span className="font-medium text-lg sm:text-xl">X (Twitter)</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-card/90 backdrop-blur-md border-border mx-4 sm:mx-auto max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-primary text-lg sm:text-xl">{selectedProject?.name}</DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <p className="text-foreground text-sm sm:text-base">{selectedProject.description}</p>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline text-sm sm:text-base"
              >
                <i className="fab fa-x-twitter"></i>
                View Project
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
