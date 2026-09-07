import { Code2, Database, Wrench } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { useInView } from "@/hooks/useInView"
import { site } from "@/data/site"

const icons = [Code2, Database, Wrench]

function Skills() {
  const [ref, visible] = useInView()

  return (
    <section id="skills" className="relative py-20 sm:py-24">
      <div className="site-container">
        <SectionHeading
          index="02"
          title="What I work with"
          description="The tools I use to design, build, and ship full-stack products."
        />

        <div
          ref={ref}
          className={`reveal grid gap-5 md:grid-cols-3 ${visible ? "reveal-visible" : ""}`}
        >
          {site.skillGroups.map((group, index) => {
            const Icon = icons[index]
            return (
              <article
                key={group.title}
                className="rounded-2xl border border-white/8 bg-card/70 p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-4 text-lg font-semibold">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="h-7 border-white/10 bg-white/4 px-2.5 text-[13px] text-foreground"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
