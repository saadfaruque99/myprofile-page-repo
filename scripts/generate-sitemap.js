// Generate a dynamic sitemap based on blog posts
// Using ES modules as specified in package.json
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://saadfaruque.com';
const BLOG_DIR = path.join(__dirname, '../src/blogposts');
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Core pages
const staticPages = [
  {
    url: '/',
    changefreq: 'monthly',
    priority: 1.0
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7
  }
];

// Get all blog posts recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else if (path.extname(file) === '.md') {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function generateSitemap() {
  // Get all blog posts
  let blogFiles = [];
  try {
    blogFiles = getAllFiles(BLOG_DIR);
  } catch (error) {
    console.warn(`Warning: Could not read blog directory: ${error.message}`);
  }

  // Parse frontmatter to get lastmod dates
  const blogPages = blogFiles.map(file => {
    const relativePath = path.relative(BLOG_DIR, file);
    const fileName = path.basename(relativePath, '.md');
    let date = new Date().toISOString().split('T')[0]; // Default to today

    // Try to read the file and extract the date
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { data } = matter(content);
      if (data.date) {
        // Convert the date string to ISO format (YYYY-MM-DD)
        const postDate = new Date(data.date);
        if (!isNaN(postDate.getTime())) {
          date = postDate.toISOString().split('T')[0];
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not parse frontmatter from ${file}: ${error.message}`);
    }

    return {
      url: `/blog/${fileName}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: date
    };
  });

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`Sitemap generated successfully at ${OUTPUT_PATH}`);
}

// Execute sitemap generation
generateSitemap(); 