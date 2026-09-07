import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowDownRight, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { externalUrl, site } from "@/data/site"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState(site.roles[0])
  const [deleting, setDeleting] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return
    setAnimate(true)
    setText("")
  }, [])

  useEffect(() => {
    if (!animate) return
    const current = site.roles[roleIndex]
    const delay = deleting ? 40 : text === current ? 1400 : 70

    const timer = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
        return
      }
      if (deleting && text === "") {
        setDeleting(false)
        setRoleIndex((index) => (index + 1) % site.roles.length)
        return
      }
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)
      setText(next)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [animate, deleting, roleIndex, text])

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow-orb pointer-events-none absolute -top-24 left-1/4 size-[28rem] rounded-full bg-primary/20" />
      <div className="glow-orb pointer-events-none absolute top-40 right-0 size-[22rem] rounded-full bg-sky-500/10" />

      <div className="site-container relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-2xl flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            {site.availability}
          </div>

          <p className="mb-3 text-sm tracking-wide text-muted-foreground">
            Hi, I’m
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {site.shortName}
          </h1>
          <p className="mt-4 min-h-8 text-lg text-primary sm:text-xl">
            {text}
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 animate-pulse bg-primary align-middle" />
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.tagline} I work with React, Node.js, and MongoDB to ship products that are fast, clear, and ready for real use.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="h-11 px-5 text-sm">
              <Link to="/projects">
                View my work
                <ArrowDownRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-5 text-sm">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              {site.location}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={externalUrl(site.social.github)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a
                href={externalUrl(site.social.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 hover:border-primary/40 hover:text-primary"
                aria-label="Email"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <aside className="relative shrink-0 self-center lg:self-auto">
          <div className="absolute -inset-4 rounded-3xl bg-primary/15 blur-2xl" />
          <div className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl border border-primary/20 bg-primary/5" />
          <div className="relative w-44 overflow-hidden rounded-2xl border border-white/12 bg-card shadow-2xl sm:w-52">
            <div className="relative aspect-3/4 overflow-hidden bg-linear-to-br from-primary/20 via-card to-sky-500/10">
              {!photoFailed ? (
                <img
                  src={site.photo}
                  alt={site.name}
                  className="size-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="flex size-full items-center justify-center text-4xl font-semibold text-primary sm:text-5xl">
                  {site.initials}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 via-background/55 to-transparent p-4 pt-10">
                <p className="text-sm font-semibold text-foreground">{site.shortName}</p>
                <p className="mt-0.5 text-xs text-primary">{site.role}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Hero
