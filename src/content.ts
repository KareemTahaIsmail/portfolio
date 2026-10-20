// All of the site's words live here, so updating the portfolio means editing
// copy, not components. Keep it in sync with the resume in assets/docs.

import RVLogo from "./assets/images/logos/rv.png";
import VanguardLogo from "./assets/images/logos/vanguard.png";
import VarsityLogo from "./assets/images/logos/varsity_tutors.png";


export const profile = {
  name: "Kareem Ismail",
  // One line under the name
  intro:
    "Full-Stack Engineer by trade, game developer by habit, musician whenever no one's watching.",
  email: "KareemTahaIsmail@gmail.com",
  linkedIn: "https://www.linkedin.com/in/kareem-ismail-742947197/",
  gitHub: "https://github.com/Kareemtahaismail",
};

// One line under each section's title
export const sectionIntros = {
  experience: "Where I've been building software for a living.",
  projects: "Here's some stuff I built. Go ahead, try it out.",
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
  /** The live piece shown full width above the text */
  interactive: "fighter" | "ember";
  /** The "How it's built" toggle under the caption: three short lines */
  howItsBuilt: { stack: string; hardPart: string; tradeOff: string };
}

export const projects: Project[] = [
  {
    key: "runner",
    title: "Mind The Gap",
    description:
      "A tiny endless runner starring the hero of the platform fighter I'm building. Jump the blocks, roll under the beams.",
    stack: ["TypeScript", "Canvas", "Pixel art"],
    interactive: "fighter",
    howItsBuilt: {
      stack: "React, TypeScript and one canvas. No game engine; the sprites come straight from my Aseprite files.",
      hardPart:
        "Fair hitboxes. They follow his body rather than the sprite frame, shrink when he rolls and rise with the jump. A bot played it for 25 seconds to prove every obstacle can be cleared.",
      tradeOff:
        "The game loop runs outside React state, so 60 frames a second never cause a re-render. React only hears about pause and game over.",
    },
  },
  {
    key: "ember",
    title: "Ember",
    description:
      "A pixel fire that dances to music: the bass stokes the flames, the highs throw sparks. The track's mine too.",
    stack: ["TypeScript", "Canvas", "Web Audio API"],
    interactive: "ember",
    howItsBuilt: {
      stack: "Canvas and the Web Audio API, no libraries. The fire is the classic Doom fire algorithm on a grid sized to the panel.",
      hardPart:
        "My track's bass barely lets up, so following volume pinned the fire at max. It follows punch instead: how far each hit jumps above the recent average.",
      tradeOff:
        "It draws a small grid scaled up, at 30 frames a second. Cheap enough for phones, and the chunky pixels are the look anyway.",
    },
  },
];
