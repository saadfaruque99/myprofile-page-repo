import React from 'react';
import styles from './Profile.module.css';
// Import the profile image
import profileImage from '../images/saad_profile.jpg';

const Profile = () => {
  // Extracting data to make it easier to manage
  const profileData = {
    name: "SAAD FARUQUE",
    title: "Chief Information Officer | Cyber Security Expert",
    location: "Dhaka, Bangladesh",
    linkedin: "https://www.linkedin.com/in/saadfaruque-67b6524",
    summary: `Seasoned technology leader with 25+ years of experience in IT management, systems integration, and cyber security. Proven track record of building scalable, secure infrastructure for diverse organizations. Expert in leveraging innovative technology approaches to achieve business objectives while maintaining robust security postures.`,
    expertise: [
      "Information Security - Policy Development, Risk Management, Compliance",
      "IT Infrastructure - System Architecture, Data Center Management, Enterprise Solutions",
      "Technology Leadership - Strategic Planning, Team Development, Project Management",
    ],
    technicalSkills: [
      "Systems: Linux, Windows Server, Virtualization, SAN/NAS",
      "Network: Routing & Switching, Firewall Configuration, WLAN/LAN Architecture",
      "Security: ISO 27001, Network Security, Incident Response",
    ],
    experienceSummary: [
      {
        role: "Senior Leadership",
        period: "2018 - Present",
        highlights: "CIO at Technometrics Limited and Head of Cyber Security at Genex Infosys, leading enterprise-wide IT strategy and security initiatives."
      },
      {
        role: "Technology Consulting",
        period: "2013 - 2018",
        highlights: "IT Consultant for international educational institutions and enterprises, focusing on infrastructure implementation and security frameworks."
      },
      {
        role: "IT Management",
        period: "2002 - 2013",
        highlights: "Led IT operations for international schools and financial institutions, managing infrastructure, security, and digital transformation."
      }
    ],
    certificationsSummary: "Industry-recognized certifications in cyber security and system administration including MCSE, ECSA, CHFI, CEH, RHCE, CCNA, and ISO 27001 Lead Implementer.",
    publicationsSummary: "Author of technical books on e-learning platforms including 'Moodle 2.5 Multimedia' and 'Moodle E-Learning Course Development (3rd Edition)'. Regular contributor to Hakin9 IT Security Magazine."
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.profileImage}>
            {/* Using your uploaded profile image */}
            <img 
              src={profileImage} 
              alt={profileData.name} 
            />
          </div>
          <h1>{profileData.name}</h1>
          <p className={styles.title}>{profileData.title}</p>
          <p className={styles.location}>
            <span>📍</span> {profileData.location}
          </p>
          <div className={styles.headerLinks}>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.headerLink}>
              🔗 LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <section id="summary" className={styles.about}>
          <h2>Professional Summary</h2>
          <p>{profileData.summary}</p>
        </section>

        <section id="skills" className={styles.skills}>
          <h2>Skills & Expertise</h2>
          <h3>Core Expertise</h3>
          <ul className={styles.expertiseList}>
            {profileData.expertise.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3>Technical Skills</h3>
          <div className={styles.skillGrid}>
            {profileData.technicalSkills.map((item, index) => (
              <div key={index} className={styles.skillItem}>{item}</div>
            ))}
          </div>
        </section>

        <section id="experience" className={styles.experience}>
          <h2>Professional Experience Overview</h2>
          {profileData.experienceSummary.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <h3>{exp.role}</h3>
              <p className={styles.period}>{exp.period}</p>
              <p>{exp.highlights}</p>
            </div>
          ))}
        </section>

        <section id="certifications" className={styles.certifications}>
          <h2>Certifications & Publications</h2>
          <div className={styles.summary}>
            <h3>Professional Certifications</h3>
            <p>{profileData.certificationsSummary}</p>
            <h3>Publications</h3>
            <p>{profileData.publicationsSummary}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile; 