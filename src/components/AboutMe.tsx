import Shuf from "../assets/images/Shuf.gif";
import Za from "../assets/images/Za.gif";
import Yerc from "../assets/images/Yerc.gif";
import "./styles/AboutMe.css";
import Fade from "@mui/material/Fade";
import userInputUtils from "./utils/userInputUtils";
import { DemonTooltip } from "./CustomComponents";
const AboutMe = () => {
  userInputUtils.useMouseWheelNavigation("/portfolio/flipcard");

  return (
    <>
      <div className="aboutMe">
        <div className="main">
          <div className="header">
            <h1>
              I like to dabble in{" "}
              <span style={{ color: "#646cff" }}>anything</span> and{" "}
              <span style={{ color: "#646cff" }}>everything</span>.
            </h1>
          </div>
          <div className="pixelArtDemo">
            <p>
              Hover over any of these <span className="demons">demons</span> to
              know more!
            </p>
            <div className="gifs">
              <DemonTooltip
                arrow
                className="unselectable"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Yerc; the skinless demon, stood as an infernal enigma. Potentially a valuable ally if well-fed, but its insatiable gluttony makes it difficult to befriend."
              >
                <img src={Yerc} alt="Yerc" draggable="false" />
              </DemonTooltip>
              <DemonTooltip
                arrow
                className="unselectable"
                title="Shuf; the all-seeing demon, lives up to its name with an unhindered gaze. Impossible to catch off guard."
              >
                <img src={Shuf} alt="Shuf" draggable="false" />
              </DemonTooltip>
              <DemonTooltip
                arrow
                className="unselectable"
                title="Za; the two-headed music demon, hears every note, making music its true love. It possesses ears tuned to every octave, rendering no sound too faint or too piercing for its keen perception, though its taste remains a mystery."
              >
                <img src={Za} alt="Za" draggable="false" />
              </DemonTooltip>
            </div>
          </div>
        </div>
        <hr />
        <div className="tags">
          <p>
            Full-Stack <span className="circle" /> Game Dev{" "}
            <span className="circle" /> Machine Learning
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutMe;