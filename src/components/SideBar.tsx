import myPic from "../assets/images/Me_Pixelated.png";
import Watermark from "../assets/images/Watermark.png";
import {
  LinkedIn,
  GitHub,
  Email,
  SimCardDownloadRounded,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import MyResume from "../assets/docs/RESUME_KareemIsmail.pdf";
import downloadUtils from "./utils/downloadUtils";
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
          <img src={myPic} className="logo" alt="KaisTheOx" draggable="false" />
        </InfoTooltip>
        <div className="socials">
          <a target="_blank" href={LinkedInURL}>
            <LinkedIn fontSize="large" />
          </a>
          <a target="_blank" href={GitHubURL}>
            <GitHub fontSize="large" />
          </a>
          <a onClick={onEmailClick}>
            <Email fontSize="large" />
          </a>
          <Tooltip title="Download my Resume/CV">
            <a onClick={() => downloadUtils.downloadPDF(MyResume)}>
              <SimCardDownloadRounded fontSize="large" />
            </a>
          </Tooltip>
        </div>
        <div className="footer">
          <img draggable="false" src={Watermark} alt="Watermark.png" />
          <p>v{version}</p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
