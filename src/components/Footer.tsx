import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>Saad Faruque</h3>
            <p>Chief Information Officer & Cybersecurity Expert</p>
            <div className={styles.social}>
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" aria-label="GitHub">GitHub</a>
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Navigation</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h3>Blog Series</h3>
            <ul>
              <li><Link to="/blog?series=The 2025 LLM Ecosystem">The 2025 LLM Ecosystem</Link></li>
              <li><Link to="/blog?category=AI">All AI Articles</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {currentYear} Saad Faruque. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 