import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Resume from "@/components/Resume"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CvPage from "@/components/CvPage"
import { cvPath, navLinks } from "@/data/site"

const pathToSection = Object.fromEntries(
  navLinks.filter((link) => link.sectionId).map((link) => [link.to, link.sectionId]),
)

const knownPaths = new Set([...navLinks.map((link) => link.to), cvPath])

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isCvPage = location.pathname === cvPath

  useEffect(() => {
    if (!knownPaths.has(location.pathname)) {
      navigate("/", { replace: true })
    }
  }, [location.pathname, navigate])

  useEffect(() => {
    if (isCvPage) {
      window.scrollTo({ top: 0, behavior: "instant" })
      return
    }

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
  }, [location.pathname, isCvPage])

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-background">
      <Navbar />
      {isCvPage ? (
        <main>
          <CvPage />
        </main>
      ) : (
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Resume />
          <Contact />
        </main>
      )}
      <Footer />
    </div>
  )
}

export default App
