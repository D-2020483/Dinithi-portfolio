import { cv, cvFileName } from "../data/cv.js"
import { iconPng } from "./cvIcons.js"

const PAGE = { width: 210, height: 297 }
const MARGIN_X = 11
const MARGIN_Y = 9.5
const CONTENT_WIDTH = PAGE.width - MARGIN_X * 2
const INK = [20, 20, 20]
const MUTED = [77, 77, 77]
const RULE = [211, 211, 211]
const ICON = 3.15

function rule(doc, y) {
  doc.setDrawColor(...RULE)
  doc.setLineWidth(0.42)
  doc.line(MARGIN_X, y, PAGE.width - MARGIN_X, y)
}

function heading(doc, title, y) {
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(...INK)
  doc.text(title.toUpperCase(), MARGIN_X, y)
  rule(doc, y + 1.55)
  return y + 6.8
}

function measure(doc, text, size, style) {
  doc.setFont("helvetica", style)
  doc.setFontSize(size)
  return doc.getTextWidth(text)
}

function parseRich(text) {
  const parts = []
  const source = String(text)
  const pattern = /\*\*(.+?)\*\*/g
  let last = 0
  let match
  while ((match = pattern.exec(source))) {
    if (match.index > last) {
      parts.push({ text: source.slice(last, match.index), bold: false })
    }
    parts.push({ text: match[1], bold: true })
    last = match.index + match[0].length
  }
  if (last < source.length) parts.push({ text: source.slice(last), bold: false })
  return parts.filter((part) => part.text)
}

function tokenize(parts) {
  const tokens = []
  for (const part of parts) {
    const bits = part.text.split(/(\s+)/)
    for (const bit of bits) {
      if (bit) tokens.push({ text: bit, bold: part.bold })
    }
  }
  return tokens
}

function wrapRich(doc, text, maxWidth, size) {
  const tokens = tokenize(parseRich(text))
  const lines = []
  let current = []
  let width = 0

  for (const token of tokens) {
    const tokenWidth = measure(doc, token.text, size, token.bold ? "bold" : "normal")
    if (current.length && width + tokenWidth > maxWidth) {
      lines.push(current)
      current = token.text.trim() ? [token] : []
      width = token.text.trim() ? tokenWidth : 0
    } else {
      current.push(token)
      width += tokenWidth
    }
  }
  if (current.length) lines.push(current)
  return lines
}

function drawRichLine(doc, line, x, y, size, color = INK) {
  let cursor = x
  for (const token of line) {
    doc.setFont("helvetica", token.bold ? "bold" : "normal")
    doc.setFontSize(size)
    doc.setTextColor(...color)
    doc.text(token.text, cursor, y)
    cursor += measure(doc, token.text, size, token.bold ? "bold" : "normal")
  }
  return cursor
}

function richParagraph(doc, text, y, { x = MARGIN_X, width = CONTENT_WIDTH, size = 9.3, leading = 4.05 } = {}) {
  const lines = wrapRich(doc, text, width, size)
  for (const line of lines) {
    drawRichLine(doc, line, x, y, size)
    y += leading
  }
  return y
}

function underlineLink(doc, text, x, y, url, { size = 9, italic = false } = {}) {
  const style = italic ? "italic" : "normal"
  const width = measure(doc, text, size, style)
  doc.setFont("helvetica", style)
  doc.setFontSize(size)
  doc.setTextColor(50, 50, 50)
  if (url) doc.textWithLink(text, x, y, { url })
  else doc.text(text, x, y)
  doc.setDrawColor(80, 80, 80)
  doc.setLineWidth(0.16)
  doc.line(x, y + 0.65, x + width, y + 0.65)
  return width
}

function pairRow(doc, left, right, y, { leftSize = 10, rightSize = 9, leftBold = true, leftItalic = false, gap = 4 } = {}) {
  const rightWidth = measure(doc, right, rightSize, "normal")
  const leftMax = Math.max(70, CONTENT_WIDTH - rightWidth - gap)
  const lines = wrapRich(doc, left, leftMax, leftSize)

  lines.forEach((line, index) => {
    const styled = line.map((token) => ({
      ...token,
      bold: leftBold ? true : token.bold,
    }))
    if (!leftBold && leftItalic) {
      doc.setFont("helvetica", "italic")
      doc.setFontSize(leftSize)
      doc.setTextColor(...INK)
      doc.text(line.map((token) => token.text).join(""), MARGIN_X, y)
    } else {
      drawRichLine(doc, styled, MARGIN_X, y, leftSize)
    }
    if (index === 0) {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(rightSize)
      doc.setTextColor(...MUTED)
      doc.text(right, PAGE.width - MARGIN_X, y, { align: "right" })
    }
    y += 4.05
  })
  return y
}

