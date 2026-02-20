import { TopicContent } from '../topicContent';

export const exLeaderboard: TopicContent = {
  title: 'Design a Real-time Leaderboard',
  description: 'Designing a fast, highly-available ranking system for millions of users in gaming or contest scenarios.',
  concepts: [
    {
      name: 'Score Ranking',
      details: 'Given a `player_id` and an updated `score`, quickly update their position and fetch the Top K players globally.'
    },
    {
      name: 'Redis Sorted Sets (ZSET)',
      details: 'The fundamental data structure used almost universally for leaderboards due to its O(log(N)) performance for add, update, and fetching ranks.'
    }
  ],
  approaches: [
    {
      title: 'In-Memory (Redis ZSET)',
      content: 'Store user scores natively. `ZADD leaderboard 500 "User123"`. Fetch top 10 using `ZREVRANGE leaderboard 0 9`. Extremely fast and handles thousands of updates per second.',
      complexity: { time: 'O(log N)', space: 'O(N) across Redis nodes' }
    },
    {
      title: 'Relational DB Backing',
      content: 'RDBMS (PostgreSQL) is kept as the source of truth for durability, triggering async updates to the Redis Cache via messaging queues or CDC (Change Data Capture).',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Using an RDBMS with `ORDER BY score DESC LIMIT 10` on every request. It requires massive indexing overhead and degrades under heavy write load.',
    'Ignoring tie-breakers. If two players have the exact same score, deciding who gets rank 1 vs 2 requires adding timestamps to the sorting tuple.',
    'Creating one massive Redis single instance. Sharding a ZSET is notoriously difficult and requires bucketing by score or tier (e.g., Bronze, Silver, Gold).'
  ]
};
