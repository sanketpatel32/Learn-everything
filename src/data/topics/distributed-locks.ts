import { TopicContent } from '../topicContent';

export const distributedLocks: TopicContent = {
  title: 'Distributed Locks (ZooKeeper & Redis)',
  description: 'When multiple servers need to modify a shared resource concurrently (like a single concert ticket, or claiming a scheduled job), local thread locks (Mutexes) on Server A mean nothing to Server B. You must elevate the lock to a centralized distributed system. ZooKeeper and Redis (Redlock) are the industry standards for this.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="serverGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="serverGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
    <linearGradient id="zkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#4c1d95" />
    </linearGradient>
    <marker id="arrowL" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Application Servers -->
  <rect x="80" y="100" width="120" height="80" fill="url(#serverGrad1)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="140" y="130" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Server A</text>
  <text x="140" y="150" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">Wants: Ticket_12</text>

  <rect x="80" y="280" width="120" height="80" fill="url(#serverGrad2)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="140" y="310" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Server B</text>
  <text x="140" y="330" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">Wants: Ticket_12</text>

  <!-- ZooKeeper / Lock Service -->
  <rect x="360" y="150" width="140" height="150" fill="url(#zkGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="430" y="180" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">ZooKeeper</text>
  <text x="430" y="195" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">(Or Redis)</text>

  <!-- Lock File / ZNode -->
  <rect x="380" y="210" width="100" height="70" fill="#064e3b" rx="4" stroke="#10b981"/>
  <text x="430" y="230" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">/locks/T_12</text>
  <text x="430" y="250" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">Owner: Svr_A</text>
  <text x="430" y="265" fill="#6ee7b7" font-size="9" font-family="monospace" text-anchor="middle">TTL: 15sec</text>

  <!-- Database Shared Resource -->
  <rect x="620" y="185" width="120" height="80" fill="url(#dbGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="680" y="215" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Database</text>
  <text x="680" y="235" fill="#e9d5ff" font-size="10" font-family="monospace" text-anchor="middle">Row: Ticket_12</text>
  <rect x="640" y="245" width="80" height="10" fill="#ef4444" rx="2"/>


  <!-- Flow Arrows (Success for A) -->
  <path d="M 200 140 L 360 190" stroke="#60a5fa" stroke-width="3" fill="none" marker-end="url(#arrowL)"/>
  <text x="280" y="150" fill="#60a5fa" font-size="10" font-weight="bold" transform="rotate(15, 280, 150)">1. CREATE (/locks/T_12)</text>
  <text x="290" y="165" fill="#93c5fd" font-size="9" transform="rotate(15, 290, 165)">Success!</text>

  <path d="M 430 150 L 430 100 L 680 100 L 680 185" stroke="#10b981" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowL)"/>
  <text x="560" y="90" fill="#34d399" font-size="10" font-weight="bold">2. SvrA Updates DB</text>

  <!-- Flow Arrows (Failure for B) -->
  <path d="M 200 320 L 360 270" stroke="#fbbf24" stroke-width="3" fill="none" marker-end="url(#arrowB)"/>
  <text x="260" y="325" fill="#fbbf24" font-size="10" font-weight="bold" transform="rotate(-15, 260, 325)">1. CREATE (/locks/T_12)</text>
  <text x="270" y="340" fill="#ef4444" font-size="9" font-weight="bold" transform="rotate(-15, 270, 340)">FAILED (Exists)</text>

  <!-- Polling / Watching line for B -->
  <path d="M 140 280 L 140 230 L 360 230" stroke="#fcd34d" stroke-width="1" stroke-dasharray="2" fill="none" marker-end="url(#arrowL)"/>
  <text x="250" y="225" fill="#fcd34d" font-size="9" font-style="italic">B Watches /locks/T_12</text>

  <!-- Heartbeat / Ephemeral Node visual -->
  <rect x="180" y="180" width="60" height="20" fill="#1e293b" rx="2" stroke="#475569"/>
  <text x="210" y="193" fill="#94a3b8" font-size="8" font-family="monospace" text-anchor="middle">Heartbeat</text>

  <rect x="250" y="400" width="300" height="40" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="400" y="425" fill="#cbd5e1" font-size="12" font-family="sans-serif" text-anchor="middle">A lock represents exclusive system-wide access.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The Concurrency Problem',
      description: 'In a microservices architecture, you might have 50 identical instances of the Order Service. If two users try to claim the last item in stock at exactly the same time, two different servers process the request. Without a distributed lock, both servers read `inventory=1`, both update it to `0`, and you\'ve double-sold an item.'
    },
    {
      title: 'Redis (Redlock Algorithm)',
      description: 'Redis can act as a lock manager. To acquire a lock, a server writes a key `SET ticket_12 my_server_id NX PX 10000`. `NX` means "Only set if it doesn\'t exist." If the command succeeds, the server has the lock. If it fails, another server has it. The `PX 10000` is crucial—it\'s a 10-second Time-To-Live (TTL) lease to prevent deadlocks if the server crashes while holding the lock.'
    },
    {
      title: 'ZooKeeper (Ephemeral ZNodes)',
      description: 'ZooKeeper is an older, battle-tested system specifically designed for consensus and locking. Instead of TTLs, an application creates an "Ephemeral" file (`/locks/resource_A`). ZooKeeper maintains a persistent TCP heartbeat. If the app server crashes, the TCP connection drops, and ZooKeeper instantly deletes the file, releasing the lock.'
    },
    {
      title: 'Fencing Tokens (The Split-Brain Problem)',
      description: 'If Server A takes a lock, but then freezes for 15 seconds (garbage collection pause), the 10-second Redis TTL expires. Server B then takes the lock. Now BOTH servers think they have the lock! If Server A wakes up and writes to the DB, it corrupts data. True distributed locking requires the DB to accept writes with strictly increasing "Fencing Tokens" (versions) to reject Server A\'s late write.'
    }
  ],
  comparisonTable: {
    headers: ['Technology', 'Lock Mechanism', 'Pros', 'Cons'],
    rows: [
      ['Redis (Redlock)', 'Key with NX & TTL expiration', 'Extremely fast, simple to implement if Redis is already in stack.', 'Clock drift or GC pauses can result in two clients holding the lock simultaneously.'],
      ['ZooKeeper', 'Ephemeral ZNodes + Heartbeats', 'Strong consistency, CP system, no TTL/Clock reliance.', 'Heavy, complex to deploy and maintain Java infrastructure just for locking.'],
      ['etcd', 'Leases + Revisions', 'Modern Go alternative to ZK, used by Kubernetes.', 'Very similar complexity to ZooKeeper.'],
      ['PostgreSQL', 'SELECT ... FOR UPDATE', 'No external services required, tied directly to data ACID transactions.', 'Locks up database connection pools, terrible tail latency for highly contented rows.']
    ]
  },
  pitfalls: [
    'Missing Expirations (TTLs): If Server A acquires a Redis lock and then crashes or restarts, the lock will be held forever. The entire system deadlocks. You MUST use TTL expirations.',
    'Ignoring Fencing Tokens: Believing a Redis lock provides 100% data safety. It only provides optimization. Your final Database transaction must still use optimistic concurrency (e.g., `UPDATE items SET stock=0 WHERE id=1 AND version=5`) to prevent GC-pause split-brain updates.',
    'Using single-node Redis for locks: If your master Redis node crashes, the replica might not have synced the lock yet. A new server asks the replica for the lock, gets it, while the old server still holds the old lock. (This is why the multi-node Redlock algorithm exists).'
  ]
};
