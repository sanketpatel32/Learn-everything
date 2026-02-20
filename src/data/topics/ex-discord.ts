import { TopicContent } from '../topicContent';

export const discord: TopicContent = {
  title: 'Design Discord (Group Chat & Presence)',
  description: 'Discord is a real-time communication platform designed for gamers but adopted globally. Designing Discord requires solving massive scale Fan-Out (sending one message to millions of idle users in a server) and managing millions of real-time WebSocket connections to maintain live "Online/Offline" presence status.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="gwGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="msgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="presenceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Clients -->
  <rect x="20" y="100" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="118" fill="#f8fafc" font-size="10" text-anchor="middle">Client A</text>
  <text x="60" y="130" fill="#94a3b8" font-size="8" text-anchor="middle">(Sender)</text>
  
  <rect x="20" y="240" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="258" fill="#f8fafc" font-size="10" text-anchor="middle">Client B</text>
  <text x="60" y="270" fill="#94a3b8" font-size="8" text-anchor="middle">(Receiver)</text>

  <!-- WebSocket Gateway -->
  <rect x="180" y="80" width="120" height="240" fill="url(#gwGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="240" y="110" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Gateway</text>
  <text x="240" y="125" fill="#e9d5ff" font-size="10" text-anchor="middle">(WebSockets)</text>
  
  <rect x="200" y="140" width="80" height="20" fill="#4c1d95" rx="2" stroke="#6d28d9"/>
  <text x="240" y="153" fill="#e9d5ff" font-size="9" text-anchor="middle">Conn: UserA</text>
  
  <rect x="200" y="170" width="80" height="20" fill="#4c1d95" rx="2" stroke="#6d28d9"/>
  <text x="240" y="183" fill="#e9d5ff" font-size="9" text-anchor="middle">Conn: UserB</text>

  <rect x="200" y="270" width="80" height="30" fill="#5b21b6" rx="2" stroke="#7c3aed"/>
  <text x="240" y="283" fill="#ddd6fe" font-size="9" text-anchor="middle">Session Mgr</text>
  <text x="240" y="294" fill="#ddd6fe" font-size="8" text-anchor="middle">(Redis)</text>


  <!-- Message Flow -->
  <rect x="380" y="60" width="160" height="100" fill="url(#msgGrad)" rx="8" stroke="#3b82f6" stroke-width="2"/>
  <text x="460" y="85" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Message Service</text>
  <text x="460" y="100" fill="#bfdbfe" font-size="9" text-anchor="middle">1. Validate 2. Store 3. Fanout</text>
  <rect x="420" y="110" width="80" height="20" fill="#1e3a8a" rx="2" stroke="#2563eb"/>
  <text x="460" y="123" fill="#bfdbfe" font-size="10" text-anchor="middle">Kafka Topic</text>
  <circle cx="515" cy="120" r="10" fill="#ef4444"/>
  <text x="515" y="124" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">1</text>

  <!-- Database -->
  <rect x="620" y="60" width="120" height="80" fill="url(#dbGrad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="680" y="90" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Cassandra</text>
  <text x="680" y="110" fill="#fde68a" font-size="9" text-anchor="middle">(Messages)</text>
  <circle cx="680" cy="128" r="10" fill="#ef4444"/>
  <text x="680" y="132" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">2</text>

  <!-- Presence Service -->
  <rect x="380" y="220" width="160" height="100" fill="url(#presenceGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="460" y="245" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Presence Service</text>
  <text x="460" y="260" fill="#a7f3d0" font-size="9" text-anchor="middle">Tracks Online/Idle/Offline</text>
  <rect x="420" y="270" width="80" height="30" fill="#064e3b" rx="2" stroke="#059669"/>
  <text x="460" y="282" fill="#a7f3d0" font-size="8" text-anchor="middle">Redis Cluster</text>
  <text x="460" y="293" fill="#a7f3d0" font-size="8" text-anchor="middle">(KV: User->Status)</text>


  <!-- Flow Lines -->
  <!-- WS Conns -->
  <path d="M 100 120 L 180 120" stroke="#93c5fd" stroke-width="2" stroke-dasharray="2" fill="none"/>
  <path d="M 100 260 L 180 260" stroke="#93c5fd" stroke-width="2" stroke-dasharray="2" fill="none"/>

  <!-- Send Message -->
  <path d="M 100 110 L 160 110" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 300 110 L 380 110" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  
  <!-- Store Message -->
  <path d="M 540 80 L 620 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  
  <!-- Fanout / Routing -->
  <path d="M 460 160 Q 460 200 300 210" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <circle cx="380" cy="190" r="10" fill="#ef4444"/>
  <text x="380" y="194" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">3</text>
  <text x="385" y="180" fill="#93c5fd" font-size="10">Route to B's Gateway</text>

  <!-- Deliver Message -->
  <path d="M 180 270 L 100 270" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <circle cx="140" cy="285" r="10" fill="#ef4444"/>
  <text x="140" y="289" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">4</text>

  <!-- Presence Updates -->
  <path d="M 300 250 L 380 250" stroke="#34d399" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="340" y="245" fill="#a7f3d0" font-size="9" text-anchor="middle">Heartbeat (30s)</text>


  <!-- Key Explanation -->
  <rect x="580" y="220" width="200" height="160" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="680" y="240" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Key Architecture</text>
  
  <text x="590" y="265" fill="#94a3b8" font-size="10" font-weight="bold">Gateway Pattern:</text>
  <text x="590" y="280" fill="#cbd5e1" font-size="9">Millions of WS conns held open</text>
  <text x="590" y="292" fill="#cbd5e1" font-size="9">by stateless edge servers.</text>

  <text x="590" y="315" fill="#94a3b8" font-size="10" font-weight="bold">Message Fanout:</text>
  <text x="590" y="330" fill="#cbd5e1" font-size="9">Only send payloads to servers</text>
  <text x="590" y="342" fill="#cbd5e1" font-size="9">where active users are connected.</text>

  <text x="590" y="365" fill="#94a3b8" font-size="10" font-weight="bold">Presence:</text>
  <text x="590" y="377" fill="#cbd5e1" font-size="9">Batch offline/online updates.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Gateway Cluster (WebSocket Management)',
      description: 'Holding millions of TCP connections open is memory intensive. Discord uses thousands of stateless Gateway nodes. When a user connects, the connection is bound to a specific Gateway. The Gateway informs the Session Manager (Redis) "User_123 is connected to Gateway_89".'
    },
    {
      title: 'Message Fanout (The Pub/Sub Routing Problem)',
      description: 'When User A posts in a server with 100,000 members, the naive approach is to loop 100k times to send the message. This crashes systems. Discord instead checks the Session Manager to see which users are *actually online*, groups them by the Gateway they are connected to, and sends *one* payload to the Gateway. The Gateway then pushes it down the open WebSockets.'
    },
    {
      title: 'Cassandra for Messaging',
      description: 'Discord initially used MongoDB, but migrated to Cassandra (and later ScyllaDB) because messaging is a strictly Time-Series append-only workload with high write throughput. Cassandra handles massive writes and allows partitioning by `Channel_ID` to ensure all messages for a single chat load contiguously off the disk.'
    },
    {
      title: 'Presence Service (Online/Offline Status)',
      description: 'Updating a database every time a user types or goes idle scales terribly. Gateways send heartbeat updates (e.g., every 30s) to a Presence Service powered by Redis. These status changes are batched and emitted via Kafka to be beamed out to friends lists, avoiding DB write storms.'
    }
  ],
  comparisonTable: {
    headers: ['Challenge', 'Naive Approach', 'Discord Solution'],
    rows: [
      ['Connection State', 'App servers hold WS connections', 'Dedicated Edge Gateway tier holds plain WS, separate from business logic APIs.'],
      ['Large Server Fanout', 'Send message to 500k offline users via push notifications', 'Send ONLY to active Gateways. Offline users get aggregated push notifications.'],
      ['Storage', 'MongoDB/MySQL (B-Tree indexes)', 'Cassandra/ScyllaDB (LSM Tree, amazing for append-only high write volume).'],
      ['Snowflakes IDs', 'Auto-incrementing Database IDs', 'Twitter Snowflake distributed ID generation (chronological, no DB bottleneck).']
    ]
  },
  pitfalls: [
    'Connection Draining: If you deploy an update to a Gateway server, you will disconnect 500,000 concurrent users at once. They will all instantly try to reconnect, creating a Thundering Herd that brings down your Auth service. Deployments must use slow connection draining limits.',
    'Presence "Flapping": Users dropping internet for 2 seconds shouldn\'t instantly trigger system-wide "User is Offline" -> "User is Online" broadcasts. Implement a delay (e.g., 60 seconds) before officially marking a dropped connection as offline.',
    'Hot Channels: A channel in a server with 1 million users (like a popular game launch) can overwhelm its Cassandra partition. Hot partitions must scatter-gather or be split to prevent single-node meltdowns.'
  ]
};
