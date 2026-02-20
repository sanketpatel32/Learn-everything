import { TopicContent } from '../topicContent';

export const rateLimiter: TopicContent = {
  title: 'Design a Distributed Rate Limiter',
  description: 'A Distributed Rate Limiter prevents API abuse, protects backend microservices from DDoS attacks, and enforces pricing tiers (e.g., 100 requests per minute). It requires designing algorithms (Token Bucket/Leaky Bucket) that synchronize seamlessly across a global cluster of API Gateways.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="gwGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="redisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Clients -->
  <rect x="20" y="80" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="98" fill="#f8fafc" font-size="10" text-anchor="middle">User A</text>
  <text x="60" y="110" fill="#94a3b8" font-size="8" text-anchor="middle">(Req: 10/sec)</text>

  <rect x="20" y="240" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="258" fill="#f8fafc" font-size="10" text-anchor="middle">User B</text>
  <text x="60" y="270" fill="#94a3b8" font-size="8" text-anchor="middle">(DDoS Bot)</text>

  <rect x="20" y="290" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="308" fill="#f8fafc" font-size="10" text-anchor="middle">User B</text>
  <text x="60" y="320" fill="#94a3b8" font-size="8" text-anchor="middle">(DDoS Bot)</text>


  <!-- API Gateway Layer -->
  <rect x="180" y="40" width="120" height="300" fill="url(#gwGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="240" y="70" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">API Gateway</text>
  <text x="240" y="85" fill="#bfdbfe" font-size="9" text-anchor="middle">(Envoy / Nginx)</text>
  
  <rect x="200" y="110" width="80" height="40" fill="#1e3a8a" rx="4"/>
  <text x="240" y="128" fill="#bfdbfe" font-size="9" font-weight="bold" text-anchor="middle">Rate Limit</text>
  <text x="240" y="140" fill="#bfdbfe" font-size="9" font-weight="bold" text-anchor="middle">Filter</text>

  <rect x="200" y="250" width="80" height="40" fill="#1e3a8a" rx="4"/>
  <text x="240" y="268" fill="#bfdbfe" font-size="9" font-weight="bold" text-anchor="middle">Rate Limit</text>
  <text x="240" y="280" fill="#bfdbfe" font-size="9" font-weight="bold" text-anchor="middle">Filter</text>


  <!-- Flow Lines (Inbound) -->
  <path d="M 100 100 L 180 120" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 100 260 L 180 260" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowR)"/>
  <path d="M 100 310 L 180 280" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowR)"/>


  <!-- Centralized Redis Storage -->
  <rect x="400" y="120" width="160" height="120" fill="url(#redisGrad)" rx="8" stroke="#fca5a5" stroke-width="2"/>
  <text x="480" y="150" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Redis Cluster</text>
  <text x="480" y="165" fill="#fecaca" font-size="9" text-anchor="middle">(In-Memory state)</text>

  <rect x="420" y="180" width="120" height="40" fill="#7f1d1d" rx="4" stroke="#ef4444"/>
  <text x="480" y="195" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="middle">UserA_IP: 8 tokens</text>
  <text x="480" y="210" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="middle">UserB_IP: 0 tokens</text>


  <!-- Flow Lines (To Redis) -->
  <path d="M 280 130 L 400 180" stroke="#fca5a5" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowR)"/>
  <text x="340" y="145" fill="#fca5a5" font-size="9" transform="rotate(25, 340, 145)">1. Decrement & Validate</text>

  <path d="M 280 270 L 400 210" stroke="#fca5a5" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowR)"/>
  <text x="340" y="255" fill="#fca5a5" font-size="9" transform="rotate(-25, 340, 255)">1. Decrement & Validate</text>

  <!-- Rejection -->
  <path d="M 230 250 L 140 210" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowR)"/>
  <text x="170" y="215" fill="#fca5a5" font-size="10" font-weight="bold" transform="rotate(-25, 170, 215)">429 Too Many Req</text>


  <!-- Allowed Flow -->
  <rect x="640" y="40" width="120" height="100" fill="url(#apiGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="700" y="80" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Backend Microservices</text>
  <text x="700" y="100" fill="#a7f3d0" font-size="9" text-anchor="middle">SAFELY PROTECTED</text>

  <path d="M 280 100 L 640 100" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="460" y="90" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle">2. Forward Request (Allowed)</text>


  <!-- Key Explanation: Lua Script / Race Conditions -->
  <rect x="400" y="280" width="360" height="120" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="580" y="300" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Concurrency Safety (Redis Lua Scripts)</text>
  
  <text x="420" y="330" fill="#94a3b8" font-size="11" font-weight="bold">If User queries 2 Gateways exactly at 0.00ms:</text>
  <text x="420" y="350" fill="#ef4444" font-size="10">Race Condition:</text>
  <text x="420" y="365" fill="#ef4444" font-size="10">GW1 calls \`GET tokens\` (reads 1) -&gt; GW2 calls \`GET tokens\` (reads 1)</text>
  <text x="420" y="380" fill="#ef4444" font-size="10">GW1 calls \`SET tokens 0\` -&gt; GW2 calls \`SET tokens 0\`. Both pass! (Bypass)</text>

  <text x="420" y="410" fill="#34d399" font-size="10">Solution: Use Redis EVAL (Lua script) to lock the GET+DECREMENT in C.</text>
  <text x="420" y="425" fill="#34d399" font-size="10">Atomic operation executes entirely on the Redis thread without interruption.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Token Bucket Algorithm',
      description: 'The industry standard (used by AWS and Stripe). Imagine a bucket holding 10 tokens. Every second, a refill script drops 1 token in (up to 10 max). When a user makes an API request, they take 1 token. If the bucket is empty (0 tokens), the server rejects the request with HTTP `429 Too Many Requests`.'
    },
    {
      title: 'Local vs Distributed Caching',
      description: 'You cannot rate limit on the local memory of a single API Gateway server. If you have 5 instances of the API Gateway, an attacker looping across all 5 servers would bypass your "10 requests/min" limit and achieve 50 requests/min. The bucket state MUST be centralized in a distributed cache like Redis.'
    },
    {
      title: 'Redis Lua Scripting (Atomic Execution)',
      description: 'If you use standard `GET` and `SET` commands, you encounter Race Conditions. Gateway A and Gateway B might simultaneously read `tokens=1`, both decrement to 0, and both allow the user through. Redis runs Lua scripts atomically. The `GET`, check, and `DECREMENT` happen as one unbreakable database operation, preventing double-reads.'
    },
    {
      title: 'Fixed Window vs Sliding Window Log',
      description: 'A Fixed Window (resets every minute, e.g., at 1:00, 1:01, 1:02) has a major flaw: The spike at the edges. A user could send 100 requests at 1:00:59, and another 100 at 1:01:00. The backend is hit with 200 requests within 2 seconds. A Sliding Window Log uses Redis Sorted Sets to track exact request timestamps and mathematically guarantees smooth distribution.'
    }
  ],
  comparisonTable: {
    headers: ['Algorithm', 'Memory Usage', 'Accuracy'],
    rows: [
      ['Token Bucket', 'Very Low', 'High (Supports bursts)'],
      ['Sliding Window', 'Medium', 'Excellent (Strict limits)'],
      ['Fixed Window', 'Very Low', 'Poor (Burst edge cases)'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=FU4WlwfS3G0',
  pitfalls: [
    'Ignoring Network Latency: A round trip to Redis takes 2ms. If an API gateway handles 100,000 requests/sec, that 2ms latency stacks up and bottlenecks the gateway. Rate limiting must be insanely fast and ideally batched asynchronously if exact precision is not 100% vital.',
    'Rate Limiting by IP Address in shared networks: If you limit strictly by IPv4, you might accidentally block an entire University campus or Corporate NAT sharing one public IP. Limits should ideally apply using Auth Bearer Tokens (User ID) whenever possible.',
    'Failing Closed: If the Redis Cluster crashes, your Rate Limiter logic must either "Fail Open" (allow all traffic, risking backend overload) or "Fail Closed" (deny all 100% of traffic, causing immediate company outage). Fail Open is usually preferred.'
  ]
};
