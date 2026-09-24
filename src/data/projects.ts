export type Category =
  | "SaaS"
  | "Mobile"
  | "AI"
  | "Enterprise"
  | "Proptech"
  | "Community"
  | "Tools";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: Category[];
  stack: string[];
  year: number;
  demo?: string;
  featured?: boolean;
}

export const categories: Array<"All" | Category> = [
  "All",
  "SaaS",
  "Mobile",
  "AI",
  "Enterprise",
  "Proptech",
  "Community",
  "Tools",
];

export const repoUrl = (slug: string) => `https://github.com/mwasobaddy/${slug}`;

export const projects: Project[] = [
  {
    slug: "MaliManager",
    name: "MaliManager",
    tagline: "Property management SaaS for Kenyan landlords",
    description:
      "Manage properties, tenants, rent payments and maintenance — with native M-Pesa integration for rent collection.",
    categories: ["SaaS", "Proptech"],
    stack: ["Next.js", "Laravel", "TypeScript", "M-Pesa", "Tailwind CSS"],
    year: 2026,
    featured: true,
  },
  {
    slug: "KeNHAVATE-Remastered",
    name: "KeNHAVATE",
    tagline: "Idea portal & staff engagement for KeNHA",
    description:
      "OTP-based authentication system with email/OTP login, Google OAuth, profile setup, points awarding, audit logging, notifications and role-based access control.",
    categories: ["Enterprise"],
    stack: ["Laravel 13", "React", "TypeScript", "OTP Auth", "Google OAuth"],
    year: 2026,
    featured: true,
  },
  {
    slug: "AI-Invoice-Generator",
    name: "AI-Invoice Generator",
    tagline: "Invoices generated from plain text, with AI",
    description:
      "Full-stack application that simplifies invoice creation with AI assistance — user auth, dashboard analytics, AI-generated invoices from text, automatic calculations, status tracking, reminder emails and professional PDF exports.",
    categories: ["SaaS", "AI"],
    stack: ["JavaScript", "AI generation", "PDF export", "Auth", "Analytics"],
    year: 2025,
    demo: "https://ai-invoice-generator-five.vercel.app",
    featured: true,
  },
  {
    slug: "ourearsareopen",
    name: "Our Ears Are Open",
    tagline: "A listening-support platform",
    description:
      "Connects people in need of emotional support with trained listeners via scheduled phone conversations and live text chat. Includes community rooms, crisis resources, donations and multi-role admin portals.",
    categories: ["Community"],
    stack: ["TypeScript", "PostgreSQL", "WebSockets", "Realtime chat"],
    year: 2026,
    demo: "https://ourearsareopen.vercel.app",
    featured: true,
  },
  {
    slug: "Harmonia-AI",
    name: "Harmonia-AI",
    tagline: "AI legal mitigation statement generator",
    description:
      "MERN-stack application that helps users generate legal mitigation statements for minor criminal offenses, professional regulation cases and similar scenarios.",
    categories: ["AI"],
    stack: ["MongoDB", "Express", "React", "Node.js", "AI / LLM"],
    year: 2025,
    demo: "https://harmonia-ai.vercel.app",
    featured: true,
  },
  {
    slug: "pet-match",
    name: "pet-match",
    tagline: "Tinder-style matching for pet parents",
    description:
      "Discover, match and chat with nearby pet parents. Profile discovery, real-time messaging, a social feed, and a map for pet-friendly locations.",
    categories: ["Mobile"],
    stack: ["Expo", "React Native", "Supabase", "Realtime", "Map"],
    year: 2026,
    featured: true,
  },
  {
    slug: "pet_app",
    name: "Pet App",
    tagline: "Full-stack pet matching platform",
    description:
      "Pet-centric social matching platform with swipe-to-match engine, real-time WebSocket chat, social feed with trending algorithm, subscription & credit system, multi-tier permissions and a full admin backoffice.",
    categories: ["Mobile", "SaaS"],
    stack: ["Laravel 12", "React", "WebSockets", "Subscriptions", "Admin"],
    year: 2026,
  },
  {
    slug: "invoice_app",
    name: "Invoice App",
    tagline: "Modern full-stack invoice management",
    description:
      "Manage invoices, track budgets and monitor expenses in one place, built with a modern serverless-ready stack.",
    categories: ["SaaS"],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    year: 2026,
    demo: "https://invoice-app-omega-ten.vercel.app",
  },
  {
    slug: "MovieFlix",
    name: "MovieFlix",
    tagline: "Browse & search movies on mobile",
    description:
      "React Native mobile app for browsing and searching movies — clean UI, movie details and search functionality.",
    categories: ["Mobile"],
    stack: ["Expo", "React Native", "TypeScript", "NativeWind"],
    year: 2025,
  },
  {
    slug: "Puzzle",
    name: "Puzzle",
    tagline: "Real-time multiplayer puzzle app",
    description:
      "Collaborative puzzle web app with real-time multiplayer solving, custom puzzle creation, authentication, leaderboards and payment integration.",
    categories: ["Tools"],
    stack: ["React", "Vite", "Firebase", "Multiplayer", "Payments"],
    year: 2025,
    demo: "https://puzzle-indol-gamma.vercel.app",
  },
  {
    slug: "Horizon-HRM",
    name: "Horizon HRM",
    tagline: "Modern full-stack HR operations",
    description:
      "Streamlines recruitment, onboarding and the employee lifecycle for organizations of all sizes.",
    categories: ["Enterprise"],
    stack: ["React", "Laravel", "TypeScript", "HR workflows"],
    year: 2026,
  },
  {
    slug: "HR-Management-System",
    name: "HR Management System",
    tagline: "Full-stack HRM platform",
    description:
      "Early iteration of the HR platform — recruitment, onboarding and employee lifecycle management in a full-stack React + Laravel app.",
    categories: ["Enterprise"],
    stack: ["React", "Laravel", "Blade", "TypeScript"],
    year: 2026,
  },
  {
    slug: "QuickFolio",
    name: "QuickFolio",
    tagline: "Manage folios, deployed serverlessly",
    description:
      "Modern full-stack app for managing folios, built on the PERN stack and deployed serverlessly on Vercel.",
    categories: ["SaaS"],
    stack: ["PostgreSQL", "Express", "React", "Node.js", "Vercel"],
    year: 2025,
  },
  {
    slug: "PWA",
    name: "SIGHT Lab",
    tagline: "Privacy-first research-grade mobile app",
    description:
      "SIGHT Lab V0.1 operationalizes the SIGHT somatic-emotional regulation protocol through objective physiological measurement.",
    categories: ["Mobile"],
    stack: ["TypeScript", "PWA", "Research"],
    year: 2026,
  },
  {
    slug: "Rental-Management-System",
    name: "Rental Management System",
    tagline: "Smart AI rental platform",
    description:
      "A smart rental system pairing an AI-assisted layer with a full-stack web platform.",
    categories: ["Proptech", "AI"],
    stack: ["TypeScript", "Laravel", "React", "AI"],
    year: 2025,
  },
  {
    slug: "Baringo-Online-Insurance-System",
    name: "Baringo Online Insurance",
    tagline: "Insurance processes, automated",
    description:
      "A comprehensive web-based platform designed to automate and streamline insurance processes in Kenya.",
    categories: ["Enterprise"],
    stack: ["Laravel", "Blade", "PHP"],
    year: 2025,
  },
  {
    slug: "GetBooks",
    name: "GetBooks",
    tagline: "A digital library with books",
    description:
      "A digital library platform for organizing and reading books.",
    categories: ["Tools"],
    stack: ["Laravel", "Blade", "TypeScript"],
    year: 2025,
  },
  {
    slug: "Boma-Books",
    name: "Boma-Books",
    tagline: "Bookstore management system",
    description:
      "Back-office tooling for running a bookstore — inventory and management on the Laravel stack.",
    categories: ["Tools"],
    stack: ["Laravel", "Blade", "PHP"],
    year: 2025,
  },
  {
    slug: "Pelek-Properties",
    name: "Pelek Properties",
    tagline: "AirBnB-style management system",
    description:
      "Manages short-stay rental operations — bookings, units and owners on the Laravel stack.",
    categories: ["Proptech"],
    stack: ["Laravel", "Blade", "PHP"],
    year: 2025,
  },
  {
    slug: "NyumbaSmart",
    name: "NyumbaSmart",
    tagline: "Smart property platform",
    description:
      "A property-focused web application for smarter management of housing.",
    categories: ["Proptech"],
    stack: ["Laravel", "Blade", "PHP"],
    year: 2025,
  },
  {
    slug: "URL-App",
    name: "URL App",
    tagline: "Create, manage & share URL lists",
    description:
      "A simple web app that helps users easily create, manage and share lists of URLs.",
    categories: ["Tools"],
    stack: ["Laravel", "Blade", "PHP"],
    year: 2025,
  },
  {
    slug: "CADEBECK",
    name: "CADEBECK",
    tagline: "Enterprise system, version 2",
    description:
      "Version 2 of CADEBECK rebuilt on Laravel 12.20.",
    categories: ["Enterprise"],
    stack: ["Laravel 12", "Blade"],
    year: 2025,
  },
  {
    slug: "chudecocodyhr.ci",
    name: "ChudeCode HR",
    tagline: "HR system",
    description:
      "An HR system delivered as a PHP/Laravel web application.",
    categories: ["Enterprise"],
    stack: ["Laravel", "PHP"],
    year: 2024,
  },
  {
    slug: "LindaBuy",
    name: "LindaBuy",
    tagline: "Commerce platform",
    description:
      "A shopping-focused web platform on the Laravel + TypeScript stack. No public description on record.",
    categories: ["SaaS"],
    stack: ["Laravel", "PHP", "TypeScript"],
    year: 2026,
  },
  {
    slug: "WakeTech",
    name: "Wake / WakeTech",
    tagline: "The previous Wake portfolio",
    description:
      "The earlier version of this very Wake portfolio — the brand that started it and the seed for this site.",
    categories: ["Tools"],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "GSAP"],
    year: 2026,
    demo: "https://wake-tech-nine.vercel.app",
  },
];

export const featured = projects.filter((p) => p.featured);
export const count = projects.length;