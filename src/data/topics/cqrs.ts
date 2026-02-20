import { TopicContent } from '../topicContent';

export const cqrsEventSourcing: TopicContent = {
  title: 'CQRS & Event Sourcing',
  description: 'In traditional CRUD (Create, Read, Update, Delete) databases, you read AND write to the same table. CQRS splits the system into two distinct sides: one for writing (Commands), and one for reading (Queries). Event Sourcing often accompanies CQRS by storing every state change as an immutable event, rather than just storing the final state of the data.',
  diagram: `
<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="writeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f43f5e" />
      <stop offset="100%" stop-color="#9f1239" />
    </linearGradient>
    <linearGradient id="readGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <marker id="arrowCQ" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
    </marker>
    <marker id="arrowRead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
    </marker>
    <marker id="arrowWrite" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
    </marker>
  </defs>

  <!-- Client -->
  <g transform="translate(40, 180)">
    <rect x="0" y="0" width="80" height="120" fill="#1e293b" rx="8" stroke="#94a3b8" stroke-width="2"/>
    <text x="40" y="65" fill="#f8fafc" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Client</text>
  </g>

  <!-- Split Paths -->
  <!-- Write Path (Top) -->
  <path d="M 120 200 L 220 120" stroke="#f43f5e" stroke-width="3" fill="none" marker-end="url(#arrowWrite)"/>
  <text x="170" y="140" fill="#fb7185" font-size="12" font-family="sans-serif" font-weight="bold" transform="rotate(-38 170,140)">COMMAND (Write)</text>

  <!-- Read Path (Bottom) -->
  <path d="M 120 280 L 220 360" stroke="#3b82f6" stroke-width="3" fill="none" marker-end="url(#arrowRead)"/>
  <text x="170" y="340" fill="#93c5fd" font-size="12" font-family="sans-serif" font-weight="bold" transform="rotate(38 170,340)">QUERY (Read)</text>

  <!-- Top Side: Command (Write) Model -->
  <g transform="translate(240, 20)">
    <rect x="0" y="0" width="540" height="180" fill="#0f172a" rx="16" stroke="#f43f5e" stroke-opacity="0.5"/>
    <text x="270" y="30" fill="#fb7185" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Write Model (Event Sourced)</text>
    
    <!-- Command Service -->
    <rect x="20" y="70" width="120" height="60" fill="url(#writeGrad)" rx="8"/>
    <text x="80" y="100" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Command</text>
    <text x="80" y="115" fill="#fda4af" font-size="10" font-family="sans-serif" text-anchor="middle">Service</text>

    <!-- Event Store (Append Only DB) -->
    <path d="M 160 100 L 240 100" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrowWrite)"/>

    <path d="M 260 50 C 260 40, 360 40, 360 50 L 360 150 C 360 160, 260 160, 260 150 Z" fill="#4c0519" stroke="#fb7185" stroke-width="2"/>
    <ellipse cx="310" cy="50" rx="50" ry="10" fill="#881337" stroke="#fb7185" stroke-width="2"/>
    <text x="310" y="90" fill="#fecdd3" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Event Store</text>
    <text x="310" y="110" fill="#fda4af" font-size="10" font-family="sans-serif" text-anchor="middle">(Append Only SQL)</text>
    
    <!-- Event Log UI representation -->
    <rect x="380" y="50" width="140" height="20" fill="#1e293b" rx="4"/>
    <text x="385" y="63" fill="#a7f3d0" font-size="9" font-family="monospace">+ Added $50</text>
    <rect x="380" y="75" width="140" height="20" fill="#1e293b" rx="4"/>
    <text x="385" y="88" fill="#fca5a5" font-size="9" font-family="monospace">- Spent $20 (Pending)</text>
    <rect x="380" y="100" width="140" height="20" fill="#1e293b" rx="4"/>
    <text x="385" y="113" fill="#a7f3d0" font-size="9" font-family="monospace">+ Refunded $20</text>
  </g>

  <!-- Synchronization Mechanism (Message Bus) -->
  <path d="M 550 200 L 550 260" stroke="#fbbf24" stroke-width="4" stroke-dasharray="6 4" fill="none" marker-end="url(#arrowCQ)"/>
  <rect x="490" y="215" width="120" height="30" fill="#334155" rx="4" stroke="#fbbf24"/>
  <text x="550" y="235" fill="#fde68a" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Message Broker / Kafka</text>

  <!-- Bottom Side: Query (Read) Model -->
  <g transform="translate(240, 280)">
    <rect x="0" y="0" width="540" height="180" fill="#0f172a" rx="16" stroke="#3b82f6" stroke-opacity="0.5"/>
    <text x="270" y="30" fill="#93c5fd" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">Read Model (Materialized Views)</text>
    
    <!-- Query Service -->
    <rect x="20" y="70" width="120" height="60" fill="url(#readGrad)" rx="8"/>
    <text x="80" y="100" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Query</text>
    <text x="80" y="115" fill="#bfdbfe" font-size="10" font-family="sans-serif" text-anchor="middle">Service</text>

    <!-- Different Read DBs -->
    <path d="M 160 100 L 190 100" stroke="#3b82f6" stroke-width="2" fill="none"/>
    
    <path d="M 190 100 L 220 70" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowRead)"/>
    <rect x="230" y="50" width="100" height="40" fill="#172554" stroke="#60a5fa" rx="6"/>
    <text x="280" y="70" fill="#93c5fd" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">Redis Cache</text>
    <text x="280" y="82" fill="#60a5fa" font-size="9" font-family="sans-serif" text-anchor="middle">(Current: $50)</text>

    <path d="M 190 100 L 220 130" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#arrowRead)"/>
    <rect x="230" y="110" width="100" height="40" fill="#14532d" stroke="#34d399" rx="6"/>
    <text x="280" y="130" fill="#6ee7b7" font-size="10" font-weight="bold" font-family="sans-serif" text-anchor="middle">ElasticSearch</text>
    <text x="280" y="142" fill="#34d399" font-size="9" font-family="sans-serif" text-anchor="middle">(Analytics)</text>

    <text x="440" y="105" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle" font-style="italic">Projector consumes events</text>
    <text x="440" y="120" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle" font-style="italic">and updates Read DBs formats</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Command Query Responsibility Segregation (CQRS)',
      description: 'Most applications read data 10x more than they write it. In a single database, complex write locks slow down lightning-fast reads. CQRS physically splits the application. Commands (Writes) go to one microservice/database designed purely for ingesting data. Queries (Reads) go to a completely different microservice/database designed purely for fast retrieval (like Redis).'
    },
    {
      title: 'Event Sourcing',
      description: 'Instead of storing "Balance: $50" in a row, Event Sourcing stores the sequence of events that led to that state: [AccountCreated, Added$100, Sent$50]. The database is purely an "Append-Only" ledger. You never DELETE or UPDATE a row. If someone makes a mistake, you append a "Correction" event. This provides an undisputed mathematical audit log, essential for finance and complex domains.'
    },
    {
      title: 'Eventual Consistency (The Tradeoff)',
      description: 'If you write a Command, it stores in the Event Log. Then, a message broker (Kafka) fires an event to the Read Side saying "Update the Balance". This process takes a few milliseconds. If the client queries the Read Side immediately after writing, they might see stale data. The UI must be engineered to handle this Eventual Consistency (e.g., using optimistic UI updates or WebSockets).'
    }
  ],
  comparisonTable: {
    headers: ['Factor', 'Standard CRUD (Monolith DB)', 'CQRS + Event Sourcing'],
    rows: [
      ['State History', 'Only stores current state (Updates destroy history)', 'Stores every change ever made (Time-travel debugging)'],
      ['Scalability', 'Tightly coupled. DB scales as a whole block.', 'Asymmetrical. You can scale the Read DB 10x more than the Write DB.'],
      ['Performance (Reads)', 'Slowed down by complex SQL JOINs on normalized schemas', 'Instant. Read DB stores pre-calculated "Materialized Views" (JSON ready for UI)'],
      ['Complexity', 'Low. Standard developer knowledge.', 'Extreme. Distributed transactions, message brokers, and eventual consistency.'],
      ['Data Source of Truth', 'The Relational Tables', 'The Event Log (Immutable append-only ledger)']
    ]
  },
  pitfalls: [
    'Applying CQRS to a simple application: CQRS adds a massive amount of boilerplate code and infrastructure overhead. If your app is a simple blog or internal dashboard, CRUD is 100x better. Only use CQRS for complex, highly concurrent domains with asymmetrical read/write loads.',
    'Schema Evolution in Event Sourcing: If you change the shape of your "UserCreated" event in Year 3, your system must still know how to deserialize the "UserCreated" event from Year 1 when replaying the event log.',
    'UI disconnects due to Eventual Consistency: If a user clicks "Buy", and the redirect immediately hits the Read API, the order might not exist yet. The user thinks the order failed and clicks Buy again. You must poll or use Server-Sent-Events (SSE) effectively.'
  ]
};
