import { TopicContent } from '../topicContent';

export const replication: TopicContent = {
  title: 'Database Replication',
  description: 'Replication involves keeping a copy of the same data on multiple machines that are connected via a network. It ensures high availability (if one node dies, others survive), reduced latency (users read from nodes geographically closer to them), and increased read throughput.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="dbLeader" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="dbFollower" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
    <marker id="arrowRepl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Clients -->
  <rect x="50" y="40" width="100" height="40" fill="#334155" rx="6" stroke="#cbd5e1" stroke-width="2"/>
  <text x="100" y="65" fill="#f8fafc" font-size="14" font-family="sans-serif" text-anchor="middle">Client (Write)</text>

  <rect x="400" y="40" width="100" height="40" fill="#334155" rx="6" stroke="#cbd5e1" stroke-width="2"/>
  <text x="450" y="65" fill="#f8fafc" font-size="14" font-family="sans-serif" text-anchor="middle">Client (Read)</text>

  <rect x="650" y="40" width="100" height="40" fill="#334155" rx="6" stroke="#cbd5e1" stroke-width="2"/>
  <text x="700" y="65" fill="#f8fafc" font-size="14" font-family="sans-serif" text-anchor="middle">Client (Read)</text>

  <!-- Leader DB -->
  <rect x="50" y="160" width="160" height="120" fill="url(#dbLeader)" rx="12" stroke="#60a5fa" stroke-width="3"/>
  <text x="130" y="200" fill="#ffffff" font-size="20" font-weight="bold" font-family="sans-serif" text-anchor="middle">LEADER</text>
  <text x="130" y="225" fill="#bfdbfe" font-size="12" font-family="sans-serif" text-anchor="middle">(Primary)</text>
  <text x="130" y="250" fill="#bfdbfe" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Reads & Writes</text>

  <!-- Follower DB 1 -->
  <rect x="370" y="160" width="160" height="120" fill="url(#dbFollower)" rx="12" stroke="#34d399" stroke-width="3"/>
  <text x="450" y="200" fill="#ffffff" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">FOLLOWER 1</text>
  <text x="450" y="225" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">(Secondary / Replica)</text>
  <text x="450" y="250" fill="#a7f3d0" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Reads Only</text>

  <!-- Follower DB 2 -->
  <rect x="620" y="160" width="160" height="120" fill="url(#dbFollower)" rx="12" stroke="#34d399" stroke-width="3"/>
  <text x="700" y="200" fill="#ffffff" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">FOLLOWER 2</text>
  <text x="700" y="225" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">Geographically Distant</text>
  <text x="700" y="250" fill="#a7f3d0" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Reads Only</text>

  <!-- Write Flow -->
  <path d="M 100 85 L 100 150" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="50" y="125" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="bold">INSERT/UPDATE</text>

  <!-- Read Flows -->
  <path d="M 450 85 L 450 150" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="420" y="125" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="bold">SELECT</text>

  <path d="M 700 85 L 700 150" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="670" y="125" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="bold">SELECT</text>

  <path d="M 120 85 L 120 150" stroke="#f8fafc" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="130" y="105" fill="#94a3b8" font-size="10" font-family="sans-serif">(Also allowed)</text>

  <!-- Replication Streams -->
  <!-- Async Replication to Follower 1 -->
  <path d="M 220 200 L 360 200" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowRepl)"/>
  <text x="290" y="190" fill="#fbbf24" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">WAL Replication</text>
  <text x="290" y="215" fill="#fde68a" font-size="10" font-family="sans-serif" text-anchor="middle">(Usually Asynchronous)</text>

  <!-- Async Replication to Follower 2 -->
  <path d="M 220 240 C 350 320, 500 320, 630 240" stroke="#fbbf24" stroke-width="3" stroke-dasharray="6,4" fill="none" marker-end="url(#arrowRepl)"/>
  <text x="425" y="305" fill="#fbbf24" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Asynchronous Replication (High Latency, Cross-Region)</text>

  <!-- Failover visual -->
  <rect x="50" y="360" width="220" height="60" fill="#1e293b" rx="6" stroke="#ef4444" stroke-width="2"/>
  <text x="160" y="380" fill="#fca5a5" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">If Leader Dies:</text>
  <text x="160" y="400" fill="#e2e8f0" font-size="11" font-family="sans-serif" text-anchor="middle">Consensus algorithm (e.g. Raft) elects</text>
  <text x="160" y="415" fill="#e2e8f0" font-size="11" font-family="sans-serif" text-anchor="middle">Follower 1 as the new Leader.</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'Leader-Follower (Master-Slave) Architecture',
      description: 'The most common setup. One node is designated the Leader. All writes MUST go to the Leader. The Leader writes the data to its local storage, then sends the data change log (often the WAL - Write Ahead Log) to its Followers. Followers apply the log to stay continuously updated. Clients can read from ANY node.'
    },
    {
      title: 'Synchronous vs Asynchronous Replication',
      description: 'In Sync replication, the Leader waits for Followers to confirm they received the write before telling the client "Success". This guarantees no data loss if the Leader crashes, but makes writes very slow. Async replication tells the client "Success" instantly, and replicates in the background. It is fast, but a sudden Leader crash can result in lost data if it wasn\'t replicated yet.'
    },
    {
      title: 'Multi-Leader Replication',
      description: 'Instead of one Leader, you have multiple Leaders (usually one per datacenter/region). Clients write to their local Leader. Leaders then asynchronously replicate their changes to each other. This is complex because it requires **Conflict Resolution** (what happens if two users update the same row simultaneously in different continents?).'
    },
    {
      title: 'Leaderless Replication',
      description: 'Pioneered by Amazon Dynamo (and used in Cassandra). Any client can send writes to any replica. To ensure consistency, clients write to $W$ replicas and read from $R$ replicas, requiring a quorum $W + R > N$.'
    }
  ],
  comparisonTable: {
    headers: ['Replication Type', 'Write Speed', 'Complexity', 'Best For'],
    rows: [
      ['Single Leader (Async)', 'Very Fast', 'Low', 'Standard web apps with read-heavy workloads (MySQL, Postgres defaults)'],
      ['Single Leader (Sync)', 'Slow (Network Bound)', 'Low', 'Financial systems where absolute 0 data loss is non-negotiable'],
      ['Multi-Leader', 'High (Local writes)', 'Extremely High (Conflict resolution)', 'Collaborative apps (Google Docs) or true multi-region global apps'],
      ['Leaderless', 'Fast', 'High (Read repair, Vector clocks)', 'High availability, write-heavy workloads (Cassandra)']
    ]
  },
  pitfalls: [
    'Replication Lag: In async setups, a user updates their profile and instantly refreshes the page. The read hits a Follower that hasn\'t received the update yet, so they see their old profile. Solution: Read-Your-Own-Writes consistency (routing the immediate read to the Leader).',
    'Split Brain: The network fails, and half the nodes think the Leader is dead, electing a new one. Now you have two Leaders accepting conflicting writes. Requires strict Quorum algorithms (like Raft or Paxos) to prevent.',
    'Treating Replication as Backups. If you run `DROP TABLE users;` on the Leader, the replication stream will happily execute `DROP TABLE users;` on all Followers milliseconds later. You still need backups.'
  ]
};
