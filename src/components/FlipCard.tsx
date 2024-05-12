import { useState, useEffect } from "react";
import Experience from "./Experience";
import PersonalProjects from "./PersonalProjects";
import Button from "@mui/material/Button";
import FlipIcon from "@mui/icons-material/Flip";
import userInputUtils from "./utils/userInputUtils";
import { InfoTooltip } from "./CustomComponents";
import "./styles/FlipCard.css";

const FlipCard = () => {
  userInputUtils.useMouseWheelNavigation("", "");
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setShowExperience(showExperience);
      } else if (event.key === "ArrowRight") {
        setShowExperience(!showExperience);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const [showExperience, setShowExperience] = useState(true); // State to track which content to show

  // Function to handle card flip
  const handleCardFlip = () => {
    setShowExperience(!showExperience);
  };

  return (
    <>
      <div className="card">
        <div className={`main ${showExperience ? "showFront" : "showBack"}`}>
          <div
            className="content front"
            style={{ display: showExperience ? "block" : "none" }}
          >
            <Experience />
          </div>
          <div
            className="content back"
            style={{ display: showExperience ? "none" : "block" }}
          >
            <PersonalProjects />
          </div>
        </div>
        <div className="flipControl">
          <InfoTooltip
            arrow
            placement="right"
            title="You can also use the right and left arrow keys to flip!"
          >
            <Button
              variant="contained"
              onClick={handleCardFlip}
              startIcon={<FlipIcon />}
              sx={{ backgroundColor: "#646cff", color: "white" }}
            >
              Flip
            </Button>
          </InfoTooltip>
        </div>
      </div>
    </>
  );
};

export default FlipCard;
