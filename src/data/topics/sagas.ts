import { TopicContent } from '../topicContent';

export const sagas: TopicContent = {
  title: 'Saga Pattern (Choreography/Orchestration)',
  description: 'In microservices, a single business transaction (like booking a trip: Flight + Hotel + Car) spans multiple independent services, each with its own database. Because you cannot use global ACID transactions across microservices, the Saga Pattern is used. A Saga is a sequence of local transactions, where each local transaction updates the database and publishes a message to trigger the next step. If a step fails, compensating transactions are executed to undo the previous steps.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="orderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="payGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="invGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="orchestratorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <marker id="arrowS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowFail" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
  </defs>

  <!-- Left: Choreography -->
  <rect x="0" y="0" width="400" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>
  <text x="200" y="30" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Choreography Saga</text>
  <text x="200" y="45" fill="#94a3b8" font-size="10" font-style="italic" font-family="sans-serif" text-anchor="middle">Event-based. No central brain.</text>

  <!-- Order Svc -->
  <rect x="30" y="80" width="100" height="60" fill="url(#orderGrad)" rx="6"/>
  <text x="80" y="110" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">1. Order Svc</text>
  <text x="80" y="125" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">status=PENDING</text>

  <!-- Payments Svc -->
  <rect x="270" y="80" width="100" height="60" fill="url(#payGrad)" rx="6"/>
  <text x="320" y="110" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">2. Payment Svc</text>
  <text x="320" y="125" fill="#a7f3d0" font-size="9" font-family="monospace" text-anchor="middle">debit=$100</text>

  <!-- Inventory Svc -->
  <rect x="150" y="220" width="100" height="60" fill="url(#invGrad)" rx="6"/>
  <text x="200" y="250" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">3. Inventory Svc</text>
  <text x="200" y="265" fill="#fde68a" font-size="9" font-family="monospace" text-anchor="middle">reserve=ItemX</text>

  <!-- Event Bus -->
  <rect x="30" y="170" width="340" height="20" fill="#334155" rx="4"/>
  <text x="200" y="184" fill="#cbd5e1" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">Kafka / Event Bus</text>

  <!-- Happy Path Choreo -->
  <path d="M 80 140 L 80 170" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="60" y="160" fill="#60a5fa" font-size="9" font-family="monospace">OrderCreated</text>

  <path d="M 320 170 L 320 140" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="330" y="160" fill="#34d399" font-size="9" font-family="monospace">Consume</text>

  <path d="M 300 140 L 300 170" stroke="#10b981" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="295" y="150" fill="#6ee7b7" font-size="8" font-family="monospace" text-anchor="end">PaymentOk</text>

  <path d="M 210 190 L 210 220" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="215" y="210" fill="#fbbf24" font-size="9" font-family="monospace">Consume</text>

  <!-- Compensation Flow -->
  <text x="200" y="320" fill="#ef4444" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Scenario: OUT OF STOCK!</text>
  <rect x="50" y="335" width="300" height="40" fill="#1e293b" rx="4" stroke="#ef4444"/>
  <text x="200" y="350" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">InventorySvc publishes "InventoryFailed" Event</text>
  <text x="200" y="365" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">PaymentSvc listens & executes "Refund Payment"</text>
  <text x="200" y="390" fill="#fca5a5" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">OrderSvc listens & sets status=CANCELLED</text>
  <rect x="45" y="378" width="310" height="15" fill="#ef4444" opacity="0.2"/>


  <!-- Right: Orchestration -->
  <rect x="400" y="0" width="400" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>
  <line x1="400" y1="0" x2="400" y2="450" stroke="#334155" stroke-width="2"/>
  
  <text x="600" y="30" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Orchestration Saga</text>
  <text x="600" y="45" fill="#94a3b8" font-size="10" font-style="italic" font-family="sans-serif" text-anchor="middle">Central Manager (State Machine).</text>

  <!-- Orchestrator Brain -->
  <rect x="520" y="70" width="160" height="80" fill="url(#orchestratorGrad)" rx="8" stroke="#a78bfa" stroke-width="2"/>
  <text x="600" y="100" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Saga Orchestrator</text>
  <text x="600" y="115" fill="#ddd6fe" font-size="10" font-family="monospace" text-anchor="middle">(e.g. Temporal, Camunda)</text>
  <text x="600" y="130" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">State: STEP 3 (Inventory)</text>

  <!-- Sub Services -->
  <rect x="430" y="240" width="100" height="40" fill="#1e293b" rx="4" stroke="#3b82f6"/>
  <text x="480" y="265" fill="#bfdbfe" font-size="12" font-family="sans-serif" text-anchor="middle">1. Booking Svc</text>

  <rect x="550" y="240" width="100" height="40" fill="#1e293b" rx="4" stroke="#10b981"/>
  <text x="600" y="265" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">2. Payment Svc</text>

  <rect x="670" y="240" width="100" height="40" fill="#1e293b" rx="4" stroke="#f59e0b"/>
  <text x="720" y="265" fill="#fde68a" font-size="12" font-family="sans-serif" text-anchor="middle">3. Inventory Svc</text>

  <!-- Commands/Replies -->
  <path d="M 540 150 L 490 240" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="495" y="180" fill="#a78bfa" font-size="9" font-family="monospace" transform="rotate(-60, 495, 180)">Cmd: Book()</text>

  <path d="M 580 150 L 580 240" stroke="#8b5cf6" stroke-width="2" fill="none" marker-end="url(#arrowS)"/>
  <text x="560" y="190" fill="#a78bfa" font-size="9" font-family="monospace" transform="rotate(-90, 560, 190)">Cmd: Pay()</text>

  <path d="M 640 150 L 710 240" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3" fill="none" marker-end="url(#arrowS)"/>
  <text x="690" y="180" fill="#a78bfa" font-size="9" font-family="monospace" transform="rotate(50, 690, 180)">Cmd: Reserve()</text>

  <!-- Failed Compensation return -->
  <path d="M 720 240 L 660 150" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowFail)"/>
  <text x="710" y="200" fill="#ef4444" font-size="9" font-family="monospace" font-weight="bold" transform="rotate(50, 710, 200)">Err: NoStock</text>

  <text x="600" y="320" fill="#ef4444" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Orchestrator Reaction to Failure:</text>
  <rect x="450" y="335" width="300" height="40" fill="#1e293b" rx="4" stroke="#ef4444"/>
  <text x="600" y="355" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">1. State machine halts forward progress.</text>
  <text x="600" y="370" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">2. Executes "RefundPayment" command on Svc 2.</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'ACID vs BASE (Distributed Transactions)',
      description: 'In a monolith, you start a DB transaction, do 5 things, and if the 5th fails, you `ROLLBACK`. Everything is undone automatically (ACID). Microservices have separate databases. You cannot put a global lock across Postgres, Mongo, and Redis simultaneously. Instead, we use BASE (Basically Available, Soft state, Eventual consistency).'
    },
    {
      title: 'Compensating Transactions',
      description: 'The core of Saga. If step 1 (Create Order) and step 2 (Take Payment) succeed, but step 3 (Reserve Inventory) fails, you cannot just "rollback" step 2—the money is already gone! Instead, you explicitly issue a "Refund Payment" (a compensation command) to the Payment service to reverse the localized business effect of step 2.'
    },
    {
      title: 'Choreography Saga',
      description: 'Services publish domain events (e.g., `Order Created`) to a message broker (Kafka). Other services listen for these events, do their local work, and publish new events (e.g., `Payment Succeeded`). There is no central orchestrator; the system works via a decentralized chain of reactions. Best for simple flows (2-4 services).'
    },
    {
      title: 'Orchestration Saga',
      description: 'A dedicated central "Brain" (the Orchestrator, e.g., an AWS Step Function or Temporal workflow) explicitly tells every service what to do via command messages (e.g., "Take Payment"). If a step fails, the Orchestrator runs the failure logic and explicitly commands the previous services to run their compensation logic. Best for complex flows (5+ services).'
    }
  ],
  comparisonTable: {
    headers: ['Pattern', 'Architecture Type', 'Pros', 'Cons', 'Best For'],
    rows: [
      ['Choreography', 'Decentralized / Reactive', 'Low coupling. No single point of failure.', 'Hard to track entire state (tracing hell). Cyclic dependencies.', 'Simple systems, few microservices'],
      ['Orchestration', 'Centralized / Imperative', 'Easy to visualize state. Logic is in one place.', 'High coupling to Orchestrator. The Brain becomes a bottleneck.', 'Complex workflows, e-commerce checkouts']
    ]
  },
  pitfalls: [
    'The "Distributed Monolith" in Orchestration: Putting too much business logic inside the Orchestrator itself. The orchestrator should only route commands, not calculate prices or validate inventory.',
    'Lack of Idempotency: A compensating transaction ("Refund $10") might execute twice due to network retries. If the Payment service is not idempotent, you will refund the customer $20 by accident.',
    'Not Implementing the Outbox Pattern: A Saga choreographs via messages. If a service updates its local DB but crashes before publishing its "Success" message to Kafka, the Saga halts indefinitely. Sagas strongly rely on Transactional Outbox to guarantee message delivery.'
  ]
};
