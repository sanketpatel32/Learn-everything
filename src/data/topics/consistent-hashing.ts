import { TopicContent } from '../topicContent';

export const consistentHashing: TopicContent = {
  title: 'Consistent Hashing & Data Distribution',
  description: 'In distributed caching and database systems (like Redis, Cassandra, DynamoDB), you need to distribute data across multiple nodes evenly. Standard hashing modulo `N` fails completely when nodes are added or removed, causing massive cache misses. Consistent Hashing solves this by mapping both data and nodes to a circular keyspace.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <radialGradient id="nodeGrad1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </radialGradient>
    <radialGradient id="nodeGrad2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#064e3b" />
    </radialGradient>
    <radialGradient id="nodeGrad3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#78350f" />
    </radialGradient>
    <marker id="arrowH" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Left Side: Standard Modulo Hashing (The Problem) -->
  <text x="200" y="40" fill="#f8fafc" font-size="16" font-weight="bold" text-anchor="middle">1. Standard Modulo: hash(key) % N</text>
  <text x="200" y="60" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Problem: If N changes, EVERY key moves.</text>

  <rect x="60" y="80" width="80" height="60" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="100" y="105" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">Node 0</text>
  <text x="100" y="125" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Keys: A, D</text>

  <rect x="160" y="80" width="80" height="60" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="200" y="105" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">Node 1</text>
  <text x="200" y="125" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Keys: B, E</text>

  <rect x="260" y="80" width="80" height="60" fill="#3f3f46" rx="4" stroke="#ef4444" stroke-width="2"/>
  <text x="300" y="105" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">Node 2</text>
  <text x="300" y="125" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="middle">CRASHED!</text>

  <path d="M 120 150 L 200 180" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowH)"/>
  <path d="M 280 150 L 200 180" stroke="#ef4444" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowH)"/>
  <text x="200" y="210" fill="#fca5a5" font-size="10" text-anchor="middle">Formula becomes % 2.</text>
  <text x="200" y="225" fill="#fca5a5" font-size="10" text-anchor="middle">All keys re-hashed.</text>
  <text x="200" y="240" fill="#fca5a5" font-size="10" text-anchor="middle">Massive Cache Miss Storm!</text>


  <!-- Right Side: Consistent Hashing Ring -->
  <line x1="400" y1="20" x2="400" y2="430" stroke="#334155" stroke-width="2" stroke-dasharray="8"/>

  <text x="600" y="40" fill="#f8fafc" font-size="16" font-weight="bold" text-anchor="middle">2. Consistent Hashing Ring</text>
  <text x="600" y="60" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Only 1/N keys move when node changes.</text>

  <!-- The Ring -->
  <circle cx="600" cy="240" r="140" fill="url(#ringGrad)" stroke="#475569" stroke-width="8"/>
  <circle cx="600" cy="240" r="136" fill="none" stroke="#60a5fa" stroke-width="1" stroke-dasharray="2 4"/>

  <!-- Hash Space Marks -->
  <text x="600" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0</text>
  <text x="600" y="400" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">2^256 - 1</text>

  <!-- Nodes on the ring -->
  <circle cx="600" cy="100" r="16" fill="url(#nodeGrad1)" stroke="#fff" stroke-width="2"/>
  <text x="600" y="104" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">N1</text>
  
  <circle cx="721" cy="310" r="16" fill="url(#nodeGrad2)" stroke="#fff" stroke-width="2"/>
  <text x="721" y="314" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">N2</text>

  <circle cx="479" cy="310" r="16" fill="url(#nodeGrad3)" stroke="#fff" stroke-width="2"/>
  <text x="479" y="314" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">N3</text>

  <!-- Virtual Nodes Ghost Rings -->
  <circle cx="680" cy="120" r="8" fill="url(#nodeGrad3)" opacity="0.5"/>
  <circle cx="730" cy="190" r="8" fill="url(#nodeGrad1)" opacity="0.5"/>
  <circle cx="520" cy="120" r="8" fill="url(#nodeGrad2)" opacity="0.5"/>
  <circle cx="470" cy="190" r="8" fill="url(#nodeGrad1)" opacity="0.5"/>
  <circle cx="600" cy="380" r="8" fill="url(#nodeGrad2)" opacity="0.5"/>

  <!-- Keys on the ring -->
  <circle cx="670" cy="118" r="6" fill="#ec4899"/>
  <text x="690" y="122" fill="#fbcfe8" font-size="10" font-family="monospace">K1</text>
  
  <circle cx="735" cy="200" r="6" fill="#ec4899"/>
  <text x="755" y="204" fill="#fbcfe8" font-size="10" font-family="monospace">K2</text>

  <circle cx="530" cy="360" r="6" fill="#ec4899"/>
  <text x="510" y="364" fill="#fbcfe8" font-size="10" font-family="monospace" text-anchor="end">K3</text>

  <circle cx="490" cy="150" r="6" fill="#ec4899"/>
  <text x="470" y="154" fill="#fbcfe8" font-size="10" font-family="monospace" text-anchor="end">K4</text>


  <!-- Data Flow Arrows (Clockwise) -->
  <path d="M 670 125 Q 690 180 710 295" stroke="#ec4899" stroke-width="2" fill="none" marker-end="url(#arrowH)"/>
  <text x="730" y="160" fill="#fbcfe8" font-size="9" transform="rotate(20, 730, 160)">Clockwise to N2</text>

  <!-- Explanatory Box -->
  <rect x="50" y="280" width="300" height="120" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="200" y="300" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">How it Works:</text>
  <text x="60" y="325" fill="#cbd5e1" font-size="10">- Hash both Servers and Keys to ring.</text>
  <text x="60" y="345" fill="#cbd5e1" font-size="10">- To find a key, go clockwise.</text>
  <text x="60" y="365" fill="#cbd5e1" font-size="10">- First Server encountered owns the key.</text>
  <text x="60" y="385" fill="#60a5fa" font-size="10" font-weight="bold">- Virtual Nodes ensure even distribution.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The Modulo N Problem',
      description: 'If you have 5 cache servers and route traffic using `hash(UserId) % 5`, it works perfectly. However, if server 5 crashes, the formula becomes `% 4`. Suddenly, the modulus for 90% of user IDs changes. Nearly every cache lookup routes to a different server, resulting in a 90% cache miss rate and crushing the database backend (Thundering Herd).'
    },
    {
      title: 'The Hash Ring',
      description: 'Consistent hashing imagines the hash output space (e.g., 0 to 2^256 - 1) as a connected circle. You hash your Node IDs (e.g., IP addresses) to place them on the ring. Then you hash your Data Keys (e.g., UserID) onto the ring. To find which node owns a key, you move clockwise on the ring until you find a node.'
    },
    {
      title: 'Graceful Degradation',
      description: 'If Node B crashes and is removed from the ring, the keys that originally routed to Node B simply continue clockwise and fall onto Node C. All other keys routing to Node A or D remain completely unaffected. Only `1/N` of the data shifts, keeping the cache highly stable.'
    },
    {
      title: 'Virtual Nodes (vNodes)',
      description: 'If you only put 3 physical nodes on a huge 2^256 ring, the spacing will inevitably be uneven. Node A might control 60% of the ring, becoming a hotspot. To fix this, we hash Node A with multiple labels (NodeA_1, NodeA_2, NodeA_3... NodeA_256). These "Virtual Nodes" interleave the servers evenly across the ring.'
    }
  ],
  comparisonTable: {
    headers: ['Hashing Strategy', 'Behavior on Node Add/Remove', 'Data Distribution', 'Use Case'],
    rows: [
      ['Standard Modulo (hash % N)', 'Terrible. Re-maps nearly all data (O(Keys)).', 'Very even (mathematically perfect).', 'Fixed-size server pools (e.g., rigid monolithic DB shards).'],
      ['Consistent Hashing (No vNodes)', 'Excellent. Re-maps only K/N keys.', 'Uneven. Hotspots are very common.', 'Almost never used without vNodes.'],
      ['Consistent Hashing (with vNodes)', 'Excellent. Re-maps only K/N keys.', 'Even. vNodes distribute load probabilistically.', 'DynamoDB, Cassandra, Memcached, Redis Cluster.']
    ]
  },
  pitfalls: [
    'Forgetting Virtual Nodes: Implementing persistent hashing without vNodes is practically useless at scale. One server will almost certainly get a larger "slice of the pie" and become a CPU/Memory hotspot.',
    'Ignoring Replication: Consistent hashing determines the "Primary" node for a key. Real systems (like Cassandra) also replicate data to the next N-1 consecutive nodes on the ring to ensure high availability if the primary node dies.',
    'Heterogeneous Hardware: If Server A has 64GB RAM and Server B has 256GB RAM, you don\'t want them taking equal slices of the ring. You solve this by assigning more Virtual Nodes (e.g., 256) to the strong server and fewer (e.g., 64) to the weak one, creating a proportional weight system.'
  ]
};
