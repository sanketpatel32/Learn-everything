import { TopicContent } from '../topicContent';

export const typeahead: TopicContent = {
  title: 'Design Search Typeahead',
  description: 'Search Typeahead (Autocomplete) is one of the classic System Design questions. As a user types "a", "am", "ama", the system must return top search suggestions (like "amazon") in under 100 milliseconds. This requires masterful memory management using a Trie data structure.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="trieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="batchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User Input -->
  <rect x="20" y="100" width="160" height="60" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="100" y="125" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Google Search UI</text>
  <text x="100" y="145" fill="#94a3b8" font-size="14" font-family="monospace" text-anchor="middle">"am|"</text>

  <!-- Query API -->
  <rect x="240" y="90" width="100" height="80" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="290" y="120" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Query API</text>
  <text x="290" y="135" fill="#bfdbfe" font-size="9" text-anchor="middle">(Sub 50ms)</text>
  <rect x="250" y="145" width="80" height="15" fill="#1e40af" rx="2"/>
  <text x="290" y="155" fill="#bfdbfe" font-size="8" text-anchor="middle">Redis Cache</text>

  <path d="M 180 130 L 240 130" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- The Trie Data Structure (In RAM) -->
  <rect x="400" y="40" width="360" height="200" fill="#0f172a" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="580" y="65" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Trie Cache Cluster (In-Memory Nodes)</text>
  <text x="580" y="80" fill="#a7f3d0" font-size="9" text-anchor="middle">Data Structure for Prefix Lookups O(L + V)</text>

  <!-- Trie Root -->
  <circle cx="580" cy="110" r="16" fill="url(#trieGrad)" stroke="#10b981" stroke-width="2"/>
  <text x="580" y="115" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">a</text>
  
  <rect x="610" y="95" width="120" height="30" fill="#064e3b" rx="2" stroke="#059669"/>
  <text x="670" y="108" fill="#6ee7b7" font-size="8" text-anchor="middle">Top 3 starting with 'a':</text>
  <text x="670" y="118" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">amazon, apple, auto</text>

  <!-- Trie Level 2 (m, p) -->
  <circle cx="480" cy="180" r="16" fill="url(#trieGrad)" stroke="#10b981" stroke-width="2"/>
  <text x="480" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">m</text>
  <rect x="510" y="165" width="110" height="30" fill="#064e3b" rx="2" stroke="#059669"/>
  <text x="565" y="178" fill="#a7f3d0" font-size="8" text-anchor="middle">Top 3 with 'am':</text>
  <text x="565" y="188" fill="#10b981" font-size="9" font-weight="bold" font-family="monospace" text-anchor="middle">amazon, amx, amd</text>
  <path d="M 430 180 L 340 160" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="380" y="165" fill="#6ee7b7" font-size="10" font-weight="bold">Answers!</text>


  <circle cx="680" cy="180" r="16" fill="#1e293b" stroke="#475569" stroke-width="2"/>
  <text x="680" y="185" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">p</text>
  <rect x="650" y="210" width="60" height="15" fill="#0f172a" rx="2" stroke="#475569"/>
  <text x="680" y="220" fill="#64748b" font-size="8" text-anchor="middle">apple (90k)</text>

  <path d="M 570 125 L 490 165" stroke="#34d399" stroke-width="2" fill="none"/>
  <path d="M 590 125 L 670 165" stroke="#475569" stroke-width="2" fill="none"/>

  <path d="M 340 100 L 400 100" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- Bottom: Update / Writing Flow -->
  <line x1="20" y1="260" x2="780" y2="260" stroke="#334155" stroke-width="2" stroke-dasharray="8"/>
  <text x="400" y="280" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Write Path (Asynchronous Generation)</text>

  <rect x="20" y="320" width="100" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="70" y="338" fill="#f8fafc" font-size="10" text-anchor="middle">Global Logs</text>
  <text x="70" y="350" fill="#94a3b8" font-size="8" text-anchor="middle">(1B Queries/Day)</text>

  <rect x="180" y="300" width="120" height="80" fill="url(#batchGrad)" rx="6" stroke="#a855f7" stroke-width="2"/>
  <text x="240" y="330" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">MapReduce</text>
  <text x="240" y="345" fill="#e9d5ff" font-size="9" text-anchor="middle">(Hadoop/Spark)</text>
  <text x="240" y="360" fill="#e9d5ff" font-size="8" text-anchor="middle">Aggregates search counts</text>

  <rect x="360" y="300" width="120" height="80" fill="#0f172a" rx="6" stroke="#fbbf24" stroke-width="2"/>
  <text x="420" y="330" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Trie Builder</text>
  <text x="420" y="345" fill="#fde68a" font-size="9" text-anchor="middle">(Weekly/Daily Pipeline)</text>
  <text x="420" y="360" fill="#fde68a" font-size="8" text-anchor="middle">Constructs heavy objects</text>

  <rect x="540" y="300" width="120" height="80" fill="#0f172a" rx="6" stroke="#fbbf24" stroke-width="2"/>
  <text x="600" y="330" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">MongoDB / S3</text>
  <text x="600" y="345" fill="#fde68a" font-size="9" text-anchor="middle">Stores serialized</text>
  <text x="600" y="360" fill="#fde68a" font-size="9" text-anchor="middle">Trie Snapshots</text>


  <!-- Write Flow -->
  <path d="M 120 340 L 180 340" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 300 340 L 360 340" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 480 340 L 540 340" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <path d="M 600 300 L 600 240" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="610" y="270" fill="#60a5fa" font-size="9">Replaces Live RAM Cache</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Trie Data Structure',
      description: 'The Trie (Prefix Tree) is the fundamental backbone of autocomplete. A relational DB query `LIKE "am%"` completely fails at scale since it requires scanning entire character indexes. A Trie organizes characters in an interconnected tree. Finding "am" involves precisely 2 memory jumps (Root -> \'a\' -> \'m\') in `O(L)` time, where L is the prefix length (e.g. 2 operations).'
    },
    {
      title: 'Caching Top Queries in Nodes',
      description: 'Even with a Trie, finding the top 5 results under the "m" node would require recursively searching all millions of children below it. To fix this, we store the "Top 5 Recommendations" directly inside the node itself. When the user hits the "m" node, the API returns the pre-calculated array `["amazon", "amx", "amd"]` immediately in O(1) time.'
    },
    {
      title: 'The MapReduce Aggregation Pipeline',
      description: 'Autocomplete databases are massive and highly biased (everyone searches the same heavy-hitters). You don\'t update the global Trie dynamically every time someone types a letter. Instead, you dump 1 billion raw daily searches into Hadoop. A MapReduce job crunches the logs, counts frequencies, and constructs a brand new mathematical Trie offline.'
    },
    {
      title: 'Replacing the Trie (Snapshotting)',
      description: 'Once the weekly MapReduce job finishes creating the new Trie structure, it serializes it to a MongoDB database or an S3 file. The live API Servers (which hold the Trie in RAM) are then notified to download the snapshot and hot-swap their internal RAM objects, ensuring zero-downtime cache updates.'
    }
  ],
  comparisonTable: {
    headers: ['Data Representation', 'Time Complexity Limit', 'Speed & Applicability'],
    rows: [
      ['RDBMS `LIKE "am%"`', 'O(N) character scans.', 'Extremely slow. Database melts down under search volumes.'],
      ['Standard InMemory Trie', 'O(L) to find prefix, then DFS (Depth First Search) to find child words.', 'Fast lookup, but very slow resolution for short prefixes (like "a").'],
      ['Optimized Trie (List Cached in Node)', 'O(1) to return list once prefix is located.', 'Averaging sub 30ms latency. Heavily optimized for high-volume read APIs.']
    ]
  },
  pitfalls: [
    'Updating the Trie in Real-time: While tempting for "breaking news", acquiring write locks on heavy root nodes (like "a") for every user search will bottleneck the entire application. The Trie must be completely Read-Only, updated via sweeping offline batch processing jobs.',
    'Ignoring Client-side Debouncing: If the frontend sends an API HTTP request every time the user hits a key sequentially (`a` -> `ap` -> `app`), you triple your backend server load. Frontends must use JavaScript Debouncing (wait 150ms after the user stops hitting keys before firing the REST call).',
    'Single Node Scaling: An English Trie can fit on one 64GB RAM instance if heavily optimized, but the CPU network connections will max out. Tries are generally split across a Redis cluster using Zookeeper routing, partitioning by the starting letter (e.g. Server 1 handles a-h, Server 2 handles i-z).'
  ]
};
