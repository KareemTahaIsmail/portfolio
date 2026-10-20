import { useState } from "react";
import { projects } from "../content";
import FighterDemo from "./FighterDemo";
import "./styles/PersonalProjects.css";

const PersonalProjects = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section id="projects" className="page">
      <div className="section">
        <h2 className="sectionTitle">Projects</h2>
        <div className="cardGrid">
          {projects.map((project) => {
            const isActive = activeProject === project.key;
            return (
              <article
                className="card project"
                key={project.key}
                onMouseEnter={() => setActiveProject(project.key)}
                onMouseLeave={() => setActiveProject(null)}
                onFocus={() => setActiveProject(project.key)}
                onBlur={() => setActiveProject(null)}
              >
                {project.fighter ? (
                  <FighterDemo active={isActive} />
                ) : (
                  <img
                    className="art"
                    src={isActive ? project.animated : project.still}
                    alt={project.alt}
                    draggable="false"
                    loading="lazy"
                  />
                )}
                <h3>{project.title}</h3>
                <p className="description">{project.description}</p>
                <ul className="chips" aria-label="Tech stack">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {project.link ? (
                  <a
                    className="projectLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.link.href}
                  >
                    {project.link.label} ↗
                  </a>
                ) : (
                  <p className="projectNote">{project.note}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjects;
