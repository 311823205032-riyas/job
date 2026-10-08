import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const initialStatus = 'Applied';

export default function AddApplication({ onAdd }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    studentName: '',
    email: '',
    jobTitle: searchParams.get('job') || '',
    company: searchParams.get('company') || '',
    applicationDate: new Date().toISOString().slice(0, 10),
    status: initialStatus,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSuccess(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    for (const [name, value] of Object.entries(form)) {
      if (!value.trim()) nextErrors[name] = 'This field is required.';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address, such as name@example.com.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setSuccess(false);
      return;
    }

    onAdd({ ...form, studentName: form.studentName.trim(), email: form.email.trim() });
    setSuccess(true);
    setErrors({});
    setForm({ studentName: '', email: '', jobTitle: '', company: '', applicationDate: new Date().toISOString().slice(0, 10), status: initialStatus });
  }

  return (
    <section className="container form-page fade-in">
      <div className="page-heading form-heading">
        <div><p className="eyebrow">APPLICATION LOG</p><h1>Track an <span>application.</span></h1></div>
        <p>Keep every opportunity organized in one place.</p>
      </div>
      <form className="application-form" onSubmit={handleSubmit} noValidate>
        {success && <div className="success-message" role="status"><span aria-hidden="true">✓</span> Application saved successfully.</div>}
        <div className="form-grid">
          <label className="form-field">Student Name<input name="studentName" value={form.studentName} onChange={updateField} placeholder="Your full name" autoComplete="name" aria-invalid={Boolean(errors.studentName)} />{errors.studentName && <span className="field-error">{errors.studentName}</span>}</label>
          <label className="form-field">Email<input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label>
          <label className="form-field">Job Title<input name="jobTitle" value={form.jobTitle} onChange={updateField} placeholder="e.g. Software Intern" aria-invalid={Boolean(errors.jobTitle)} />{errors.jobTitle && <span className="field-error">{errors.jobTitle}</span>}</label>
          <label className="form-field">Company Name<input name="company" value={form.company} onChange={updateField} placeholder="Company name" aria-invalid={Boolean(errors.company)} />{errors.company && <span className="field-error">{errors.company}</span>}</label>
          <label className="form-field">Application Date<input name="applicationDate" type="date" value={form.applicationDate} onChange={updateField} aria-invalid={Boolean(errors.applicationDate)} />{errors.applicationDate && <span className="field-error">{errors.applicationDate}</span>}</label>
          <label className="form-field">Application Status<select name="status" value={form.status} onChange={updateField}>{['Applied', 'Interview', 'Selected', 'Rejected'].map((status) => <option key={status}>{status}</option>)}</select></label>
        </div>
        <div className="form-bottom"><p>Applications are saved in this browser on this device.</p><button className="button" type="submit">Save Application <span aria-hidden="true">→</span></button></div>
      </form>
    </section>
  );
}