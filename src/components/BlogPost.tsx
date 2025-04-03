import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './BlogPost.module.css';
import MarkdownRenderer from './MarkdownRenderer';
import SEO from './SEO';
import { loadMarkdownPost, getNextAndPreviousPosts, getPostsBySeriesId } from '../utils/markdownLoader';
import { allBlogPosts, llmEcosystemSeries } from '../data/blogSeries';

const BlogPostComponent: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<{ content: string; meta: any } | null>(null);
  
  // Get next/previous posts in the series
  const { next, previous } = postId ? getNextAndPreviousPosts(postId) : { next: null, previous: null };
  
  // Get other posts in the same series
  const [seriesPosts, setSeriesPosts] = useState<typeof allBlogPosts>([]);
  
  // Get the latest posts
  const [latestPosts, setLatestPosts] = useState<typeof allBlogPosts>([]);

  // Check if this post is part of the LLM Ecosystem series
  const isLlmEcosystemPost = useMemo(() => {
    if (!postId) return false;
    return llmEcosystemSeries.posts.some(post => post.id === postId);
  }, [postId]);
  
  useEffect(() => {
    if (!postId) {
      navigate('/blog');
      return;
    }
    
    const fetchMarkdown = async () => {
      setLoading(true);
      try {
        const post = await loadMarkdownPost(postId);
        if (post) {
          setMarkdown(post);
          
          // Get all posts in the same series
          if (post.meta.series) {
            console.log("Found series:", post.meta.series);
            const seriesId = post.meta.series.toLowerCase().replace(/\s+/g, '-');
            console.log("Series ID for lookup:", seriesId);
            
            // Get all posts in the series, sorted by chapter number
            const postsInSeries = getPostsBySeriesId(seriesId).sort((a, b) => {
              if (a.chapter !== undefined && b.chapter !== undefined) {
                return a.chapter - b.chapter;
              }
              return 0;
            });
            
            console.log("Found series posts:", postsInSeries.length);
            setSeriesPosts(postsInSeries);
          } else {
            console.log("No series metadata found for this post");
            
            // If post is in the LLM Ecosystem series but doesn't have series metadata
            if (isLlmEcosystemPost) {
              console.log("Post is in LLM Ecosystem series");
              setSeriesPosts(llmEcosystemSeries.posts.sort((a, b) => {
                if (a.chapter !== undefined && b.chapter !== undefined) {
                  return a.chapter - b.chapter;
                }
                return 0;
              }));
            }
          }
          
          // Get latest posts
          const latest = [...allBlogPosts]
            .filter(p => p.id !== postId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10);
          setLatestPosts(latest);
          
          setError(null);
        } else {
          setError('Post not found');
          setMarkdown(null);
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
        setMarkdown(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMarkdown();
  }, [postId, navigate, isLlmEcosystemPost]);
  
  // Even if no series posts are found for some reason, use LLM Ecosystem posts for LLM posts
  useEffect(() => {
    if (isLlmEcosystemPost && seriesPosts.length === 0) {
      console.log("Fallback: Using LLM Ecosystem series posts");
      setSeriesPosts(llmEcosystemSeries.posts.sort((a, b) => {
        if (a.chapter !== undefined && b.chapter !== undefined) {
          return a.chapter - b.chapter;
        }
        return 0;
      }));
    }
  }, [isLlmEcosystemPost, seriesPosts.length]);
  
  if (loading) {
    return <div className={styles.loading}>Loading post...</div>;
  }
  
  if (error || !markdown) {
    return <div className={styles.error}>{error || 'Post not found'}</div>;
  }
  
  const { content, meta } = markdown;
  const seriesTitle = meta.series || (isLlmEcosystemPost ? llmEcosystemSeries.title : '');
  
  return (
    <div className={styles.blogPostContainer}>
      {/* Add SEO component with dynamic metadata */}
      <SEO 
        title={meta.title}
        description={meta.summary || `${meta.title} - Learn about ${meta.title} in this detailed article by Saad Faruque, covering key aspects of ${meta.category || 'technology'}.`}
        image={meta.image || 'https://saadfaruque.com/saad_profile.jpg'}
        article={true}
        keywords={`${meta.category}, ${meta.tags || ''}, ${seriesTitle}, Saad Faruque, CIO, Cyber Security, Technology`}
        canonical={`https://saadfaruque.com/blog/${postId}`}
        author={meta.author || 'Saad Faruque'}
      />
      
      <article className={styles.blogPost}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{meta.category}</span>
            <span className={styles.date}>{meta.date}</span>
            <span className={styles.readTime}>{meta.readTime}</span>
            {meta.series && <span className={styles.series}>Series: {meta.series}</span>}
            {meta.chapter !== undefined && <span className={styles.chapter}>Chapter {meta.chapter}</span>}
          </div>
          <h1>{meta.title}</h1>
          <div className={styles.author}>
            <img src="https://via.placeholder.com/100x100?text=SF" alt="Saad Faruque" />
            <div>
              <h3>Saad Faruque</h3>
              <p>Chief Information Officer | Cyber Security Expert</p>
            </div>
          </div>
        </header>

        {meta.image && (
          <div className={styles.featuredImage}>
            <img 
              src={meta.image} 
              alt={meta.title}
              loading="lazy"
              decoding="async"
              crossOrigin="anonymous"
            />
          </div>
        )}

        <div className={styles.content}>
          <MarkdownRenderer content={content} />
        </div>

        <footer className={styles.footer}>
          <div className={styles.tags}>
            <span>Tags:</span>
            <a href={`/blog?category=${meta.category}`}>{meta.category}</a>
            {seriesTitle && <a href={`/blog?series=${encodeURIComponent(seriesTitle)}`}>{seriesTitle}</a>}
          </div>
          <div className={styles.share}>
            <span>Share:</span>
            <a href="#" className={styles.socialLink}>Twitter</a>
            <a href="#" className={styles.socialLink}>LinkedIn</a>
            <a href="#" className={styles.socialLink}>Email</a>
          </div>
        </footer>
        
        <div className={styles.navigation}>
          {previous && (
            <Link to={`/blog/${previous.id}`} className={styles.prevPost}>
              <span>← Previous</span>
              <span>{previous.title}</span>
            </Link>
          )}
          {next && (
            <Link to={`/blog/${next.id}`} className={styles.nextPost}>
              <span>Next →</span>
              <span>{next.title}</span>
            </Link>
          )}
        </div>
      </article>

      <aside className={styles.sidebar}>
        {/* Series Navigation Menu - Always displayed prominently at the top */}
        {(seriesPosts.length > 0 || isLlmEcosystemPost) && (
          <div className={`${styles.sidebarSection} ${styles.seriesNavigation}`}>
            <h3>Complete "{seriesTitle}" Series</h3>
            <div className={styles.seriesIndex}>
              {(seriesPosts.length > 0 ? seriesPosts : llmEcosystemSeries.posts).map(seriesPost => (
                <Link 
                  key={seriesPost.id} 
                  to={`/blog/${seriesPost.id}`}
                  className={`${styles.seriesIndexItem} ${seriesPost.id === postId ? styles.currentPost : ''}`}
                >
                  <div className={styles.chapterNumber}>
                    {seriesPost.chapter !== undefined ? `Ch ${seriesPost.chapter}` : '•'}
                  </div>
                  <div className={styles.chapterTitle}>
                    {seriesPost.title}
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.seriesNavHint}>
              Click any chapter above to navigate through the series
            </div>
          </div>
        )}

        <div className={styles.sidebarSection}>
          <h3>Latest Articles</h3>
          <ul className={styles.postList}>
            {latestPosts.map(latestPost => (
              <li key={latestPost.id}>
                <Link to={`/blog/${latestPost.id}`} className={styles.sidebarLink}>
                  <div className={styles.sidebarPostImage}>
                    <img 
                      src={latestPost.image} 
                      alt={latestPost.title}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.sidebarPostContent}>
                    <h4>{latestPost.title}</h4>
                    <span className={styles.sidebarPostDate}>{latestPost.date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.sidebarSection}>
          <h3>Categories</h3>
          <div className={styles.categoryList}>
            {Array.from(new Set(allBlogPosts.map(p => p.category))).map(category => (
              <Link 
                key={category} 
                to={`/blog?category=${category}`} 
                className={styles.categoryTag}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BlogPostComponent; 