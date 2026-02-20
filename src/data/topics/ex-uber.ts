import { TopicContent } from '../topicContent';

export const uber: TopicContent = {
  title: 'Design Uber (Ride Dispatching)',
  description: 'Designing Uber requires managing massive amounts of highly volatile spatial data. Millions of drivers are moving constantly (updating GPS coordinates every 4 seconds) while millions of riders request matches. The system must quickly calculate ETAs, match riders with drivers, and maintain consistency in a write-heavy environment.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="riderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="driverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
    <linearGradient id="dispatchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
    <marker id="arrowU" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Mobile Clients -->
  <rect x="40" y="60" width="100" height="80" fill="url(#riderGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="90" y="95" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Rider App</text>
  <text x="90" y="115" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">"I need a ride"</text>

  <rect x="40" y="320" width="100" height="80" fill="url(#driverGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="90" y="355" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Driver App</text>
  <text x="90" y="375" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">"Loc: 37.7,-122.4"</text>
  <text x="90" y="390" fill="#a7f3d0" font-size="9" font-family="monospace" text-anchor="middle">(Updates 4s)</text>

  <!-- WebSockets & Kafka Pipeline (Location Ingestion) -->
  <rect x="220" y="280" width="100" height="60" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="270" y="310" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">WS Gateway</text>
  <text x="270" y="325" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Keep-Alive</text>

  <rect x="360" y="280" width="100" height="60" fill="#334155" rx="6" stroke="#64748b"/>
  <text x="410" y="310" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Kafka</text>
  <text x="410" y="325" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Location Stream</text>

  <!-- Location DB (Redis/QuadTree) -->
  <rect x="490" y="260" width="140" height="100" fill="#1e293b" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="560" y="295" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Location DB</text>
  <text x="560" y="315" fill="#e9d5ff" font-size="10" font-family="monospace" text-anchor="middle">In-Memory (Redis)</text>
  <text x="560" y="330" fill="#d8b4fe" font-size="10" font-family="monospace" text-anchor="middle">+ QuadTree / H3</text>

  <!-- Dispatch / Matchmaker -->
  <rect x="360" y="60" width="140" height="100" fill="url(#dispatchGrad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="430" y="90" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Dispatch Svc</text>
  <text x="430" y="110" fill="#fde68a" font-size="10" font-family="sans-serif" text-anchor="middle">The "Matchmaker"</text>
  <rect x="380" y="120" width="100" height="25" fill="#78350f" rx="4"/>
  <text x="430" y="136" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">ETA Calculation</text>

  <!-- Flow Lines -->
  <!-- Driver Location Updates -->
  <path d="M 140 360 L 220 320" stroke="#10b981" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowU)"/>
  <path d="M 320 310 L 360 310" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowU)"/>
  <path d="M 460 310 L 490 310" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowU)"/>
  <text x="260" y="370" fill="#34d399" font-size="10" font-family="sans-serif" font-weight="bold">Massive Write Load</text>
  
  <!-- Rider Requests Ride -->
  <path d="M 140 100 L 360 100" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowU)"/>
  <text x="250" y="90" fill="#60a5fa" font-size="10" font-family="sans-serif" font-weight="bold">1. Request Ride (Lat, Lng)</text>

  <!-- Dispatch Queries Location DB -->
  <path d="M 500 110 L 560 260" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrowU)"/>
  <text x="560" y="180" fill="#d8b4fe" font-size="10" font-family="sans-serif" transform="rotate(70, 560, 180)">2. Find Nearby Drivers</text>

  <!-- Offer Ride to Driver -->
  <path d="M 360 140 L 140 330" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
  <text x="210" y="210" fill="#fca5a5" font-size="10" font-family="sans-serif" font-weight="bold" transform="rotate(35, 210, 210)">3. Broadcast Ride Offer</text>

  <!-- Spatial Indexing Visual -->
  <rect x="680" y="270" width="80" height="80" fill="none" stroke="#6b7280" stroke-width="1"/>
  <line x1="680" y1="310" x2="760" y2="310" stroke="#6b7280" stroke-width="1"/>
  <line x1="720" y1="270" x2="720" y2="350" stroke="#6b7280" stroke-width="1"/>
  <circle cx="700" cy="290" r="3" fill="#10b981"/>
  <circle cx="740" cy="290" r="3" fill="#10b981"/>
  <circle cx="740" cy="330" r="3" fill="#10b981"/>
  <circle cx="700" cy="330" r="3" fill="#ef4444"/>
  <text x="720" y="370" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">QuadTree Grid</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Geospatial Indexing',
      description: 'You cannot write a SQL query like `SELECT * FROM drivers WHERE lat BETWEEN X AND Y`. The DB would have to linearly scan millions of rows. Uber uses geospatial indexing (QuadTrees, Geohashing, or Uber\'s open-source H3 Hexagon system) to divide the world into grids. Finding a driver becomes an O(1) hash lookup to find which "hex" the rider is currently in.'
    },
    {
      title: 'Massive Write Load',
      description: 'If you have 1 million active drivers updating their GPS every 4 seconds, you get 250,000 Writes Per Second. Standard relational databases (Postgres) cannot handle this write velocity. Uber ingests these locations into Kafka, and rapidly updates an in-memory datastore (like Redis or custom Go services) to track current locations.'
    },
    {
      title: 'The Matchmaker (Dispatch Service)',
      description: 'When a rider requests a car, the Dispatch service draws a radius (or checks nearby H3 hexagons), finds available drivers, and calculates actual ETA/routing using road-graph data (avoiding traffic, one-way streets). It then broadcasts the offer to the best driver via WebSockets.'
    },
    {
      title: 'Eventual Consistency is Acceptable',
      description: 'If a driver\'s GPS tracker is delayed by 2 seconds, the system doesn\'t crash. Strongly consistent SQL transactions are not necessary for real-time location. BASE (Basically Available, Soft state, Eventual consistency) is ideal here.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Uber (Dispatching)', 'Google Maps (Navigation)'],
    rows: [
      ['Update Frequency', 'High (Driver GPS every 4s)', 'Low (Road data updates)'],
      ['Write Intensity', 'Extremely High (Location updates)', 'Low (Reads dominate)'],
      ['Primary Algorithm', 'QuadTree / S2 Geometry', 'Dijkstra / A* Search'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=DGtalg5efCw',
  pitfalls: [
    'Using SQL for Real-Time Location: At 250k Writes/sec, row-level locking in SQL will cause massive deadlocks and latency. Volatile, temporal data belongs in specialized in-memory stores, while ride receipts and billing go to reliable durable storage (Postgres/Cassandra).',
    'Thundering Herd on Reconnection: If a cell tower blips and 5,000 drivers reconnect to the WebSocket gateway simultaneously, it can easily DDoS your own servers. Reconnection logic must implement Exponential Backoff and Jitter.',
    'Ignoring Concurrency in Dispatch: If two riders request a car in the same hexagon at exactly the same millisecond, the Dispatcher might offer the same driver to both riders. You must use Distributed Locks (Redis/ZooKeeper) or atomic operations when changing driver status from "AVAILABLE" to "DISPATCHED".'
  ]
};
