import { TopicContent } from '../topicContent';

export const whatsapp: TopicContent = {
  title: 'Design WhatsApp (1:1 Chat System)',
  description: 'Designing a global, highly scalable chat application focused on low latency, delivery guarantees, and high throughput. The architecture relies heavily on persistent WebSocket connections for real-time delivery and message queues for asynchronous buffering.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="wsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="sessionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <marker id="arrowWS" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
    </marker>
    <marker id="arrowD" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Users -->
  <rect x="40" y="80" width="100" height="60" fill="url(#clientGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="90" y="110" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">User A</text>
  <text x="90" y="125" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Sender</text>

  <rect x="40" y="300" width="100" height="60" fill="url(#clientGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="90" y="330" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">User B</text>
  <text x="90" y="345" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Receiver</text>

  <!-- Load Balancer -->
  <rect x="200" y="180" width="60" height="80" fill="#1e293b" rx="4" stroke="#475569" stroke-width="2"/>
  <text x="230" y="225" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle" transform="rotate(-90, 230, 225)">L4 LB</text>

  <!-- Chat Servers (WebSocket Handlers) -->
  <rect x="320" y="60" width="120" height="80" fill="url(#wsGrad)" rx="6" stroke="#60a5fa"/>
  <text x="380" y="90" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Chat Svr 1</text>
  <text x="380" y="105" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">Maintains WS Conns</text>
  <text x="380" y="120" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">NodeID: SVR_1</text>

  <rect x="320" y="290" width="120" height="80" fill="url(#wsGrad)" rx="6" stroke="#60a5fa"/>
  <text x="380" y="320" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Chat Svr 2</text>
  <text x="380" y="335" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">Maintains WS Conns</text>
  <text x="380" y="350" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">NodeID: SVR_2</text>

  <!-- Redis Session / Presence -->
  <rect x="520" y="160" width="120" height="120" fill="url(#sessionGrad)" rx="6" stroke="#fcd34d"/>
  <text x="580" y="190" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Redis (KV)</text>
  <text x="580" y="210" fill="#fde68a" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Session Repo</text>
  <rect x="530" y="220" width="100" height="45" fill="#78350f" rx="4"/>
  <text x="540" y="235" fill="#fcd34d" font-size="9" font-family="monospace">UserA -> SVR_1</text>
  <text x="540" y="250" fill="#fcd34d" font-size="9" font-family="monospace">UserB -> SVR_2</text>

  <!-- Message Queue / PubSub -->
  <rect x="320" y="190" width="120" height="60" fill="#334155" rx="4" stroke="#64748b"/>
  <text x="380" y="220" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Message Bus</text>
  <text x="380" y="235" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">(Redis PubSub/Kafka)</text>

  <!-- Cassandra / ScyllaDB for Message Sync -->
  <rect x="680" y="100" width="100" height="240" fill="url(#dbGrad)" rx="6" stroke="#c084fc"/>
  <text x="730" y="200" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle" transform="rotate(-90, 730, 200)">Cassandra</text>
  <text x="710" y="200" fill="#e9d5ff" font-size="10" font-family="monospace" text-anchor="middle" transform="rotate(-90, 710, 200)">Message Sync DB</text>

  <!-- Flow Lines -->
  <!-- A connects and sends -->
  <path d="M 140 100 L 320 100" stroke="#60a5fa" stroke-width="3" stroke-dasharray="4" fill="none" marker-end="url(#arrowWS)"/>
  <text x="210" y="90" fill="#93c5fd" font-size="10" font-family="sans-serif" font-weight="bold">1. Persistent WS</text>
  <text x="210" y="115" fill="#93c5fd" font-size="10" font-family="sans-serif">2. Send "Hello"</text>

  <!-- SVR1 checks Redis -->
  <path d="M 440 100 L 520 170" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowD)"/>
  <text x="495" y="130" fill="#cbd5e1" font-size="9" font-family="sans-serif" transform="rotate(40, 495, 130)">3. Where is B?</text>

  <!-- SVR1 saves to Cassandra -->
  <path d="M 440 60 L 680 130" stroke="#c084fc" stroke-width="2" fill="none" marker-end="url(#arrowD)"/>
  <text x="560" y="85" fill="#d8b4fe" font-size="9" font-family="sans-serif" transform="rotate(15, 560, 85)">4. Persist Msg</text>

  <!-- SVR1 publishes to bus -->
  <path d="M 380 140 L 380 190" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowD)"/>

  <!-- Bus to SVR2 -->
  <path d="M 380 250 L 380 290" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowD)"/>
  <text x="390" y="275" fill="#cbd5e1" font-size="9" font-family="sans-serif">5. Route to SVR2</text>

  <!-- B connects and receives -->
  <path d="M 140 330 L 320 330" stroke="#60a5fa" stroke-width="3" stroke-dasharray="4" fill="none" marker-start="url(#arrowWS)"/>
  <text x="240" y="320" fill="#93c5fd" font-size="10" font-family="sans-serif" font-weight="bold">Persistent WS</text>
  <text x="240" y="345" fill="#93c5fd" font-size="10" font-family="sans-serif">6. Push "Hello"</text>

  <text x="400" y="420" fill="#94a3b8" font-size="12" font-style="italic" text-anchor="middle">Key Insight: Chat pushes data to connected clients instead of traditional HTTP Polling.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'End-to-End Encryption (Signal Protocol)',
      description: 'Security is paramount. WhatsApp uses the **Signal Protocol** for E2EE. Each message is encrypted on the sender\'s device and can only be decrypted by the recipient. The server acts as a "blind relay"—it stores the encrypted blob but has zero knowledge of the content. This is achieved via a **Double Ratchet Algorithm** and key-exchange (X3DH).'
    },
    {
      title: 'Delivery Receipts (The Three Ticks)',
      description: 'How do you know if a message was delivered? 1) **Single Tick**: Message reached the server. 2) **Double Tick**: Server pushed message to the receiver and got an ACK back. 3) **Blue Tick**: Receiver opened the app and the client sent a "Read" status update. These are handled via high-speed asynchronous event streams to avoid blocking the main chat flow.'
    },
    {
      title: 'Presence & Last Seen',
      description: 'Tracking status for 2 billion users is expensive. Instead of constant polling, clients send a **Heartbeat** every 30-60 seconds. If the connection drops, the status switches to "Offline". To save server resources, "Last Seen" updates are often processed via a **Push-to-Followers** model using a fast cache (Redis).'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'WhatsApp (Consumer)', 'Slack (Enterprise)'],
    rows: [
      ['Privacy Model', 'End-to-End Encrypted (Server is blind)', 'Server-side storage (Company searchable)'],
      ['Sync Model', 'Device-centric (Message syncing is hard)', 'Cloud-centric (Instant history on all devices)'],
      ['Persistence', 'Limited (Usually stored locally)', 'Permanent (Stored in cloud indefinitely)'],
      ['Scalability Limit', 'High (Billions of active users)', 'Medium (Optimized for large organizations)']
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=vvhC64hQZMk',
  pitfalls: [
    'Message Re-delivery: If User B is offline for 2 weeks, storing 50,000 pending messages in expensive RAM (Redis) is wasteful. Offline messages are usually overflowed to a disk-based store (Cassandra) and cleared upon delivery.',
    'Fan-out in Large Groups: If a user sends a message to a group of 1000, 1000 individual pushes happen. This is handled by a separate "Group Dispatcher" service to keep individual chat servers responsive.',
    'Privacy vs Sync: E2EE makes "Multi-device" support hard. Each message must be encrypted separately for each of the recipient\'s 5 devices, or keys must be synced securely in the background.',
    'Ignoring Network Jitter: On weak mobile networks (2G/3G), WebSockets may flap constantly. Robust retry logic with exponential backoff and "Message Sequence IDs" are critical to prevent duplicates.'
  ]
};
