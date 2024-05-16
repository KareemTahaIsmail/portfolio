import VangRecommendationLetter from "../assets/docs/Vanguard_Recommendation_Letter.pdf";
import downloadUtils from "./utils/downloadUtils";
import userInputUtils from "./utils/userInputUtils";
import "./styles/Experience.css";

const Experience = () => {
  userInputUtils.useKeyboardNavigation("/", ["ArrowUp", "w"]);
  userInputUtils.useKeyboardNavigation("/projects/", ["ArrowDown", "s"]);
  userInputUtils.useTouchNavigation("/", "/projects");

  return (
    <>
      <div className="exp">
        <div className="header">
          <h1>Experience</h1>
        </div>
        <div className="details">
          <div className="col">
            <h2>
              Application Engineer II <br />
              <a target="_blank" href="https://vanguard.com/">
                Vanguard
              </a>
            </h2>
            <p>
              Predominantly focused on <span className="highlight">Python</span>{" "}
              and <span className="highlight">Java</span>, employing the{" "}
              <span className="highlight">Spring</span> and{" "}
              <span className="highlight">Flask</span> frameworks for backend
              development, <span className="highlight">PostgreSQL</span> for DB
              operations, <span className="highlight">Angular</span> for
              frontend tasks, and extensively engaged with{" "}
              <span className="highlight">AWS</span> technologies.
              <br />-<br />
              Download this{" "}
              <a
                href="#"
                onClick={() =>
                  downloadUtils.downloadPDF(VangRecommendationLetter)
                }
              >
                recommendation letter
              </a>{" "}
              if you're interested.
            </p>
          </div>
          <div className="col">
            <h2>
              Software Tutor <br />
              <a target="_blank" href="https://www.varsitytutors.com/">
                Varsity Tutors
              </a>
            </h2>
            <p>
              Delivered instruction in <span className="highlight">Java</span>,{" "}
              <span className="highlight">Python</span>,{" "}
              <span className="highlight">TypeScript/JavaScript</span>,{" "}
              <span className="highlight">React</span>,{" "}
              <span className="highlight">Game Development</span> frameworks,
              and more to diverse clients across various age groups and
              backgrounds. This role sharpened my problem-solving abilities and
              compelled me to continually learn new technologies to ensure
              clients remained up-to-date.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
