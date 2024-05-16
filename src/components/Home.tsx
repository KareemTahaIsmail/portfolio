import { useState } from "react";
import "./styles/Home.css";
import Fade from "@mui/material/Fade";
import userInputUtils from "./utils/userInputUtils";
import NavImg from "../assets/images/Nav.png";
import { DemonTooltip } from "./CustomComponents";
const Home = () => {
  userInputUtils.useKeyboardNavigation("/projects/", ["ArrowUp", "w"]);
  userInputUtils.useKeyboardNavigation("/experience/", ["ArrowDown", "s"]);
  userInputUtils.useTouchNavigation("/projects/", "/experience/");

  const [demonTooltipMap, setDemonTooltipMap] = useState<Map<string, boolean>>(
    new Map([
      ["demon1", false],
      ["demon2", false],
      ["demon3", false],
    ])
  );

  const [speechBubbleOpacity, setSpeechBubbleOpacity] = useState(1);

  const handleImageClick = (demonKey: string, show: boolean) => {
    const updatedMap = new Map(demonTooltipMap);
    demonTooltipMap.forEach((value, key) => {
      console.log(value);
      updatedMap.set(key, key === demonKey ? show : false);
    });

    setDemonTooltipMap(updatedMap);
  };

  const demonText = (
    <p>
      "<span className="demons">Grakkkhhh!!!</span> <b>Hover</b> or <b>tap</b>{" "}
      upon<span className="demonTextMulti"> one of us</span>
      <span className="demonTextOne"> me</span>,{" "}
      <i style={{ color: "#646cff" }}>human</i>..."
    </p>
  );

  return (
    <>
      <div className="home">
        <div className="main">
          <div className="pixelArtDemo">
            <div
              className="speechBubble"
              style={{ opacity: speechBubbleOpacity }}
            >
              {demonText}
            </div>

            <div className="gifs" onClick={() => setSpeechBubbleOpacity(0)}>
              <DemonTooltip
                arrow
                className="unselectable"
                open={demonTooltipMap.get("demon1")}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Yerc; the skinless demon, stood as an infernal enigma. Potentially a valuable ally if well-fed, but its insatiable gluttony makes it difficult to befriend."
              >
                <img
                  src="https://i.imgur.com/wLzDZrk.gif"
                  alt="Yerc"
                  draggable="false"
                  className="yerc"
                  onClick={() => handleImageClick("demon1", true)}
                  onMouseOver={() => handleImageClick("demon1", true)}
                  onMouseLeave={() => handleImageClick("demon1", false)}
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                open={demonTooltipMap.get("demon2")}
                className="unselectable"
                title="Shuf; the all-seeing demon, lives up to its name with an unhindered gaze. Impossible to catch off guard."
              >
                <img
                  src="https://i.imgur.com/nDUg9cr.gif"
                  alt="Shuf"
                  draggable="false"
                  className="shuf"
                  onClick={() => handleImageClick("demon2", true)}
                  onMouseOver={() => handleImageClick("demon2", true)}
                  onMouseLeave={() => handleImageClick("demon2", false)}
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                open={demonTooltipMap.get("demon3")}
                className="unselectable"
                title="Za; the two-headed music demon, hears every note, making music its true love. It possesses ears tuned to every octave, rendering no sound too faint or too piercing for its keen perception, though its taste remains a mystery."
              >
                <img
                  src="https://i.imgur.com/O2QfJ2B.gif"
                  alt="Za"
                  draggable="false"
                  className="za"
                  onClick={() => handleImageClick("demon3", true)}
                  onMouseOver={() => handleImageClick("demon3", true)}
                  onMouseLeave={() => handleImageClick("demon3", false)}
                />
              </DemonTooltip>
            </div>
          </div>
        </div>
        <img
          src={NavImg}
          draggable="false"
          className="navImage"
          alt="navImage.png"
        />
      </div>
    </>
  );
};

export default Home;
