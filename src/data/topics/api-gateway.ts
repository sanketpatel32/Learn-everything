import { TopicContent } from '../topicContent';

export const apiGatewayBff: TopicContent = {
  title: 'API Gateway & BFF',
  description: 'In a microservices architecture, exposing dozens of internal services directly to external clients is a massive security and maintenance risk. An API Gateway acts as the single entry point. The BFF (Backend-For-Frontend) pattern takes this further by creating custom gateways tailored for specific clients (Mobile, Web, TV).',
  diagram: `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="gwGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="bffMobile" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="bffWeb" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowGateway" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- Left Side: Monolithic Gateway -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Standard API Gateway</text>
    
    <!-- Clients -->
    <rect x="50" y="80" width="60" height="40" fill="#334155" rx="6" stroke="#f8fafc"/>
    <text x="80" y="105" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Mobile</text>

    <rect x="250" y="80" width="60" height="40" fill="#334155" rx="6" stroke="#f8fafc"/>
    <text x="280" y="105" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">WebApp</text>

    <!-- The Gateway -->
    <rect x="80" y="180" width="200" height="80" fill="url(#gwGrad)" rx="8" shadow="true"/>
    <text x="180" y="210" fill="#fff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">API Gateway</text>
    <text x="180" y="230" fill="#bfdbfe" font-size="10" font-family="sans-serif" text-anchor="middle">Auth | Rate Limits | Routing</text>
    <text x="180" y="245" fill="#93c5fd" font-size="10" font-family="sans-serif" text-anchor="middle">GraphQL Aggregation</text>

    <!-- Routing Lines In -->
    <path d="M 80 120 L 140 180" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 280 120 L 220 180" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>

    <!-- Microservices -->
    <rect x="40" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="80" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">User Srv</text>

    <rect x="140" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="180" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Order Srv</text>

    <rect x="240" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="280" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Pay Srv</text>

    <!-- Routing Lines Out -->
    <path d="M 140 260 L 80 320" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 180 260 L 180 320" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 220 260 L 280 320" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>

    <!-- Label -->
    <text x="180" y="420" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">One massive gateway for all clients.</text>
    <text x="180" y="435" fill="#f43f5e" font-size="11" font-family="sans-serif" text-anchor="middle">Can become a monolithic bottleneck.</text>
  </g>

  <!-- Right Side: BFF Pattern -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Backend-For-Frontend (BFF)</text>
    
    <!-- Clients -->
    <rect x="70" y="80" width="60" height="40" fill="#334155" rx="6" stroke="#a78bfa"/>
    <text x="100" y="105" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Mobile</text>

    <rect x="230" y="80" width="60" height="40" fill="#334155" rx="6" stroke="#34d399"/>
    <text x="260" y="105" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">WebApp</text>

    <!-- Mobile BFF -->
    <rect x="40" y="180" width="120" height="80" fill="url(#bffMobile)" rx="8"/>
    <text x="100" y="210" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Mobile BFF</text>
    <text x="100" y="230" fill="#ddd6fe" font-size="10" font-family="sans-serif" text-anchor="middle">Small Payloads</text>
    <text x="100" y="245" fill="#ddd6fe" font-size="10" font-family="sans-serif" text-anchor="middle">1 API Call</text>

    <!-- Web BFF -->
    <rect x="200" y="180" width="120" height="80" fill="url(#bffWeb)" rx="8"/>
    <text x="260" y="210" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Web BFF</text>
    <text x="260" y="230" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Rich Payloads</text>
    <text x="260" y="245" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Multi API Calls</text>

    <!-- Routing Lines In -->
    <path d="M 100 120 L 100 180" stroke="#a78bfa" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 260 120 L 260 180" stroke="#34d399" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>

    <!-- Microservices -->
    <rect x="40" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="80" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">User Srv</text>

    <rect x="140" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="180" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Order Srv</text>

    <rect x="240" y="320" width="80" height="40" fill="#1e293b" rx="6" stroke="#64748b"/>
    <text x="280" y="345" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Pay Srv</text>

    <!-- Routing Lines Out -->
    <!-- Mobile BFF routes -->
    <path d="M 80 260 L 60 320" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 120 260 L 160 320" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    
    <!-- Web BFF routes -->
    <path d="M 240 260 L 200 320" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>
    <path d="M 280 260 L 260 320" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowGateway)"/>

    <!-- Label -->
    <text x="180" y="420" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Separate gateways tailored for each UI.</text>
    <text x="180" y="435" fill="#34d399" font-size="11" font-family="sans-serif" text-anchor="middle">Decoupled deployments, optimized payloads.</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'The Problem with Microservices',
      description: 'If you have a User profile page, it might require data from the User Service, Order Service, and Notification Service. If a mobile app has to make 3 separate HTTP requests across the internet to fetch this, it will be slow and battery-intensive.'
    },
    {
      title: 'API Gateway (Aggregation / Orchestration)',
      description: 'An API gateway sits in front of the microservices. The mobile app makes exactly ONE request to the Gateway (`GET /mobile-profile`). The Gateway, sitting on the high-speed internal network, rapidly queries the 3 microservices, aggregates the JSON response, and sends a single payload back to the mobile app. It also handles Cross-Cutting Concerns: Authentication (JWT verification), Rate Limiting, and IP blacklisting.'
    },
    {
      title: 'Backend-For-Frontend (BFF)',
      description: 'As a company grows, the single API Gateway becomes a bloated monolith. The Web team wants the Gateway to return massive, rich JSON payloads. The Mobile team wants the gateway to return tiny payloads to save battery. The BFF pattern solves this by giving each frontend team their own dedicated Gateway (e.g., one built in Node.js for Web, one built in Kotlin for Android). They are decoupled and can deploy independently.'
    }
  ],
  comparisonTable: {
    headers: ['Pattern', 'Architecture', 'Team Ownership', 'Pros', 'Cons'],
    rows: [
      ['API Gateway', 'Single monolithic entry point', 'Dedicated Platform/Infrastructure Team', 'Centralized security & rate limiting policies', 'Becomes a massive bottleneck to edit and deploy'],
      ['BFF', 'Multiple distinct entry points per client', 'The Frontend teams themselves (Web, iOS, Android)', 'Highly optimized payloads for specific devices', 'Code duplication (authentication logic repeated in each BFF)']
    ]
  },
  pitfalls: [
    'Putting Business Logic in the Gateway. Gateways should only route, aggregate, and secure. If you put core business rules (like calculating taxes) in the Gateway, it defeats the purpose of having microservices.',
    'Gateway timeouts. If the Gateway waits 30 seconds for a slow internal microservice before responding to the user, you consume all available connections on the Gateway. Use Circuit Breakers inside the Gateway.'
  ]
};
