import React from 'react';
import styles from './Blog.module.css';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Cybersecurity in Enterprise IT",
      date: "March 15, 2024",
      excerpt: "Exploring emerging trends and challenges in enterprise cybersecurity, with insights on AI-driven security solutions and zero-trust architecture.",
      category: "Cybersecurity",
      readTime: "5 min read",
      image: "https://via.placeholder.com/400x225?text=Cybersecurity"
    },
    {
      id: 2,
      title: "Digital Transformation: A CIO's Perspective",
      date: "March 10, 2024",
      excerpt: "Key strategies for successful digital transformation initiatives, focusing on organizational change management and technology adoption.",
      category: "Digital Transformation",
      readTime: "4 min read",
      image: "https://via.placeholder.com/400x225?text=Digital+Transformation"
    },
    {
      id: 3,
      title: "Building Resilient IT Infrastructure",
      date: "March 5, 2024",
      excerpt: "Best practices for designing and maintaining resilient IT infrastructure that can withstand modern security threats and business demands.",
      category: "IT Infrastructure",
      readTime: "6 min read",
      image: "https://via.placeholder.com/400x225?text=IT+Infrastructure"
    }
  ];

  return (
    <section id="blog" className={styles.blog}>
      <h2>Latest Articles</h2>
      <div className={styles.blogGrid}>
        {blogPosts.map((post) => (
          <article key={post.id} className={styles.blogCard}>
            {post.image && (
              <div className={styles.blogImage}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  crossOrigin="anonymous"
                />
              </div>
            )}
            <div className={styles.blogContent}>
              <div className={styles.blogMeta}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className={styles.readMore}>Read More →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog; 