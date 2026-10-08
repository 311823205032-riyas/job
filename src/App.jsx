import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import AddApplication from './pages/AddApplication.jsx';
import Applications from './pages/Applications.jsx';

const STORAGE_KEY = 'studentJobTrackerApplications';

function readApplications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [applications, setApplications] = useState(readApplications);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
      setStorageError('');
    } catch {
      setStorageError('Your browser could not save changes. Check available storage and try again.');
    }
  }, [applications]);

  function addApplication(application) {
    setApplications((current) => [{ ...application, id: crypto.randomUUID() }, ...current]);
  }

  function deleteApplication(id) {
    setApplications((current) => current.filter((application) => application.id !== id));
  }

  return (
    <div className="app-shell">
      <Navbar />
      {storageError && <div className="storage-alert" role="alert">{storageError}</div>}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home jobCount={8} applicationCount={applications.length} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/add-application" element={<AddApplication onAdd={addApplication} />} />
          <Route path="/applications" element={<Applications applications={applications} onDelete={deleteApplication} />} />
          <Route path="*" element={<Home jobCount={8} applicationCount={applications.length} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}