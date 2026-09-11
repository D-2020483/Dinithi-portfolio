import { cvFileName, cvPageUrl, cvViewPath } from "@/data/cv"

const PORTFOLIO_URL = "https://dinithiweerasinghaportfolio.netlify.app"

export const cvPath = cvViewPath
export const resumePath = "/resume"
export { cvFileName, cvPageUrl }

export const site = {
  name: "Dinithi Imalsha Weerasingha",
  shortName: "Dinithi Weerasingha",
  initials: "DW",
  role: "Junior Software Engineer",
  tagline: "I design and build reliable web applications that feel simple to use.",
  email: "imalsha24w@gmail.com",
  url: PORTFOLIO_URL,
  location: "Gampaha, Sri Lanka",
  phone: "(+94) 77-529 3988",
  availability: "Open to new opportunities",
  // Add your photo as public/profile.jpg (or update this path)
  photo: "/Profile.png",
  cvFileName,
  social: {
    linkedin: "https://www.linkedin.com/in/dinithi-imalsha-weerasingha-2ab59829a/",
    github: "https://github.com/D-2020483",
  },
  roles: [
    "Junior Software Engineer",
    "Full Stack Developer",
    "React Developer",
  ],
  about: [
  "I’m a software engineer and Information Systems graduate-to-be with hands-on experience in full-stack web development, software testing, and AI-powered applications. I build practical, user-focused solutions using technologies such as React.js, Node.js, FastAPI, MongoDB, and PostgreSQL, with a strong focus on writing clean, maintainable code.",

  "I enjoy turning real-world problems into functional software, from developing business applications to building AI-powered solutions that improve how users interact with technology. I’m comfortable working across the development lifecycle—from understanding requirements and designing solutions to developing, testing, and refining features.",

  "I’m continuously learning new technologies and improving my engineering skills, and I’m looking for an opportunity as a Junior Software Engineer where I can contribute to a team, solve meaningful problems, and grow into a strong software professional.",
],

  highlights: [
  { value: "Full-Stack", label: "React, Node.js, FastAPI & Databases" },
  { value: "AI-Powered", label: "Building practical AI-driven solutions" },
  { value: "Product-Minded", label: "From concept to production-ready software" },
],
  skillGroups: [
    {
      title: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS", "Vite"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    },
    {
      title: "Databases",
      items: ["MongoDB", "PostgreSQL", "Supabase"],
    },
    {
      title: "Tools & Practices",
      items: ["Git", "GitHub", "Postman", "Jira", "Unit Testing"],
    },
    {
      title: "AI & Cloud",
      items: ["OpenAI API", "AI Agents", "Prompt Engineering", "AWS Basics"],
    },
  ],
  projects: [
    {
      title: "Civic Link",
      year: "2026",
      description:
        "An AI-powered community issue reporting platform that helps citizens report local problems and routes them to the relevant authorities for resolution.",
      tags: ["React", "Express.js", "Supabase", "PostgreSQL ", "FastAPI", "OpenAI"],
      accent: "from-blue-500/25 via-indigo-500/10 to-transparent",
      image: "/projects/Civic-Link.png",
      github: "https://github.com/D-2020483/AI-Community-Problem-Solver",
      live: "https://civic-link-frontkend.vercel.app/login",
    },

    {
      title: "Protfolio Website",
      year: "2026",
      description:
        "A portfolio website built with React and Tailwind CSS to showcase my projects and skills.",
      tags: ["React", "Tailwind CSS"],
      accent: "from-green-500/25 via-emerald-500/10 to-transparent",
      image: "/projects/protfoliyo_project.png",
      github: "https://github.com/D-2020483/Dinithi-portfolio",
      live: "https://dinithiweerasinghaportfolio.netlify.app/projects",
    },
  
    {
      title: "JobMatch AI",
      year: "2025",
      description:
        "A full-stack job portal with AI-powered candidate matching, helping users find relevant opportunities based on their skills and job requirements.",
      tags: ["React", "Express.js", "MongoDB", "FastAPI" ],
      accent: "from-violet-500/25 via-purple-500/10 to-transparent",
      image: "/projects/jOB_mATCH_ai.png",
      github: "https://github.com/D-2020483/JOB_MATCH_AI",
      live: "",
    },
  
    {
      title: "Mebius E-Commerce",
      year: "2025",
      description:
        "An e-commerce application with product browsing, filtering, sorting, and ordering features designed to provide a simple and responsive shopping experience.",
      tags: ["React", "Express.js", "MongoDB"],
      accent: "from-pink-400/25 via-rose-500/10 to-transparent",
      image: "/projects/E-Commerce_Application.png",
      github: "https://github.com/D-2020483/E-Commerce_Frontend",
      live: "https://fed-storefront-frontend-dinithi.netlify.app/",
    },
  
    {
      title: "Inventory Management System",
      year: "2025",
      description:
        "A full-stack inventory management system for managing products, stock levels, users, and reports with a dashboard for monitoring daily operations.",
      tags: ["React", "Express.js", " MongoDB"],
      accent: "from-teal-400/25 via-cyan-500/10 to-transparent",
      image: "/projects/inventory.png",
      github: "https://github.com/D-2020483/Smart_Invetory_Management_FND",
      live: "https://inventory-management-bnd-dinithi.netlify.app/",
    },
  
    {
      title: "Expense Tracker",
      year: "2025",
      description:
        "A web application for recording and managing personal expenses, helping users organize transactions and keep track of their spending.",
      tags: ["React", "Node.js", "MongoDB"],
      accent: "from-amber-400/25 via-orange-500/10 to-transparent",
      image: "/projects/Expense_Tracker.png",
      github: "https://github.com/D-2020483/personal_expense_tracker_FND",
      live: "https://expense-tracker-dinithi.netlify.app/",
    },
  
    {
      title: "AI Agent",
      year: "2025",
      description:
        "An AI-powered assistant built with Python and Gradio, allowing users to interact with an AI agent through a simple web interface and deployed on Hugging Face Spaces.",
      tags: ["Python", "Gradio", "FastAPI", "Hugging Face"],
      accent: "from-green-400/25 via-emerald-500/10 to-transparent",
      image: "/projects/AI_aGENT.png",
      github: "https://github.com/D-2020483/AI_Hotel_Agent",
      live: "https://huggingface.co/spaces/Imalsha24/hotel-ai-agent",
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

/** Prefill Gmail so the live portfolio URL appears in the draft they send you. */
export function portfolioMailUrl({ name, email, message } = {}) {
  const intro = [`Hi ${site.shortName},`, "", `I found your work at ${site.url}.`]
  if (name || email || message) {
    intro.push("")
    if (name) intro.push(`Name: ${name}`)
    if (email) intro.push(`Email: ${email}`)
    if (message) intro.push("", message)
  } else {
    intro.push("", "")
  }

  return mailComposeUrl(site.email, {
    subject: `Message via ${site.name}'s portfolio`,
    body: intro.join("\n"),
  })
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
  { to: resumePath, label: "CV", sectionId: "resume" },
  { to: "/contact", label: "Contact", sectionId: "contact" },
]
