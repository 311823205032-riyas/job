import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  const addLink = `/add-application?job=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`;

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-avatar" aria-hidden="true">{job.company.slice(0, 1)}</div>
        <span className="job-type">{job.type}</span>
      </div>
      <p className="eyebrow">{job.category}</p>
      <h2>{job.title}</h2>
      <p className="company-name">{job.company}</p>
      <p className="job-location"><span aria-hidden="true">⌖</span> {job.location}</p>
      <div className="job-card-actions">
        <a className="text-link" href={job.applyUrl} target="_blank" rel="noreferrer">Company careers <span aria-hidden="true">↗</span></a>
        <Link className="button button-small" to={addLink}>Track Application</Link>
      </div>
    </article>
  );
}