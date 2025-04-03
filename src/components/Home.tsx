import React from 'react';
import Profile from './Profile';
import Blog from './Blog';
import SEO from './SEO';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <SEO 
        title="Saad Faruque - CIO & Cyber Security Expert"
        description="Personal website and technical blog of Saad Faruque, Chief Information Officer with 25+ years of experience in IT management, systems integration, and cyber security."
        keywords="Saad Faruque, CIO, Chief Information Officer, Cyber Security Expert, IT Management, Enterprise IT, Technology Leadership, LLM Ecosystem"
        canonical="https://saadfaruque.com/"
      />
      <Profile />
      <div className={styles.featuredContent}>
        <Blog />
      </div>
    </div>
  );
};

export default Home;
