import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogPost.module.css';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  content: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would come from an API or database
  const post: BlogPost = {
    id: 1,
    title: "The Future of Cybersecurity in Enterprise IT",
    date: "March 15, 2024",
    excerpt: "Exploring emerging trends and challenges in enterprise cybersecurity, with insights on AI-driven security solutions and zero-trust architecture.",
    category: "Cybersecurity",
    readTime: "5 min read",
    image: "https://via.placeholder.com/800x450?text=Cybersecurity",
    content: `
      <h2>Introduction</h2>
      <p>The landscape of enterprise cybersecurity is evolving at an unprecedented pace. As organizations increasingly rely on digital infrastructure, the need for robust security measures has never been more critical. This article explores the emerging trends and challenges in enterprise cybersecurity, focusing on AI-driven solutions and zero-trust architecture.</p>

      <h2>AI-Driven Security Solutions</h2>
      <p>Artificial Intelligence is revolutionizing cybersecurity by enabling:</p>
      <ul>
        <li>Real-time threat detection and response</li>
        <li>Predictive analytics for potential vulnerabilities</li>
        <li>Automated incident response systems</li>
        <li>Behavioral analysis for anomaly detection</li>
      </ul>

      <h2>Zero-Trust Architecture</h2>
      <p>The traditional perimeter-based security model is no longer sufficient. Zero-trust architecture operates on the principle of "never trust, always verify," implementing:</p>
      <ul>
        <li>Micro-segmentation of networks</li>
        <li>Continuous authentication</li>
        <li>Least-privilege access controls</li>
        <li>End-to-end encryption</li>
      </ul>

      <h2>Emerging Challenges</h2>
      <p>While these technologies offer significant advantages, they also present new challenges:</p>
      <ul>
        <li>Integration with existing systems</li>
        <li>Skills gap in cybersecurity workforce</li>
        <li>Regulatory compliance requirements</li>
        <li>Cost of implementation and maintenance</li>
      </ul>

      <h2>Best Practices for Implementation</h2>
      <p>To successfully implement these new security measures, organizations should:</p>
      <ol>
        <li>Conduct thorough risk assessments</li>
        <li>Develop a phased implementation strategy</li>
        <li>Invest in employee training and awareness</li>
        <li>Regularly update and test security measures</li>
        <li>Maintain compliance with industry standards</li>
      </ol>

      <h2>Conclusion</h2>
      <p>The future of enterprise cybersecurity lies in the intelligent integration of AI-driven solutions and zero-trust architecture. While challenges exist, the benefits of enhanced security, reduced risk, and improved operational efficiency make these investments crucial for modern organizations.</p>
    `,
    author: {
      name: "Saad Faruque",
      title: "Chief Information Officer | Cyber Security Expert",
      image: "https://via.placeholder.com/100x100?text=SF"
    }
  };

  return (
    <article className={styles.blogPost}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.date}>{post.date}</span>
          <span className={styles.readTime}>{post.readTime}</span>
        </div>
        <h1>{post.title}</h1>
        <div className={styles.author}>
          <img src={post.author.image} alt={post.author.name} />
          <div>
            <h3>{post.author.name}</h3>
            <p>{post.author.title}</p>
          </div>
        </div>
      </header>

      {post.image && (
        <div className={styles.featuredImage}>
          <img 
            src={post.image} 
            alt={post.title}
            loading="lazy"
            decoding="async"
            crossOrigin="anonymous"
          />
        </div>
      )}

      <div 
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className={styles.footer}>
        <div className={styles.tags}>
          <span>Tags:</span>
          <a href="#">Cybersecurity</a>
          <a href="#">Enterprise IT</a>
          <a href="#">AI</a>
          <a href="#">Zero Trust</a>
        </div>
        <div className={styles.share}>
          <span>Share:</span>
          <a href="#" className={styles.socialLink}>Twitter</a>
          <a href="#" className={styles.socialLink}>LinkedIn</a>
          <a href="#" className={styles.socialLink}>Email</a>
        </div>
      </footer>
    </article>
  );
};

export default BlogPost; 