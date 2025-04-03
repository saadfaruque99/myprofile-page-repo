import Profile from './components/Profile';
import Blog from './components/Blog';
import styles from './App.module.css';

function App() {
  const menuItems = [
    { id: 'summary', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'blog', label: 'Blog' }
  ];

  const scrollToSection = (id: string) => {
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
        <Blog />
      </main>
    </div>
  );
}

export default App; 