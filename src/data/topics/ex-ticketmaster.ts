import { TopicContent } from '../topicContent';

export const ticketmaster: TopicContent = {
  title: 'Design Ticketmaster (High Concurrency)',
  description: 'Designing a ticketing system for highly anticipated events (like Taylor Swift or the Super Bowl). The system is characterized by extremely "spiky" traffic: absolute silence, followed by millions of users hitting the Buy button at the exact same millisecond. The core challenge is concurrency control and preventing double-booking.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="userGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="queueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="redisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- The Thundering Herd -->
  <rect x="20" y="100" width="120" height="240" fill="#1e293b" rx="8" stroke="#475569" stroke-width="2"/>
  <text x="80" y="130" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Millions of Users</text>
  <text x="80" y="150" fill="#cbd5e1" font-size="10" font-style="italic" text-anchor="middle">"10:00:00 AM"</text>

  <circle cx="80" cy="200" r="10" fill="url(#userGrad)"/>
  <circle cx="50" cy="230" r="10" fill="url(#userGrad)"/>
  <circle cx="110" cy="230" r="10" fill="url(#userGrad)"/>
  <circle cx="80" cy="260" r="10" fill="url(#userGrad)"/>
  <circle cx="50" cy="290" r="10" fill="url(#userGrad)"/>
  <circle cx="110" cy="290" r="10" fill="url(#userGrad)"/>

  <!-- Virtual Waiting Room -->
  <rect x="220" y="60" width="120" height="320" fill="url(#queueGrad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="280" y="90" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Virtual Queue</text>
  <text x="280" y="110" fill="#fde68a" font-size="10" text-anchor="middle">(Waiting Room)</text>

  <rect x="240" y="140" width="80" height="20" fill="#78350f" rx="4"/>
  <rect x="240" y="180" width="80" height="20" fill="#78350f" rx="4"/>
  <rect x="240" y="220" width="80" height="20" fill="#78350f" rx="4"/>
  <rect x="240" y="260" width="80" height="20" fill="#78350f" rx="4"/>
  <text x="280" y="152" fill="#fff" font-size="8" font-family="monospace" text-anchor="middle">Token: A12</text>
  <text x="280" y="310" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Drips users</text>
  <text x="280" y="325" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">at safe rate</text>

  <!-- Ticket Service -->
  <rect x="420" y="120" width="120" height="80" fill="#1e293b" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="480" y="150" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Booking Svc</text>
  <text x="480" y="170" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">"Reserve Seat"</text>

  <!-- Redis (Distributed Lock) -->
  <rect x="620" y="60" width="140" height="100" fill="url(#redisGrad)" rx="8" stroke="#fca5a5" stroke-width="2"/>
  <text x="690" y="90" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Redis Cache</text>
  <text x="690" y="110" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">Distributed Locks</text>
  <rect x="640" y="120" width="100" height="25" fill="#7f1d1d" rx="4"/>
  <text x="690" y="136" fill="#fecaca" font-size="9" font-family="monospace" text-anchor="middle">Seat4A: LOCK(U1)</text>

  <!-- Relational DB (ACID) -->
  <rect x="620" y="240" width="140" height="100" fill="url(#dbGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="690" y="270" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">SQL Database</text>
  <text x="690" y="290" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">ACID Transactions</text>
  <rect x="640" y="300" width="100" height="25" fill="#064e3b" rx="4"/>
  <text x="690" y="316" fill="#a7f3d0" font-size="9" font-family="monospace" text-anchor="middle">SELECT ... FOR UPDATE</text>

  <!-- Flow Lines -->
  <path d="M 140 220 L 220 220" stroke="#fbbf24" stroke-width="4" stroke-dasharray="6" fill="none" marker-end="url(#arrowT)"/>
  <text x="180" y="210" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Spike</text>

  <path d="M 340 160 L 420 160" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>
  <text x="380" y="150" fill="#6ee7b7" font-size="10" font-weight="bold" text-anchor="middle">Controlled</text>

  <path d="M 540 140 L 620 110" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>
  <text x="590" y="120" fill="#fca5a5" font-size="9" font-family="monospace" transform="rotate(-15, 590, 120)">1. Try Lock</text>

  <path d="M 540 180 L 620 270" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowT)"/>
  <text x="590" y="215" fill="#6ee7b7" font-size="9" font-family="monospace" transform="rotate(40, 590, 215)">2. Commit DB</text>

  <!-- Explanatory Box -->
  <rect x="150" y="390" width="500" height="40" fill="#1e293b" rx="6" stroke="#fbbf24"/>
  <text x="400" y="415" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">Challenge: 10,000 users clicking "Buy Seat 4A" at the exact same millisecond.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The "Thundering Herd" Problem',
      description: 'Event sales generate massive traffic spikes. If 1 million users query a SQL database at 10:00:00 AM, the database will instantly run out of concurrent connection limits and crash. The system must degrade gracefully.'
    },
    {
      title: 'Virtual Queues (Waiting Rooms)',
      description: 'The API Gateway places the flood of HTTP requests into an asynchronous Waiting Room (often built with highly scalable systems like AWS API Gateway + SQS, or Cloudflare Waiting Room). The backend then "sips" from this queue at a safely controlled rate (e.g., 5,000 users per minute).'
    },
    {
      title: 'Double-Booking & Concurrency',
      description: 'If two people select Seat 4A simultaneously, the code might verify `is_available = true` for both before either transaction commits. To prevent this, data must be locked. First, a fast Distributed Lock (Redis Redlock) secures the seat. Second, the relational database explicitly locks the row via `SELECT * FROM seats WHERE id=4A FOR UPDATE`.'
    },
    {
      title: 'Temporary Holds & Sagas',
      description: 'When a user selects a seat, it is marked as `status = RESERVED_PENDING_PAYMENT` with a TTL (Time To Live). If the user doesn\'t complete credit card checkout in 5 minutes, a scheduled job (or Redis Key Expiration event) releases the seat back to `AVAILABLE`.'
    }
  ],
  comparisonTable: {
    headers: ['Challenge', 'Risky Approach', 'Enterprise Architecture'],
    rows: [
      ['Massive Traffic Spike', 'Auto-scaling standard APIs directly against the DB', 'Virtual Waiting Room / Edge queuing (Token-based ingress)'],
      ['Database Read Overload', 'Querying DB for available seats', 'Caching total inventory counts in Redis; syncing periodically'],
      ['Concurrency (Double Booking)', 'Checking state with `if (seat.free)`', 'Pessimistic Row Locking (`FOR UPDATE`) + Redis Distributed Locks (Redlock)'],
      ['Abandoned Payments', 'Blocking seat indefinitely', 'State Machine with strict TTL; Saga pattern to reverse reservations']
    ]
  },
  pitfalls: [
    'Relying purely on Auto-scaling: AWS Auto-scaling takes minutes to spin up new EC2 instances. Event ticket traffic goes from zero to millions in exactly one second. Reactive auto-scaling will be too late. You must pre-scale infrastructure and use edge-queuing.',
    'Using NoSQL for Ticket Inventory: A NoSQL database with eventual consistency (like Cassandra) is a terrible choice here. You cannot handle "eventual" consistency when assigning a singular unique physical seat in a stadium. You need the strong ACID guarantees of a relational database.',
    'Optimistic Locking failure rate: If you use Optimistic Locking (version numbers), 9,999 users will get an error when trying to book Seat 4A, causing massive CPU waste and UX frustration. Pessimistic Locking or Redis queuing is superior for high-contention resources.'
  ]
};
