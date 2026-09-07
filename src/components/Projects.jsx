import { ExternalLink, Github } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/useInView"
import { externalUrl, site } from "@/data/site"

function Projects() {
  const [ref, visible] = useInView()

  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="site-container">
        <SectionHeading
          index="03"
          title="Selected work"
          description="Projects that show how I think about product, data, and interface."
        />

        <div
          ref={ref}
          className={`reveal grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${visible ? "reveal-visible" : ""}`}
        >
          {site.projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_-28px_rgba(45,212,191,0.45)]"
              style={{ transitionDelay: visible ? `${index * 70}ms` : "0ms" }}
            >
              <div className={`relative h-36 overflow-hidden bg-linear-to-br ${project.accent}`}>
                <div className="absolute inset-0 bg-grid opacity-35" />
                <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-background/55 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur">
                    {project.year}
                  </span>
                </div>
                <div className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-xl border border-white/10 bg-background/50 text-sm font-semibold text-primary backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="h-7 border-white/10 bg-white/4 px-2.5 text-[12px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/8 pt-5">
                  {project.github ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className={`h-9 ${project.live ? "flex-1" : "w-full"}`}
                    >
                      <a
                        href={externalUrl(project.github)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github data-icon="inline-start" />
                        GitHub
                      </a>
                    </Button>
                  ) : null}
                  {project.live ? (
                    <Button asChild size="sm" className="h-9 flex-1">
                      <a
                        href={externalUrl(project.live)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live demo
                        <ExternalLink data-icon="inline-end" />
                      </a>
                    </Button>
                  ) : (
                    <span className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-dashed border-white/10 px-3 text-xs text-muted-foreground">
                      Deploy link soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
