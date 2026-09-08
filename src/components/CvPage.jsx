import { Download, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { downloadCvPdf } from "@/lib/cvPdf"
import { externalUrl, portfolioMailUrl, site } from "@/data/site"

function CvPage() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow-orb pointer-events-none absolute -top-24 left-1/4 size-[24rem] rounded-full bg-primary/15" />

      <div className="site-container relative">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.28em] text-primary uppercase">
              Curriculum Vitae
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Scan-friendly CV — download a PDF or read it here.
            </p>
          </div>
          <Button type="button" className="h-11 px-5 no-print" onClick={downloadCvPdf}>
            <Download data-icon="inline-start" />
            Download CV
          </Button>
        </div>

        <article className="cv-sheet overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-[0_30px_80px_-40px_rgba(45,212,191,0.45)]">
          <header className="border-b border-white/8 bg-linear-to-br from-primary/15 via-card to-sky-500/10 px-6 py-8 sm:px-10">
            <p className="text-sm font-medium text-primary">{site.role}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{site.shortName}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {site.tagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {site.location}
              </span>
              <a
                href={portfolioMailUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Mail className="size-4 text-primary" />
                {site.email}
              </a>
              <a
                href={externalUrl(site.social.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href={externalUrl(site.social.github)}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </header>

          <div className="grid gap-10 px-6 py-8 sm:px-10">
            <section>
              <h3 className="mb-3 text-xs font-medium tracking-[0.22em] text-primary uppercase">
                Profile
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {site.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-xs font-medium tracking-[0.22em] text-primary uppercase">
                Skills
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {site.skillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 text-sm font-semibold text-foreground">{group.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="h-7 border-white/10 bg-white/4 px-2.5 text-[12px]"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-xs font-medium tracking-[0.22em] text-primary uppercase">
                Selected projects
              </h3>
              <div className="space-y-5">
                {site.projects.map((project) => (
                  <div key={project.title} className="border-t border-white/8 pt-5 first:border-t-0 first:pt-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-base font-semibold text-foreground">{project.title}</h4>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="h-6 border-white/10 bg-white/4 px-2 text-[11px]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}

export default CvPage
