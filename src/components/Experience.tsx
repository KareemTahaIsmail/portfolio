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
              <ul>
                <li>
                  Predominantly utilized{" "}
                  <span className="highlight">Python</span>,{" "}
                  <span className="highlight">Java</span>, &{" "}
                  <span className="highlight">TypeScript</span>.
                </li>
                <li>
                  Employed the <span className="highlight">Spring</span> &{" "}
                  <span className="highlight">Flask</span> for the backend &{" "}
                  <span className="highlight">Angular</span> for the frontend
                  tasks.
                </li>
                <li>
                  Used <span className="highlight">PostgreSQL</span> for DB
                  operations.
                </li>
                <li>
                  Extensively engaged with{" "}
                  <span className="highlight">AWS</span> technologies.
                </li>
              </ul>
              Download this{" "}
              <a
                href="#"
                onClick={() =>
                  downloadUtils.downloadPDF(VangRecommendationLetter)
                }
              >
                recommendation letter
              </a>
              !
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
              <ul>
                <li>
                  Taught lessons in <span className="highlight">Java</span>,{" "}
                  <span className="highlight">Python</span>,{" "}
                  <span className="highlight">TypeScript/JavaScript</span>,{" "}
                  <span className="highlight">React</span>, &{" "}
                  <span className="highlight">Game Development</span>.
                </li>
                <li>
                  Was responsible for diverse clients across various age groups
                  & backgrounds.
                </li>
                <li>
                  Continually & quickly learned new technologies to ensure
                  clients remained up-to-date.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
