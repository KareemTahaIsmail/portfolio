import myPic from "../assets/images/me.svg";
import { LinkedIn, GitHub, Email } from "@mui/icons-material";
import CopyrightIcon from "@mui/icons-material/Copyright";
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
        <img src={myPic} className="logo" alt="KaisTheOx" draggable="false" />
        <a target="_blank" href={LinkedInURL}>
          <LinkedIn fontSize="large" />
        </a>
        <a target="_blank" href={GitHubURL}>
          <GitHub fontSize="large" />
        </a>
        <a onClick={onEmailClick}>
          <Email fontSize="large" />
        </a>
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
