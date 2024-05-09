import Button from "@mui/material/Button";
import { DocumentScanner } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import VangRecommendationLetter from "../assets/docs/Vanguard_Recommendation_Letter.pdf";
import MyResume from "../assets/docs/RESUME_KareemIsmail.pdf";
import downloadUtils from "./utils/downloadUtils";
import "./styles/Experience.css";

const Experience = () => {
  return (
    <>
      <div className="exp">
        {/* <Work
          className="icon"
          sx={{ color: "#646cff;", fontSize: "50px", marginLeft: "20px" }}
        /> */}

        <div className="details">
          <div className="col">
            <h2>
              Application Engineer II @{" "}
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
              Software Tutor @{" "}
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
        <Tooltip title="Download my Resume/CV">
          <Button
            variant="contained"
            startIcon={<DocumentScanner />}
            onClick={() => downloadUtils.downloadPDF(MyResume)}
            sx={{ backgroundColor: "#646cff;", marginTop: "30px" }}
          >
            Resume/CV
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Experience;
