import { useState } from "react";
import { InfoTooltip } from "./CustomComponents";
import userInputUtils from "./utils/userInputUtils";

import PlayerMovingSrc from "../assets/images/art/PlayerFighting.gif";
import PlayerPausedSrc from "../assets/images/art/PlayerIdle.gif";

import EMovingSrc from "../assets/images/art/express.gif";
import EPausedSrc from "../assets/images/art/express.png";

import FireMovingSrc from "../assets/images/art/fire.gif";
import FirePausedSrc from "../assets/images/art/fire.gif";

import "./styles/PersonalProjects.css";
const PersonalProjects = () => {
  userInputUtils.useKeyboardNavigation("/experience/", ["ArrowUp", "w"]);
  userInputUtils.useKeyboardNavigation("/", ["ArrowDown", "s"]);
  userInputUtils.useTouchNavigation("/experience", "/");

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="projects unselectable">
        <div className="header">
          <h1>Projects</h1>
        </div>
        <div className="details">
          <div
            className="project"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <InfoTooltip
              arrow
              placement="bottom"
              title="Click for source code!"
            >
              <a
                target="_blank"
                href="https://github.com/KareemTahaIsmail/portfolio-api"
              >
                <img
                  src={isHovered ? EMovingSrc : EPausedSrc}
                  alt="E.gif"
                ></img>
                <h2>Portfolio API with ExpressJS</h2>
                {/* <p className="description">
            Felt like the simple API that's resposible for supplying this site
            with all the pictures and texts you see should be included!
          </p> */}
                <p className="techUsed">
                  <b>Technologies used:</b> JavaScript, Node (ExpressJS), NoSQL
                  (MongoDB)
                </p>
              </a>
            </InfoTooltip>
          </div>
          <div
            className="project"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <InfoTooltip
              arrow
              placement="bottom"
              title="Source code is confidential for now, but would be happy to offer a demo!"
            >
              <a href="#">
                <img
                  src={isHovered ? PlayerMovingSrc : PlayerPausedSrc}
                  alt="Fighter.gif"
                ></img>
                <h2>2D Platformer Fighting Game</h2>
                {/* <p className="description">
            "In a universe brimming with sci-fi tales, one might assume humanity
            would stand by your side when otherwordly demons reign... Think
            again!"
          </p> */}
                <p className="techUsed">
                  <b>Technologies used:</b> Godot, Aseprite
                </p>
              </a>
            </InfoTooltip>
          </div>
          <div
            className="project"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <InfoTooltip
              arrow
              placement="bottom"
              title="Click for source code!"
            >
              <a
                target="_blank"
                href="https://github.com/KareemTahaIsmail/ML-Fire-Detection"
              >
                <img
                  src={isHovered ? FireMovingSrc : FirePausedSrc}
                  alt="E.gif"
                ></img>
                <h2>Machine Learning: Fire Detection</h2>
                {/* <p className="description">
            Utilizing the 'Forest-fires.csv' dataset, I employ machine learning
            algorithms to assess the accuracy of fire detection.
          </p> */}
                <p className="techUsed">
                  <b>Technologies used:</b> Python, JupyterNotebook
                </p>
              </a>
            </InfoTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProjects;
