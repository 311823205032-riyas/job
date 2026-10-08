import { useState } from 'react';

const statuses = ['Applied', 'Interview', 'Selected', 'Rejected'];

function formatDate(date) {
  if (!date) return '';
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function Applications({ applications, onDelete }) {
  const [statusFilter, setStatusFilter] = useState('');
  const visibleApplications = applications.filter((application) => !statusFilter || application.status === statusFilter);

  function confirmDelete(application) {
    if (window.confirm(`Delete the application for ${application.jobTitle} at ${application.company}?`)) {
      onDelete(application.id);
    }
  }

  return (
    <section className="container applications-page fade-in">
      <div className="page-heading">
        <div><p className="eyebrow">YOUR PROGRESS</p><h1>Applications <span>tracker.</span></h1></div>
        <p>{applications.length} {applications.length === 1 ? 'application' : 'applications'} saved</p>
      </div>
      <div className="applications-toolbar">
        <p>Review and manage your internship applications.</p>
        <label className="select-field status-filter"><span className="sr-only">Filter by application status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      </div>
      {visibleApplications.length ? (
        <>
          <div className="application-table-wrap">
            <table className="application-table">
              <thead><tr><th>Student</th><th>Position</th><th>Applied on</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
              <tbody>{visibleApplications.map((application) => (
                <tr key={application.id}>
                  <td><strong>{application.studentName}</strong><span className="table-subtext">{application.email}</span></td>
                  <td><strong>{application.jobTitle}</strong><span className="table-subtext">{application.company}</span></td>
                  <td>{formatDate(application.applicationDate)}</td>
                  <td><span className={`status-badge status-${application.status.toLowerCase()}`}>{application.status}</span></td>
                  <td><button className="delete-button" type="button" onClick={() => confirmDelete(application)} aria-label={`Delete ${application.jobTitle} at ${application.company}`}>Delete</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="application-cards">{visibleApplications.map((application) => (
            <article className="application-mobile-card" key={application.id}>
              <div className="mobile-card-top"><span className={`status-badge status-${application.status.toLowerCase()}`}>{application.status}</span><button className="delete-button" type="button" onClick={() => confirmDelete(application)}>Delete</button></div>
              <h2>{application.jobTitle}</h2><p>{application.company}</p><div className="mobile-card-meta"><span>{application.studentName}</span><span>{formatDate(application.applicationDate)}</span></div><span className="table-subtext">{application.email}</span>
            </article>
          ))}</div>
        </>
      ) : (
        <div className="empty-state"><span className="empty-mark" aria-hidden="true">✓</span><h2>No applications found</h2><p>{applications.length ? 'No applications match this status filter.' : 'Applications you track will appear here.'}</p></div>
      )}
    </section>
  );
}