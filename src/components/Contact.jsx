import { useState } from "react"
import { Check, Github, Linkedin, LoaderCircle, Mail, Send } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/useInView"
import { externalUrl, site, socialLabel } from "@/data/site"

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: socialLabel(site.social.linkedin),
    href: externalUrl(site.social.linkedin),
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: socialLabel(site.social.github),
    href: externalUrl(site.social.github),
    icon: Github,
  },
]

function Contact() {
  const [ref, visible] = useInView()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus("sending")
    setError("")

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name || "a visitor"}`,
          _template: "table",
        }),
      })

      if (!response.ok) throw new Error("Could not send message")

      setStatus("sent")
      form.reset()
    } catch {
      // Fallback: open the visitor's email app so the message still reaches you
      const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      setStatus("idle")
      setError("Opened your email app as a backup. If nothing opened, email me directly.")
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="site-container">
        <SectionHeading
          index="04"
          title="Let’s work together"
          description="Have a role, a project, or a question? I would like to hear from you."
        />

        <div
          ref={ref}
          className={`reveal grid gap-8 lg:grid-cols-[0.9fr_1.1fr] ${visible ? "reveal-visible" : ""}`}
        >
          <div className="space-y-3">
            {channels.map((channel) => {
              const Icon = channel.icon
              const isExternal = channel.href.startsWith("http")
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-white/8 bg-card/70 p-4 transition-colors hover:border-primary/30"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{channel.value}</span>
                  </span>
                </a>
              )
            })}
            <Button type="button" variant="outline" className="h-10 w-full" onClick={copyEmail}>
              {copied ? <Check /> : <Mail />}
              {copied ? "Email copied" : "Copy email address"}
            </Button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/8 bg-card/70 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                Name
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="h-11 rounded-xl border border-white/10 bg-background/60 px-3 text-sm outline-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-11 rounded-xl border border-white/10 bg-background/60 px-3 text-sm outline-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20"
                  placeholder="you@email.com"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="resize-y rounded-xl border border-white/10 bg-background/60 px-3 py-3 text-sm outline-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20"
                placeholder="Tell me a little about the role or project."
              />
            </label>

            {status === "sent" ? (
              <p className="mt-4 text-sm text-primary">
                Message sent — I’ll get back to you by email soon.
              </p>
            ) : null}
            {error ? <p className="mt-4 text-sm text-amber-300">{error}</p> : null}

            <Button type="submit" className="mt-5 h-11 px-5" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
              {status === "sending" ? (
                <LoaderCircle data-icon="inline-end" className="animate-spin" />
              ) : (
                <Send data-icon="inline-end" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
