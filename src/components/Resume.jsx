import { useState } from "react"
import { Link } from "react-router-dom"
import { QRCodeSVG } from "qrcode.react"
import { ArrowUpRight, Check, Copy, Download, QrCode } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/useInView"
import { downloadCvPdf } from "@/lib/cvPdf"
import { cv, cvPageUrl, cvViewPath } from "@/data/cv"
import { site } from "@/data/site"

function Resume() {
  const [ref, visible] = useInView()
  const [copied, setCopied] = useState(false)
  const qrValue = cvPageUrl()

  async function copyCvLink() {
    try {
      await navigator.clipboard.writeText(qrValue)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.open(cvViewPath, "_blank", "noreferrer")
    }
  }

  return (
    <section id="resume" className="relative py-20 sm:py-24">
      <div className="site-container">
        <SectionHeading
          index="04"
          title="Professional CV"
          description="Download a PDF copy, view it online, or scan the QR code to open it on your phone."
        />

        <div
          ref={ref}
          className={`reveal grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr] ${visible ? "reveal-visible" : ""}`}
        >
          <div className="rounded-2xl border border-white/8 bg-card/70 p-6 sm:p-8">
            <p className="text-xs font-medium tracking-[0.22em] text-primary uppercase">
              Curriculum Vitae
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              {site.name}
            </h3>
            <p className="mt-2 text-sm text-primary">{site.role}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Download a professional PDF copy of my CV, or scan the code to open the latest version.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button type="button" className="h-11 px-5" onClick={downloadCvPdf}>
                <Download data-icon="inline-start" />
                Download CV
              </Button>
              <Button asChild variant="outline" className="h-11 px-5">
                <Link to={cvViewPath}>
                  View CV
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button type="button" variant="outline" className="h-11 px-5" onClick={copyCvLink}>
                {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
                {copied ? "Link copied" : "Copy CV link"}
              </Button>
            </div>
          </div>

          <aside className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-card/70 p-6 sm:p-8">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <QrCode className="size-4 text-primary" />
              Scan to view my CV
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-[0_20px_50px_-28px_rgba(45,212,191,0.55)]">
              <QRCodeSVG
                value={qrValue}
                size={188}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="M"
                includeMargin={false}
                title={`QR code linking to ${cv.name}'s latest CV`}
              />
            </div>
            <p className="mt-4 max-w-[18rem] break-all text-center text-xs leading-relaxed text-muted-foreground">
              Scan to open my latest CV. This code updates whenever the CV data is saved.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Resume
