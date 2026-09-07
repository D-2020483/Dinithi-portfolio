import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import { navLinks } from "@/data/site"

const pathToSection = Object.fromEntries(
  navLinks.map((link) => [link.to, link.sectionId]),
)

const knownPaths = new Set(navLinks.map((link) => link.to))

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!knownPaths.has(location.pathname)) {
      navigate("/", { replace: true })
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    const sectionId = pathToSection[location.pathname] ?? "home"
    const el = document.getElementById(sectionId)
    if (!el) return

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const headerOffset = 72
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top, behavior: "smooth" })
  }, [location.pathname])

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
