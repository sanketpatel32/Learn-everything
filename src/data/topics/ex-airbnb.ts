import { TopicContent } from '../topicContent';

export const airbnb: TopicContent = {
  title: 'Design Airbnb (Inventory & Search)',
  description: 'Airbnb is a global accommodation engine. Designing it requires solving the complex dual-sided marketplace problem: efficiently searching through unstructured text and geospatial data (GeoHash/QuadTrees) while strictly locking calendar dates to prevent double-booking (Consistency).',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="esGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="psqlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="redisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowQ" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User Action -->
  <rect x="20" y="100" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="118" fill="#f8fafc" font-size="10" text-anchor="middle">Guest</text>
  <text x="60" y="130" fill="#94a3b8" font-size="8" text-anchor="middle">"NYC, July 4-6"</text>

  <!-- Load Balancer -->
  <rect x="140" y="70" width="40" height="280" fill="#0f172a" rx="4" stroke="#64748b" stroke-width="2"/>
  <text x="160" y="215" fill="#f8fafc" font-size="10" font-weight="bold" transform="rotate(-90, 160, 215)" text-anchor="middle">API Gateway</text>

  <!-- Flow 1: Search & Discovery (Geospatial & Filtering) -->
  <rect x="240" y="40" width="120" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="300" y="65" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Search API</text>
  <text x="300" y="80" fill="#bfdbfe" font-size="9" text-anchor="middle">(Read Heavy AP)</text>

  <rect x="420" y="20" width="140" height="100" fill="url(#esGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="490" y="45" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">ElasticSearch</text>
  <text x="490" y="60" fill="#e9d5ff" font-size="9" text-anchor="middle">(Geospatial Docs)</text>
  <rect x="435" y="70" width="110" height="15" fill="#4c1d95" rx="2"/>
  <text x="490" y="80" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">Loc: -74.00, 40.71</text>
  <rect x="435" y="90" width="110" height="15" fill="#4c1d95" rx="2"/>
  <text x="490" y="100" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">Avail: [07-04, 07-08]</text>

  <!-- QuadTree visual inside ES Box -->
  <rect x="580" y="30" width="60" height="60" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
  <line x1="610" y1="30" x2="610" y2="90" stroke="#8b5cf6" stroke-width="1"/>
  <line x1="580" y1="60" x2="640" y2="60" stroke="#8b5cf6" stroke-width="1"/>
  <circle cx="595" cy="45" r="2" fill="#34d399"/>
  <circle cx="625" cy="75" r="2" fill="#34d399"/>
  <circle cx="590" cy="80" r="2" fill="#34d399"/>
  <text x="610" y="105" fill="#c4b5fd" font-size="8" text-anchor="middle">QuadTree/GeoHash</text>

  <!-- Flow 2: Booking System (Consistency) -->
  <rect x="20" y="320" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="338" fill="#f8fafc" font-size="10" text-anchor="middle">Guest</text>
  <text x="60" y="350" fill="#94a3b8" font-size="8" text-anchor="middle">"Book Property A"</text>

  <path d="M 100 340 L 140 340" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <rect x="240" y="300" width="120" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="300" y="325" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Booking API</text>
  <text x="300" y="340" fill="#bfdbfe" font-size="9" text-anchor="middle">(Write Heavy CP)</text>

  <rect x="420" y="220" width="140" height="80" fill="url(#redisGrad)" rx="8" stroke="#fca5a5" stroke-width="2"/>
  <text x="490" y="245" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Distributed Cash</text>
  <text x="490" y="260" fill="#fecaca" font-size="9" text-anchor="middle">Redis (Redlock)</text>
  <rect x="435" y="270" width="110" height="20" fill="#7f1d1d" rx="2" stroke="#ef4444"/>
  <text x="490" y="283" fill="#fecaca" font-size="8" font-family="monospace" text-anchor="middle">Lock: PropA_Jul4 (TTL:10m)</text>


  <rect x="580" y="300" width="140" height="100" fill="url(#psqlGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="650" y="325" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Core Database</text>
  <text x="650" y="340" fill="#a7f3d0" font-size="9" text-anchor="middle">(PostgreSQL)</text>
  <rect x="595" y="350" width="110" height="15" fill="#064e3b" rx="2"/>
  <text x="650" y="360" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">P_ID: 12, Status: BOOKED</text>
  <rect x="595" y="370" width="110" height="15" fill="#064e3b" rx="2"/>
  <text x="650" y="380" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Tx_ID: 9XQR4, Amt: $500</text>


  <!-- Flow Lines -->
  <!-- Search -->
  <path d="M 100 120 L 140 120" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 180 120 L 240 70" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 360 70 L 420 70" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrowQ)"/>
  <text x="390" y="60" fill="#d8b4fe" font-size="10">Radius</text>
  <text x="390" y="70" fill="#d8b4fe" font-size="10">Search</text>

  <!-- Async Sync -->
  <path d="M 650 300 L 650 140 L 490 140 L 490 120" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="560" y="130" fill="#fde68a" font-size="9">Kafka CDC (Sync Avail)</text>


  <!-- Booking -->
  <path d="M 180 200 L 240 330" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  
  <path d="M 360 310 L 420 280" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="390" y="285" fill="#fca5a5" font-size="9" transform="rotate(-30, 390, 285)">1. Redis Lock</text>

  <path d="M 360 330 L 580 330" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="470" y="325" fill="#6ee7b7" font-size="9" text-anchor="middle">2. DB Trans (ACID)</text>


