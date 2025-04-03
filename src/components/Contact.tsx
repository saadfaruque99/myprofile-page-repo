import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <h1>Contact Me</h1>
        
        <div className={styles.contactInfo}>
          <div className={styles.info}>
            <h2>Get in Touch</h2>
            <p>
              I'm always interested in hearing about new projects, opportunities, or just connecting with fellow tech enthusiasts.
            </p>
            <ul className={styles.contactDetails}>
              <li>
                <span>Email:</span>
                <a href="mailto:contact@saadfaruque.com">contact@saadfaruque.com</a>
              </li>
              <li>
                <span>LinkedIn:</span>
                <a href="#" target="_blank" rel="noopener noreferrer">linkedin.com/in/saadfaruque</a>
              </li>
              <li>
                <span>Twitter:</span>
                <a href="#" target="_blank" rel="noopener noreferrer">@saadfaruque</a>
              </li>
            </ul>
          </div>
          
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="job">Job Opportunity</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="consulting">Consulting Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              
              {formStatus === 'success' && (
                <p className={styles.successMessage}>
                  Your message has been sent successfully! I'll get back to you soon.
                </p>
              )}
              
              {formStatus === 'error' && (
                <p className={styles.errorMessage}>
                  There was an error sending your message. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 