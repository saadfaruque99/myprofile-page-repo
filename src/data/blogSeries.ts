export interface BlogPostMeta {
  id: string;
  title: string;
  filename: string;
  date: string;
  chapter?: number;
  excerpt: string;
  image: string;
  readTime: string;
  category: string;
  series?: string;
}

export interface BlogSeries {
  id: string;
  title: string;
  description: string;
  posts: BlogPostMeta[];
}

// LLM ecosystem images
const llmImages = {
  intro: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  foundation: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  vertical: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  discovery: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  coding: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  enterprise: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  infrastructure: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  creative: 'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  assistants: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  agents: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  emerging: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
  conclusion: 'https://images.unsplash.com/photo-1593673986595-638688d4a8bb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
};

// Define the LLM ecosystem series
export const llmEcosystemSeries: BlogSeries = {
  id: 'llm-ecosystem',
  title: 'The 2025 LLM Ecosystem',
  description: 'A comprehensive guide to the current LLM ecosystem, examining ten distinct categories of companies that are driving innovation and creating value.',
  posts: [
    {
      id: 'llm-ecosystem-intro',
      title: 'The 2025 LLM Ecosystem: Mapping the AI Revolution',
      filename: '00-llm-ecosystem-introduction.md',
      date: 'April 1, 2025',
      chapter: 0,
      excerpt: 'An overview of how the large language model (LLM) landscape has evolved since OpenAI released GPT-3 in 2020.',
      image: llmImages.intro,
      readTime: '3 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'foundation-model-providers',
      title: 'Chapter 1: Foundation Model Providers',
      filename: 'foundation-model-providers.md',
      date: 'April 2, 2025',
      chapter: 1,
      excerpt: 'A deep dive into the companies building the core AI models that power thousands of applications across the world.',
      image: llmImages.foundation,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'vertical-specific-llm-companies',
      title: 'Chapter 2: Vertical-Specific LLM Companies',
      filename: 'vertical-specific-llm-companies.md',
      date: 'April 3, 2025',
      chapter: 2,
      excerpt: 'An exploration of companies building AI solutions tailored to specific industries and use cases.',
      image: llmImages.vertical,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'ai-powered-information-discovery',
      title: 'Chapter 3: AI-Powered Information Discovery',
      filename: 'ai-powered-information-discovery.md',
      date: 'April 4, 2025',
      chapter: 3,
      excerpt: 'How AI is transforming how we search for, discover, and interact with information.',
      image: llmImages.discovery,
      readTime: '5 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'ai-coding-assistants',
      title: 'Chapter 4: AI Coding Assistants',
      filename: 'ai-coding-assistants.md',
      date: 'April 5, 2025',
      chapter: 4,
      excerpt: 'A look at how AI is revolutionizing software development through intelligent coding assistants.',
      image: llmImages.coding,
      readTime: '5 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'enterprise-llm-platforms',
      title: 'Chapter 5: Enterprise LLM Platforms',
      filename: 'enterprise-llm-platforms.md',
      date: 'April 6, 2025',
      chapter: 5,
      excerpt: 'Exploring platforms that help companies deploy, customize, and manage AI systems at scale.',
      image: llmImages.enterprise,
      readTime: '5 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'ai-infrastructure-companies',
      title: 'Chapter 6: AI Infrastructure Companies',
      filename: 'ai-infrastructure-companies.md',
      date: 'April 7, 2025',
      chapter: 6,
      excerpt: 'The technology backbone enabling the AI revolution - companies building specialized hardware and software.',
      image: llmImages.infrastructure,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'creative-ai-tools',
      title: 'Chapter 7: Creative AI Tools',
      filename: 'creative-ai-tools.md',
      date: 'April 8, 2025',
      chapter: 7,
      excerpt: 'How AI is revolutionizing content creation across text, image, video, and audio domains.',
      image: llmImages.creative,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'personalized-ai-assistants',
      title: 'Chapter 8: Personalized AI Assistants',
      filename: 'personalized-ai-assistants.md',
      date: 'April 9, 2025',
      chapter: 8,
      excerpt: 'The rise of AI companions and assistants that adapt to individual needs and preferences.',
      image: llmImages.assistants,
      readTime: '5 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'tool-using-ai-agents',
      title: 'Chapter 9: Tool-Using AI Agents',
      filename: 'tool-using-ai-agents.md',
      date: 'April 10, 2025',
      chapter: 9,
      excerpt: 'Exploring AI systems that can use external tools and take actions in the real world.',
      image: llmImages.agents,
      readTime: '5 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'emerging-categories',
      title: 'Chapter 10: Emerging Categories',
      filename: 'emerging-categories.md',
      date: 'April 11, 2025',
      chapter: 10,
      excerpt: 'The cutting-edge areas of AI development that are just beginning to take shape.',
      image: llmImages.emerging,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    },
    {
      id: 'llm-ecosystem-conclusion',
      title: 'The Future of AI: Concluding Our LLM Ecosystem Series',
      filename: 'llm-ecosystem-conclusion.md',
      date: 'April 12, 2025',
      chapter: 11,
      excerpt: 'Synthesizing insights from our exploration of the LLM ecosystem and looking toward future developments.',
      image: llmImages.conclusion,
      readTime: '6 min read',
      category: 'AI',
      series: 'The 2025 LLM Ecosystem'
    }
  ]
};

// All blog series
export const blogSeries: BlogSeries[] = [
  llmEcosystemSeries
];

// All blog posts (flattened)
export const allBlogPosts = blogSeries.flatMap(series => series.posts);

// Log to verify series assignments
console.log("Available blog series:", blogSeries.map(s => s.title));
console.log("All posts with series:", allBlogPosts.filter(p => p.series).length); 