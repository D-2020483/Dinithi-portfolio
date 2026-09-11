import { Link } from "react-router-dom"
import { ArrowLeft, Download, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadCvPdf } from "@/lib/cvPdf"
import { cv } from "@/data/cv"
import { externalUrl, resumePath } from "@/data/site"

function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {bold[1]}
        </strong>
      )
    }
    return <span key={index}>{part}</span>
  })
}

function CvSection({ title, children }) {
  return (
    <section className="cv-section">
      <h3 className="cv-heading">{title}</h3>
      {children}
    </section>
  )
}

function CvEntry({ left, right, subLeft, subRight, href, hrefLabel }) {
  return (
    <div className="cv-entry">
      <div className="cv-row">
        <p className="cv-org">{left}</p>
        <p className="cv-meta">{right}</p>
      </div>
      {subLeft || subRight ? (
        <div className="cv-row">
          <p className="cv-role">
            {subLeft}
            {href ? (
              <>
                {" ("}
                <a href={externalUrl(href)} target="_blank" rel="noreferrer">
                  {hrefLabel}
                </a>
                {")"}
              </>
            ) : null}
          </p>
          <p className="cv-meta">{subRight}</p>
        </div>
      ) : null}
    </div>
  )
}

function CvPage() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid no-print" />
      <div className="glow-orb pointer-events-none absolute -top-24 left-1/4 size-[24rem] rounded-full bg-primary/15 no-print" />

      <div className="site-container relative">
        <div className="mb-8 flex flex-col gap-4 no-print sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to={resumePath}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="size-4" />
              Back to portfolio
            </Link>
            <p className="mb-2 text-xs font-medium tracking-[0.28em] text-primary uppercase">
              Curriculum Vitae
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Professional CV
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Download the PDF or read the latest version here.
            </p>
          </div>
          <Button type="button" className="h-11 px-5" onClick={downloadCvPdf}>
            <Download data-icon="inline-start" />
            Download CV
          </Button>
        </div>

        <article className="cv-sheet">
          <header className="cv-header">
            <h2>{cv.name}</h2>
            <p className="cv-headline">{cv.headline}</p>
            <div className="cv-contact">
              <a href={cv.phoneHref}>
                <Phone className="size-3.5" />
                {cv.phone}
              </a>
              <span aria-hidden>|</span>
              <a href={`mailto:${cv.email}`}>
                <Mail className="size-3.5" />
                {cv.email}
              </a>
              <span aria-hidden>|</span>
              <a href={externalUrl(cv.github.url)} target="_blank" rel="noreferrer">
                <Github className="size-3.5" />
                {cv.github.label}
              </a>
              <span aria-hidden>|</span>
              <a href={externalUrl(cv.linkedin.url)} target="_blank" rel="noreferrer">
                <Linkedin className="size-3.5" />
                {cv.linkedin.label}
              </a>
              <span aria-hidden>|</span>
              <a href={externalUrl(cv.website.url)} target="_blank" rel="noreferrer">
                <Globe className="size-3.5" />
                {cv.website.label}
              </a>
              <span aria-hidden>|</span>
              <span>
                <MapPin className="size-3.5" />
                {cv.location}
              </span>
            </div>
          </header>

          <CvSection title="Summary">
            <p className="cv-summary">
              <RichText text={cv.summary} />
            </p>
          </CvSection>

          <CvSection title="Experience">
            {cv.experience.map((job) => (
              <div key={`${job.organization}-${job.dates}`} className="cv-block">
                <CvEntry
                  left={job.organization}
                  right={job.dates}
                  subLeft={job.title}
                  subRight={job.location}
                  href={job.orgUrl}
                  hrefLabel={job.orgLabel}
                />
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CvSection>

          <CvSection title="Projects">
            {cv.projects.map((project) => (
              <div key={project.title} className="cv-block">
                <div className="cv-row">
                  <p className="cv-org">
                    {project.title}
                    {" | "}
                    <a href={externalUrl(project.url)} target="_blank" rel="noreferrer">
                      {project.linkLabel}
                    </a>
                  </p>
                  <p className="cv-meta">{project.year}</p>
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>
                      <RichText text={bullet} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CvSection>

          <CvSection title="Education & Certifications">
            <div className="cv-block">
              <CvEntry
                left={cv.education.school}
                right={cv.education.dates}
                subLeft={cv.education.degree}
                subRight={cv.education.location}
              />
              <ul>
                <li>
                  <strong>Certifications:</strong> {cv.education.certifications}
                </li>
              </ul>
            </div>
          </CvSection>

          <CvSection title="Skills">
            <ul className="cv-skills">
              {cv.skills.map((group) => (
                <li key={group.label}>
                  <strong>{group.label}:</strong> {group.items}
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title="References">
            {cv.references.map((person) => (
              <CvEntry
                key={person.email}
                left={person.name}
                right={person.phone}
                subLeft={person.title}
                subRight={`Email: ${person.email}`}
              />
            ))}
          </CvSection>
        </article>
      </div>
    </section>
  )
}

export default CvPage
