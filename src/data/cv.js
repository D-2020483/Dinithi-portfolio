export const cvFileName = "Dinithi-Weerasingha-CV.pdf"

export const cv = {
  name: "Dinithi Weerasingha",
  headline: "Junior Software Engineer / Associate Software Engineer",
  phone: "(+94) 77-529 3988",
  phoneHref: "tel:+94775293988",
  email: "imalsha24w@gmail.com",
  location: "Gampaha, Sri Lanka",
  github: {
    label: "GitHub",
    url: "https://github.com/D-2020483",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://linkedin.com/in/dinithi-weerasingha",
  },
  website: {
    label: "Portfolio",
    url: "https://dinithiweerasinghaportfolio.netlify.app/",
  },
  summary:
    "**Information Systems undergraduate** graduating in **October 2026**, with practical experience in **full-stack development and software testing**. Skilled in **React.js, Node.js, Express.js, FastAPI, Java, REST APIs, SQL, and NoSQL**, with experience developing and deploying web applications. Seeking a **Junior Software Engineer / Associate Software Engineer** role to contribute to modern software solutions and grow technical expertise.",
  experience: [
    {
      organization: "Institute of Digital Engineering Technology Pvt. Ltd",
      dates: "Apr. 2025 -- Nov. 2025",
      title: "Software Engineer - Trainee",
      orgUrl: "https://idet.lk",
      orgLabel: "idet.lk",
      location: "Remote",
      bullets: [
        "Designed and developed responsive React frontend components and validated forms for **AgriSense platform**.",
        "Built full-stack CRUD applications using React, Node.js, Express, RESTful APIs, and MongoDB.",
        "Developed robust backend services for a real-time inventory system, handling authentication and CRUD logic.",
      ],
    },
    {
      organization: "EWIS Solution (Pvt) Limited",
      dates: "Sept. 2024 -- Feb. 2025",
      title: "Software Engineer - Trainee",
      orgUrl: "https://www.ewisl.net",
      orgLabel: "ewisl.net",
      location: "Rajagiriya, Sri Lanka",
      bullets: [
        "Conducted manual functional testing and defect tracking via Jira on an **Odoo ERP system** (Inventory, Sales, Accounts).",
        "Contributed to Quality Assurance for public sector web/mobile software projects through test case execution.",
        "Assisted in requirements analysis and documentation for a barcode-based POS ticketing solution for Excise Dept.",
      ],
    },
    {
      organization: "FlexyCode (Pvt) Ltd. & Evotech Institute of Higher Education",
      dates: "May 2024 -- June 2024",
      title: "Software Intern Trainee",
      orgUrl: "",
      orgLabel: "",
      location: "Remote",
      bullets: [
        "Gained practical experience in version control workflows, repository management, and collaboration using Git & GitHub.",
      ],
    },
  ],
  projects: [
    {
      title: "Civic Link -- AI-Powered Civic Issue Reporting Platform",
      year: "2026",
      linkLabel: "GitHub Repo",
      url: "https://github.com/D-2020483/AI-Community-Problem-Solver",
      bullets: [
        "Developed an AI-powered platform using React, Node.js, FastAPI, PostgreSQL, and OpenAI to analyze citizen reports, classify issues, prioritize complaints, and route them to relevant authorities.",
      ],
    },
    {
      title: "JobMatch AI -- Full-Stack Job Portal",
      year: "2025",
      linkLabel: "GitHub Repo",
      url: "https://github.com/D-2020483/JOB_MATCH_AI",
      bullets: [
        "Built job portal (React, Node.js, Express, MongoDB) integrated with FastAPI for AI candidate match scores.",
      ],
    },
    {
      title: "MERN Stack E-Commerce Platform",
      year: "2024",
      linkLabel: "Live Demo",
      url: "https://fed-storefront-frontend-dinithi.netlify.app",
      bullets: [
        "Built store with user authentication, product management, admin controls, and responsive Tailwind UI.",
      ],
    },
    {
      title: "Hotel AI Assistant Agent",
      year: "2025",
      linkLabel: "Live Demo",
      url: "https://huggingface.co/spaces/Imalsha24/hotel-ai-agent/blob/main/app.py",
      bullets: [
        "Implemented context-aware chatbot using Google Gemini AI & Gradio for automated customer support.",
      ],
    },
  ],
  education: {
    school: "Rajarata University of Sri Lanka",
    dates: "2020 -- Present (Expected October 2026)",
    degree: "BSc (Hons) in Information Systems (Special Degree)",
    location: "Mihintale, Sri Lanka",
    certifications:
      "Full-stack Engineer (STEM Link, 2025)  |  Java Master Course (Evotech Institute, 2024)",
  },
  skills: [
    {
      label: "Languages",
      items: "JavaScript (ES6+), Java, SQL, HTML5, CSS3",
    },
    {
      label: "Frameworks & Libraries",
      items: "React.js, Express.js, Spring Boot, FastAPI, Tailwind CSS, Redux Toolkit",
    },
    {
      label: "Databases & Backend",
      items: "MongoDB, PostgreSQL, MySQL, Node.js, RESTful APIs, JWT Authentication, Supabase",
    },
    {
      label: "Tools & Practices",
      items: "Git, GitHub, Docker, CI/CD Basics, Postman, Jira, Agile/Scrum",
    },
  ],
  references: [
    {
      name: "Mr. Sadeep Randima Gunathunga",
      phone: "Tel: +94 71 638 6555",
      title: "Lecturer, Rajarata University of Sri Lanka (Direct Research Supervisor)",
      email: "sadeepg@mgt.rjt.ac.lk",
    },
    {
      name: "Ms. Dinushika Wickramasiri",
      phone: "Tel: +94 71 917 7349",
      title: "Lecturer, Rajarata University of Sri Lanka (Direct Project Supervisor)",
      email: "dinushikaw@mgt.rjt.ac.lk",
    },
  ],
}

export const cvViewPath = "/cv"

function cvRevision(value) {
  const source = JSON.stringify(value)
  let hash = 2166136261
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

export function cvPageUrl() {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : cv.website.url.replace(/\/$/, "")
  return `${origin}${cvViewPath}?v=${cvRevision(cv)}`
}
