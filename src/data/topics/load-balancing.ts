import { TopicContent } from '../topicContent';

export const loadBalancing: TopicContent = {
  title: 'Load Balancing (L4 vs L7)',
  description: 'A Load Balancer (LB) acts as the "traffic cop" sitting in front of your servers, routing client requests across all servers capable of fulfilling them in a manner that maximizes speed and capacity utilization.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="l4grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <linearGradient id="l7grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <marker id="arrowL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>

  <!-- Layer 4 Load Balancing (Left) -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Layer 4 (Transport Layer)</text>
    <text x="180" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Routes by IP + TCP/UDP Port</text>
    
    <!-- Client -->
    <circle cx="180" cy="110" r="20" fill="#334155" stroke="#94a3b8"/>
    <text x="180" y="115" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Client</text>
    
    <path d="M 180 130 L 180 180" stroke="#64748b" stroke-width="2" marker-end="url(#arrowL)"/>
    
    <!-- L4 LB -->
    <rect x="130" y="190" width="100" height="50" fill="url(#l4grad)" rx="8" shadow="true"/>
    <text x="180" y="220" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">L4 LB</text>
    
    <!-- Blind Routing Lines -->
    <path d="M 180 240 L 100 300" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrowL)" stroke-dasharray="4 4"/>
    <path d="M 180 240 L 260 300" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrowL)" stroke-dasharray="4 4"/>
    
    <!-- Servers -->
    <rect x="60" y="310" width="80" height="40" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="335" fill="#93c5fd" font-size="12" font-family="sans-serif" text-anchor="middle">Server A</text>
    
    <rect x="220" y="310" width="80" height="40" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="335" fill="#93c5fd" font-size="12" font-family="sans-serif" text-anchor="middle">Server B</text>
    
    <text x="180" y="375" fill="#64748b" font-size="11" font-family="sans-serif" font-style="italic" text-anchor="middle">Requires connection termination at server</text>
  </g>

  <!-- Layer 7 Load Balancing (Right) -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Layer 7 (Application Layer)</text>
    <text x="180" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Routes by URL, Headers, Cookies</text>
    
    <!-- Client -->
    <circle cx="180" cy="110" r="20" fill="#334155" stroke="#94a3b8"/>
    <text x="180" y="115" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Client</text>
    
    <path d="M 180 130 L 180 160" stroke="#64748b" stroke-width="2" marker-end="url(#arrowL)"/>
    <text x="225" y="150" fill="#c4b5fd" font-size="10" font-family="sans-serif" text-anchor="middle">GET /api/images</text>
    
    <!-- L7 LB -->
    <rect x="130" y="170" width="100" height="60" fill="url(#l7grad)" rx="8"/>
    <text x="180" y="200" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">L7 LB</text>
    <text x="180" y="215" fill="#ddd6fe" font-size="10" font-family="sans-serif" text-anchor="middle">(Terminates TLS/TCP)</text>
    
    <!-- Intelligent Routing Lines -->
    <path d="M 180 230 L 100 300" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowL)"/>
    <path d="M 180 230 L 260 300" stroke="#64748b" stroke-width="2" opacity="0.3" fill="none"/>
    
    <!-- Servers -->
    <rect x="60" y="310" width="80" height="40" fill="#1e293b" stroke="#8b5cf6" rx="6"/>
    <text x="100" y="325" fill="#ddd6fe" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">ImageSrv</text>
    <text x="100" y="340" fill="#8b5cf6" font-size="10" font-family="sans-serif" text-anchor="middle">Port 8000</text>
    
    <rect x="220" y="310" width="80" height="40" fill="#1e293b" stroke="#64748b" stroke-dasharray="2 2" rx="6"/>
    <text x="260" y="325" fill="#94a3b8" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">AuthSrv</text>
    <text x="260" y="340" fill="#64748b" font-size="10" font-family="sans-serif" text-anchor="middle">Port 9000</text>
    
    <text x="180" y="375" fill="#c4b5fd" font-size="11" font-family="sans-serif" font-style="italic" text-anchor="middle">LB proxies connection to specific microservice</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Layer 4 Load Balancing (Transport)',
      description: 'Layer 4 LBs operate purely at the TCP/UDP level. They look only at the source/destination IPs and ports. Because they do not inspect the actual content of the packets (like HTTP headers or the payload), they are incredibly fast and require very little compute. The connection is established directly between the client and the backend server (the LB just forwards packets blindly).'
    },
    {
      title: 'Layer 7 Load Balancing (Application)',
      description: 'Layer 7 LBs operate at the highest level of the OSI model. They fully decipher the network traffic (HTTP/HTTPS, WebSockets). This allows them to make "Intelligent Routing" decisions. For example, if the path is `/api/video`, route to the video microservice; if the path is `/api/auth`, route to the authentication pool. The LB actively terminates the client\'s TCP bridge, reads the payload, and then manages a *separate* TCP bridge to the backend server.'
    },
    {
      title: 'Health Checks & Failover',
      description: 'To route effectively, LBs must ensure a server is alive via Health Checks. **Active Health Checks** involve the LB sending periodic requests (e.g., HTTP GET /health) to each server. **Passive Health Checks** monitor live traffic for errors (e.g., observing consecutive 5xx errors). If a server fails, the LB automatically removes it from the rotation and redirects traffic to healthy nodes, ensuring high availability.'
    },
    {
      title: 'Session Persistence (Sticky Sessions)',
      description: 'Standard load balancing is stateless. However, if a server stores local session data (non-distributed cache), the LB must use **Sticky Sessions** (Affinity). This is achieved via **IP Hashing** or **Cookies**. A major downside is that it prevents perfect even distribution (hotspotting) and makes scaling difficult. At Layer 7, the LB often inserts an `X-Forwarded-For` header so the backend knows the actual client IP despite the LB proxying the request.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Layer 4 (Fast/Dumb)', 'Layer 7 (Smart/Detailed)'],
    rows: [
      ['Routing Intelligence', 'Dumb: Routes by IP & Port only', 'Smart: Routes by URL, Cookie, Header'],
      ['Performance (Speed)', 'Extremely High (Packet forwarding)', 'Slower (Terminates TLS, inspects packet)'],
      ['Microservices Support', 'Poor (Treats all servers equally)', 'Excellent (Can route to specific domains/paths)'],
      ['Caching & Compression', 'Not possible', 'Supported (can cache API responses)'],
      ['TLS/SSL Termination', 'Client talks directly to server', 'LB decrypts traffic (reduces CPU load on servers)'],
      ['Session Persistence', 'Via IP Hashing', 'Via Cookies or Custom Headers']
    ]
  },
  pitfalls: [
    'Assuming L7 load balancers are always better. Hardware L4 balancers can handle millions of connections per second and are essential for extreme DDoS protection.',
    'Forgetting that L7 Load Balancers become single points of failure that require high CPU availability to decrypt TLS (SSL Offloading).',
    'Using Round-Robin when backend servers have drastically varying response times or computational capabilities (use Least Connections instead).',
    'Not accounting for "Thundering Herd" if an LB recovers or a new server is added; health check intervals must be carefully tuned to prevent overwhelming a newly joined node.'
  ]
};
