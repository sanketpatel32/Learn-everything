import { TopicContent } from '../topicContent';

export const circuitBreakers: TopicContent = {
  title: 'Circuit Breakers & Retries',
  description: 'In distributed systems, failures are guaranteed. A microservice might go down, network packets drop, or a database stalls. Retry mechanisms handle transient (temporary) failures, while Circuit Breakers protect the system from catastrophic, cascading failures when a dependency goes completely offline.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <marker id="arrowC" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f8fafc" />
    </marker>
    <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="greenGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Left: Service A -->
  <g transform="translate(40, 150)">
    <rect x="0" y="0" width="120" height="80" fill="#1e293b" rx="12" stroke="#3b82f6" stroke-width="2"/>
    <text x="60" y="35" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Service A</text>
    <text x="60" y="55" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">(Caller)</text>
  </g>

  <!-- Middle: Circuit Breaker States -->
  <g transform="translate(240, 40)">
    <!-- Closed State (Green) -->
    <rect x="0" y="0" width="320" height="100" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <circle cx="160" cy="50" r="40" fill="url(#greenGlow)"/>
    <path d="M 120 50 L 200 50" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>
    <text x="50" y="45" fill="#34d399" font-size="16" font-family="sans-serif" font-weight="bold">CLOSED</text>
    <text x="50" y="65" fill="#94a3b8" font-size="12" font-family="sans-serif">Traffic flows normally.</text>
    <text x="50" y="80" fill="#64748b" font-size="10" font-family="sans-serif"><tspan fill="#f43f5e">X</tspan> failures < threshold</text>
    
    <!-- Open State (Red) -->
    <rect x="0" y="140" width="320" height="100" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <circle cx="160" cy="190" r="40" fill="url(#redGlow)"/>
    <!-- Broken switch -->
    <path d="M 120 190 L 150 190 L 190 150" stroke="#f43f5e" stroke-width="6" stroke-linecap="round" fill="none"/>
    <circle cx="200" cy="190" r="4" fill="#64748b"/>
    
    <text x="50" y="185" fill="#fb7185" font-size="16" font-family="sans-serif" font-weight="bold">OPEN</text>
    <text x="50" y="205" fill="#94a3b8" font-size="12" font-family="sans-serif">Fast fails instantly.</text>
    <text x="50" y="220" fill="#64748b" font-size="10" font-family="sans-serif">Prevents cascading collapse.</text>

    <!-- Half-Open State (Yellow) -->
    <rect x="0" y="280" width="320" height="100" fill="#0f172a" rx="12" stroke="#1e293b"/>
    <path d="M 120 330 L 150 330 L 190 310" stroke="#fbbf24" stroke-width="6" stroke-linecap="round" stroke-dasharray="4 2" fill="none"/>
    <circle cx="200" cy="330" r="4" fill="#64748b"/>
    <text x="50" y="325" fill="#fcd34d" font-size="16" font-family="sans-serif" font-weight="bold">HALF-OPEN</text>
    <text x="50" y="345" fill="#94a3b8" font-size="12" font-family="sans-serif">Testing recovery.</text>
    <text x="50" y="360" fill="#64748b" font-size="10" font-family="sans-serif">Allows 'N' test requests.</text>
  </g>

  <!-- Transitions -->
  <path d="M 520 80 C 600 80, 600 180, 520 180" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowC)"/>
  <text x="610" y="135" fill="#fb7185" font-size="12" font-family="sans-serif">Failures > Threshold</text>

  <path d="M 400 240 L 400 280" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrowC)"/>
  <text x="410" y="265" fill="#fcd34d" font-size="12" font-family="sans-serif">Timeout Expires</text>

  <path d="M 280 280 L 280 140" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowC)"/>
  <text x="180" y="265" fill="#34d399" font-size="12" font-family="sans-serif">Tests Success</text>

  <!-- Right: Service B -->
  <g transform="translate(640, 150)">
    <rect x="0" y="0" width="120" height="80" fill="#1e293b" rx="12" stroke="#8b5cf6" stroke-width="2"/>
    <text x="60" y="35" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Service B</text>
    <text x="60" y="55" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">(Dependency)</text>
    <text x="60" y="95" fill="#f43f5e" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Struggling</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Retries with Exponential Backoff',
      description: 'When Service A calls Service B and fails, it should retry. But if 10,000 clients all retry simultaneously, they will DDoS Service B (Thundering Herd). To prevent this, retries must use **Exponential Backoff** (wait 1s, then 2s, 4s, 8s) and **Jitter** (+/- a random millisecond delay so retries don\'t sync up).'
    },
    {
      title: 'The Cascading Failure Problem',
      description: 'If Service B completely dies, and Service A keeps waiting 30 seconds for a timeout before failing, Service A\'s connection pool will rapidly fill up. Soon, Service A will also die, which kills Service C that depends on it. This is a cascading collapse of the entire microservice architecture.'
    },
    {
      title: 'Circuit Breaker State Machine',
      description: 'A Circuit Breaker sits between Service A and B. It monitors failures. \n- **CLOSED**: Normal operation. Traffic flows.\n- **OPEN**: If failures exceed a threshold (e.g. 5 errors in 10s), the breaker "trips". ALL subsequent calls from Service A instantly fail without ever reaching out to Service B. This gives Service B time to recover.\n- **HALF-OPEN**: After a timeout, it lets a few testing requests through. If they succeed, it closes. If they fail, it trips back open.'
    }
  ],
  comparisonTable: {
    headers: ['Pattern', 'Use Case', 'Mechanism', 'Danger'],
    rows: [
      ['Simple Retry', 'Network blips', 'Immediate re-attempt', 'Thundering Herd DDoS'],
      ['Backoff + Jitter', 'Rate limits, heavy load', 'Delayed re-attempts', 'Connections hang open waiting'],
      ['Circuit Breaker', 'Down dependencies', 'Fails fast, protects Caller', 'Misconfigured thresholds cause false positives'],
      ['Fallback (Degradation)', 'Non-critical data missing', 'Returns default/cached data', 'Stale or misleading UI shown to user']
    ]
  },
  pitfalls: [
    'Retrying non-idempotent operations: If you retry a "Charge Credit Card" API because you got a network timeout reading the response, you might double-charge the user. Only retry idempotent operations (GET/PUT) without a strict idempotency key.',
    'Infinite Retries: Never retry forever. Always impose a hard limit (e.g., max 3 retries).',
    'Failing to provide a Fallback UI: When the circuit breaker trips, the UI should gracefully degrade (e.g., "Recommendations temporarily unavailable") instead of crashing the whole app.'
  ]
};
