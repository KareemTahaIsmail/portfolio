import { useState } from "react";
import "./styles/AboutMe.css";
import Fade from "@mui/material/Fade";
import userInputUtils from "./utils/userInputUtils";
import { DemonTooltip } from "./CustomComponents";
const AboutMe = () => {
  userInputUtils.useMouseWheelNavigation(
    "/projects",
    "/experience"
  );
  userInputUtils.useTouchNavigation("/projects", "/experience");

  const SpeechBubbleImgSrc = "https://static.vecteezy.com/system/resources/previews/027/517/770/original/pixel-art-speech-bubble-png.png"

  const [demonTooltipMap, setDemonTooltipMap] = useState<Map<string, boolean>>(
    new Map([
      ['demon1', false],
      ['demon2', false],
      ['demon3', false]
    ]));


  const handleImageClick = (demonKey: string) => {
    // Create a new map object with the updated value for the specified demon key
    const updatedMap = new Map(demonTooltipMap);
    demonTooltipMap.forEach((value, key) => {
      updatedMap.set(key, key === demonKey);
    })

    setDemonTooltipMap(updatedMap);
  };

  return (
    <>
      <div className="aboutMe">
        <div className="main">
          <div className="header">
            <h1>
              With Some <span className="keyword">Determination</span>{" "}
              There's Joy in <span className="keyword">Creation</span>.
            </h1>
          </div>
          <div className="pixelArtDemo">

            <div className="speechBubble">
              <img src={SpeechBubbleImgSrc} className="speechBubbleImage" alt="" />
              <p>
                Outside of coding, my passion lies in {" "}
                <i style={{ color: "#646cff" }}>art.</i><br /> That being said.. {" "}
                <span className="demons">demons</span>
              </p>
            </div>


            <div className="gifs">
              <DemonTooltip
                arrow
                className="unselectable"
                open={demonTooltipMap.get('demon1')}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title="Yerc; the skinless demon, stood as an infernal enigma. Potentially a valuable ally if well-fed, but its insatiable gluttony makes it difficult to befriend."
              >
                <img
                  src="https://i.imgur.com/wLzDZrk.gif"
                  alt="Yerc"
                  draggable="false"
                  onClick={() => handleImageClick('demon1')}
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                open={demonTooltipMap.get('demon2')}
                className="unselectable"
                title="Shuf; the all-seeing demon, lives up to its name with an unhindered gaze. Impossible to catch off guard."
              >
                <img
                  src="https://i.imgur.com/nDUg9cr.gif"
                  alt="Shuf"
                  draggable="false"
                  onClick={() => handleImageClick('demon2')}
                />
              </DemonTooltip>
              <DemonTooltip
                arrow
                open={demonTooltipMap.get('demon3')}
                className="unselectable"
                title="Za; the two-headed music demon, hears every note, making music its true love. It possesses ears tuned to every octave, rendering no sound too faint or too piercing for its keen perception, though its taste remains a mystery."
              >
                <img
                  src="https://i.imgur.com/O2QfJ2B.gif"
                  alt="Za"
                  draggable="false"
                  onClick={() => handleImageClick('demon3')}
                />
              </DemonTooltip>
            </div>
          </div>
        </div>
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
