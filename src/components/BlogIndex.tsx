import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BlogIndex.module.css';
import { allBlogPosts, blogSeries } from '../data/blogSeries';

const BlogIndex: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';
  const initialSeries = queryParams.get('series') || '';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSeries, setSelectedSeries] = useState(initialSeries);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialSeries ? 'list' : 'grid');

  // Get all categories and series
  const categories = useMemo(() => {
    const categorySet = new Set(allBlogPosts.map(post => post.category));
    return Array.from(categorySet);
  }, []);

  // Filter posts by category and series
  const filteredPosts = useMemo(() => {
    return [...allBlogPosts]
      .filter(post => selectedCategory ? post.category === selectedCategory : true)
      .filter(post => selectedSeries ? post.series === selectedSeries : true)
      .sort((a, b) => {
        // If from same series, sort by chapter
        if (a.series && b.series && a.series === b.series && a.chapter !== undefined && b.chapter !== undefined) {
          return a.chapter - b.chapter;
        }
        // Otherwise sort by date
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [selectedCategory, selectedSeries]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSeriesChange = (series: string) => {
    setSelectedSeries(series === selectedSeries ? '' : series);
    setViewMode(series === selectedSeries ? 'grid' : 'list');
  };

  return (
    <div className={styles.blogIndexContainer}>
      <h1>Blog</h1>
      
      <div className={styles.filters}>
        <div className={styles.categoryFilters}>
          <h3>Categories</h3>
          <div className={styles.filterButtons}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
            {selectedCategory && (
              <button 
                className={styles.clearFilter}
                onClick={() => setSelectedCategory('')}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
        
        <div className={styles.seriesFilters}>
          <h3>Series</h3>
          <div className={styles.filterButtons}>
            {blogSeries.map(series => (
              <button
                key={series.id}
                className={`${styles.filterButton} ${selectedSeries === series.title ? styles.active : ''}`}
                onClick={() => handleSeriesChange(series.title)}
              >
                {series.title}
              </button>
            ))}
            {selectedSeries && (
              <button 
                className={styles.clearFilter}
                onClick={() => setSelectedSeries('')}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>
      </div>
      
      {selectedSeries && (
        <div className={styles.seriesInfo}>
          <h2>{selectedSeries}</h2>
          <p>{blogSeries.find(s => s.title === selectedSeries)?.description}</p>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.active : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
            >
              Grid
            </button>
            <button 
              className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')} 
              aria-label="List View"
            >
              List
            </button>
          </div>
        </div>
      )}
      
      {viewMode === 'list' && selectedSeries ? (
        <div className={styles.blogList}>
          <h3 className={styles.listTitle}>All Chapters</h3>
          <div className={styles.listContainer}>
            {filteredPosts.map((post, index) => (
              <div key={post.id} className={styles.listItem}>
                <div className={styles.listNumber}>
                  {post.chapter !== undefined ? `Ch. ${post.chapter}` : index + 1}
                </div>
                <div className={styles.listContent}>
                  <h3>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <div className={styles.listMeta}>
                    <span className={styles.date}>{post.date}</span>
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} className={styles.readMore}>
                    Read Chapter →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.blogGrid}>
          {filteredPosts.map(post => (
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
                <h2>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogIndex; 