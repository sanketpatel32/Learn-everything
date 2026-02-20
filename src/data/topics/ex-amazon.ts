import { TopicContent } from '../topicContent';

export const amazon: TopicContent = {
  title: 'Design Amazon (E-Commerce Checkout/Cart)',
  description: 'An e-commerce giant like Amazon is fundamentally an inventory and checkout system operating at unimaginable scale. The system must guarantee "High Availability" for the Add-to-Cart feature (even during Datacenter outages) while maintaining strict "Consistency" for payment processing and final stock depletion.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="dynamoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="psqlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="searchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User Action -->
  <rect x="20" y="160" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="178" fill="#f8fafc" font-size="10" text-anchor="middle">Customer</text>
  <text x="60" y="190" fill="#94a3b8" font-size="8" text-anchor="middle">"Add to Cart"</text>

  <!-- API Gateway -->
  <rect x="140" y="130" width="60" height="100" fill="#0f172a" rx="4" stroke="#64748b" stroke-width="2"/>
  <text x="170" y="175" fill="#f8fafc" font-size="10" font-weight="bold" transform="rotate(-90, 170, 175)" text-anchor="middle">API GW</text>


  <!-- Flow 1: High Availability Cart (DynamoDB) -->
  <rect x="280" y="50" width="120" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="340" y="75" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Cart Service</text>
  <text x="340" y="90" fill="#bfdbfe" font-size="9" text-anchor="middle">(Stateless/Scalable)</text>

  <rect x="440" y="40" width="120" height="80" fill="url(#dynamoGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="500" y="70" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">DynamoDB</text>
  <text x="500" y="85" fill="#e9d5ff" font-size="9" text-anchor="middle">AP System (Availability)</text>
  <rect x="450" y="95" width="100" height="15" fill="#4c1d95" rx="2"/>
  <text x="500" y="105" fill="#ddd6fe" font-size="8" font-family="monospace" text-anchor="middle">Cart: {Items: [ID_99, ID_12]}</text>


  <!-- Flow 2: Product Catalog & Search (ElasticSearch/Redis) -->
  <text x="60" y="80" fill="#94a3b8" font-size="8" text-anchor="middle">"Search Book"</text>
  <path d="M 100 80 L 140 140" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2" fill="none"/>

  <rect x="280" y="150" width="120" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="340" y="175" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Catalog Service</text>
  <text x="340" y="190" fill="#bfdbfe" font-size="9" text-anchor="middle">(Read Heavy)</text>

  <rect x="440" y="140" width="120" height="80" fill="url(#searchGrad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="500" y="170" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">ElasticSearch</text>
  <text x="500" y="185" fill="#fde68a" font-size="9" text-anchor="middle">(Global Catalog)</text>
  <rect x="450" y="195" width="100" height="15" fill="#b45309" rx="2"/>
  <text x="500" y="205" fill="#fef3c7" font-size="8" font-family="monospace" text-anchor="middle">Docs: "Clean Code", "MacBook"</text>


  <!-- Flow 3: Checkout, Payment, Inventory (ACID SQL) -->
  <text x="60" y="280" fill="#94a3b8" font-size="8" text-anchor="middle">"Pay $50.00"</text>
  <path d="M 100 280 L 140 220" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="2" fill="none"/>

  <rect x="280" y="270" width="120" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="340" y="295" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Order Service</text>
  <text x="340" y="310" fill="#bfdbfe" font-size="9" text-anchor="middle">(Orchestrator Saga)</text>

  <rect x="460" y="250" width="140" height="100" fill="url(#psqlGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="530" y="275" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Core Database</text>
  <text x="530" y="290" fill="#a7f3d0" font-size="9" text-anchor="middle">CP System (Consistency)</text>
  <text x="530" y="305" fill="#a7f3d0" font-size="9" text-anchor="middle">PostgreSQL / Aurora</text>
  <rect x="480" y="315" width="100" height="15" fill="#064e3b" rx="2"/>
  <text x="530" y="325" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="middle">Inventory: 5 -> 4</text>
  <rect x="480" y="315" width="100" height="15" fill="#064e3b" rx="2" stroke="#ef4444"/>


  <!-- External Payment -->
  <rect x="660" y="260" width="100" height="60" fill="#1e293b" rx="8" stroke="#64748b" stroke-dasharray="4"/>
  <text x="710" y="285" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Stripe / Bank</text>
  <text x="710" y="300" fill="#cbd5e1" font-size="9" text-anchor="middle">Payment Gateway</text>

  <!-- Flow Lines -->
  <path d="M 100 180 L 140 180" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  
  <path d="M 200 160 L 280 80" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="230" y="100" fill="#d8b4fe" font-size="10" transform="rotate(-40, 230, 100)">1. Cart Update</text>

  <path d="M 400 80 L 440 80" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <path d="M 200 180 L 280 180" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="240" y="170" fill="#fde68a" font-size="10">2. Catalog</text>

  <path d="M 400 180 L 440 180" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <path d="M 200 200 L 280 300" stroke="#34d399" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="230" y="260" fill="#6ee7b7" font-size="10" transform="rotate(50, 230, 260)">3. Submit Order</text>

  <path d="M 400 300 L 460 300" stroke="#34d399" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <path d="M 460 270 L 400 270" stroke="#ef4444" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrow)"/>
  <text x="430" y="260" fill="#fca5a5" font-size="8" text-anchor="middle">Stock Lock!</text>

  <path d="M 400 320 L 660 290" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="560" y="325" fill="#93c5fd" font-size="9" text-anchor="middle">Charge Card</text>


  <!-- Key Explanation -->
  <rect x="60" y="380" width="680" height="50" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="400" y="395" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">CAP Theorem Trade-Offs in E-Commerce</text>
  <text x="400" y="415" fill="#cbd5e1" font-size="10" text-anchor="middle">Cart values Availability (It's OK to accidentally add two items if DB network fails - user will delete later).</text>
  <text x="400" y="425" fill="#cbd5e1" font-size="10" text-anchor="middle">Checkout/Inventory values Consistency (It is catastrophic to double-charge or sell an item with 0 stock).</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Shopping Cart Availability (Vector Clocks)',
      description: 'Amazon prioritizes "Add to Cart" availability above all else. This uses an **AP system** (DynamoDB). If a network partition occurs, different nodes might receive different updates. Amazon uses **Vector Clocks** to track versions and detect conflicts. Conflicts are resolved at **read-time** (Semantic Reconciliation), usually by merging all items added across divergent states so no purchase intent is ever lost.'
    },
    {
      title: 'High Availability Writes (Sloppy Quorum)',
      description: 'DynamoDB uses a **Sloppy Quorum** and "Hinted Handoff". If the primary node for a user\'s cart is down, the write is accepted by a healthy neighboring node. Once the primary node recovers, the neighbor "hands off" the data. This ensures that even during massive cluster failures, the customer can still add items to their cart without seeing an error.'
    },
    {
      title: 'Checkout Orchestration (Saga Pattern)',
      description: 'Checkout is a long-running transaction involving Inventory, Payment, and Shipping. Amazon uses the **Saga Pattern** (specifically Orchestration). A central "Checkout Coordinator" manages the flow: Reserve stock (SQL) -> Authorize payment (Stripe) -> Commit order. If any step fails, the Coordinator triggers "Compensating Transactions" to undo previous steps and restore system consistency.'
    },
    {
      title: 'Search/Catalog Sync (CDC)',
      description: 'The Product Catalog is read-heavy. Updates in the source-of-truth SQL DB are streamed via **Change Data Capture (CDC)** like Kafka/Debezium into an ElasticSearch cluster. This allows sub-second search latency and complex filtering while keeping the transactional DB load minimal.'
    }
  ],
  comparisonTable: {
    headers: ['Factor', 'Shopping Cart (AP Focus)', 'Inventory/Payment (CP Focus)'],
    rows: [
      ['Data Consistency', 'Eventual (Merged via Vector Clocks)', 'Strict (ACID Transactions)'],
      ['Availability Target', '100% (Never fail a write)', 'High (But failsafe is preferred)'],
      ['Conflict Strategy', 'Last-Write-Wins or Semantic Merge', 'Pessimistic Locking / Stop-the-world'],
      ['Storage Tech', 'DynamoDB / NoSQL', 'PostgreSQL / Aurora']
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=ep0VId88PZ8',
  pitfalls: [
    'Locking Inventory at Add-to-Cart: This allows "Denial of Inventory" attacks where bots fill carts but don\'t buy. Only lock inventory during the active, timed checkout window.',
    'Distributed Transactions (2PC): Using 2PC for microservices creates extreme latency and risk of global stalls. Use the Saga pattern with event-driven compensations instead.',
    'Ignoring Idempotency: Retrying a checkout call without an Idempotency Key can lead to double-charging customers. Every mutation must track a unique client-generated Request ID.',
    'Merging Conflicts naively: Using "Last Write Wins" (LWW) for a shopping cart might accidentally delete a user\'s item. Semantic Merging (keeping all unique items) is much safer for user experience.'
  ]
};
