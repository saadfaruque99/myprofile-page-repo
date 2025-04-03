import { allBlogPosts } from '../data/blogSeries';

interface MarkdownContent {
  content: string;
  meta: {
    id: string;
    title: string;
    date: string;
    chapter?: number;
    image: string;
    excerpt: string;
    readTime: string;
    category: string;
    series?: string;
  };
}

// Cache for markdown content
const markdownCache = new Map<string, MarkdownContent>();

export const loadMarkdownPost = async (postId: string): Promise<MarkdownContent | null> => {
  // Check if we have it cached
  if (markdownCache.has(postId)) {
    return markdownCache.get(postId)!;
  }

  // Find the post metadata
  const postMeta = allBlogPosts.find(post => post.id === postId);
  if (!postMeta) {
    console.error(`Post with ID ${postId} not found`);
    return null;
  }

  try {
    // Load the markdown file content from the public directory
    const markdownPath = `/blogposts/Series-LLM/${postMeta.filename}`;
    console.log(`Loading markdown from: ${markdownPath}`);
    
    // Get the URL for the file from the server
    const response = await fetch(markdownPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown file: ${postMeta.filename} (${response.status})`);
    }
    
    const content = await response.text();
    
    // Create the post with content and metadata
    const post: MarkdownContent = {
      content,
      meta: {
        id: postMeta.id,
        title: postMeta.title,
        date: postMeta.date,
        chapter: postMeta.chapter,
        image: postMeta.image,
        excerpt: postMeta.excerpt,
        readTime: postMeta.readTime,
        category: postMeta.category,
        series: postMeta.series
      }
    };
    
    // Cache it for future use
    markdownCache.set(postId, post);
    
    return post;
  } catch (error) {
    console.error(`Error loading markdown post ${postId}:`, error);
    return null;
  }
};

export const getNextAndPreviousPosts = (postId: string): { next: typeof allBlogPosts[0] | null, previous: typeof allBlogPosts[0] | null } => {
  const postIndex = allBlogPosts.findIndex(post => post.id === postId);
  
  if (postIndex === -1) {
    return { next: null, previous: null };
  }
  
  const previous = postIndex > 0 ? allBlogPosts[postIndex - 1] : null;
  const next = postIndex < allBlogPosts.length - 1 ? allBlogPosts[postIndex + 1] : null;
  
  return { next, previous };
};

export const getPostsBySeriesId = (seriesId: string): typeof allBlogPosts => {
  console.log(`Looking for posts in series: ${seriesId}`);
  
  // More flexible matching for series names
  return allBlogPosts
    .filter(post => {
      if (!post.series) return false;
      
      // Convert both to lowercase for case-insensitive comparison
      const postSeriesName = post.series.toLowerCase();
      const searchSeriesName = seriesId.toLowerCase();
      
      // Check different forms of the series name (with spaces, with hyphens, etc.)
      return postSeriesName.includes(searchSeriesName) || 
             searchSeriesName.includes(postSeriesName) ||
             postSeriesName.replace(/\s+/g, '-').includes(searchSeriesName) ||
             searchSeriesName.includes(postSeriesName.replace(/\s+/g, '-'));
    })
    .sort((a, b) => {
      if (a.chapter !== undefined && b.chapter !== undefined) {
        return a.chapter - b.chapter;
      }
      return 0;
    });
}; 