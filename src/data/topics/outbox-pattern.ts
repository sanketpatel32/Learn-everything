import { TopicContent } from '../topicContent';

export const outboxPattern: TopicContent = {
  title: 'Transactional Outbox Pattern',
  description: 'In an Event-Driven Architecture, a microservice often needs to update its local database AND publish an event to a message broker (like Kafka). If the DB commit succeeds but the network to Kafka fails, the system enters an inconsistent state. The Transactional Outbox pattern guarantees 100% reliable messaging without Distributed Transactions (2PC).',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <marker id="arrowO" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Left: The Microservice -->
  <rect x="40" y="100" width="180" height="250" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2"/>
  <text x="130" y="130" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Order Service</text>

  <!-- Incoming Request -->
  <path d="M 0 180 L 40 180" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowO)"/>
  <text x="20" y="170" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">CreateOrder()</text>

  <rect x="60" y="160" width="140" height="40" fill="#334155" rx="4"/>
  <text x="130" y="180" fill="#bae6fd" font-size="12" font-family="sans-serif" text-anchor="middle">1. Generate Order ID</text>

  <rect x="60" y="240" width="140" height="80" fill="#312e81" rx="4" stroke="#6366f1"/>
  <text x="130" y="260" fill="#c7d2fe" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Begin DB Transaction</text>
  <text x="130" y="280" fill="#a5b4fc" font-size="10" font-family="sans-serif" text-anchor="middle">Update Order Table</text>
  <text x="130" y="295" fill="#a5b4fc" font-size="10" font-family="sans-serif" text-anchor="middle">Insert into Outbox</text>
  <text x="130" y="310" fill="#c7d2fe" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Commit</text>

  <!-- Middle: Database -->
  <rect x="280" y="180" width="220" height="180" fill="url(#dbGrad)" rx="12" stroke="#60a5fa" stroke-width="2"/>
  <text x="390" y="210" fill="#fff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">PostgreSQL</text>

  <rect x="300" y="230" width="180" height="40" fill="#1e3a8a" rx="4" stroke="#93c5fd"/>
  <text x="390" y="255" fill="#dbeafe" font-size="12" font-family="monospace" text-anchor="middle">Table: orders</text>

  <rect x="300" y="290" width="180" height="50" fill="#1e3a8a" rx="4" stroke="#f59e0b" stroke-width="2"/>
  <text x="390" y="310" fill="#fde68a" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">Table: outbox</text>
  <text x="390" y="330" fill="#fcd34d" font-size="10" font-family="monospace" text-anchor="middle">{"event": "OrderCreated"}</text>

  <!-- Connect Service to DB -->
  <path d="M 200 280 L 280 280" stroke="#6366f1" stroke-width="3" stroke-dasharray="4" fill="none" marker-end="url(#arrowO)"/>
  <text x="240" y="270" fill="#818cf8" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">ACID Write</text>

  <!-- Message Broker -->
  <rect x="620" y="100" width="140" height="150" fill="#0f172a" rx="12" stroke="#10b981" stroke-width="2"/>
  <text x="690" y="130" fill="#34d399" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Kafka Broker</text>

  <rect x="640" y="160" width="100" height="30" fill="#064e3b" rx="4"/>
  <text x="690" y="180" fill="#6ee7b7" font-size="10" font-family="sans-serif" text-anchor="middle">Topic: "orders"</text>


  <!-- The Relay Component -->
  <rect x="440" y="60" width="160" height="60" fill="#334155" rx="8" stroke="#f59e0b" stroke-width="2"/>
  <text x="520" y="85" fill="#fcd34d" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Message Relay</text>
  <text x="520" y="105" fill="#fde68a" font-size="10" font-family="sans-serif" text-anchor="middle">(CDC / Debezium / Polling)</text>

  <path d="M 440 310 C 370 310, 470 90, 480 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowO)" transform="rotate(-15, 450, 180)"/>
  <path d="M 450 310 L 520 120" stroke="#f59e0b" stroke-width="2" fill="none"/>
  
  <text x="500" y="220" fill="#fbbf24" font-size="11" font-family="sans-serif" font-weight="bold">2. Polls/Reads Outbox</text>

  <path d="M 600 90 L 670 160" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowO)"/>
  <text x="660" y="100" fill="#34d399" font-size="11" font-family="sans-serif" font-weight="bold">3. Publish Event</text>

  <text x="400" y="415" fill="#e2e8f0" font-size="12" font-family="sans-serif" text-anchor="middle">Since writing to 'orders' and 'outbox' share a single ACID DB transaction, they either BOTH fail or BOTH succeed.</text>
  <text x="400" y="435" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Zero data loss between Local Storage and the Message Broker.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The Dual Write Problem',
      description: 'You save data to PostgreSQL. Then, you tell Kafka "Order Created". What if Kafka is temporarily down? Or the process crashes right after the DB commit? You have data in your DB, but no event was fired. Other services (like Payments) are never notified. If you swap the order (Kafka first, then DB), your DB might fail on a constraint, resulting in a ghost event for data that doesn\'t exist.'
    },
    {
      title: 'The Outbox Table',
      description: 'Instead of calling Kafka directly, the microservice saves the event payload into a dedicated `outbox` table INSIDE the exact same database. Because modern databases support ACID transactions, the update to the `orders` table and the insert to the `outbox` table are guaranteed to succeed or fail atomically.'
    },
    {
      title: 'The Message Relay',
      description: 'A separate, background process (the Relay) constantly reads from the `outbox` table. When it sees a new row, it pushes that event payload to Kafka. If Kafka is down, the Relay just waits and retries. The event is safe in the database.'
    },
    {
      title: 'CDC (Change Data Capture)',
      description: 'Instead of inefficiently polling the table (`SELECT * FROM outbox WHERE sent = false` every 1 second), production systems use CDC tools like Debezium. Debezium hooks directly into the database\'s Write-Ahead Log (WAL) and instantly streams changes to Kafka with near-zero latency.'
    }
  ],
  comparisonTable: {
    headers: ['Approach', 'Guarantees', 'Complexity', 'Performance'],
    rows: [
      ['Direct Dual Write', 'None. Prone to data inconsistency on failure.', 'Very Low (Two simple network calls)', 'Fastest'],
      ['2-Phase Commit (2PC)', 'Strong Consistency', 'Extremely High (Requires XA transactions)', 'Terrible (Blocks resources across network)'],
      ['Transactional Outbox', 'At-Least-Once Delivery (Eventual Consistency)', 'Medium (Requires Relay/Debezium)', 'Excellent (DB commit is local, Relay is async)']
    ]
  },
  pitfalls: [
    'At-Least-Once Delivery: The Relay might read the Outbox, publish to Kafka, but crash before it can mark the Outbox row as "sent". On restart, it will publish the same event again. Downstream consumers MUST be Idempotent to handle duplicates.',
    'Polling Overhead: Using an SQL loop to poll the outbox table creates immense database load as the table grows. Proper indexes on the `status` column are required, but migrating to CDC is the long-term fix.',
    'Outbox Unbounded Growth: Once an event is successfully sent to Kafka, you must delete it from the outbox table (or archive it), otherwise the table grows infinitely and fills up the database disk.'
  ]
};
