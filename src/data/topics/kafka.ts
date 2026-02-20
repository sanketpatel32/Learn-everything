import { TopicContent } from '../topicContent';

export const kafka: TopicContent = {
  title: 'Kafka & Event Streaming',
  description: 'Apache Kafka is a distributed, high-throughput, horizontally scalable event streaming platform. Unlike traditional Message Queues (which delete messages after processing), Kafka operates as an immutable, append-only distributed commit log. It is the backbone of modern event-driven architectures, used for real-time analytics, log aggregation, and decoupling microservices.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="producerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="consumerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#0e7490" />
    </linearGradient>
    <marker id="arrowKf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Producers -->
  <g transform="translate(30, 80)">
    <rect x="0" y="0" width="120" height="240" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="60" y="30" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Producers</text>

    <rect x="10" y="50" width="100" height="40" fill="url(#producerGrad)" rx="6"/>
    <text x="60" y="75" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Order Service</text>

    <rect x="10" y="110" width="100" height="40" fill="url(#producerGrad)" rx="6"/>
    <text x="60" y="135" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">User Service</text>

    <rect x="10" y="170" width="100" height="40" fill="url(#producerGrad)" rx="6"/>
    <text x="60" y="195" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Payment Svc</text>
  </g>

  <!-- Kafka Cluster -->
  <g transform="translate(240, 40)">
    <rect x="0" y="0" width="320" height="340" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2"/>
    <text x="160" y="30" fill="#f8fafc" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">Kafka Cluster</text>
    <text x="160" y="50" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Distributed Commit Logs</text>

    <!-- Topic: orders -->
    <rect x="20" y="70" width="280" height="110" fill="#0f172a" rx="8" stroke="#3b82f6"/>
    <text x="160" y="90" fill="#60a5fa" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Topic: "orders_events"</text>

    <!-- Partition 0 -->
    <rect x="30" y="100" width="260" height="30" fill="#334155" rx="4"/>
    <text x="60" y="120" fill="#94a3b8" font-size="10" font-family="monospace">P0:</text>
    <rect x="80" y="105" width="25" height="20" fill="#fbbf24" rx="2"/><text x="92" y="118" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">0</text>
    <rect x="110" y="105" width="25" height="20" fill="#fbbf24" rx="2"/><text x="122" y="118" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">1</text>
    <rect x="140" y="105" width="25" height="20" fill="#fbbf24" rx="2"/><text x="152" y="118" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">2</text>
    <rect x="170" y="105" width="25" height="20" fill="#ef4444" rx="2"/><text x="182" y="118" fill="#fff" font-size="8" font-family="monospace" text-anchor="middle">3</text>
    <!-- Read Cursor pointers -->
    <line x1="122" y1="130" x2="122" y2="145" stroke="#f43f5e" stroke-width="2" marker-end="url(#arrowKf)"/>
    <text x="122" y="155" fill="#f43f5e" font-size="9" font-family="monospace" text-anchor="middle">CG2</text>

    <!-- Partition 1 -->
    <rect x="30" y="140" width="260" height="30" fill="#334155" rx="4"/>
    <text x="60" y="160" fill="#94a3b8" font-size="10" font-family="monospace">P1:</text>
    <rect x="80" y="145" width="25" height="20" fill="#fbbf24" rx="2"/><text x="92" y="158" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">0</text>
    <rect x="110" y="145" width="25" height="20" fill="#fbbf24" rx="2"/><text x="122" y="158" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">1</text>
    <line x1="122" y1="170" x2="122" y2="185" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowKf)"/>
    <text x="122" y="195" fill="#3b82f6" font-size="9" font-family="monospace" text-anchor="middle">CG1</text>

    <!-- Topic: payments -->
    <rect x="20" y="210" width="280" height="110" fill="#0f172a" rx="8" stroke="#10b981"/>
    <text x="160" y="230" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Topic: "payment_logs"</text>
    <!-- Partition 0 -->
    <rect x="30" y="240" width="260" height="30" fill="#334155" rx="4"/>
    <text x="60" y="260" fill="#94a3b8" font-size="10" font-family="monospace">P0:</text>
    <rect x="80" y="245" width="25" height="20" fill="#34d399" rx="2"/><text x="92" y="258" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">0</text>
    <rect x="110" y="245" width="25" height="20" fill="#34d399" rx="2"/><text x="122" y="258" fill="#000" font-size="8" font-family="monospace" text-anchor="middle">1</text>

  </g>

  <!-- Connection Lines (Producer to Kafka) -->
  <path d="M 150 150 L 230 150" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowKf)"/>
  <text x="190" y="140" fill="#94a3b8" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">PUSH</text>


  <!-- Consumers -->
  <g transform="translate(630, 80)">
    <rect x="0" y="0" width="140" height="240" fill="#1e293b" rx="8" stroke="#334155"/>
    <text x="70" y="30" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Consumers</text>

    <rect x="10" y="50" width="120" height="60" fill="url(#consumerGrad)" rx="6"/>
    <text x="70" y="70" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Inventory Svc</text>
    <text x="70" y="90" fill="#a5f3fc" font-size="10" font-family="sans-serif" text-anchor="middle">(Group CG1)</text>

    <rect x="10" y="130" width="120" height="60" fill="url(#consumerGrad)" rx="6"/>
    <text x="70" y="150" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle">Analytics DB</text>
    <text x="70" y="170" fill="#fda4af" font-size="10" font-family="sans-serif" text-anchor="middle">(Group CG2)</text>
  </g>

  <!-- Connection Lines (Kafka to Consumers) -->
  <path d="M 570 150 L 620 150" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowKf)"/>
  <text x="595" y="140" fill="#94a3b8" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">POLL</text>

  <!-- Explanatory Text -->
  <text x="400" y="410" fill="#e2e8f0" font-size="12" font-family="sans-serif" text-anchor="middle">Unlike RabbitMQ, Kafka keeps records after they are read. Consumers maintain their own "Cursor" (Offset).</text>
  <text x="400" y="425" fill="#e2e8f0" font-size="12" font-family="sans-serif" text-anchor="middle">This allows multiple independent Consumer Groups (CG) to process the exact same stream of events at their own pace.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Producer Acknowledgments (Acks)',
      description: 'Producers can choose how many "Acks" they require. **acks=0**: Fire and forget (Fastest, zero safety). **acks=1**: Leader confirms write (Balanced). **acks=all**: Leader and all in-sync replicas must confirm write (Slowest, maximum data safety). This setting allows Kafka to be tuned for either extreme performance or banking-grade durability.'
    },
    {
      title: 'Partitioning Strategies',
      description: 'How data is split defines scalability. **Round-robin** distribution spreads load evenly but loses ordering. **Key-based Partitioning** (e.g., `hash(user_id)`) ensures all events for a specific user land in the same partition, guaranteeing chronological processing of that user\'s actions.'
    },
    {
      title: 'Consumer Rebalancing',
      description: 'When a consumer in a group fails or a new one joins, Kafka triggers a **Rebalance**. It re-assigns partitions to the remaining members. During this time, the group stops consuming (Stop-the-world). **Cooperative Sticky Rebalancing** is a modern optimization that reduces these pauses, keeping the system stable at scale.'
    },
    {
      title: 'Topics and Partitions',
      description: 'A Topic is a logical channel (like a table in a DB) where events are stored. To achieve massive horizontal scalability, a Kafka Topic is divided into multiple Partitions spread across different server nodes (Brokers). Kafka guarantees ordering ONLY within a single partition, not across the whole topic.'
    },
    {
      title: 'The Append-Only Log',
      description: 'Events in a partition are written sequentially to the end of a file. They cannot be modified or individually deleted (they expire based on time constraints, e.g. 7 days). This sequential disk access means writing to Kafka is almost as fast as RAM.'
    },
    {
      title: 'Consumer Groups & Offsets',
      description: 'Since Kafka doesn\'t delete messages when read, consumers keep track of their position using an `offset` (integer index). Multiple completely separate services (like an Email sender and a Database updater) belong to different Consumer Groups. Each group has its own separate offset pointer, allowing them to read the exact same data without interfering with each other.'
    },
    {
      title: 'Zookeeper & KRaft',
      description: 'Historically, Kafka required Apache Zookeeper to manage cluster state and leader elections. Modern Kafka (since 3.3) uses KRaft (Kafka Raft consensus), running entirely without Zookeeper to simplify architecture and improve scalability.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Apache Kafka (Streaming)', 'Traditional MQ (Messaging)'],
    rows: [
      ['Data Retention', 'Immutable log (Persisted on disk)', 'Transitory queue (Deleted after read)'],
      ['Topology', 'Pub/Sub via Consumer Offsets', 'Complex Exchange/Binding routing'],
      ['Replay Capability', 'Extreme (Rewind offset to 0)', 'Impossible (Data is gone)'],
      ['Ordering', 'Guaranteed within Partition', 'Guaranteed within entire Queue'],
      ['Consumption Model', 'Poll (Pull-based)', 'Push-based (Usually)']
    ]
  },
  pitfalls: [
    'Message Ordering: Assuming messages across different partitions will be ordered. If order is critical, use a single partition or a high-cardinality Key.',
    'Poison Pills: A malformed message that crashes the consumer endlessly. Mitigation: Implement a Dead Letter Queue (DLQ) to "parking lot" bad records.',
    'Partition Skew: Using keys with low cardinality (e.g., `country`) causing one server to be overwhelmed while others are idle.',
    'Zookeeper dependency (Legacy): Using Zookeeper for metadata in modern clusters. Newer Kafka clusters should use KRaft mode to avoid the extra operational overhead.'
  ]
};
