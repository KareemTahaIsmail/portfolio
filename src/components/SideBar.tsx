import myPic from "../assets/images/Me_Pixelated.png";
import {
  LinkedIn,
  GitHub,
  Email,
  SimCardDownloadRounded,
} from "@mui/icons-material";
import CopyrightIcon from "@mui/icons-material/Copyright";
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
  return (
    <>
      <div className="sideBar">
        <InfoTooltip
          arrow
          placement="left"
          title="This is supposed to be me!"
        >
          <img src={myPic} className="logo" alt="KaisTheOx" draggable="false" />
        </InfoTooltip>
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
        <div className="footer">
          <p className="copyright">
            Crafted using <i style={{ color: "#646cff" }}>React</i> by
            <br />
            <span className="myName">Kareem Ismail </span>
            <CopyrightIcon fontSize="small" style={{ fontSize: "10px" }} />
            <br />
            <br />
            <span style={{ fontSize: "12px" }}>V{version}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideBar;
