import { TopicContent } from '../topicContent';

export const rateLimiting: TopicContent = {
  title: 'Rate Limiting & Throttling',
  description: 'Rate Limiting restricts the number of requests a user or service can make within a specified time window. Throttling is similar but often implies slowing down requests rather than outright rejecting them. These patterns are essential for preventing abuse, mitigating DDoS attacks, and ensuring fair resource allocation across users.',
  diagram: `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="bucketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="tokenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <marker id="arrowReq" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- Left Side: Token Bucket Algorithm -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">Token Bucket Algorithm</text>
    
    <!-- Token Refiller (Daemon) -->
    <rect x="130" y="80" width="100" height="40" fill="#334155" rx="6" stroke="#fbbf24"/>
    <text x="180" y="105" fill="#fde68a" font-size="12" font-family="sans-serif" text-anchor="middle">Refiller (10/sec)</text>

    <!-- Refill Drops -->
    <circle cx="180" cy="140" r="4" fill="#fbbf24"/>
    <circle cx="180" cy="155" r="4" fill="#fbbf24"/>
    <circle cx="180" cy="170" r="4" fill="#fbbf24"/>

    <!-- The Bucket -->
    <path d="M 120 190 L 130 290 L 230 290 L 240 190" fill="none" stroke="#64748b" stroke-width="4"/>
    <path d="M 131 290 L 229 290 L 236 210 L 124 210 Z" fill="url(#bucketGrad)" opacity="0.3"/>
    
    <!-- Tokens inside bucket -->
    <circle cx="150" cy="275" r="8" fill="url(#tokenGrad)"/>
    <circle cx="170" cy="275" r="8" fill="url(#tokenGrad)"/>
    <circle cx="190" cy="275" r="8" fill="url(#tokenGrad)"/>
    <circle cx="210" cy="275" r="8" fill="url(#tokenGrad)"/>
    <circle cx="160" cy="255" r="8" fill="url(#tokenGrad)"/>
    <circle cx="180" cy="255" r="8" fill="url(#tokenGrad)"/>
    <circle cx="200" cy="255" r="8" fill="url(#tokenGrad)"/>
    
    <text x="180" y="315" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Capacity: 20 Tokens</text>

    <!-- Requests -->
    <!-- Accepted Request -->
    <rect x="30" y="360" width="80" height="40" fill="#1e293b" rx="6" stroke="#10b981"/>
    <text x="70" y="385" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">Req 1 (Takes 1)</text>
    <path d="M 70 360 L 140 290" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowReq)"/>
    
    <!-- Rejected Request -->
    <rect x="250" y="360" width="80" height="40" fill="#1e293b" rx="6" stroke="#ef4444"/>
    <text x="290" y="385" fill="#fecaca" font-size="12" font-family="sans-serif" text-anchor="middle">Req 2 (Empty)</text>
    <path d="M 290 360 L 220 290" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowReq)"/>
    
    <text x="180" y="420" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">If bucket is empty, request is DROPPED (429).</text>
    <text x="180" y="435" fill="#34d399" font-size="11" font-family="sans-serif" text-anchor="middle">Allows short bursts up to Capacity.</text>
  </g>

  <!-- Right Side: Leaky Bucket / Connection Throttling -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="18" font-family="sans-serif" font-weight="bold" text-anchor="middle">Leaky Bucket Algorithm</text>

    <!-- Incoming Requests (Burst) -->
    <rect x="80" y="70" width="60" height="25" fill="#3b82f6" rx="4"/>
    <text x="110" y="87" fill="#fff" font-size="10" font-family="sans-serif" text-anchor="middle">ReqA</text>
    
    <rect x="150" y="70" width="60" height="25" fill="#3b82f6" rx="4"/>
    <text x="180" y="87" fill="#fff" font-size="10" font-family="sans-serif" text-anchor="middle">ReqB</text>

    <rect x="220" y="70" width="60" height="25" fill="#3b82f6" rx="4"/>
    <text x="250" y="87" fill="#fff" font-size="10" font-family="sans-serif" text-anchor="middle">ReqC</text>
    
    <path d="M 180 105 L 180 140" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowReq)"/>

    <!-- The Bucket (Queue) -->
    <path d="M 140 150 L 140 250 L 220 250 L 220 150" fill="none" stroke="#64748b" stroke-width="4"/>
    <text x="180" y="270" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Queue (Fixed Size)</text>

    <!-- Items in Queue -->
    <rect x="150" y="220" width="60" height="20" fill="#1e40af" rx="2"/>
    <rect x="150" y="195" width="60" height="20" fill="#1e40af" rx="2"/>
    <rect x="150" y="170" width="60" height="20" fill="#1e40af" rx="2"/>

    <!-- The Leak (Constant Output Rate) -->
    <path d="M 180 280 L 180 340" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowReq)"/>
    <rect x="190" y="300" width="80" height="20" fill="#064e3b" rx="4" stroke="#34d399"/>
    <text x="230" y="313" fill="#6ee7b7" font-size="10" font-family="sans-serif" text-anchor="middle">Constant Rate</text>

    <!-- Server -->
    <rect x="120" y="360" width="120" height="50" fill="#1e293b" rx="8" stroke="#94a3b8"/>
    <text x="180" y="385" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Server</text>
    <text x="180" y="400" fill="#cbd5e1" font-size="10" font-family="sans-serif" text-anchor="middle">(Processes sequentially)</text>

    <!-- Label -->
    <text x="180" y="435" fill="#f43f5e" font-size="11" font-family="sans-serif" text-anchor="middle">Smoothes bursts into a steady stream.</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Why Rate Limit?',
      description: 'Without rate limiting, a single user (or bad actor) can overwhelm your database with 10,000 requests per second, starving all other users and potentially crashing the service. Rate limiting strictly enforces an upper boundary on resource consumption.'
    },
    {
      title: 'Token Bucket Algorithm',
      description: 'Imagine a bucket that holds a maximum of `N` tokens. A background process adds a token to the bucket every `1/R` seconds. When a request arrives, it must take 1 token from the bucket. If the bucket is empty, the request is instantly rejected (HTTP 429 Too Many Requests). This is highly efficient and allows for "bursts" of traffic up to the bucket capacity.'
    },
    {
      title: 'Leaky Bucket Algorithm',
      description: 'Instead of dropping requests immediately, they are placed in a fixed-size queue (the bucket). The server pulls parameters from this queue at a constant, steady rate (the leak). If the queue fills up, new requests overflow and are dropped. This removes bursts entirely, forcing traffic into a predictable, smooth flow.'
    },
    {
      title: 'Where to Rate Limit',
      description: 'Rate limiting is almost always implemented at the **API Gateway** or Load Balancer (like Nginx, AWS API Gateway, or Cloudflare). It uses a fast, in-memory store like **Redis** (often using Redis INCR and expirations or specialized Lua scripts) to track the request counts across distributed servers.'
    }
  ],
  comparisonTable: {
    headers: ['Pattern', 'Bursts Allowed?', 'Memory Usage', 'Best For'],
    rows: [
      ['Token Bucket', 'Yes (up to bucket size)', 'Low (Stores 1 integer per user)', 'Public APIs (Stripe, Twitter) where brief bursts are acceptable.'],
      ['Leaky Bucket', 'No (smooths traffic)', 'Medium (Maintains a queue)', 'Protecting fragile legacy systems that require a strict steady pace.'],
      ['Fixed Window Counters', 'Yes (at window edges)', 'Very Low', 'Simple limits (100 reqs per hour), but suffers from 2x bursts at reset boundaries.'],
      ['Sliding Window Log', 'Yes', 'High (Stores timestamps of every req)', 'Extremely precise rate limiting where exact bounds must be guaranteed.']
    ]
  },
  pitfalls: [
    'Rate limiting by IP Address instead of Authenticated User ID. In enterprise environments, thousands of users might share a single NAT IP. Banning the IP bans the entire company.',
    'Not communicating limits. Always return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers so well-behaved clients know when to back off.',
    'Using an overly complicated distributed algorithm when simpler local node rate limiting (with slight inaccuracies) would suffice for the scale.'
  ]
};
