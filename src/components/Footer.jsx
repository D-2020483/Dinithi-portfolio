import { Github, Linkedin, Mail } from "lucide-react"
import { externalUrl, portfolioMailUrl, site } from "@/data/site"

function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="site-container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.shortName}. Built with React & Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <a
            href={externalUrl(site.social.github)}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-primary"
          >
            <Github className="size-4" />
          </a>
          <a
            href={externalUrl(site.social.linkedin)}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={portfolioMailUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
            className="hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
