// src/components/JobApplicationForm.js
import React, { useState } from 'react';
import { saveJobApplication } from '../firebase/helpers/firestoreHelpers';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const jobData = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        appliedAt: new Date().toISOString(),
      };

      await saveJobApplication(jobData);
      setMessage('✅ Application submitted successfully!');
      setFormData({ name: '', email: '', position: '', resume: null });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">WhiteCircle</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Main Form */}
      <div className="form-container">
        <h2 className="form-title">Apply for a Job</h2>

        <form onSubmit={handleSubmit} className="job-form">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Position Applied For</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required />

          <label>Upload Resume (PDF)</label>
          <input type="file" name="resume" onChange={handleChange} accept=".pdf" required />

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h4>WhiteCircle Pvt Ltd</h4>
            <p>Innovating recruitment solutions for modern companies.</p>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Email: careers@whitecircle.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Address: 123 Business St, Bangalore, India</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2025 WhiteCircle. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default JobApplicationForm;
