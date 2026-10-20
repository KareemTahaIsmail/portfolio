import { Job, experience, sectionIntros } from "../content";
import "./styles/Experience.css";

/** A role still held is shown as current ("Now") on the timeline. */
const isCurrent = (dates: string) => dates.endsWith("Present");

/**
 * The job's title, or (after a promotion) every title held there, newest first. Earlier titles get a small
 * square on the main timeline, so the promotion reads as a step along the same line.
 */
const Roles = ({ role, roles, company }: Job) => {
  if (!roles) return <h3>{role}</h3>;
  return (
    <ol className="roles" aria-label={`Roles at ${company}, newest first`}>
      {roles.map((r, i) => (
        <li className={i === 0 ? "role latest" : "role earlier"} key={r.title}>
          {i === 0 ? <h3>{r.title}</h3> : <span className="roleTitle">{r.title}</span>}
          {r.dates && <span className="roleDates">{r.dates}</span>}
        </li>
      ))}
    </ol>
  );
};

/** Each job is one row: logo, company and dates; the timeline; the role(s); then what the job was about. */
const Experience = () => {
  return (
    <section id="experience" className="page">
      <div className="section">
        <h2 className="sectionTitle">Experience</h2>
        <p className="sectionIntro">{sectionIntros.experience}</p>
        <ol className="timeline">
          {experience.map((job) => {
            const current = isCurrent(job.dates);
            return (
              <li className={current ? "job current" : "job"} key={job.company}>
                <div className="when">
                  <span className="node" aria-hidden="true" />
                  <img className="companyLogo" src={job.logo} alt={`${job.company} logo`} loading="lazy" />
                  <a className="company" target="_blank" rel="noopener noreferrer" href={job.url}>
                    {job.company}
                  </a>
                  <span className="dates">{job.dates}</span>
                  {current && <span className="now">Now</span>}
                </div>
                <div className="head">
                  <Roles {...job} />
                </div>
                <div className="body">
                  <p className="tagline">{job.tagline}</p>
                  <ul className="chips" aria-label="Tech stack">
                    {job.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
