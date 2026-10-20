// All of the site's words live here, so updating the portfolio means editing
// copy, not components. Keep it in sync with the resume in assets/docs.

import RVLogo from "./assets/images/logos/rv.png";
import VanguardLogo from "./assets/images/logos/vanguard.png";
import VarsityLogo from "./assets/images/logos/varsity_tutors.png";

import ExpressStill from "./assets/images/art/express.png";
import ExpressAnimated from "./assets/images/art/express.gif";
import FighterStill from "./assets/images/art/PlayerIdle.gif";
import FighterAnimated from "./assets/images/art/PlayerFighting.gif";
import FireStill from "./assets/images/art/fire.png";
import FireAnimated from "./assets/images/art/fire.gif";

export const profile = {
  name: "Kareem Ismail",
  role: "Full-Stack Engineer",
  company: "Red Ventures",
  pitch:
    "I build software people enjoy using — and, after hours, the demons below.",
  bio: "Five years of shipping across fintech and media: Java & Spring Boot behind the scenes at Vanguard, Vue, Nuxt & NestJS at Red Ventures, and AWS holding it all together. Off the clock, I draw pixel art, make music and build games.",
  email: "KareemTahaIsmail@gmail.com",
  linkedIn: "https://www.linkedin.com/in/kareem-ismail-742947197/",
  gitHub: "https://github.com/Kareemtahaismail",
};

export interface Job {
  role: string;
  company: string;
  url: string;
  logo: string;
  dates: string;
  tagline: string;
  highlights: string[];
  stack: string[];
}

export const experience: Job[] = [
  {
    role: "Full-Stack Engineer",
    company: "Red Ventures",
    url: "https://www.redventures.com/",
    logo: RVLogo,
    dates: "2024 — Present",
    tagline: "Both ends of the wire: the services that feed the apps, and the apps themselves.",
    highlights: [
      "Build and evolve the backend microservices that supply our team's app with its data and models.",
      "Shipped new features to the Coverage App in Vue + Nuxt.",
      "Now building the AllConnect platform with Stencil.js web components and NestJS.",
    ],
    stack: ["TypeScript", "Vue", "Nuxt", "Stencil.js", "NestJS"],
  },
  {
    role: "Application Engineer II",
    company: "Vanguard",
    url: "https://vanguard.com/",
    logo: VanguardLogo,
    dates: "2021 — 2024",
    tagline: "Three years keeping fund data honest at one of the world's largest investment firms.",
    highlights: [
      "Owned Java Spring Boot services end to end: production fixes, enhancements and brand-new features.",
      "Worked the full lifecycle — ER diagrams, RESTful APIs, and AWS Lambdas that source and shape fund data.",
      "Built troubleshooting microservices alongside traders, and mentored associate developers on secure, efficient delivery.",
    ],
    stack: ["Java", "Spring Boot", "AWS Lambda", "REST"],
  },
  {
    role: "Software Tutor",
    company: "Varsity Tutors",
    url: "https://www.varsitytutors.com/",
    logo: VarsityLogo,
    dates: "2021 — 2022",
    tagline: "Teaching code is just debugging with a human in the loop.",
    highlights: [
      "Taught software, web and game development as an independent contractor.",
      "Gave lessons in Java, Python, TypeScript/JavaScript and C#, from first loops to full projects.",
    ],
    stack: ["Java", "Python", "TypeScript", "C#"],
  },
];

export interface Project {
  key: string;
  title: string;
  description: string;
  stack: string[];
  still: string;
  animated: string;
  alt: string;
  // Either a public link, or a note explaining why there isn't one
  link?: { href: string; label: string };
  note?: string;
}

export const projects: Project[] = [
  {
    key: "api",
    title: "Portfolio API",
    description:
      "Every good show needs a backstage. A Node + Express backend built to serve this portfolio's content.",
    stack: ["JavaScript", "Node.js", "Express"],
    still: ExpressStill,
    animated: ExpressAnimated,
    alt: "Pixel-art Express logo",
    link: {
      href: "https://github.com/KareemTahaIsmail/portfolio-api",
      label: "View source",
    },
  },
  {
    key: "game",
    title: "2D Platform Fighter",
    description:
      "A pixel-art fighting game where I'm the programmer, the animator and, frankly, the toughest playtester.",
    stack: ["Game dev", "Pixel art"],
    still: FighterStill,
    animated: FighterAnimated,
    alt: "Pixel-art fighter character",
    note: "Source is private — happy to give a demo",
  },
  {
    key: "fire",
    title: "ML Fire Detection",
    description:
      "Teaching a model to spot forest fires, so people can spot them sooner.",
    stack: ["Python", "Machine learning", "Jupyter"],
    still: FireStill,
    animated: FireAnimated,
    alt: "Pixel-art fire",
    link: {
      href: "https://github.com/KareemTahaIsmail/ML-Fire-Detection",
      label: "View source",
    },
  },
];
