import { TopicContent } from '../topicContent';

export const twitter: TopicContent = {
  title: 'Design Twitter (News Feed & Timeline)',
  description: 'Twitter (X) requires an architecture that can support a massive read-to-write ratio (1000:1) while delivering real-time news feeds. The core challenge is the "Celebrity Fan-Out" problem, where a user with 50 million followers tweets, and 50 million timelines must instantly be updated to show that tweet.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="redisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Left Side: Normal User Post (Push Model) -->
  <text x="200" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Normal User (FANOUT ON WRITE)</text>

  <rect x="40" y="60" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="80" y="78" fill="#f8fafc" font-size="10" text-anchor="middle">Alice</text>
  <text x="80" y="90" fill="#94a3b8" font-size="8" text-anchor="middle">(20 Followers)</text>

  <rect x="180" y="60" width="100" height="40" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="230" y="85" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Post API</text>

  <path d="M 120 80 L 180 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="150" y="70" fill="#cbd5e1" font-size="10">"Hello"</text>

  <rect x="180" y="140" width="100" height="60" fill="#1e293b" rx="4" stroke="#3b82f6"/>
  <text x="230" y="165" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Fanout Worker</text>
  <text x="230" y="180" fill="#93c5fd" font-size="8" text-anchor="middle">Find Alice's Follows</text>

  <path d="M 230 100 L 230 140" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- In Memory Timelines (Redis) -->
  <rect x="60" y="240" width="280" height="120" fill="url(#redisGrad)" rx="8" stroke="#fca5a5" stroke-width="2"/>
  <text x="200" y="260" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Redis (Pre-computed Timelines)</text>

  <!-- Follower A Timeline -->
  <rect x="80" y="280" width="100" height="60" fill="#7f1d1d" rx="4" stroke="#f87171"/>
  <text x="130" y="295" fill="#fecaca" font-size="9" font-weight="bold" text-anchor="middle">Bob's TimelineList</text>
  <text x="130" y="310" fill="#fca5a5" font-size="8" text-anchor="middle">[Tweet 52 (Alice)]</text>
  <text x="130" y="325" fill="#fca5a5" font-size="8" text-anchor="middle">[Tweet 51 (Charlie)]</text>

  <!-- Follower B Timeline -->
  <rect x="220" y="280" width="100" height="60" fill="#7f1d1d" rx="4" stroke="#f87171"/>
  <text x="270" y="295" fill="#fecaca" font-size="9" font-weight="bold" text-anchor="middle">Dave's TimelineList</text>
  <text x="270" y="310" fill="#fca5a5" font-size="8" text-anchor="middle">[Tweet 52 (Alice)]</text>
  <text x="270" y="325" fill="#fca5a5" font-size="8" text-anchor="middle">[Tweet 40 (Eve)]</text>


  <!-- Fanout arrows into Redis -->
  <path d="M 230 200 L 130 280" stroke="#fca5a5" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowB)"/>
  <path d="M 230 200 L 270 280" stroke="#fca5a5" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowB)"/>

  <text x="200" y="215" fill="#fca5a5" font-size="10" font-style="italic" text-anchor="middle">Push to 20 Redis Lists (O(K))</text>


  <!-- Right Side: Celebrity Post (Pull Model) -->
  <line x1="400" y1="20" x2="400" y2="430" stroke="#334155" stroke-width="2" stroke-dasharray="8"/>

  <text x="600" y="30" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">Celebrity (FANOUT ON READ)</text>


  <rect x="440" y="60" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="480" y="78" fill="#f8fafc" font-size="10" text-anchor="middle">Elon</text>
  <text x="480" y="90" fill="#94a3b8" font-size="8" text-anchor="middle">(100M Followers)</text>

  <rect x="580" y="60" width="100" height="40" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="630" y="85" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Post API</text>

  <path d="M 520 80 L 580 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  
  <!-- Global Database for Tweets -->
  <rect x="580" y="140" width="100" height="60" fill="url(#dbGrad)" rx="8" stroke="#fcd34d" stroke-width="2"/>
  <text x="630" y="165" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Tweets DB</text>
  <text x="630" y="180" fill="#fde68a" font-size="9" text-anchor="middle">(Cassandra)</text>

  <path d="M 630 100 L 630 140" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <text x="680" y="125" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">DO NOT PUSH!</text>
  <text x="700" y="140" fill="#fca5a5" font-size="9" text-anchor="middle">(100M writes = Crash)</text>


  <!-- Reader pulls -->
  <rect x="440" y="240" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="480" y="258" fill="#f8fafc" font-size="10" text-anchor="middle">Follower Z</text>
  <text x="480" y="270" fill="#94a3b8" font-size="8" text-anchor="middle">Reads Feed</text>

  <rect x="580" y="240" width="100" height="40" fill="#0f766e" rx="6" stroke="#14b8a6" stroke-width="2"/>
  <text x="630" y="265" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Feed API</text>

  <path d="M 520 260 L 580 260" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- Read flow lines -->
  <path d="M 680 260 L 760 260 L 760 170 L 680 170" stroke="#14b8a6" stroke-width="2" fill="none" stroke-dasharray="2" marker-end="url(#arrow)"/>
  <text x="760" y="210" fill="#a7f3d0" font-size="9" font-style="italic" transform="rotate(90, 760, 210)">1. Fetch Celebrity Tweets</text>

  <path d="M 630 280 L 630 310 L 340 310 L 340 320" stroke="#14b8a6" stroke-width="2" fill="none" stroke-dasharray="2" marker-end="url(#arrow)"/>
  <text x="630" y="300" fill="#a7f3d0" font-size="9" text-anchor="middle">2. Fetch my Redis Timeline</text>


  <rect x="450" y="340" width="280" height="70" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="590" y="360" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">3. Merge at Read Time</text>
  <text x="590" y="380" fill="#cbd5e1" font-size="10" text-anchor="middle">Redis Timeline (Alice) + DB Queries (Elon)</text>
  <text x="590" y="395" fill="#cbd5e1" font-size="10" text-anchor="middle">= Final Chronological Feed</text>


