import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { navLinks } from "@/data/site"

const HEADER_OFFSET = 72
const SCROLL_LOCK_MS = 1100

const sectionLinks = navLinks.filter((link) => link.sectionId)

const pathToSection = Object.fromEntries(
  sectionLinks.map((link) => [link.to, link.sectionId]),
)

function sectionTop(sectionId) {
  if (sectionId === "home") return 0
  const el = document.getElementById(sectionId)
  if (!el) return null
  return el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
}

function pathForScrollPosition() {
  let currentPath = "/"
  for (const link of sectionLinks) {
    const el = document.getElementById(link.sectionId)
    if (!el) continue
    if (el.getBoundingClientRect().top - HEADER_OFFSET <= 2) {
      currentPath = link.to
    }
  }
  return currentPath
}

export function useSectionScroll(isCvPage) {
  const location = useLocation()
  const navigate = useNavigate()
  const skipScrollRef = useRef(false)
  const programmaticRef = useRef(false)
  const unlockTimerRef = useRef(0)

  useEffect(() => {
    if (isCvPage) {
      window.scrollTo({ top: 0, behavior: "instant" })
      return
    }

    if (skipScrollRef.current) {
      skipScrollRef.current = false
      return
    }

    const sectionId = pathToSection[location.pathname] ?? "home"
    const top = sectionTop(sectionId)
    if (top == null) return

    programmaticRef.current = true
    window.scrollTo({ top, behavior: "smooth" })

    window.clearTimeout(unlockTimerRef.current)
    unlockTimerRef.current = window.setTimeout(() => {
      programmaticRef.current = false
    }, SCROLL_LOCK_MS)

    return () => window.clearTimeout(unlockTimerRef.current)
  }, [location.pathname, isCvPage])

  useEffect(() => {
    if (isCvPage) return

    let ticking = false

    const updateActivePath = () => {
      ticking = false
      if (programmaticRef.current) return

      const currentPath = pathForScrollPosition()
      if (window.location.pathname === currentPath) return

      skipScrollRef.current = true
      navigate(currentPath, { replace: true })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateActivePath)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isCvPage, navigate])
}