function bullets(doc, items, y) {
  const indent = 4.2
  const textWidth = CONTENT_WIDTH - indent

  for (const item of items) {
    const lines = wrapRich(doc, item, textWidth, 9.15)
    doc.setFillColor(...INK)
    doc.circle(MARGIN_X + 1.55, y - 0.85, 0.52, "F")
    for (const line of lines) {
      drawRichLine(doc, line, MARGIN_X + indent, y, 9.15)
      y += 4.05
    }
    y += 0.12
  }
  return y
}

function contactItems(icons) {
  return [
    { icon: icons.phone, text: cv.phone, url: cv.phoneHref },
    { text: "|" },
    { icon: icons.envelope, text: cv.email, url: `mailto:${cv.email}` },
    { text: "|" },
    { icon: icons.github, text: cv.github.label, url: cv.github.url },
    { text: "|" },
    { icon: icons.linkedin, text: cv.linkedin.label, url: cv.linkedin.url },
    { text: "|" },
    { icon: icons.globe, text: cv.website.label, url: cv.website.url },
    { text: "|" },
    { icon: icons.marker, text: cv.location },
  ]
}

function measureContact(doc, item) {
  if (item.text === "|") return measure(doc, "|", 8.3, "normal") + 0.4
  const textWidth = measure(doc, item.text, 8.3, "normal")
  return (item.icon ? ICON + 0.85 : 0) + textWidth
}

function drawContactLine(doc, items, y, gap) {
  const total = items.reduce((sum, item) => sum + measureContact(doc, item), 0) + gap * (items.length - 1)
  let x = (PAGE.width - total) / 2

  for (const item of items) {
    if (item.text === "|") {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8.3)
      doc.setTextColor(...MUTED)
      doc.text("|", x, y)
      x += measureContact(doc, item) + gap
      continue
    }

    if (item.icon) {
      doc.addImage(item.icon, "PNG", x, y - ICON + 0.55, ICON, ICON)
      x += ICON + 0.85
    }

    const width = measure(doc, item.text, 8.3, "normal")
    if (item.url) {
      underlineLink(doc, item.text, x, y, item.url, { size: 8.3 })
    } else {
      doc.setFont("helvetica", "normal")
      doc.setFontSize(8.3)
      doc.setTextColor(...INK)
      doc.text(item.text, x, y)
    }
    x += width + gap
  }
}

function drawCenteredContact(doc, y, icons) {
  const items = contactItems(icons)
  const gap = 1.35
  const maxWidth = PAGE.width - MARGIN_X * 2
  const total = items.reduce((sum, item) => sum + measureContact(doc, item), 0) + gap * (items.length - 1)

  if (total <= maxWidth) {
    drawContactLine(doc, items, y, gap)
    return y + 7.6
  }

  const splitAt = items.findIndex((item, index) => index > 4 && item.text === "|")
  const split = splitAt > 0 ? splitAt : Math.ceil(items.length / 2)
  drawContactLine(doc, items.slice(0, split), y, gap)
  const rest = items.slice(split).filter((item, index) => !(index === 0 && item.text === "|"))
  drawContactLine(doc, rest, y + 4.15, gap)
  return y + 11.6
}

function roleRow(doc, job, y) {
  doc.setFont("helvetica", "italic")
  doc.setFontSize(9.35)
  doc.setTextColor(...INK)
  const prefix = job.orgLabel ? `${job.title} (` : job.title
  doc.text(prefix, MARGIN_X, y)
  let x = MARGIN_X + measure(doc, prefix, 9.35, "italic")
  if (job.orgLabel) {
    const width = underlineLink(doc, job.orgLabel, x, y, job.orgUrl, { size: 9.35, italic: true })
    x += width
    doc.setFont("helvetica", "italic")
    doc.setTextColor(...INK)
    doc.text(")", x, y)
  }
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(job.location, PAGE.width - MARGIN_X, y, { align: "right" })
  return y + 4.05
}

