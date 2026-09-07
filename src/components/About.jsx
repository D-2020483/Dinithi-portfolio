import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { useInView } from "@/hooks/useInView"
import { site } from "@/data/site"

function About() {
  const [ref, visible] = useInView()

  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="site-container">
        <SectionHeading
          index="01"
          title="A bit about me"
          description="A developer who likes building things people can actually use."
        />

        <div
          ref={ref}
          className={`reveal grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] ${visible ? "reveal-visible" : ""}`}
        >
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Let’s work together
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {site.highlights.map((item) => (
              <div
                key={item.value}
                className="rounded-2xl border border-white/8 bg-card/70 p-5"
              >
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
