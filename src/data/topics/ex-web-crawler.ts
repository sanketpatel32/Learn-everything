import { TopicContent } from '../topicContent';

export const exWebCrawler: TopicContent = {
  title: 'Design a Distributed Web Crawler',
  description: 'Designing a system to systematically browse the World Wide Web, typically for indexing (Google) or archiving.',
  concepts: [
    {
      name: 'Seed URLs & Frontier',
      details: 'A priority queue of URLs representing unvisited links. The crawler pops these, downloads content, and extracts more links.'
    },
    {
      name: 'Politeness Policy',
      details: 'Crawlers must not overwhelm a target server. They enforce gaps between requests, often guided by the `robots.txt` file of the host.'
    },
    {
      name: 'Duplicate Detection',
      details: 'Using cryptographic hashes (SHA-256) of page content to avoid continually storing identical files or infinite loops through duplicate links.'
    }
  ],
  approaches: [
    {
      title: 'Distributed Architecture',
      content: 'A central URL Frontier (Kafka / Redis) feeds thousands of worker nodes. Workers extract links, filter seen URLs (via Bloom Filters), and push new ones back to the queue.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Spider traps: URLs that programmatically output infinite links (e.g., `foo.com/1/2/3/4/...`); solution involves enforcing path depth limits.',
    'Outgrowing a HashSet for tracking seen URLs; you need a Bloom Filter or distributed Key-Value store to track billions of strings efficiently.',
    'Ignoring DNS resolution overhead; crawlers must implement local DNS caching to avoid crippling the entire network\'s DNS servers.'
  ]
};
