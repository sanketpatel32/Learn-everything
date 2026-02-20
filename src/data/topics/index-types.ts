import { TopicContent } from '../topicContent';

export const indexTypes: TopicContent = {
  title: 'BTrees, LSM Trees, & Hashing',
  description: 'At the very core of a database is its storage engine—the data structure it uses to actually save bytes to the disk. Relational databases traditionally rely on B-Trees for read-heavy workloads. Modern NoSQL databases often rely on Log-Structured Merge (LSM) Trees for massive write-heavy workloads. Hash indexes provide O(1) lookups but cannot handle range queries.',
  diagram: `
<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="btreeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="lsmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowDB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- Left Side: B-Tree (Read Optimized) -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">B-Tree (Read Optimized)</text>
    <text x="180" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Mutable, sorted pages on disk</text>

    <!-- B-Tree Nodes -->
    <!-- Root Node -->
    <rect x="130" y="100" width="100" height="30" fill="url(#btreeGrad)" rx="4"/>
    <text x="180" y="120" fill="#fff" font-size="12" font-family="monospace" text-anchor="middle">[40 | 80]</text>

    <!-- Level 1 Nodes -->
    <rect x="40" y="180" width="80" height="30" fill="url(#btreeGrad)" rx="4"/>
    <text x="80" y="200" fill="#fff" font-size="12" font-family="monospace" text-anchor="middle">[10|20|30]</text>

    <rect x="140" y="180" width="80" height="30" fill="url(#btreeGrad)" rx="4"/>
    <text x="180" y="200" fill="#fff" font-size="12" font-family="monospace" text-anchor="middle">[50|60|70]</text>

    <rect x="240" y="180" width="80" height="30" fill="url(#btreeGrad)" rx="4"/>
    <text x="280" y="200" fill="#fff" font-size="12" font-family="monospace" text-anchor="middle">[90|100]</text>

    <!-- Pointers -->
    <path d="M 140 130 L 80 180" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrowDB)"/>
    <path d="M 180 130 L 180 180" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrowDB)"/>
    <path d="M 220 130 L 280 180" stroke="#64748b" stroke-width="2" fill="none" marker-end="url(#arrowDB)"/>

    <!-- Disk Section -->
    <rect x="40" y="250" width="280" height="80" fill="#1e293b" rx="8" stroke="#cbd5e1"/>
    <text x="180" y="275" fill="#f8fafc" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Physical Disk Data (Leaf Nodes)</text>
    <rect x="50" y="290" width="60" height="20" fill="#334155" rx="2"/>
    <text x="80" y="303" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Row: 10</text>
    <rect x="115" y="290" width="60" height="20" fill="#0f172a" rx="2" stroke="#ef4444"/>
    <text x="145" y="303" fill="#ef4444" font-size="10" font-family="monospace" text-anchor="middle">Row: 50 -> 55</text>
    <rect x="180" y="290" width="60" height="20" fill="#334155" rx="2"/>
    <text x="210" y="303" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Row: 70</text>

    <!-- Pointers to disk -->
    <path d="M 80 210 L 80 250" stroke="#94a3b8" stroke-dasharray="4" stroke-width="2" fill="none"/>
    <path d="M 180 210 L 180 250" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowDB)"/>
    <text x="120" y="235" fill="#ef4444" font-size="10" font-style="italic">In-place OS Page UPDATE</text>

    <!-- Labels -->
    <text x="180" y="380" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Reads: Fast O(log N) traversal.</text>
    <text x="180" y="400" fill="#f43f5e" font-size="11" font-family="sans-serif" text-anchor="middle">Writes: Slow. Requires finding blocks on disk,</text>
    <text x="180" y="415" fill="#f43f5e" font-size="11" font-family="sans-serif" text-anchor="middle">locking them, and doing Random I/O updates.</text>
    <text x="180" y="440" fill="#38bdf8" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Primary Use: MySQL, PostgreSQL</text>
  </g>

  <!-- Right Side: LSM Tree (Write Optimized) -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="460" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">LSM Tree (Write Optimized)</text>
    <text x="180" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Append-only, Immutable SSTables</text>

    <!-- MemTable (RAM) -->
    <rect x="100" y="90" width="160" height="60" fill="#064e3b" rx="8" stroke="#10b981" stroke-width="2"/>
    <text x="180" y="115" fill="#a7f3d0" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">MemTable (In-RAM)</text>
    <text x="180" y="135" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">k1: v1, k9: v9 (Sorted)</text>
    
    <path d="M 60 120 L 100 120" stroke="#34d399" stroke-width="3" fill="none" marker-end="url(#arrowDB)"/>
    <text x="30" y="123" fill="#34d399" font-size="12" font-weight="bold">Write</text>

    <!-- Flush to Disk -->
    <path d="M 180 150 L 180 200" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowDB)"/>
    <text x="210" y="180" fill="#fbbf24" font-size="10" font-weight="bold">Flush when full</text>

    <!-- SSTables (Disk) -->
    <rect x="80" y="200" width="200" height="150" fill="#1e293b" rx="8" stroke="#cbd5e1" stroke-width="2"/>
    <text x="180" y="225" fill="#f8fafc" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Disk: SSTables (Immutable)</text>

    <!-- Level 0 (Recent) -->
    <rect x="100" y="240" width="160" height="20" fill="url(#lsmGrad)" rx="2"/>
    <text x="180" y="253" fill="#fff" font-size="9" font-family="monospace" text-anchor="middle">L0: [k1: v1x] [k2: v2] (Newest)</text>
    
    <!-- Level 1 (Older) -->
    <rect x="100" y="270" width="160" height="20" fill="url(#lsmGrad)" rx="2"/>
    <text x="180" y="283" fill="#fff" font-size="9" font-family="monospace" text-anchor="middle">L1: [k1: v1] [k8: v8]</text>

    <!-- Level 2 (Oldest) -->
    <rect x="100" y="300" width="160" height="20" fill="url(#lsmGrad)" rx="2" opacity="0.6"/>
    <text x="180" y="313" fill="#fff" font-size="9" font-family="monospace" text-anchor="middle">L2: [k1: v0] [k7: v7] (Oldest)</text>

    <!-- Read Path -->
    <path d="M 330 140 C 360 140, 360 210, 270 210" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowDB)"/>
    <text x="340" y="130" fill="#60a5fa" font-size="12" font-weight="bold">Read</text>
    <text x="320" y="180" fill="#60a5fa" font-size="9">Scan MemTable</text>
    <text x="320" y="195" fill="#60a5fa" font-size="9">then L0 -> L1</text>

    <!-- Labels -->
    <text x="180" y="380" fill="#10b981" font-size="11" font-family="sans-serif" text-anchor="middle">Writes: Instant. Just appends to purely sequential RAM.</text>
    <text x="180" y="400" fill="#fbbf24" font-size="11" font-family="sans-serif" text-anchor="middle">Reads: Slower. Must search MemTable, then check</text>
    <text x="180" y="415" fill="#fbbf24" font-size="11" font-family="sans-serif" text-anchor="middle">Bloom Filters to know which SSTable on disk.</text>
    <text x="180" y="440" fill="#34d399" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Primary Use: Cassandra, RocksDB, DynamoDB</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'B-Trees (Balance Trees)',
      description: 'The standard data structure for relational databases. B-Trees store data in sorted pages on disk. When you update a row, the DB finds the specific physical block on the hard drive and modifies it **in-place** (Random I/O). Because hard drives are slow at jumping around to random locations, B-Trees suffer heavily under massive write loads.'
    },
    {
      title: 'LSM Trees (Log-Structured Merge-Tree)',
      description: 'Built for extreme write throughput. Instead of finding a block on disk to update, an LSM tree just appends the new data to a completely sequential log in RAM (the MemTable). When the RAM fills up, it flushes the sorted data sequentially to a new immutable file on disk (SSTable). Sequential writes are up to 100x faster than Random I/O on disk.'
    },
    {
      title: 'Read/Write Asymmetry',
      description: 'B-Trees give consistent O(log N) read speeds, making them ideal for standard web applications. LSM Trees sacrifice read speed (they have to search through potentially many SSTable files starting from newest to oldest) in order to achieve blazing fast write speeds, making them perfect for event logs, IoT sensor data, and hyper-scale NoSQL.'
    },
    {
      title: 'Hashing (Hash Indexes)',
      description: 'Similar to a standard Hash Map in code. A hash index computes a hash of the key and stores a direct pointer to the value on disk. Reads and Writes are incredibly fast O(1). However, because hashing destroys ordering, **you cannot do range queries** (e.g. `WHERE age > 20`).'
    }
  ],
  comparisonTable: {
    headers: ['Storage Engine', 'Write Speed', 'Read Speed', 'Range Queries', 'Best Use Case'],
    rows: [
      ['B-Tree', 'Slow (Random I/O / Page splits)', 'Fast (Log N)', 'Excellent (Sorted on disk)', 'General purpose Relational DBs (Postgres, MySQL)'],
      ['LSM Tree', 'Blazing Fast (Sequential Memory append)', 'Slower (Must merge multiple files/Bloom Filters)', 'Good', 'Massive scale write-heavy systems (Cassandra, Time-Series)'],
      ['Hash Index', 'Fastest O(1)', 'Fastest O(1)', 'Impossible', 'In-Memory caches, strictly Key-Value lookups (Redis, Memcached)']
    ]
  },
  pitfalls: [
    'Assuming NoSQL automatically means LSM Trees. While Cassandra and DynamoDB use LSM, MongoDB defaults to WiredTiger, which utilizes a B-Tree variant!',
    'LSM Compaction Issues: Since LSM trees never delete data (they write "tombstones"), disk space grows quickly. A background "Compaction" process merges SSTables, which can cause sudden massive CPU/Disk spikes, severely degrading database performance during peak load.',
    'Trying to perform a "LIKE" or "BETWEEN" query on a Hash Index.'
  ]
};
