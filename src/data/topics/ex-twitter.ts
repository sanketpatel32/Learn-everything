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
      title: 'Hybrid Fan-out Strategy',
      description: 'Twitter uses a **Hybrid Model**. Most users (Push) have their timelines pre-computed in Redis. For "Celebrities" (e.g., millions of followers), a Pull model is used. At read-time, the system fetches the celebrity tweets from a global cache and merges them into the user\'s pre-computed feed. This avoids "Justin Bieber thundering herds" that would break message delivery.'
    },
    {
      title: 'Social Graph Storage (FlockDB)',
      description: 'Storing "who follows whom" is a massive scale challenge. Twitter uses specialized services to handle this social graph (highly sharded MySQL or dedicated graph stores). It optimizes for the "In-degree" (Followers) vs "Out-degree" (Following) lookups, which are critical for the Fan-out process.'
    },
    {
      title: 'Timeline Cache Management',
      description: 'Timelines are stored as **Redis Lists** of tweet IDs. To manage RAM, Twitter only caches timelines for active users. If a user hasn\'t logged in for weeks, their timeline is evicted. Upon login, the "Timeline Service" rebuilds it on-demand by querying the database, balancing memory cost vs. user experience.'
    },
    {
      title: 'Storage & Search Partitioning',
      description: 'Tweets are sharded by `Tweet_ID` (using SnowFlake for time-sorting). The search index is partitioned by time to allow fast "Live" searches. Since tweets are small, the bottleneck is often the high-velocity metadata updates (retweets, likes counts).'
    }
  ],
  comparisonTable: {
    headers: ['Factor', 'Push Model (Write)', 'Pull Model (Read)'],
    rows: [
      ['Primary User', 'Normal users (< 5k followers)', 'Celebrities (> 1M followers)'],
      ['Read Complexity', 'O(1) - Already pre-computed', 'O(S) - Merge celebrities at runtime'],
      ['Write Complexity', 'O(K) - Write to K followers', 'O(1) - Write to single global store'],
      ['Traffic Profile', 'Write-heavy during spikes', 'Read-heavy during spikes']
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=o5n85GRKuzk',
  pitfalls: [
    'Universal Push: The "Celebrity Thundering Herd" problem. Writing to 100M Redis lists will lag your system for hours. A hybrid Push/Pull model is mandatory for stability.',
    'Database Sorting: Executing `ORDER BY time` on large sharded tables during read-time is too expensive. Pre-computing timelines in Redis is essential for speed.',
    'Ignoring Inactive Users: Wasting RAM by fan-out into timelines for dormant accounts. Only pre-compute feeds for users active within the last 30 days.',
    'SnowFlake Collision: Ensuring globally unique, time-sortable IDs across 1000s of servers. Clock drift protection is critical for chronological integrity.'
  ]
};
