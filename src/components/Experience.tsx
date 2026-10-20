import { experience } from "../content";
import "./styles/Experience.css";

/** A role still held is shown as current ("Now") on the timeline. */
const isCurrent = (dates: string) => dates.endsWith("Present");

const Experience = () => {
  return (
    <section id="experience" className="page">
      <div className="section">
        <h2 className="sectionTitle">Experience</h2>
        <ol className="timeline">
          {experience.map((job) => {
            const current = isCurrent(job.dates);
            return (
              <li className={current ? "job current" : "job"} key={job.company}>
                <div className="when">
                  <span className="node" aria-hidden="true" />
                  <img className="companyLogo" src={job.logo} alt={`${job.company} logo`} loading="lazy" />
                  <span className="dates">{job.dates}</span>
                  {current && <span className="now">Now</span>}
                </div>
                <article className="what">
                  <h3>
                    {job.role}{" "}
                    <a target="_blank" rel="noopener noreferrer" href={job.url}>
                      <span className="at">@</span> {job.company}
                    </a>
                  </h3>
                  <p className="tagline">{job.tagline}</p>
                  <ul className="highlights">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <ul className="chips" aria-label="Tech stack">
                    {job.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
