// All of the site's words live here, so updating the portfolio means editing
// copy, not components. Keep it in sync with the resume in assets/docs.

import RVLogo from "./assets/images/logos/rv.png";
import VanguardLogo from "./assets/images/logos/vanguard.png";
import VarsityLogo from "./assets/images/logos/varsity_tutors.png";

import ExpressStill from "./assets/images/art/express.png";
import ExpressAnimated from "./assets/images/art/express.gif";
import FireStill from "./assets/images/art/fire.png";
import FireAnimated from "./assets/images/art/fire.gif";

export const profile = {
  name: "Kareem Ismail",
  // One line under the name
  intro:
    "I build software for a living, draw pixels for fun, and turn both into games when no one's watching.",
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
    stack: ["TypeScript", "Vue", "Nuxt", "Stencil.js", "NestJS"],
  },
  {
    role: "Application Engineer II",
    company: "Vanguard",
    url: "https://vanguard.com/",
    logo: VanguardLogo,
    dates: "2021 — 2024",
    tagline: "Three years keeping fund data honest at one of the world's largest investment firms.",
    stack: ["Java", "Spring Boot", "AWS Lambda", "REST"],
  },
  {
    role: "Software Tutor",
    company: "Varsity Tutors",
    url: "https://www.varsitytutors.com/",
    logo: VarsityLogo,
    dates: "2021 — 2022",
    tagline: "Teaching code is just debugging with a human in the loop.",
    stack: ["Java", "Python", "TypeScript", "C#"],
  },
];

export interface Project {
  key: string;
  title: string;
  description: string;
  stack: string[];
  // Art for the card: a still that animates on hover, or the playable fighter
  still?: string;
  animated?: string;
  fighter?: boolean;
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
    fighter: true,
    alt: "Pixel-art fighter character",
    note: "Private source · demo on request",
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
