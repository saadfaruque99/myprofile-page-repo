import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';
import { allBlogPosts } from '../data/blogSeries';

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
  series?: string;
}

// Exporting blog posts data so it can be used in other components
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Cybersecurity in Enterprise IT",
    date: "March 15, 2024",
    excerpt: "Exploring emerging trends and challenges in enterprise cybersecurity, with insights on AI-driven security solutions and zero-trust architecture.",
    category: "Cybersecurity",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    series: "Enterprise Cybersecurity"
  },
  {
    id: 2,
    title: "Digital Transformation: A CIO's Perspective",
    date: "March 10, 2024",
    excerpt: "Key strategies for successful digital transformation initiatives, focusing on organizational change management and technology adoption.",
    category: "Digital Transformation",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Building Resilient IT Infrastructure",
    date: "March 5, 2024",
    excerpt: "Best practices for designing and maintaining resilient IT infrastructure that can withstand modern security threats and business demands.",
    category: "IT Infrastructure",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    series: "IT Infrastructure Design"
  },
  {
    id: 4,
    title: "Implementing Zero Trust Security Models",
    date: "March 1, 2024",
    excerpt: "A deep dive into zero trust architecture implementation strategies for enterprise security.",
    category: "Cybersecurity",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    series: "Enterprise Cybersecurity"
  },
  {
    id: 5,
    title: "Cloud Migration Strategies for Legacy Systems",
    date: "February 25, 2024",
    excerpt: "Effective approaches for migrating legacy systems to modern cloud infrastructure with minimal disruption.",
    category: "Cloud Computing",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "The Role of AI in Modern Infrastructure Management",
    date: "February 20, 2024",
    excerpt: "How artificial intelligence is transforming the way organizations manage and optimize their IT infrastructure.",
    category: "IT Infrastructure",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    series: "IT Infrastructure Design"
  }
];

const Blog: React.FC = () => {
  // Only show the first 3 posts on the homepage
  const featuredPosts = [...allBlogPosts].sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 3);

  return (
    <section id="blog" className={styles.blog}>
      <h2>Latest Articles</h2>
      <div className={styles.blogGrid}>
        {featuredPosts.map((post) => (
          <article key={post.id} className={styles.blogCard}>
            {post.image && (
              <div className={styles.blogImage}>
                <Link to={`/blog/${post.id}`}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    crossOrigin="anonymous"
                  />
                </Link>
              </div>
            )}
            <div className={styles.blogContent}>
              <div className={styles.blogMeta}>
                <span className={styles.category}>{post.category}</span>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
                {post.series && <span className={styles.series}>Series: {post.series}</span>}
              </div>
              <h3>
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className={styles.readMore}>
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.viewAllContainer}>
        <Link to="/blog" className={styles.viewAll}>View All Articles →</Link>
      </div>
    </section>
  );
};

export default Blog; 