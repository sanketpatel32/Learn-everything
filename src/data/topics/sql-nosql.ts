import { TopicContent } from '../topicContent';

export const sqlVsNosql: TopicContent = {
  title: 'SQL, NoSQL, & NewSQL',
  description: 'The great debate. Relational databases (SQL) give you rigid guarantees and complex querying but struggle to scale horizontally. Non-relational databases (NoSQL) throw away those guarantees to give you infinite, easy scalability. NewSQL attempts to give you both.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="sqlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="nosqlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
    <linearGradient id="newsqlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#4c1d95" />
    </linearGradient>
  </defs>

  <!-- SQL / Relational -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="240" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="120" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">SQL (Relational)</text>
    <text x="120" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">PostgreSQL, MySQL</text>

    <!-- Table Structure -->
    <rect x="30" y="100" width="180" height="120" fill="url(#sqlGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
    <!-- Grid -->
    <path d="M 30 130 L 210 130" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>
    <path d="M 30 160 L 210 160" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>
    <path d="M 30 190 L 210 190" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>
    <path d="M 90 100 L 90 220" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>
    <path d="M 150 100 L 150 220" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>
    
    <!-- Table 2 (Relational) -->
    <rect x="50" y="240" width="140" height="60" fill="url(#sqlGrad)" rx="8" stroke="#60a5fa" stroke-width="2" opacity="0.8"/>
    <path d="M 120 220 L 120 240" stroke="#f8fafc" stroke-width="3" fill="none"/>
    <text x="130" y="235" fill="#f8fafc" font-size="10" font-family="sans-serif">JOIN</text>

    <!-- Properties -->
    <text x="120" y="340" fill="#60a5fa" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">ACID Compliant</text>
    <text x="120" y="360" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Strict Schema</text>
    <text x="120" y="380" fill="#f43f5e" font-size="12" font-family="sans-serif" text-anchor="middle">Hard to Shard</text>
  </g>

  <!-- NoSQL -->
  <g transform="translate(280, 20)">
    <rect x="0" y="0" width="240" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="120" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">NoSQL (Document)</text>
    <text x="120" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">MongoDB, DynamoDB</text>

    <!-- JSON Docs -->
    <rect x="40" y="100" width="160" height="80" fill="url(#nosqlGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="55" y="125" fill="#a7f3d0" font-size="14" font-family="monospace">{</text>
    <text x="70" y="145" fill="#a7f3d0" font-size="10" font-family="monospace">"name": "Alice",</text>
    <text x="70" y="160" fill="#a7f3d0" font-size="10" font-family="monospace">"skills": ["AWS"]</text>
    <text x="55" y="175" fill="#a7f3d0" font-size="14" font-family="monospace">}</text>

    <rect x="60" y="200" width="160" height="100" fill="url(#nosqlGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
    <text x="75" y="225" fill="#a7f3d0" font-size="14" font-family="monospace">{</text>
    <text x="90" y="245" fill="#a7f3d0" font-size="10" font-family="monospace">"id": 99,</text>
    <text x="90" y="260" fill="#a7f3d0" font-size="10" font-family="monospace">"orders": 12,</text>
    <text x="90" y="275" fill="#a7f3d0" font-size="10" font-family="monospace">"active": true</text>
    <text x="75" y="290" fill="#a7f3d0" font-size="14" font-family="monospace">}</text>

    <!-- Properties -->
    <text x="120" y="340" fill="#34d399" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">BASE / Eventual</text>
    <text x="120" y="360" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Flexible Schema (JSON)</text>
    <text x="120" y="380" fill="#10b981" font-size="12" font-family="sans-serif" text-anchor="middle">Horizontal by Default</text>
  </g>

  <!-- NewSQL -->
  <g transform="translate(540, 20)">
    <rect x="0" y="0" width="240" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="120" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">NewSQL</text>
    <text x="120" y="60" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">CockroachDB, Spanner</text>

    <!-- Sharded Tables -->
    <rect x="30" y="100" width="180" height="40" fill="url(#newsqlGrad)" rx="8" stroke="#a78bfa" stroke-width="2"/>
    <text x="120" y="125" fill="#ddd6fe" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Distributed Node A</text>

    <rect x="30" y="160" width="180" height="40" fill="url(#newsqlGrad)" rx="8" stroke="#a78bfa" stroke-width="2"/>
    <text x="120" y="185" fill="#ddd6fe" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Distributed Node B</text>

    <rect x="30" y="220" width="180" height="40" fill="url(#newsqlGrad)" rx="8" stroke="#a78bfa" stroke-width="2"/>
    <text x="120" y="245" fill="#ddd6fe" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">Distributed Node C</text>

    <!-- Spanner Sync -->
    <path d="M 120 140 L 120 160" stroke="#f8fafc" stroke-width="2" fill="none"/>
    <path d="M 120 200 L 120 220" stroke="#f8fafc" stroke-width="2" fill="none"/>
    <text x="120" y="285" fill="#a78bfa" font-size="10" font-style="italic" font-family="sans-serif" text-anchor="middle">True Time / Raft Consensus</text>

    <!-- Properties -->
    <text x="120" y="340" fill="#a78bfa" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">ACID Compliant</text>
    <text x="120" y="360" fill="#a78bfa" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Horizontal by Default</text>
    <text x="120" y="380" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">Complex infrastructure</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'SQL (Relational Databases)',
      description: 'SQL databases strictly enforce rules (schemas). Data is stored in highly organized tables, connected by relationships (Foreign Keys). They guarantee **ACID** (Atomicity, Consistency, Isolation, Durability) properties, ensuring that if a transaction (like a bank transfer) fails midway, the database rolls back cleanly. However, because they enforce relationships across the entire dataset, they are notoriously difficult to shard and scale horizontally.'
    },
    {
      title: 'NoSQL (Non-relational / Document)',
      description: 'NoSQL threw away schemas and ACID guarantees in exchange for raw speed and infinite horizontal scalability. Data is often stored as unstructured JSON documents or Key-Value pairs. They follow the **BASE** philosophy (Basically Available, Soft state, Eventual consistency). You cannot perform complex SQL `JOIN`s efficiently natively across collections. It is designed for massive reads/writes where losing a fraction of data in a crash is acceptable (like Twitter likes or analytics logs).'
    },
    {
      title: 'NewSQL (Modern Distributed SQL)',
      description: 'NewSQL attempts to provide the Holy Grail: The strict ACID compliance and relational guarantees of traditional SQL, mathematically mapped onto a horizontally scalable, distributed cluster natively like NoSQL. Examples include Google Spanner and CockroachDB. They achieve this using atomic clocks (TrueTime) or consensus algorithms (Raft) to orchestrate locks across multiple servers. They are heavily engineered and slower on write than pure NoSQL, but provide absolute data safety at a global scale.'
    }
  ],
  comparisonTable: {
    headers: ['Attribute', 'SQL (RDBMS)', 'NoSQL', 'NewSQL'],
    rows: [
      ['Data Structure', 'Tables / Rows / Strict Schema', 'JSON / Key-Value / Schemaless', 'Tables / Rows / Strict Schema'],
      ['Scalability', 'Primarily Vertical (Scale Up)', 'Inherently Horizontal (Scale Out)', 'Inherently Horizontal (Scale Out)'],
      ['Consistency', 'Strictly ACID', 'BASE (Eventual Consistency)', 'Strictly ACID (Distributed)'],
      ['Best For', 'Fintech, ERPs, E-Commerce transactions', 'Logs, Social Media streams, Catalogs', 'Global Scale Fintech, Massive Multiplayer Games']
    ]
  },
  pitfalls: [
    '"We will just use NoSQL because it\'s faster." ➔ Choosing NoSQL simply because schema migrations in SQL are annoying is a terrible idea. If your data naturally has strong relationships (Users have Accounts, Accounts have Transactions), forcing it into NoSQL will result in immense application-side complexity trying to emulate JOINs.',
    'Ignoring the limits of Eventual Consistency: If you use NoSQL for a bank balance, a user could withdraw $100 simultaneously from their phone and ATM because node A hasn\'t synchronized the first withdrawal to node B yet.'
  ]
};
