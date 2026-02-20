import { TopicContent } from '../topicContent';

export const sharding: TopicContent = {
  title: 'Database Sharding & Partitioning',
  description: 'When a single database becomes too large or receives too much traffic (Vertical Scaling limit reached), you must break the database apart. Partitioning divides a database into smaller, more manageable pieces. Sharding is a specific type of horizontal partitioning where pieces are spread across multiple independent machines.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="dbgrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="shardgrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <marker id="arrowS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- Left: Monolithic Database -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="300" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="150" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Single Monolithic DB</text>
    <text x="150" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">10TB Data | 100k IOPS</text>
    
    <!-- Cylinder -->
    <path d="M 50 120 C 50 90, 250 90, 250 120 L 250 320 C 250 350, 50 350, 50 320 Z" fill="url(#dbgrad)" stroke="#3b82f6" stroke-width="2"/>
    <ellipse cx="150" cy="120" rx="100" ry="20" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    
    <text x="150" y="190" fill="#93c5fd" font-size="14" font-family="sans-serif" text-anchor="middle">Users A - Z</text>
    <text x="150" y="240" fill="#ef4444" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Bottleneck Reached</text>
    <text x="150" y="290" fill="#64748b" font-size="12" font-family="sans-serif" text-anchor="middle">Cannot scale vertically</text>
  </g>

  <!-- Arrow Middle -->
  <path d="M 335 220 L 375 220" stroke="#f8fafc" stroke-width="4" fill="none" marker-end="url(#arrowS)"/>
  <text x="355" y="200" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">SHARD</text>

  <!-- Right: Sharded Database -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Sharded DB (Horizontal)</text>
    <text x="180" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Hashing / Range based routing</text>
    
    <!-- Router / API -->
    <rect x="100" y="90" width="160" height="40" fill="#334155" rx="6" stroke="#fbbf24"/>
    <text x="180" y="115" fill="#fde68a" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Routing Tier / Hash</text>
    
    <!-- Lines -->
    <path d="M 180 130 L 70 180" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
    <path d="M 180 130 L 180 180" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
    <path d="M 180 130 L 290 180" stroke="#94a3b8" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
    
    <!-- Shard 1 -->
    <path d="M 30 200 C 30 185, 110 185, 110 200 L 110 320 C 110 335, 30 335, 30 320 Z" fill="url(#shardgrad)" stroke="#10b981" stroke-width="2"/>
    <ellipse cx="70" cy="200" rx="40" ry="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="70" y="250" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Shard 1</text>
    <text x="70" y="270" fill="#64748b" font-size="11" font-family="sans-serif" text-anchor="middle">Users A-H</text>

    <!-- Shard 2 -->
    <path d="M 140 200 C 140 185, 220 185, 220 200 L 220 320 C 220 335, 140 335, 140 320 Z" fill="url(#shardgrad)" stroke="#10b981" stroke-width="2"/>
    <ellipse cx="180" cy="200" rx="40" ry="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="180" y="250" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Shard 2</text>
    <text x="180" y="270" fill="#64748b" font-size="11" font-family="sans-serif" text-anchor="middle">Users I-P</text>

    <!-- Shard 3 -->
    <path d="M 250 200 C 250 185, 330 185, 330 200 L 330 320 C 330 335, 250 335, 250 320 Z" fill="url(#shardgrad)" stroke="#10b981" stroke-width="2"/>
    <ellipse cx="290" cy="200" rx="40" ry="10" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="290" y="250" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Shard 3</text>
    <text x="290" y="270" fill="#64748b" font-size="11" font-family="sans-serif" text-anchor="middle">Users Q-Z</text>
    
    <text x="180" y="370" fill="#34d399" font-size="12" font-family="sans-serif" text-anchor="middle">3.3TB Data | 33k IOPS Each</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Vertical Partitioning',
      description: 'Dividing a table by columns. For example, moving large, rarely accessed `blob` columns (like profile pictures) into a separate table or database, while keeping frequently accessed data (username, email) in the primary table. This reduces the size of rows and speeds up sequential reads on the main table.'
    },
    {
      title: 'Horizontal Partitioning (Sharding)',
      description: 'Dividing a table by rows. You create multiple identical schemas across different database servers, and place rows in them according to a **Shard Key**. For example, putting all users from America in DB-1, Europe in DB-2, and Asia in DB-3. The query routing tier is responsible for knowing which database holds which user.'
    },
    {
      title: 'Consistent Hashing',
      description: 'Standard hashing (`hash % N`) is fragile; adding a single node requires re-mapping all data. **Consistent Hashing** maps both shards and keys onto a 360-degree virtual ring. When a shard is added, only 1/N of the data needs to be moved. We use **Virtual Nodes** to ensure that even if physical machines have different capacities, the data remains perfectly distributed.'
    },
    {
      title: 'Directory-Based (Lookup) Sharding',
      description: 'Instead of an algorithm, we use a separate **Lookup Service** (often a high-performance DB or cache like Redis) to store the mapping of Shard Key -> Shard ID. This provides maximum flexibility (you can move a single "hot" user to their own shard manually), but adds an extra network hop and a new single point of failure that must be highly available.'
    },
    {
      title: 'Resharding & Migration',
      description: 'As data grows, you eventually need more shards. **Resharding** is the process of moving data between nodes. Strategies include: **Stop-the-world** (taking the DB offline), or **Online Migration** where the system writes to both old and new shards simultaneously while a background process "backfills" the data, eventually cutting over to the new shard.'
    }
  ],
  comparisonTable: {
    headers: ['Factor', 'Monolithic DB', 'Sharded DB (Distributed)'],
    rows: [
      ['Data Capacity', 'Limited by single disk / volume', 'Infinite (Add more nodes)'],
      ['Compute (CPU/RAM)', 'Limited by single motherboard', 'Infinite (Parallel processing)'],
      ['Joins (SQL)', 'Easy (Local ACID)', 'Extremely Hard (Cross-shard joins)'],
      ['Transactions', 'ACID natively', 'Distributed (Sagas or 2PC)'],
      ['Resharding Cost', 'Low (Vertical upgrade)', 'Extremely High (Data migration)']
    ]
  },
  pitfalls: [
    'Hotspots (Celebrity Problem): If you shard a social network by `user_id`, the system will crash when Justin Bieber (living entirely on Shard 4) posts a photo. Mitigation includes secondary sharding or salting the shard key for high-traffic entities.',
    'Selecting the wrong Shard Key: The shard key is immutable. Selecting a key with low cardinality (e.g., `gender`) will result in only 2 massive, unscalable shards.',
    'Ignoring the Operational Nightmare: Schema migrations and index rebuilds across 100 shards require specialized orchestration tools like Vitess (for MySQL) or Citus (for Postgres) to prevent configuration drift.',
    'Over-sharding too early: Sharding introduces massive complexity. Many systems can go further with functional partitioning, caching, and read replicas before true horizontal sharding is required.'
  ]
};
