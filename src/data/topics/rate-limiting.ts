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
      title: 'Token Bucket vs Leaky Bucket',
      description: 'Token Bucket allows bursts (up to bucket size) by consuming pre-filled tokens. Leaky Bucket enforces a rigid process rate by queuing requests and "leaking" them at a constant speed, ideal for smooth traffic flows.'
    },
    {
      title: 'Sliding Window Counter',
      description: 'A hybrid approach that tracks request counts in the current and previous windows. By calculating a weighted average (e.g., $80\\%$ of previous window + current count), it prevents the "double-limit burst" inherent in Fixed Window algorithms.'
    },
    {
      title: 'Redis-Based Implementation',
      description: 'Distributed rate limiting uses Redis for its speed. Common patterns include `SETNX` for fixed windows or `ZSET` (sorted set) to implement a Sliding Window Log by storing request timestamps as scores.'
    }
  ],
  comparisonTable: {
    headers: ['Algorithm', 'Burst Handling', 'Memory Efficiency', 'Best For'],
    rows: [
      ['Token Bucket', 'Allowed (Bursty)', 'High (1 counter)', 'Modern APIs (AWS, Stripe).'],
      ['Leaky Bucket', 'Smooth (No Bursts)', 'Medium (Queue)', 'Legacy system protection.'],
      ['Fixed Window', '2x Burst at edges', 'Highest', 'Low-traffic, daily/monthly quotas.'],
      ['Sliding Window', 'Precise (No Edge Burst)', 'Medium', 'Strict tier-based limiting.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=CRGPbCbR0vM',
  approaches: [
    {
      title: 'Sliding Window Log (Redis ZSET)',
      content: '```lua\n-- Redis Lua Script for Precise Rate Limiting\nlocal current_time = ARGV[1]\nlocal window_start = current_time - ARGV[2]\nredis.call("ZREMRANGEBYSCORE", KEYS[1], 0, window_start)\nlocal count = redis.call("ZCARD", KEYS[1])\nif count < tonumber(ARGV[3]) then\n    redis.call("ZADD", KEYS[1], current_time, current_time)\n    return 1\nend\nreturn 0\n```',
      complexity: { time: 'O(log N)', space: 'O(N) per user' }
    }
  ],
  pitfalls: [
    'Race Conditions in Distributed Systems: Using `GET` and `SET` separately. Always use Redis Lua scripts or atomic increments.',
    'IP-based Limiting: Thousands of users behind a Corporate NAT/Proxy will share one limit. Use API Keys or User IDs instead.',
    'Clock Skew: In a distributed cluster, different servers might have different times, making window boundaries inconsistent.'
  ]
};
