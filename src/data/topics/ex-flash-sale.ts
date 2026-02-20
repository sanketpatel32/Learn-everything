import { TopicContent } from '../topicContent';

export const exFlashSale: TopicContent = {
  title: 'Design a Flash Sale System',
  description: 'Designing a highly concurrent e-commerce system that can gracefully handle a massive spike of user traffic attempting to buy limited inventory (e.g., concert tickets, limited sneakers).',
  concepts: [
    {
      name: 'Overselling (Overbooking)',
      details: 'The critical business problem where more tickets are sold than exist in inventory due to concurrent race conditions in the database.'
    },
    {
      name: 'Queueing & Throttling',
      details: 'Buffering the initial spike of requests using message queues (Kafka) rather than letting all traffic hit the database at once.'
    }
  ],
  approaches: [
    {
      title: 'Redis Pre-deduction (Lua Scripts)',
      content: 'Store inventory levels entirely in Redis memory. When a user checks out, decrement the counter atomically via a Lua Script. If it succeeds, place the order request into a Kafka queue for the RDBMS to process asynchronously.',
      complexity: { time: 'O(1)', space: 'O(1)' }
    },
    {
      title: 'Database Row Locks (Pessimistic)',
      content: '`SELECT * FROM inventory WHERE id=1 FOR UPDATE`. Ensures consistency but causes massive lock contention and connection pool exhaustion under heavy load.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Relying entirely on optimistic locking (Version checks/CAS) during peak flash sales. It leads to 99% of requests throwing conflict errors and retrying, killing the system.',
    'Not separating read traffic (users looking at item pages) from write traffic (checkout). Reads should be heavily cached at the CDN/Edge layer.',
    'Deducting inventory without a time-limit on the checkout process (holding inventory indefinitely for idle carts).'
  ]
};
