import "./styles/AboutMe.css";
import Fade from "@mui/material/Fade";
import userInputUtils from "./utils/userInputUtils";
import { DemonTooltip } from "./CustomComponents";
const AboutMe = () => {
  userInputUtils.useMouseWheelNavigation(
    "/portfolio/",
    "/portfolio/experience"
  );
  userInputUtils.useTouchNavigation("/portfolio/", "/portfolio/experience");

  return (
    <>
      <div className="aboutMe">
        <div className="main">
          <div className="header">
            <h1>
              With some <span style={{ color: "#646cff" }}>determination</span>{" "}
              there's joy in <span style={{ color: "#646cff" }}>creation</span>.
            </h1>
          </div>
          <div className="pixelArtDemo">
            <p>
              Hover over any of these{" "}
              <span className="demons">demons</span> to learn more!
            </p>
            <div className="gifs">
              <DemonTooltip
                arrow
                className="unselectable"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Yerc; the skinless demon, stood as an infernal enigma. Potentially a valuable ally if well-fed, but its insatiable gluttony makes it difficult to befriend."
              >
                <img
                  src="https://i.imgur.com/wLzDZrk.gif"
                  alt="Yerc"
                  draggable="false"
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                className="unselectable"
                title="Shuf; the all-seeing demon, lives up to its name with an unhindered gaze. Impossible to catch off guard."
              >
                <img
                  src="https://i.imgur.com/nDUg9cr.gif"
                  alt="Shuf"
                  draggable="false"
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                className="unselectable"
                title="Za; the two-headed music demon, hears every note, making music its true love. It possesses ears tuned to every octave, rendering no sound too faint or too piercing for its keen perception, though its taste remains a mystery."
              >
                <img
                  src="https://i.imgur.com/O2QfJ2B.gif"
                  alt="Za"
                  draggable="false"
                />
              </DemonTooltip>
            </div>
          </div>
        </div>
        <hr />
        <div className="tags">
          <p>
            Full-Stack <span className="circle" /> Machine Learning{" "}
            <span className="circle" /> Game Dev <span className="circle" />{" "}
            Pixel Art
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
