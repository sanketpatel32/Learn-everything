import { TopicContent } from '../topicContent';

export const bulkhead: TopicContent = {
  title: 'Bulkhead Pattern',
  description: 'In shipbuilding, a bulkhead is a secure wall that partitions a ship into separate water-tight compartments. If the hull is breached, only that specific compartment floods, preventing the entire ship from sinking. In software engineering, the Bulkhead Pattern involves partitioning system resources (like connection pools, threads, or memory) into isolated pools so that a failure in one area doesn\'t cascade and take down the entire application.',
  diagram: `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="healthyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="failingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#be123c" />
    </linearGradient>
    <marker id="arrowBH" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- Left Side: Without Bulkhead (Shared Poool) -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Without Bulkhead (Shared Pool)</text>
    <text x="180" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">100 Threads Total</text>
    
    <!-- Clients calling APIs -->
    <rect x="50" y="80" width="80" height="30" fill="#334155" rx="4"/>
    <text x="90" y="100" fill="#bae6fd" font-size="12" font-family="sans-serif" text-anchor="middle">Flight Search API</text>

    <rect x="230" y="80" width="80" height="30" fill="#334155" rx="4"/>
    <text x="270" y="100" fill="#bae6fd" font-size="12" font-family="sans-serif" text-anchor="middle">Hotel Search API</text>

    <!-- Shared Resource Pool -->
    <rect x="80" y="150" width="200" height="100" fill="#1e293b" rx="8" stroke="#cbd5e1" stroke-width="2"/>
    <text x="180" y="180" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Global Request Thread Pool</text>
    
    <!-- Thread representations -->
    <!-- Failing ones (consuming all resources) -->
    <circle cx="110" cy="210" r="10" fill="url(#failingGrad)"/>
    <circle cx="140" cy="210" r="10" fill="url(#failingGrad)"/>
    <circle cx="170" cy="210" r="10" fill="url(#failingGrad)"/>
    <circle cx="200" cy="210" r="10" fill="url(#failingGrad)"/>
    <circle cx="230" cy="210" r="10" fill="url(#failingGrad)"/>
    <circle cx="260" cy="210" r="10" fill="url(#failingGrad)"/>
    <text x="180" y="240" fill="#fda4af" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">100/100 Threads Blocked waiting for Hotel DB</text>

    <!-- Connecting lines -->
    <path d="M 90 110 L 160 150" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowBH)"/>
    <path d="M 270 110 L 200 150" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowBH)"/>

    <!-- Backend Services -->
    <rect x="50" y="320" width="100" height="60" fill="#0f172a" rx="8" stroke="#10b981" stroke-width="2"/>
    <text x="100" y="350" fill="#a7f3d0" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Flight DB</text>
    <text x="100" y="365" fill="#10b981" font-size="10" font-family="sans-serif" text-anchor="middle">Healthy (Fast)</text>

    <rect x="210" y="320" width="100" height="60" fill="#4c0519" rx="8" stroke="#f43f5e" stroke-width="2"/>
    <text x="260" y="350" fill="#fda4af" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Hotel DB</text>
    <text x="260" y="365" fill="#f43f5e" font-size="10" font-family="sans-serif" text-anchor="middle">Down (Hanging)</text>

    <path d="M 140 250 L 100 320" stroke="#94a3b8" stroke-width="2" fill="none" stroke-dasharray="4"/>
    <path d="M 220 250 L 260 320" stroke="#f43f5e" stroke-width="3" fill="none" marker-end="url(#arrowBH)"/>

    <!-- Labels -->
    <text x="180" y="420" fill="#fecaca" font-size="11" font-family="sans-serif" text-anchor="middle">Hotel API hangs, consuming all 100 threads.</text>
    <text x="180" y="435" fill="#ef4444" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Flight Search API is now dead too. Total Outage.</text>
  </g>

  <!-- Right Side: With Bulkhead (Isolated Pools) -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Bulkhead Pattern (Isolated Pools)</text>
    <text x="180" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">50 Threads Each</text>
    
    <!-- Clients calling APIs -->
    <rect x="50" y="80" width="80" height="30" fill="#334155" rx="4"/>
    <text x="90" y="100" fill="#bae6fd" font-size="12" font-family="sans-serif" text-anchor="middle">Flight Search API</text>

    <rect x="230" y="80" width="80" height="30" fill="#334155" rx="4"/>
    <text x="270" y="100" fill="#bae6fd" font-size="12" font-family="sans-serif" text-anchor="middle">Hotel Search API</text>

    <!-- Isolated Pools -->
    <rect x="30" y="150" width="120" height="100" fill="#064e3b" rx="8" stroke="#10b981" stroke-width="2"/>
    <text x="90" y="175" fill="#a7f3d0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Flight Pool</text>
    <text x="90" y="190" fill="#10b981" font-size="10" font-family="sans-serif" text-anchor="middle">50 Threads</text>
    <!-- Healthy Threads -->
    <circle cx="60" cy="220" r="8" fill="url(#healthyGrad)"/>
    <circle cx="90" cy="220" r="8" fill="url(#healthyGrad)"/>
    <circle cx="120" cy="220" r="8" fill="url(#healthyGrad)"/>

    <rect x="210" y="150" width="120" height="100" fill="#4c0519" rx="8" stroke="#f43f5e" stroke-width="2"/>
    <text x="270" y="175" fill="#fda4af" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Hotel Pool</text>
    <text x="270" y="190" fill="#f43f5e" font-size="10" font-family="sans-serif" text-anchor="middle">50 Threads</text>
    <!-- Exhausted Threads -->
    <circle cx="240" cy="220" r="8" fill="url(#failingGrad)"/>
    <circle cx="270" cy="220" r="8" fill="url(#failingGrad)"/>
    <circle cx="300" cy="220" r="8" fill="url(#failingGrad)"/>
    
    <!-- Bulkhead Wall -->
    <path d="M 180 140 L 180 260" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
    <text x="180" y="280" fill="#f8fafc" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">Bulkhead Partition</text>

    <!-- Connecting lines -->
    <path d="M 90 110 L 90 150" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowBH)"/>
    <path d="M 270 110 L 270 150" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowBH)"/>

    <!-- Backend Services -->
    <rect x="40" y="320" width="100" height="60" fill="#0f172a" rx="8" stroke="#10b981" stroke-width="2"/>
    <text x="90" y="350" fill="#a7f3d0" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Flight DB</text>
    <text x="90" y="365" fill="#10b981" font-size="10" font-family="sans-serif" text-anchor="middle">Healthy (Fast)</text>

    <rect x="220" y="320" width="100" height="60" fill="#4c0519" rx="8" stroke="#f43f5e" stroke-width="2"/>
    <text x="270" y="350" fill="#fda4af" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Hotel DB</text>
    <text x="270" y="365" fill="#f43f5e" font-size="10" font-family="sans-serif" text-anchor="middle">Down (Hanging)</text>

    <path d="M 90 250 L 90 320" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowBH)"/>
    <path d="M 270 250 L 270 320" stroke="#f43f5e" stroke-width="3" fill="none" marker-end="url(#arrowBH)"/>

    <!-- Labels -->
    <text x="180" y="420" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Hotel API exhausts its 50 threads and drops requests.</text>
    <text x="180" y="435" fill="#34d399" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Flight API operates normally. Partial Availability isolated.</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'The Catastrophic Cascade',
      description: 'Servers typically use a shared thread pool (e.g., 200 Tomcat worker threads) or connection pool to handle incoming requests. If a non-critical downstream service (like an analytics database or email sender) hangs and takes 30 seconds to respond, your server quickly exhausts all 200 threads waiting for it. The entire application crashes, even though the primary database is completely healthy.'
    },
    {
      title: 'Thread Pool Isolation',
      description: 'The standard way to implement a Bulkhead is to create distinct, separated thread pools for different downstream dependencies. E.g., allocate 150 threads specifically for hitting the core Payment Database, and cap the Email Service pool at 10 threads. If the Email Service hangs, it can only block 10 threads. Payments process normally.'
    },
    {
      title: 'Semaphore-based Bulkheading',
      description: 'Instead of dedicating entire physical threads (which consumes OS memory), modern asynchronous frameworks often use Semaphores. A semaphore simply maintains a counter (e.g., max 20 concurrent inflight requests to Service B). If request 21 arrives, it is immediately rejected without waiting for a thread to block.'
    }
  ],
  comparisonTable: {
    headers: ['Architecture', 'Pros', 'Cons', 'Typical Use Result in Outage'],
    rows: [
      ['Shared Resource Pool', 'Highly efficient resource utilization during normal operations', 'Violates single point of failure. One slow dependency kills the system.', '100% Total Downtime'],
      ['Thread/Connection Bulkhead', 'Absolute hardware isolation. Guarantees partial availability.', 'Unused threads in one pool cannot be borrowed by a busy pool, causing artificial limits.', 'Slight feature degradation (e.g. Email fails)'],
      ['Microservice Bulkhead', 'Process-level isolation (deploying services to separate containers)', 'High operational overhead (managing Kubernetes nodes)', 'Only the affected microservice goes down']
    ]
  },
  pitfalls: [
    'Incorrect Sizing: If you assign 10 threads to a massive core service, you artificially bottleneck your application in happy-path scenarios. Tuning bulkhead sizes requires rigorous load testing and metrics monitoring.',
    'Ignoring the Circuit Breaker: Bulkheads pair perfectly with Circuit Breakers. A bulkhead isolates the damage, but a circuit breaker actively stops hitting the dead service and returns cached fallbacks instantly.',
    'Over-partitioning: Creating a separate thread pool for every single tiny functional call wastes memory through thread-stack overhead and context switching.'
  ]
};
