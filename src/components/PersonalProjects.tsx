import { useState } from "react";
import { InfoTooltip } from "./CustomComponents";
import "./styles/PersonalProjects.css";
const PersonalProjects = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const PlayerMovingSrc = "https://i.imgur.com/PpT6iLc.gif";
  const PlayerPausedSrc = "https://i.imgur.com/Ni5LIyS.gif";

  const EMovingSrc = "https://imgur.com/lKbJ0xS.gif";
  const EPausedSrc = "https://imgur.com/RSFC6TR.gif";

  const FireMovingSrc = "https://i.ibb.co/zRYsJdy/Fire-Moving.gif";
  const FirePausedSrc = "https://imgur.com/uIZRZOT.gif";

  return (
    <>
      <div className="projects unselectable">
        <div
          className="project"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="content">
            <img
              src={isHovered ? PlayerMovingSrc : PlayerPausedSrc}
              alt="Fighter.gif"
            ></img>
            <h2>2D Platformer Fighting Game</h2>
            <p className="description">
              "Amidst the world's hatred, envy, and propensity for violence, the
              notion of unity in the face of otherworldly demons seems hopeful.
              Yet, history warns us: man's trust in man is often misplaced."
            </p>
            <p className="techUsed">
              <b>Technologies used:</b> Godot, Aseprite
            </p>
            <div className="sourceCodeButton">
              <InfoTooltip
                arrow
                placement="top"
                title="Confidential for now...but I'd be delighted to offer a demo!"
              >
                <a href="#">
                  <button>Source code</button>
                </a>
              </InfoTooltip>
            </div>
          </div>
        </div>
        <div
          className="project"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="content">
            <img src={isHovered ? EMovingSrc : EPausedSrc} alt="E.gif"></img>
            <h2>Portfolio API with ExpressJS</h2>
            <p className="description">
              I felt it necessary to include the simple API responsible for
              supplying this site with most of the pictures and text you see!
            </p>
            <p className="techUsed">
              <b>Technologies used:</b> JavaScript, Node (ExpressJS), NoSQL
              (MongoDB)
            </p>
            <div className="sourceCodeButton">
              <a
                target="_blank"
                href="https://github.com/KareemTahaIsmail/portfolio-api"
              >
                <button>Source code</button>
              </a>
            </div>
          </div>
        </div>
        <div
          className="project"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="content">
            <img
              src={isHovered ? FireMovingSrc : FirePausedSrc}
              alt="E.gif"
            ></img>
            <h2>Fire Detection Algorithm</h2>
            <p className="description">
              Utilizing the 'Forest-fires.csv' dataset, I employ machine
              learning algorithms to assess the accuracy of fire detection.
            </p>
            <p className="techUsed">
              <b>Technologies used:</b> Python, Jupyter Notebook
            </p>
            <div className="sourceCodeButton">
              <a
                target="_blank"
                href="https://github.com/KareemTahaIsmail/ML-Fire-Detection"
              >
                <button>Source code</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProjects;
