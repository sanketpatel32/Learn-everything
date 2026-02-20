import { TopicContent } from '../topicContent';

export const scalingTypes: TopicContent = {
  title: 'Vertical vs Horizontal Scaling',
  description: 'When a system hits its limits and performance degrades, you must scale. You have two primary options: scale up (make the server bigger) or scale out (add more servers in parallel).',
  diagram: `
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
    </marker>
  </defs>

  <!-- Vertical Scaling (Left Side) -->
  <g transform="translate(0, 0)">
    <rect x="20" y="20" width="360" height="360" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="200" y="60" fill="#f8fafc" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle">Vertical Scaling (Scale Up)</text>
    <text x="200" y="90" fill="#94a3b8" font-size="14" font-family="sans-serif" text-anchor="middle">Bigger, faster server hardware</text>
    
    <!-- Initial server -->
    <rect x="150" y="250" width="100" height="60" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="8"/>
    <text x="200" y="285" fill="#60a5fa" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Node</text>
    
    <!-- Up arrow -->
    <path d="M 200 230 L 200 160" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
    
    <!-- Scaled server -->
    <rect x="120" y="110" width="160" height="100" fill="#1e293b" stroke="#8b5cf6" stroke-width="4" rx="12"/>
    <text x="200" y="165" fill="#c4b5fd" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">SUPER NODE</text>
  </g>

  <!-- Horizontal Scaling (Right Side) -->
  <g transform="translate(400, 0)">
    <rect x="20" y="20" width="360" height="360" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="200" y="60" fill="#f8fafc" font-size="22" font-family="sans-serif" font-weight="bold" text-anchor="middle">Horizontal Scaling (Scale Out)</text>
    <text x="200" y="90" fill="#94a3b8" font-size="14" font-family="sans-serif" text-anchor="middle">Adding more standard servers</text>
    
    <!-- Initial server -->
    <rect x="60" y="180" width="80" height="50" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8"/>
    <text x="100" y="210" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Node A</text>
    
    <!-- Right arrow pointing to LB -->
    <path d="M 150 205 L 180 205" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
    
    <!-- Load Balancer -->
    <circle cx="220" cy="205" r="25" fill="#334155" stroke="#eab308" stroke-width="2"/>
    <text x="220" y="210" fill="#fde047" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">LB</text>
    
    <!-- Paths to nodes -->
    <path d="M 245 205 L 270 145" stroke="#94a3b8" stroke-width="2" fill="none"/>
    <path d="M 245 205 L 270 205" stroke="#94a3b8" stroke-width="2" fill="none"/>
    <path d="M 245 205 L 270 265" stroke="#94a3b8" stroke-width="2" fill="none"/>
    
    <!-- Scaled nodes -->
    <rect x="270" y="120" width="80" height="50" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8"/>
    <text x="310" y="150" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Node A</text>

    <rect x="270" y="180" width="80" height="50" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8"/>
    <text x="310" y="210" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Node B</text>
    
    <rect x="270" y="240" width="80" height="50" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8"/>
    <text x="310" y="270" fill="#34d399" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Node C</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Vertical Scaling (Scale Up)',
      description: 'Involves upgrading the specifications of an existing machine (e.g., adding more CPU cores, increasing RAM, or attaching faster SSDs). It requires zero architectural changes to your code, as the application remains a monolithic deployment running on a single box. However, it suffers from a strict hardware limit (you cannot buy infinitely large RAM) and requires downtime to upgrade.'
    },
    {
      title: 'Horizontal Scaling (Scale Out)',
      description: 'Involves adding entirely new machines to your resource pool. Instead of buying a supercomputer, you use a fleet of cheap, standard computers. This requires architectural shifts: you must introduce a **Load Balancer** to distribute traffic, ensuring requests are routed evenly. It offers infinite scalability and high availability (if one node dies, traffic is routed to others).'
    },
    {
      title: 'The Database Dilemma',
      description: 'Scaling web servers horizontally is easy because they are inherently stateless. Scaling a SQL database horizontally is incredibly complex. A master database cannot easily share compute without risking synchronization lockups. Most databases start by vertically scaling to the absolute maximum before finally adopting horizontal sharding/partitioning as a last resort.'
    }
  ],
  comparisonTable: {
    headers: ['Dimension', 'Vertical Scaling (Up)', 'Horizontal Scaling (Out)'],
    rows: [
      ['Ceiling (Limit)', 'Strict hard limit imposed by hardware', 'Practically infinite limits'],
      ['Cost', 'Exponentially expensive for enterprise-grade hardware', 'Linear/Cheap commodity hardware'],
      ['Complexity', 'Extremely simple (No code changes needed)', 'Complex (Requires Load Balancers, Distributed state)'],
      ['Availability', 'Single Point of Failure (SPOF)', 'High Availability (Fault tolerant)'],
      ['Upgrade process', 'Usually involves application downtime', 'Zero downtime (Rolling updates)']
    ]
  },
  pitfalls: [
    'Prematurely scaling out: Modifying your application to support distributed state and stateless sessions too early adds immense engineering overhead.',
    'Forgetting that Horizontal Scaling breaks in-memory application state caching. You must migrate to distributed caching (Redis/Memcached).',
    'Assuming databases can be horizontally scaled as easily as web servers.'
  ]
};
