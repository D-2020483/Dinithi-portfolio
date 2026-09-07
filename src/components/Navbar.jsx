import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks, site } from "@/data/site"

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive || location.pathname === link.to
                      ? "bg-white/8 text-foreground"
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
          <Button asChild className="hidden h-9 px-4 md:inline-flex">
            <NavLink to="/contact">Let’s talk</NavLink>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
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
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm hover:bg-muted hover:text-foreground ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Button asChild className="mt-4 h-10">
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
