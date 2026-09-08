import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Download, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadCvPdf } from "@/lib/cvPdf"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cvPath, navLinks, resumePath, site } from "@/data/site"

function activeNavPath(pathname) {
  return pathname === cvPath ? resumePath : pathname
}

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false })
  const listRef = useRef(null)
  const currentPath = activeNavPath(location.pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const update = () => {
      const active = list.querySelector("[data-nav-active='true']")
      if (!active) return
      const listRect = list.getBoundingClientRect()
      const itemRect = active.getBoundingClientRect()
      setIndicator({
        left: itemRect.left - listRect.left,
        width: itemRect.width,
        ready: true,
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(list)
    window.addEventListener("resize", update)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [currentPath])

  function isActive(link) {
    return currentPath === link.to
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-background/75 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="site-container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-sm font-semibold tracking-wide text-primary">
            {site.initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-foreground sm:block">
            {site.shortName}
          </span>
        </NavLink>

        <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
          <span
            aria-hidden
            className="pointer-events-none absolute top-0 h-full rounded-full bg-white/8 transition-all duration-300 ease-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.ready ? 1 : 0,
            }}
          />
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                data-nav-active={isActive(link) ? "true" : undefined}
                className={() =>
                  `relative z-10 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive(link)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="hidden h-9 px-3 lg:inline-flex"
            onClick={downloadCvPdf}
          >
            <Download />
            Download CV
          </Button>
          <Button asChild className="hidden h-9 px-4 lg:inline-flex">
            <NavLink to="/contact">Let’s talk</NavLink>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle>{site.shortName}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setOpen(false)}
                    className={() =>
                      `rounded-lg px-3 py-2.5 text-sm hover:bg-muted hover:text-foreground ${
                        isActive(link)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 h-10"
                  onClick={() => {
                    setOpen(false)
                    downloadCvPdf()
                  }}
                >
                  <Download />
                  Download CV
                </Button>
                <Button asChild className="h-10">
                  <NavLink to="/contact" onClick={() => setOpen(false)}>
                    Let’s talk
                  </NavLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
