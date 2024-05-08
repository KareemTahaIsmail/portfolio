import { useState } from "react";
import PlayerPaused from "../assets/images/Player_Paused.gif";
import PlayerMoving from "../assets/images/Player.gif";
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

  return (
    <>
      <div className="projects unselectable">
        <div
          className="project"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={isHovered ? PlayerMoving : PlayerPaused}
            alt="Fighter.gif"
          ></img>
          <h2>2D Platformer Fighting Game</h2>
          <p className="description">
            "In a universe brimming with sci-fi tales, one might assume humanity
            would stand by your side when otherwordly demons reign... Think
            again!"
          </p>
          <p className="techUsed">
            <b>Technologies used:</b> Godot, Aseprite
          </p>
          <InfoTooltip arrow title="Confidential for the time being!">
            <a href="#"><button>Source code</button></a>
          </InfoTooltip>
        </div>
      </div>
    </>
  );
};

export default PersonalProjects;
