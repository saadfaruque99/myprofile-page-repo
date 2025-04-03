import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string;
  canonical?: string;
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Saad Faruque - CIO & Cyber Security Expert',
  description = 'Chief Information Officer & Cyber Security Expert with 25+ years of experience in IT management, systems integration, and cyber security.',
  image = 'https://saadfaruque.com/saad_profile.jpg',
  article = false,
  keywords = 'CIO, Cyber Security, IT Management, Information Security, Technology Leadership, Enterprise IT',
  canonical = 'https://saadfaruque.com',
  author = 'Saad Faruque'
}) => {
  const siteUrl = 'https://saadfaruque.com';
  const pageTitle = title ? `${title} | Saad Faruque` : 'Saad Faruque - CIO & Cyber Security Expert';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* If it's an article, add article specific tags */}
      {article && (
        <>
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:author" content={author} />
        </>
      )}
      
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {JSON.stringify(
          article
            ? {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                'headline': title,
                'image': [image],
                'datePublished': new Date().toISOString(),
                'dateModified': new Date().toISOString(),
                'author': {
                  '@type': 'Person',
                  'name': author,
                  'url': siteUrl
                },
                'publisher': {
                  '@type': 'Organization',
                  'name': 'Saad Faruque',
                  'logo': {
                    '@type': 'ImageObject',
                    'url': `${siteUrl}/logo192.png`
                  }
                },
                'description': description,
                'mainEntityOfPage': {
                  '@type': 'WebPage',
                  '@id': canonical
                }
              }
            : {
                '@context': 'https://schema.org',
                '@type': 'Person',
                'name': 'Saad Faruque',
                'url': siteUrl,
                'image': image,
                'jobTitle': 'Chief Information Officer & Cyber Security Expert',
                'worksFor': {
                  '@type': 'Organization',
                  'name': 'Technology Leadership'
                },
                'description': description,
                'sameAs': [
                  'https://twitter.com/saadfaruque', // Replace with actual links
                  'https://linkedin.com/in/saadfaruque',
                  'https://github.com/saadfaruque'
                ]
              }
        )}
      </script>
    </Helmet>
  );
};

export default SEO; 