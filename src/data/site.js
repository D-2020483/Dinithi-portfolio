export const site = {
  name: "Dinithi Imalsha Weerasinghe",
  shortName: "Dinithi Imalsha",
  initials: "DI",
  role: "Junior Software Engineer",
  tagline: "I design and build reliable web applications that feel simple to use.",
  email: "imalsha24w@gmail.com",
  location: "Sri Lanka",
  availability: "Open to new opportunities",
  // Add your photo as public/profile.jpg (or update this path)
  photo: "/profile.jpg",
  social: {
    linkedin: "https://www.linkedin.com/in/dinithi-imalsha-weerasingha-2ab59829a",
    github: "https://github.com/D-2020483",
  },
  roles: [
    "Junior Software Engineer",
    "Full Stack Developer",
    "React Developer",
  ],
  about: [
    "I am a software engineer who enjoys turning ideas into clean, usable products. I work across the stack with React and Node.js, and I care as much about maintainable code as I do about how a feature feels to use.",
    "I like solving real business problems — inventory, billing, reporting — and shipping interfaces that stay clear under pressure. I am always learning, always refining, and always looking for the next thing worth building.",
  ],
  highlights: [
    { value: "Full stack", label: "React, Node.js, MongoDB" },
    { value: "Product-minded", label: "From idea to shipped UI" },
    { value: "Detail-driven", label: "Readable code, thoughtful UX" },
  ],
  skillGroups: [
    {
      title: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "MongoDB", "REST APIs"],
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Vite", "Postman"],
    },
  ],
  projects: [
    {
      title: "Inventory System",
      year: "2025",
      description:
        "A full-stack inventory platform for tracking products, orders, and reports. Built to keep stock levels visible and daily operations easy to manage.",
      tags: ["React", "Node.js", "MongoDB"],
      accent: "from-teal-400/25 via-cyan-500/10 to-transparent",
      image: "/projects/inventory.png",
      github: "https://github.com/D-2020483",
      live: "",
    },
    {
      title: "POS System",
      year: "2025",
      description:
        "A point-of-sale system for product management and billing. Fast checkout, clear receipts, and a workflow that store teams can pick up quickly.",
      tags: ["React", "Node.js", "MongoDB"],
      accent: "from-sky-400/25 via-indigo-500/10 to-transparent",
      image: "/projects/pos.png",
      github: "https://github.com/D-2020483",
      live: "",
    },
    {
      title: "Portfolio Website",
      year: "2026",
      description:
        "This site — a personal portfolio built with React and Tailwind CSS, focused on clarity, motion, and a professional first impression.",
      tags: ["React", "Tailwind CSS", "Vite"],
      accent: "from-emerald-400/25 via-teal-500/10 to-transparent",
      image: "/projects/portfolio.png",
      github: "https://github.com/D-2020483",
      live: "",
    },
  ],
}

/** Open Gmail compose in the browser so email works without a desktop mail app. */
export function mailComposeUrl(email, { subject, body } = {}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: email,
  })
  if (subject) params.set("su", subject)
  if (body) params.set("body", body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

/** Ensure social URLs always open externally (never as same-site paths). */
export function externalUrl(url) {
  if (!url) return "#"
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url
  return `https://${url.replace(/^\/+/, "")}`
}

export function socialLabel(url) {
  try {
    const href = externalUrl(url)
    const { hostname, pathname } = new URL(href)
    return `${hostname.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`
  } catch {
    return url
  }
}

export const navLinks = [
  { to: "/", label: "Home", sectionId: "home" },
  { to: "/about", label: "About", sectionId: "about" },
  { to: "/skills", label: "Skills", sectionId: "skills" },
  { to: "/projects", label: "Projects", sectionId: "projects" },
  { to: "/contact", label: "Contact", sectionId: "contact" },
]
