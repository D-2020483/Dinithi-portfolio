import { cvFileName, site, socialLabel } from "@/data/site"

const PAGE = { width: 210, height: 297 }
const MARGIN = 18
const CONTENT_WIDTH = PAGE.width - MARGIN * 2
const INK = [15, 23, 42]
const MUTED = [71, 85, 105]
const ACCENT = [13, 148, 136]
const RULE = [203, 213, 225]

function ensureSpace(doc, y, needed) {
  if (y + needed < PAGE.height - MARGIN) return y
  doc.addPage()
  return MARGIN + 4
}

function rule(doc, y) {
  doc.setDrawColor(...RULE)
  doc.setLineWidth(0.3)
  doc.line(MARGIN, y, PAGE.width - MARGIN, y)
}

function heading(doc, title, y) {
  y = ensureSpace(doc, y, 12)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(...ACCENT)
  doc.text(title.toUpperCase(), MARGIN, y)
  rule(doc, y + 2.5)
  return y + 10
}

function wrapped(doc, text, y, { size = 10, color = MUTED, leading = 5, font = "normal" } = {}) {
  doc.setFont("helvetica", font)
  doc.setFontSize(size)
  doc.setTextColor(...color)
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH)
  for (const line of lines) {
    y = ensureSpace(doc, y, leading)
    doc.text(line, MARGIN, y)
    y += leading
  }
  return y
}

export async function downloadCvPdf() {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  let y = 22

  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.setTextColor(...INK)
  doc.text(site.name, MARGIN, y)
  y += 8

  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.setTextColor(...ACCENT)
  doc.text(site.role, MARGIN, y)
  y += 7

  const contact = [
    site.email,
    site.location,
    site.url.replace(/^https?:\/\//, ""),
  ].join("  ·  ")
  y = wrapped(doc, contact, y, { size: 9, color: MUTED, leading: 4.5 })
  y += 2

  y = heading(doc, "Profile", y)
  y = wrapped(doc, site.about.join(" "), y, { size: 10, leading: 5 })
  y += 4

  y = heading(doc, "Skills", y)
  for (const group of site.skillGroups) {
    y = ensureSpace(doc, y, 8)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(...INK)
    doc.text(`${group.title}:`, MARGIN, y)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...MUTED)
    doc.text(group.items.join(", "), MARGIN + 28, y)
    y += 6
  }
  y += 2

  y = heading(doc, "Selected projects", y)
  for (const project of site.projects) {
    y = ensureSpace(doc, y, 16)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(...INK)
    doc.text(project.title, MARGIN, y)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(...ACCENT)
    doc.text(String(project.year), PAGE.width - MARGIN, y, { align: "right" })
    y += 5
    y = wrapped(doc, project.description, y, { size: 10, leading: 5 })
    y = wrapped(doc, project.tags.join("  ·  "), y, { size: 9, color: ACCENT, leading: 4.5 })
    y += 4
  }

  y = heading(doc, "Contact", y)
  const links = [
    `Email: ${site.email}`,
    `LinkedIn: ${socialLabel(site.social.linkedin)}`,
    `GitHub: ${socialLabel(site.social.github)}`,
    `Portfolio: ${site.url.replace(/^https?:\/\//, "")}`,
  ]
  for (const line of links) {
    y = wrapped(doc, line, y, { size: 10, leading: 5.5 })
  }

  doc.save(cvFileName)
}
