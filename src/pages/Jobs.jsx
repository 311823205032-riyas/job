import { useMemo, useState } from 'react';
import JobCard from '../components/JobCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

const jobs = [
  { id: 1, title: 'Electronics Design Intern', company: 'Intel', location: 'Bengaluru, India', category: 'Electronics', type: 'Hybrid', applyUrl: 'https://jobs.intel.com/' },
  { id: 2, title: 'Embedded Systems Intern', company: 'Bosch', location: 'Pune, India', category: 'Embedded Systems', type: 'On-site', applyUrl: 'https://www.bosch.com/careers/' },
  { id: 3, title: 'IoT Solutions Intern', company: 'Cisco', location: 'Remote', category: 'IoT', type: 'Remote', applyUrl: 'https://jobs.cisco.com/' },
  { id: 4, title: 'Frontend Developer Intern', company: 'Microsoft', location: 'Hyderabad, India', category: 'Web Development', type: 'Hybrid', applyUrl: 'https://careers.microsoft.com/' },
  { id: 5, title: 'Software Engineering Intern', company: 'Google', location: 'Bengaluru, India', category: 'Software', type: 'On-site', applyUrl: 'https://careers.google.com/' },
  { id: 6, title: 'Connected Devices Intern', company: 'Siemens', location: 'Chennai, India', category: 'IoT', type: 'Hybrid', applyUrl: 'https://jobs.siemens.com/' },
  { id: 7, title: 'Firmware Engineering Intern', company: 'Tesla', location: 'Remote', category: 'Embedded Systems', type: 'Remote', applyUrl: 'https://www.tesla.com/careers' },
  { id: 8, title: 'Full Stack Developer Intern', company: 'IBM', location: 'Pune, India', category: 'Web Development', type: 'Hybrid', applyUrl: 'https://www.ibm.com/careers' },
];

const categories = ['Electronics', 'Embedded Systems', 'IoT', 'Web Development', 'Software'];
const locations = [...new Set(jobs.map((job) => job.location))].sort();

export default function Jobs() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
    return matchesSearch && (!category || job.category === category) && (!location || job.location === location);
  }), [search, category, location]);

  return (
    <section className="container listing-page fade-in">
      <div className="page-heading">
        <div><p className="eyebrow">OPPORTUNITY DIRECTORY</p><h1>Find your next <span>internship.</span></h1></div>
        <p>Explore student-friendly roles across technology and engineering.</p>
      </div>
      <p className="sample-note listing-note">Sample records for demonstration only. These are not verified live vacancies.</p>
      <SearchBar search={search} onSearchChange={setSearch} category={category} onCategoryChange={setCategory} location={location} onLocationChange={setLocation} categories={categories} locations={locations} />
      <div className="results-line"><span>{filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}</span><span>Sample listings</span></div>
      {filteredJobs.length ? (
        <div className="jobs-grid">{filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}</div>
      ) : (
        <div className="empty-state"><span className="empty-mark" aria-hidden="true">⌕</span><h2>No results found</h2><p>Try another search term or adjust the filters.</p></div>
      )}
    </section>
  );
}