</svg>
  `,
  keyPoints: [
    {
      title: 'Geospatial Search (GeoHash/QuadTree)',
      description: 'Searching for "Homes in New York" requires immense compute if scanning every latitude/longitude coordinate in a database. Airbnb uses mapping data structures (QuadTrees or GeoHashes, often within ElasticSearch) to divide the world into mathematical grids. Filtering is reduced from O(Millions of points) to O(1) grid lookups, which perfectly serve thousands of concurrent map inquiries.'
    },
    {
      title: 'Search/Availability Discrepancy',
      description: 'ElasticSearch acts as a massive global cache. When millions of users are searching, it is acceptable if ElasticSearch says a property is available 3 seconds after it was actually booked (Eventual Consistency). The core booking workflow operates against a strictly consistent Database which handles the ultimate truth. You never book directly against ElasticSearch.'
    },
    {
      title: 'Distributed Locking (Preventing Double Booking)',
      description: 'Unlike Amazon (adding to a personal cart), an Airbnb property is a finite specific resource. If two users click "Book" at the same nanosecond, the servers must negotiate. A distributed lock manager (like Redis/Redlock) intercepts the requests. User 1 gets a 10-minute temporary lease (lock) to complete their payment. User 2 is rejected immediately or queued.'
    },
    {
      title: 'Change Data Capture (CDC Pipeline)',
      description: 'When User 1 successfully purchases the date range in PostgreSQL, the entire map search index must update. A `WAL` (Write-Ahead Log) tailer like Debezium streams the PostgreSQL change into Kafka. A worker reads Kafka and updates ElasticSearch, completing the asynchronous data synchronization without slowing down the initial user\'s checkout.'
    }
  ],
  comparisonTable: {
    headers: ['Architecture Component', 'Choice', 'Reasoning'],
    rows: [
      ['Core Database', 'PostgreSQL (Relational SQL)', 'Requires ACID transactions for financial ledgers and strictly consistent availability tracking. NoSQL is too risky here.'],
      ['Search Database', 'ElasticSearch / Lucene', 'Superlative free-text search (BM25), fast filtering (date ranges), and optimized Geospatial queries (GeoPoint/GeoShape).'],
      ['Lock Mechanism', 'Redis (Temporary TTLS)', 'Provides speed to reject 99% of double-book attempts instantly before hitting the heavy slow SQL database with deadlocks.']
    ]
  },
  pitfalls: [
    'Serving map requests directly from SQL Database: Writing `SELECT * FROM properties WHERE lat BETWEEN x AND y AND price < $200` will table-scan your database and crush performance under user-zoom map drags. Always use a dedicated search cluster.',
    'Forgetting TTLs on Booking Locks: If a user begins the checkout process, locks the dates, and then closes their laptop, those dates remain unbookable forever. The Redis lock MUST have a strict 10-15 minute Time-to-Live expiration.',
    'Ignoring Fencing Tokens: If User 1 locks, falls asleep (network issue) for 15 minutes, the TTL expires. User 2 gets the lock and buys the property. User 1 wakes up and submits the payment to the DB. You just double booked! The DB transaction must require strictly incrementing versions (Optimistic Concurrency) to reject User 1\'s stale payload.'
  ]
};
