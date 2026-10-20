import myPic from "../assets/images/Me_Pixelated.png";
import Watermark from "../assets/images/Watermark.png";
import {
  LinkedIn,
  GitHub,
  Email,
  SimCardDownloadRounded,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import MyResume from "../assets/docs/Kareem-Ismail-Resume.pdf";
import { InfoTooltip } from "./CustomComponents";
import "./styles/SideBar.css";

interface Props {
  version: string;
  onEmailClick: () => void;
}

const SideBar = ({ version, onEmailClick }: Props) => {
  const LinkedInURL = "https://www.linkedin.com/in/kareem-ismail-742947197/";
  const GitHubURL = "https://github.com/Kareemtahaismail";
  const myToolTipText =
    "I'm Kareem Ismail, and I thrive on creation! Delving into the world of technology, I craft websites, games, algorithms, and a myriad of applications. In addition, I find joy in crafting pixel art, composing music, and hitting the gym!";
  return (
    <>
      <div className="sideBar">
        <InfoTooltip arrow placement="left" title={myToolTipText}>
          <img src={myPic} className="logo" alt="Pixel-art portrait of Kareem Ismail" draggable="false" />
        </InfoTooltip>
        <div className="socials">
          <a target="_blank" rel="noopener noreferrer" href={LinkedInURL} aria-label="LinkedIn">
            <LinkedIn fontSize="large" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href={GitHubURL} aria-label="GitHub">
            <GitHub fontSize="large" />
          </a>
          <a
            role="button"
            tabIndex={0}
            aria-label="Copy email address"
            onClick={onEmailClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onEmailClick();
              }
            }}
          >
            <Email fontSize="large" />
          </a>
          <Tooltip title="Download my Resume/CV">
            <a
              href={MyResume}
              download="Kareem-Ismail-Resume.pdf"
              aria-label="Download resume"
            >
              <SimCardDownloadRounded fontSize="large" />
            </a>
          </Tooltip>
        </div>
        <div className="footer">
          <img draggable="false" src={Watermark} alt="" />
          <p>v{version}</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
