import React from 'react';
import './App.css';
import Profile from './components/Profile';
import styles from './App.module.css';

function App() {
  const menuItems = [
    { id: 'summary', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>SF</div>
        <div className={styles.menu}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={styles.menuItem}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <main className={styles.main}>
        <Profile />
      </main>
    </div>
  );
}

export default App;
