import React from 'react';
import Profile from './Profile';
import Blog from './Blog';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <Profile />
      <div className={styles.featuredContent}>
        <Blog />
      </div>
    </div>
  );
};

export default Home;
