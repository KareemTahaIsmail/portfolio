import { projects, sectionIntros } from "../content";
import FighterRun from "./FighterRun";
import Ember from "./Ember";
import "./styles/PersonalProjects.css";

/** Each project is a full-width, live piece you can play with right here, with a short caption. */
const PersonalProjects = () => {
  return (
    <section id="projects" className="page">
      <div className="section">
        <h2 className="sectionTitle">Projects</h2>
        <p className="sectionIntro">{sectionIntros.projects}</p>
        <div className="showcases">
          {projects.map((project) => (
            <article className="showcase" key={project.key}>
              <div className="stage">
                {project.interactive === "fighter" ? <FighterRun /> : <Ember />}
              </div>
              <div className="caption">
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
                <ul className="chips" aria-label="Tech stack">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <details className="howBuilt">
                  <summary>How it's built</summary>
                  <dl>
                    <dt>Stack</dt>
                    <dd>{project.howItsBuilt.stack}</dd>
                    <dt>Hard part</dt>
                    <dd>{project.howItsBuilt.hardPart}</dd>
                    <dt>Trade-off</dt>
                    <dd>{project.howItsBuilt.tradeOff}</dd>
                  </dl>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
