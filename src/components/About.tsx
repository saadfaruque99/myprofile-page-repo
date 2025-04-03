import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <h1>About Me</h1>
        <div className={styles.content}>
          <div className={styles.bio}>
            <h2>Saad Faruque</h2>
            <h3>Chief Information Officer & Cybersecurity Expert</h3>
            <p>
              With over 15 years of experience in the tech industry, I specialize in cybersecurity, 
              enterprise IT architecture, and digital transformation strategies. My career has been 
              focused on helping organizations build resilient, scalable, and secure technology infrastructures.
            </p>
            <p>
              I currently serve as the Chief Information Officer at a leading technology company, 
              where I oversee IT strategy, cybersecurity initiatives, and enterprise architecture. 
              My expertise includes zero-trust security models, cloud security, and AI-driven security solutions.
            </p>
            <p>
              Outside of my professional work, I am passionate about education and mentorship in the tech 
              community. I regularly speak at industry conferences and contribute to open-source security projects.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img src="https://via.placeholder.com/400x500?text=SF" alt="Saad Faruque" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 