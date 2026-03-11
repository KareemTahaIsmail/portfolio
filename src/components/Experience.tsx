import RVLogo from "../assets/images/logos/rv.png";
import VanguardLogo from "../assets/images/logos/vanguard.png";
import VarsityLogo from "../assets/images/logos/varsity_tutors.png";
import "./styles/Experience.css";
import userInputUtils from "./utils/userInputUtils";

const Experience = () => {
  userInputUtils.useKeyboardNavigation("/", ["ArrowUp", "w"]);
  userInputUtils.useKeyboardNavigation("/projects/", ["ArrowDown", "s"]);
  userInputUtils.useTouchNavigation("/", "/projects");
  userInputUtils.useMouseWheelNavigation("/", "/projects/");

  return (
    <>
      <div className="exp">
        <div className="header">
          <h1>Experience</h1>
        </div>
        <div className="details">
          <div className="col">
            <img className="logo" src={VanguardLogo} alt="Vanguard Logo" />
            <h2>
              Application Engineer II <br />
              <a target="_blank" href="https://vanguard.com/">
                Vanguard
              </a>
            </h2>
          </div>
          <div className="col">
            <img className="logo" src={RVLogo} alt="Red Ventures Logo" />
            <h2>
              Full-Stack Engineer <br />
              <a target="_blank" href="https://www.redventures.com/">
                Red Ventures
              </a>
            </h2>
          </div>
          <div className="col">
            <img className="logo" src={VarsityLogo} alt="Varsity Tutors Logo" />
            <h2>
              Software Tutor <br />
              <a target="_blank" href="https://www.varsitytutors.com/">
                Varsity Tutors
              </a>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