</svg>
  `,
  keyPoints: [
    {
      title: 'Fan-Out on Write (Push Model)',
      description: 'Used for 99% of normal users (e.g., Alice has 500 followers). When Alice tweets, a background worker looks up her 500 followers and pushes the `Tweet_ID` into 500 different lists in a Redis Cluster. When Follower Bob opens Twitter, his timeline is already pre-computed in Redis. Reading the feed is lightning fast O(1).'
    },
    {
      title: 'Fan-Out on Read (Pull Model)',
      description: 'Handling Celebrities (e.g., Elon Musk with 100M followers). If Elon tweets and Twitter tries to write that `Tweet_ID` to 100 Million Redis lists, the fan-out queue will lag for hours, or the Redis cluster will suffer a write-storm CPU spike. For celebrities, Twitter uses a "Pull Model." The tweet is simply written to a global Database (and caching tier).'
    },
    {
      title: 'Hybrid Approach (Merging)',
      description: 'When Bob opens up Twitter, the Feed API: 1) Fetches Bob\'s pre-computed Redis timeline (normal friends). 2) Checks who Bob follows who is designated a "Celebrity". 3) Pings the global Tweet Cache for the latest tweets from those celebrities. 4) Memory-sorts and merges both lists by timestamp before returning them to Bob.'
    },
    {
      title: 'Storage & Search Architecture',
      description: 'Tweets are immutable and append-only. They are stored in a heavily sharded SQL/NoSQL cluster. A dedicated Search Index (e.g., ElasticSearch/Lucene) continuously ingests new tweets. Since tweets are small (280 chars), the major cost is maintaining secondary indexes to search hashtags globally in real time.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Fan-out on Write (Push)', 'Fan-out on Read (Pull)'],
    rows: [
      ['Efficiency', 'High for small users', 'High for celebrities'],
      ['Latency', 'Fast delivery for followers', 'Slow (Computing on click)'],
      ['Space', 'Duplicate data in feeds', 'Minimal storage overhead'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=o5n85GRKuzk',
  pitfalls: [
    'Applying Push to everyone: The "Justin Bieber Problem": Writing an entry into 50 Million independent Redis lists creates an enormous backlog. A user might not see a breaking news tweet until hours later because the fan-out queue is still processing.',
    'Sorting entirely in Database: Executing `SELECT * FROM tweets WHERE author_id IN (1, 2... 500) ORDER BY time DESC` is brutally slow at scale, even with indexes. Pre-computing in cache (Redis lists) is essential for sub-200ms feed loading.',
    'Ignoring Inactive Users: Writing to the Redis lists of users who haven\'t logged in for 3 years wastes massive amounts of RAM. Fan-out workers should check a "last active" timestamp and skip pushing to dormant users (they switch to the Pull Model if they ever log back in).'
  ]
};
