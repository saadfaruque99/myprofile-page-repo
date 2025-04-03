import { useEffect, useState } from 'react';

export interface MarkdownFile {
  content: string;
  metadata: {
    title: string;
    chapter?: number;
    date?: string;
    image?: string;
  };
}

// Function to extract metadata from markdown frontmatter
const extractMetadata = (content: string): { content: string; metadata: any } => {
  // Check if the content has a title in markdown format (# Title)
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled';
  
  // Extract chapter number if present in the title
  const chapterMatch = title.match(/Chapter (\d+)/i);
  const chapter = chapterMatch ? parseInt(chapterMatch[1]) : undefined;

  // Simple metadata extraction - can be expanded later
  return {
    content,
    metadata: {
      title,
      chapter,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      })
    }
  };
};

export const useMarkdownFile = (filePath: string): MarkdownFile | null => {
  const [markdownData, setMarkdownData] = useState<MarkdownFile | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filePath}`);
        }
        const text = await response.text();
        setMarkdownData(extractMetadata(text));
      } catch (error) {
        console.error(`Error loading markdown file ${filePath}:`, error);
        setMarkdownData(null);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  return markdownData;
};

export const loadMarkdownFile = async (filePath: string): Promise<MarkdownFile | null> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}`);
    }
    const text = await response.text();
    return extractMetadata(text);
  } catch (error) {
    console.error(`Error loading markdown file ${filePath}:`, error);
    return null;
  }
}; 