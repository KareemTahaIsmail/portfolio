import Fade from "@mui/material/Fade";
import { Email, GitHub, LinkedIn } from "@mui/icons-material";
import { useState } from "react";
import MyFace from "../assets/images/Me_Pixelated.png";
import Shuf from "../assets/images/art/Shuf.gif";
import Yerc from "../assets/images/art/Yerc.gif";
import Za from "../assets/images/art/Za.gif";
import MyResume from "../assets/docs/Kareem-Ismail-Resume.pdf";
import { profile } from "../content";
import { DemonTooltip } from "./CustomComponents";
import "./styles/Home.css";

interface Props {
  onEmailClick: () => void;
}

const DEMONS = [
  {
    key: "yerc",
    src: Yerc,
    alt: "Yerc, a skinless pixel-art demon",
    lore: "Yerc; the skinless demon, stood as an infernal enigma. Potentially a valuable ally if well-fed, but its insatiable gluttony makes it difficult to befriend.",
  },
  {
    key: "shuf",
    src: Shuf,
    alt: "Shuf, an all-seeing pixel-art demon",
    lore: "Shuf; the all-seeing demon, lives up to its name with an unhindered gaze. Impossible to catch off guard.",
  },
  {
    key: "za",
    src: Za,
    alt: "Za, a two-headed pixel-art demon",
    lore: "Za; the two-headed music demon, hears every note, making music its true love. It possesses ears tuned to every octave, rendering no sound too faint or too piercing for its keen perception, though its taste remains a mystery.",
  },
];

const Home = ({ onEmailClick }: Props) => {
  const [openDemon, setOpenDemon] = useState<string | null>(null);
  const [speechBubbleOpacity, setSpeechBubbleOpacity] = useState(1);

  return (
    <section id="home" className="page">
      <div className="home">
        <header className="hero">
          <img
            className="avatar"
            src={MyFace}
            alt="Pixel-art portrait of Kareem Ismail"
            draggable="false"
          />
          <h1>{profile.name}</h1>
          <p className="intro">{profile.intro}</p>
          <div className="actions">
            <a className="btn" href={MyResume} download="Kareem-Ismail-Resume.pdf">
              Download resume
            </a>
            <div className="socials">
              <button
                className="iconLink"
                type="button"
                onClick={onEmailClick}
                aria-label="Copy email address"
                title="Copy email"
              >
                <Email />
              </button>
              <a
                className="iconLink"
                target="_blank"
                rel="noopener noreferrer"
                href={profile.linkedIn}
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedIn />
              </a>
              <a
                className="iconLink"
                target="_blank"
                rel="noopener noreferrer"
                href={profile.gitHub}
                aria-label="GitHub"
                title="GitHub"
              >
                <GitHub />
              </a>
            </div>
          </div>
        </header>

        <div className="scene">
          <div className="speechBubble" style={{ opacity: speechBubbleOpacity }}>
            <p>
              "<span className="demons">Grakkkhhh!!!</span> <b>Hover</b> or{" "}
              <b>tap</b> on<span className="demonTextMulti"> one of us</span>
              <span className="demonTextOne"> me</span>,{" "}
              <i className="human">human</i>..."
            </p>
          </div>

          <div className="gifs" onClick={() => setSpeechBubbleOpacity(0)}>
            {DEMONS.map((demon) => (
              <DemonTooltip
                key={demon.key}
                arrow
                className="unselectable"
                open={openDemon === demon.key}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 300 }}
                title={demon.lore}
              >
                <span
                  className={`demon ${demon.key}`}
                  onClick={() => setOpenDemon(demon.key)}
                  onMouseOver={() => setOpenDemon(demon.key)}
                  onMouseLeave={() => setOpenDemon(null)}
                >
                  <img src={demon.src} alt={demon.alt} draggable="false" />
                </span>
              </DemonTooltip>
            ))}
          </div>
          <div className="floor" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Home;
