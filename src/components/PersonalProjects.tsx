import { useState } from "react";
import { InfoTooltip } from "./CustomComponents";
import userInputUtils from "./utils/userInputUtils";

import PlayerMovingSrc from "../assets/images/art/PlayerFighting.gif";
import PlayerPausedSrc from "../assets/images/art/PlayerIdle.gif";

import EMovingSrc from "../assets/images/art/express.gif";
import EPausedSrc from "../assets/images/art/express.png";

import FireMovingSrc from "../assets/images/art/fire.gif";
import FirePausedSrc from "../assets/images/art/fire.png";

import "./styles/PersonalProjects.css";
const PersonalProjects = () => {
  userInputUtils.useKeyboardNavigation("/experience", ["ArrowUp", "w"]);
  userInputUtils.useKeyboardNavigation("/", ["ArrowDown", "s"]);
  userInputUtils.useTouchNavigation("/experience", "/");
  userInputUtils.useMouseWheelNavigation("/experience", "/");

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const hoverHandlers = (project: string) => ({
    onMouseEnter: () => setHoveredProject(project),
    onMouseLeave: () => setHoveredProject(null),
  });

  return (
    <>
      <div className="projects">
        <div className="header">
          <h1>Projects</h1>
        </div>
        <div className="details">
          <div className="project" {...hoverHandlers("api")}>
            <InfoTooltip
              arrow
              placement="bottom"
              title="Click for source code!"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/KareemTahaIsmail/portfolio-api"
              >
                <img
                  src={hoveredProject === "api" ? EMovingSrc : EPausedSrc}
                  alt="Pixel-art Express logo"
                />
                <h2>Portfolio API with ExpressJS</h2>
              </a>
            </InfoTooltip>
          </div>
          <div className="project" {...hoverHandlers("game")}>
            <InfoTooltip
              arrow
              placement="bottom"
              title="Source code is confidential for now, but would be happy to offer a demo!"
            >
              <a>
                <img
                  src={hoveredProject === "game" ? PlayerMovingSrc : PlayerPausedSrc}
                  alt="Pixel-art fighter character"
                />
                <h2>2D Platformer Fighting Game</h2>
              </a>
            </InfoTooltip>
          </div>
          <div className="project" {...hoverHandlers("fire")}>
            <InfoTooltip
              arrow
              placement="bottom"
              title="Click for source code!"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/KareemTahaIsmail/ML-Fire-Detection"
              >
                <img
                  src={hoveredProject === "fire" ? FireMovingSrc : FirePausedSrc}
                  alt="Pixel-art fire"
                />
                <h2>Machine Learning: Fire Detection</h2>
              </a>
            </InfoTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProjects;
