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
import { useSectionScroll } from "@/hooks/useSectionScroll"
import { cvPath, navLinks } from "@/data/site"

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

  useSectionScroll(isCvPage)

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
