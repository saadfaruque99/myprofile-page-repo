import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <svg viewBox="0 0 100 100" width="40" height="40">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
            <linearGradient id="leftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#logoGradient)"
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
          />
          <path
            fill="url(#topGradient)"
            d="M50 10 L90 30 L50 50 L10 30 Z"
            opacity="0.9"
          />
          <path
            fill="url(#rightGradient)"
            d="M90 30 L90 70 L50 90 L50 50 Z"
            opacity="0.7"
          />
          <path
            fill="url(#leftGradient)"
            d="M10 30 L50 50 L50 90 L10 70 Z"
            opacity="0.8"
          />
        </svg>
      </div>

      <button className={`${styles.toggleButton} ${isOpen ? styles.active : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        {navItems.map((item) => (
          <li key={item.label}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
