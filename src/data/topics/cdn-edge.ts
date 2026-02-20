import { TopicContent } from '../topicContent';

export const cdnEdge: TopicContent = {
  title: 'CDN & Edge Computing',
  description: 'A Content Delivery Network (CDN) is a globally distributed network of proxy servers. Its primary goal is to deliver content to users faster by serving it from a location physically closer to them. Edge Computing takes this a step further by running actual application code at these distributed locations, not just serving static files.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0ea5e9" />
      <stop offset="100%" stop-color="#0284c7" />
    </radialGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f8fafc" />
    </marker>
    <marker id="arrowOrigin" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>
  
  <!-- "World" Map representation (abstract circles) -->
  <circle cx="400" cy="225" r="180" fill="url(#globeGrad)" opacity="0.1"/>
  <!-- Latitude/Longitude lines -->
  <path d="M 220 225 C 220 100, 580 100, 580 225 C 580 350, 220 350, 220 225" stroke="#38bdf8" stroke-width="1" fill="none" opacity="0.2"/>
  <path d="M 400 45 C 300 45, 300 405, 400 405 C 500 405, 500 45, 400 45" stroke="#38bdf8" stroke-width="1" fill="none" opacity="0.2"/>

  <!-- Origin Server (Central) -->
  <g transform="translate(360, 185)">
    <rect x="0" y="0" width="80" height="80" fill="#1e293b" rx="12" stroke="#fbbf24" stroke-width="3"/>
    <text x="40" y="45" fill="#fde68a" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Origin</text>
    <text x="40" y="60" fill="#fde68a" font-size="10" font-family="sans-serif" text-anchor="middle">Server</text>
    <text x="40" y="95" fill="#fbbf24" font-size="10" font-family="sans-serif" text-anchor="middle">Location: US-East</text>
  </g>

  <!-- Edge Nodes / Points of Presence (PoPs) -->
  <!-- PoP 1: Asia -->
  <g transform="translate(150, 100)">
    <circle cx="40" cy="40" r="30" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
    <text x="40" y="45" fill="#bae6fd" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">PoP</text>
    <text x="40" y="85" fill="#38bdf8" font-size="10" font-family="sans-serif" text-anchor="middle">Tokyo</text>
  </g>
  <!-- PoP 2: Europe -->
  <g transform="translate(570, 100)">
    <circle cx="40" cy="40" r="30" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
    <text x="40" y="45" fill="#bae6fd" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">PoP</text>
    <text x="40" y="85" fill="#38bdf8" font-size="10" font-family="sans-serif" text-anchor="middle">London</text>
  </g>
  <!-- PoP 3: South America -->
  <g transform="translate(250, 300)">
    <circle cx="40" cy="40" r="30" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
    <text x="40" y="45" fill="#bae6fd" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">PoP</text>
    <text x="40" y="85" fill="#38bdf8" font-size="10" font-family="sans-serif" text-anchor="middle">São Paulo</text>
  </g>

  <!-- Connections Origin -> PoP (Caching/Sync) -->
  <path d="M 360 225 L 220 140" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 4" fill="none" marker-end="url(#arrowOrigin)"/>
  <path d="M 440 225 L 570 140" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 4" fill="none" marker-end="url(#arrowOrigin)"/>
  <path d="M 400 265 L 300 300" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 4" fill="none" marker-end="url(#arrowOrigin)"/>
  
  <rect x="240" y="160" width="70" height="20" fill="#0f172a" rx="4"/>
  <text x="275" y="174" fill="#fbbf24" font-size="9" font-family="sans-serif" text-anchor="middle">Cache Miss</text>

  <!-- Users -->
  <!-- User 1 (Hits Tokyo) -->
  <g transform="translate(50, 50)">
    <circle cx="20" cy="20" r="15" fill="#475569"/>
    <text x="20" y="25" fill="#f8fafc" font-size="10" font-family="sans-serif" text-anchor="middle">User</text>
  </g>
  <path d="M 80 70 L 150 110" stroke="#f8fafc" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <rect x="80" y="95" width="50" height="15" fill="#10b981" rx="4"/>
  <text x="105" y="106" fill="#064e3b" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">10ms Latency</text>

  <!-- User 2 (Hits London) -->
  <g transform="translate(710, 50)">
    <circle cx="20" cy="20" r="15" fill="#475569"/>
    <text x="20" y="25" fill="#f8fafc" font-size="10" font-family="sans-serif" text-anchor="middle">User</text>
  </g>
  <path d="M 710 70 L 630 110" stroke="#f8fafc" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <rect x="650" y="70" width="50" height="15" fill="#10b981" rx="4"/>
  <text x="675" y="81" fill="#064e3b" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">8ms Latency</text>

  <!-- User 3 (Hits São Paulo) -->
  <g transform="translate(150, 360)">
    <circle cx="20" cy="20" r="15" fill="#475569"/>
    <text x="20" y="25" fill="#f8fafc" font-size="10" font-family="sans-serif" text-anchor="middle">User</text>
  </g>
  <path d="M 180 370 L 250 340" stroke="#f8fafc" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <rect x="180" y="335" width="50" height="15" fill="#10b981" rx="4"/>
  <text x="205" y="346" fill="#064e3b" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">15ms Latency</text>

  <!-- The "What If No CDN" scenario line -->
  <path d="M 70 80 L 360 200" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2" fill="none"/>
  <rect x="120" y="140" width="60" height="15" fill="#ef4444" rx="4"/>
  <text x="150" y="151" fill="#7f1d1d" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">250ms (No CDN)</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The Speed of Light Problem',
      description: 'Data cannot travel faster than the speed of light. If your server is in New York, a user in Tokyo will inevitably experience latency (lag) while the data physically travels across the ocean. CDNs solve this by placing proxy servers (Points of Presence / PoPs) in every major city globally.'
    },
    {
      title: 'Pull vs Push CDNs',
      description: 'In a **Pull CDN** (most common), the user requests an image from the CDN. If the CDN doesn\'t have it (Cache Miss), the CDN fetches it from the Origin Server, caches it, and serves it. In a **Push CDN**, developers proactively upload content to the CDN before users even ask for it (great for massive game patches or highly predictable traffic).'
    },
    {
      title: 'Edge Computing',
      description: 'Traditionally, CDNs only cached static files (images, CSS, JS). Modern Edge Computing allows developers to run lightweight functions (like AWS Lambda@Edge or Cloudflare Workers) directly on the CDN nodes. This allows you to perform instant A/B testing, JWT validation, or custom routing at the edge, saving a round-trip to the origin server entirely.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Origin Server', 'CDN (Caching)', 'Edge Computing'],
    rows: [
      ['Location', 'Centralized (e.g. 1 data center)', 'Globally Distributed (100+ cities)', 'Globally Distributed (100+ cities)'],
      ['Content Type', 'Dynamically generated data (Database)', 'Static Assets (Images, Video, HTML)', 'Lightweight logic / Compute functions'],
      ['Latency for User', 'High (Depending on geography)', 'Extremely Low (Served from their city)', 'Extremely Low (Computed in their city)'],
      ['Compute Power', 'Heavy logic, heavy database reads', 'Zero compute, pure storage retrieval', 'Light logic, JWT parsing, fast re-routing']
    ]
  },
  pitfalls: [
    'Caching dynamically personalized data (like a user\'s shopping cart) on a public CDN. You risk serving User A\'s private data to User B.',
    'Forgetting Cache Invalidation. If you update your company logo but don\'t send an invalidation/purge request to the CDN, users will see the old logo until the Time-To-Live (TTL) naturally expires.',
    'Over-engineering Edge Logic: Edge computing environments are highly constrained (e.g. 50ms CPU time limits). Do not put heavy, blocking database transactions on Edge Workers.'
  ]
};
