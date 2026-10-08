import { Link } from 'react-router-dom';

export default function Home({ jobCount, applicationCount }) {
  return (
    <div className="container home-page fade-in">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> YOUR NEXT STEP STARTS HERE</p>
          <h1>Student Job<br /><span>Tracker</span></h1>
          <p className="hero-description">Find internships, explore opportunities, and track your applications.</p>
          <div className="hero-actions">
            <Link className="button" to="/jobs">Explore Jobs <span aria-hidden="true">→</span></Link>
            <Link className="button button-outline" to="/applications">Track Applications</Link>
          </div>
        </div>
        <div className="hero-side" aria-hidden="true">
          <div className="hero-note">
            <span className="hero-note-icon">✓</span>
            <div><strong>Your career, organized.</strong><span>One opportunity at a time.</span></div>
          </div>
          <div className="hero-lines"><span /><span /><span /><span /></div>
          <div className="hero-side-label">MAKE YOUR<br />NEXT MOVE</div>
        </div>
      </section>

      <section className="summary-section" aria-label="Opportunity summary">
        <div className="section-heading">
          <div><p className="eyebrow">YOUR DASHBOARD</p><h2>Keep your search moving</h2></div>
          <p>A clear view of your internship journey.</p>
        </div>
        <div className="summary-grid">
          <article className="summary-card">
            <span className="summary-icon" aria-hidden="true">▤</span>
            <div><p>Sample opportunities</p><strong>{jobCount}</strong><span>Ready to explore</span></div>
            <Link to="/jobs" aria-label="Explore sample opportunities">↗</Link>
          </article>
          <article className="summary-card">
            <span className="summary-icon summary-icon-soft" aria-hidden="true">✓</span>
            <div><p>Applications tracked</p><strong>{applicationCount}</strong><span>Saved on this device</span></div>
            <Link to="/applications" aria-label="View tracked applications">↗</Link>
          </article>
        </div>
        <p className="sample-note">Internship listings are sample records for this student project, not verified live vacancies.</p>
      </section>
    </div>
  );
}