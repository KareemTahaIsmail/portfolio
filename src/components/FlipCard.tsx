import { useState } from "react";
import Experience from "./Experience";
import PersonalProjects from "./PersonalProjects";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import userInputUtils from "./utils/userInputUtils";
import "./styles/FlipCard.css";

const FlipCard = () => {
  userInputUtils.useMouseWheelNavigation("/portfolio/");
  const [showExperience, setShowExperience] = useState(true); // State to track which content to show

  // Function to handle card flip
  const handleCardFlip = () => {
    setShowExperience(!showExperience);
  };

  return (
    <>
      <div className="card">
        <div className="radioGroup">
          <FormControl>
            <RadioGroup
              row
              name="moreAboutMe"
              defaultValue="experience"
              onChange={handleCardFlip} // Call handleRadioChange on radio button change
            >
              <FormControlLabel
                value="experience"
                control={<Radio sx={{ color: "#646cff" }} />}
                label="Professional Experience"
                labelPlacement="end"
                className="unselectable"
              />
              <FormControlLabel
                value="projects"
                control={<Radio sx={{ color: "#646cff" }} />}
                label="Personal Projects"
                labelPlacement="end"
                className="unselectable"
              />
            </RadioGroup>
          </FormControl>
        </div>
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
      </div>
    </>
  );
};

export default FlipCard;