function linkedTitle(doc, title, linkLabel, url, year, y) {
  const yearWidth = measure(doc, year, 9, "normal")
  const maxTitle = CONTENT_WIDTH - yearWidth - 4
  const prefix = `${title} | `
  const prefixWidth = measure(doc, prefix, 10, "bold")
  const linkWidth = measure(doc, linkLabel, 9.2, "italic")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.setTextColor(...INK)

  if (prefixWidth + linkWidth <= maxTitle) {
    doc.text(title, MARGIN_X, y)
    const barX = MARGIN_X + measure(doc, `${title} `, 10, "bold")
    doc.text("|", barX, y)
    underlineLink(doc, linkLabel, barX + measure(doc, "| ", 10, "bold"), y, url, {
      size: 9.2,
      italic: true,
    })
  } else {
    const lines = doc.splitTextToSize(`${title} | ${linkLabel}`, maxTitle)
    doc.text(lines[0], MARGIN_X, y)
    for (const line of lines.slice(1)) {
      y += 4.05
      doc.setFont("helvetica", "bold")
      doc.setFontSize(10)
      doc.text(line, MARGIN_X, y)
    }
  }

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(...MUTED)
  doc.text(year, PAGE.width - MARGIN_X, y, { align: "right" })
  return y + 4.05
}

export async function createCvPdf() {
  const { jsPDF } = await import("jspdf")
  const icons = {
    phone: await iconPng("phone"),
    envelope: await iconPng("envelope"),
    github: await iconPng("github"),
    linkedin: await iconPng("linkedin"),
    globe: await iconPng("globe"),
    marker: await iconPng("marker"),
  }

  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true })
  let y = 13.8

  doc.setFont("helvetica", "bold")
  doc.setFontSize(20.5)
  doc.setTextColor(...INK)
  doc.text(cv.name, PAGE.width / 2, y, { align: "center" })
  y += 6.6

  doc.setFontSize(11.3)
  doc.text(cv.headline, PAGE.width / 2, y, { align: "center" })
  y += 5.8
  y = drawCenteredContact(doc, y, icons)

  y = heading(doc, "Summary", y)
  y = richParagraph(doc, cv.summary, y, { size: 9.25, leading: 4.02 })
  y += 3.7

  y = heading(doc, "Experience", y)
  for (const job of cv.experience) {
    y = pairRow(doc, job.organization, job.dates, y, { leftSize: 10.05, rightSize: 9 })
    y = roleRow(doc, job, y)
    y = bullets(doc, job.bullets, y + 0.3)
    y += 2.35
  }
  y += 0.9

  y = heading(doc, "Projects", y)
  for (const project of cv.projects) {
    y = linkedTitle(doc, project.title, project.linkLabel, project.url, project.year, y)
    y = bullets(doc, project.bullets, y + 0.2)
    y += 1.95
  }
  y += 0.75

  y = heading(doc, "Education & Certifications", y)
  y = pairRow(doc, cv.education.school, cv.education.dates, y, { leftSize: 10.05, rightSize: 9 })
  y = pairRow(doc, cv.education.degree, cv.education.location, y, {
    leftSize: 9.35,
    rightSize: 9,
    leftBold: false,
    leftItalic: true,
  })
  y = bullets(doc, [`**Certifications**: ${cv.education.certifications}`], y + 0.25)
  y += 2.6

  y = heading(doc, "Skills", y)
  const labelWidth = 46
  for (const group of cv.skills) {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9.25)
    doc.setTextColor(...INK)
    doc.text(`${group.label}:`, MARGIN_X, y)
    doc.setFont("helvetica", "normal")
    const lines = doc.splitTextToSize(group.items, CONTENT_WIDTH - labelWidth)
    lines.forEach((line, index) => {
      doc.text(line, MARGIN_X + labelWidth, y)
      if (index < lines.length - 1) y += 3.8
    })
    y += 4.35
  }
  y += 1.55

  y = heading(doc, "References", y)
  for (const person of cv.references) {
    y = pairRow(doc, person.name, person.phone, y, { leftSize: 10, rightSize: 9 })
    y = pairRow(doc, person.title, `Email: ${person.email}`, y, {
      leftSize: 9.15,
      rightSize: 9,
      leftBold: false,
      leftItalic: true,
    })
    y += 1.75
  }

  const pageLimit = PAGE.height - MARGIN_Y
  if (y > pageLimit) {
    throw new Error(`CV overflow: content ends at ${y.toFixed(1)}mm (limit ${pageLimit}mm)`)
  }
  if (doc.getNumberOfPages() !== 1) {
    throw new Error("CV must stay on a single page")
  }

  doc.__cvEndY = y
  return doc
}

export async function downloadCvPdf() {
  const doc = await createCvPdf()
  doc.save(cvFileName)
}
