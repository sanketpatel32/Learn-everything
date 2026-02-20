import { TopicContent } from '../topicContent';

export const protocols: TopicContent = {
  title: 'Network Protocols (gRPC, WebSockets, MQTT)',
  description: 'While HTTP/REST is the standard for client-to-server communication, modern distributed systems require more specialized protocols. gRPC offers blazing-fast binary server-to-server communication. WebSockets enable full-duplex real-time client communication. MQTT provides extremely lightweight pub/sub for IoT devices operating on unreliable networks.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="grpcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="wsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="mqttGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrowP" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
    <marker id="arrowBidir" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
    </marker>
  </defs>

  <!-- Title Section -->
  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>
  
  <!-- Left: gRPC (Server to Server) -->
  <g transform="translate(20, 40)">
    <rect x="0" y="0" width="240" height="360" fill="#1e293b" rx="12" stroke="#3b82f6"/>
    <text x="120" y="30" fill="#60a5fa" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">gRPC (HTTP/2)</text>
    <text x="120" y="50" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Internal Microservice Comms</text>

    <!-- Microservices -->
    <rect x="20" y="80" width="200" height="60" fill="url(#grpcGrad)" rx="6"/>
    <text x="120" y="105" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Order Service (Go)</text>
    <text x="120" y="125" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">GetOrder(OrderReq)</text>

    <rect x="20" y="240" width="200" height="60" fill="url(#grpcGrad)" rx="6"/>
    <text x="120" y="265" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Payment Service (Java)</text>
    <text x="120" y="285" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">ProcessPayment(PayReq)</text>

    <!-- Communication -->
    <path d="M 100 140 L 100 240" stroke="#60a5fa" stroke-width="4" fill="none" marker-end="url(#arrowP)"/>
    <path d="M 140 240 L 140 140" stroke="#60a5fa" stroke-width="4" stroke-dasharray="4" fill="none" marker-end="url(#arrowP)"/>
    
    <rect x="75" y="180" width="90" height="24" fill="#0f172a" rx="4" stroke="#475569"/>
    <text x="120" y="196" fill="#fbbf24" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">Protobuf Binary</text>

    <text x="120" y="330" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">10x faster than JSON REST,</text>
    <text x="120" y="345" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">strongly typed contracts.</text>
  </g>

  <!-- Middle: WebSockets (Client to Server) -->
  <g transform="translate(280, 40)">
    <rect x="0" y="0" width="240" height="360" fill="#1e293b" rx="12" stroke="#10b981"/>
    <text x="120" y="30" fill="#34d399" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">WebSockets</text>
    <text x="120" y="50" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Real-time Browser / Mobile</text>

    <!-- Client -->
    <rect x="40" y="80" width="160" height="60" fill="#334155" rx="6" stroke="#94a3b8"/>
    <text x="120" y="110" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Web Browser</text>
    <text x="120" y="125" fill="#cbd5e1" font-size="10" font-family="sans-serif" text-anchor="middle">Chat Application</text>

    <!-- Server -->
    <rect x="40" y="240" width="160" height="60" fill="url(#wsGrad)" rx="6"/>
    <text x="120" y="270" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Node.js Server</text>
    <text x="120" y="285" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">WebSocket Connection</text>

    <!-- Connection -->
    <!-- Persistent Bi-directional tunnel -->
    <path d="M 120 140 L 120 240" stroke="#34d399" stroke-width="12" fill="none" opacity="0.2"/>
    <path d="M 100 140 L 100 240" stroke="#34d399" stroke-width="3" fill="none" marker-end="url(#arrowBidir)"/>
    <path d="M 140 240 L 140 140" stroke="#34d399" stroke-width="3" fill="none" marker-end="url(#arrowBidir)"/>

    <rect x="80" y="180" width="80" height="24" fill="#0f172a" rx="4" stroke="#475569"/>
    <text x="120" y="196" fill="#a7f3d0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">Full Duplex</text>

    <text x="120" y="330" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">Persistent TCP connection.</text>
    <text x="120" y="345" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">Server can PUSH to Client.</text>
  </g>

  <!-- Right: MQTT (IoT) -->
  <g transform="translate(540, 40)">
    <rect x="0" y="0" width="240" height="360" fill="#1e293b" rx="12" stroke="#f59e0b"/>
    <text x="120" y="30" fill="#fbbf24" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">MQTT</text>
    <text x="120" y="50" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">IoT / Low Bandwidth pub/sub</text>

    <!-- IoT Devices -->
    <circle cx="60" cy="100" r="25" fill="#334155" stroke="#94a3b8"/>
    <text x="60" y="103" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Temp</text>
    <text x="60" y="113" fill="#cbd5e1" font-size="8" text-anchor="middle">Sensor</text>

    <circle cx="180" cy="100" r="25" fill="#334155" stroke="#94a3b8"/>
    <text x="180" y="103" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Smart</text>
    <text x="180" y="113" fill="#cbd5e1" font-size="8" text-anchor="middle">Bulb</text>

    <!-- Broker -->
    <rect x="40" y="240" width="160" height="60" fill="url(#mqttGrad)" rx="6"/>
    <text x="120" y="270" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">MQTT Broker</text>
    <text x="120" y="285" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">(Mosquitto/EMQX)</text>

    <!-- Pub/Sub Lines -->
    <path d="M 60 125 L 100 240" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowP)"/>
    <rect x="45" y="170" width="50" height="16" fill="#0f172a" rx="2" stroke="#475569"/>
    <text x="70" y="181" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Pub: /temp</text>

    <path d="M 140 240 L 180 125" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#arrowP)"/>
    <rect x="145" y="170" width="50" height="16" fill="#0f172a" rx="2" stroke="#475569"/>
    <text x="170" y="181" fill="#fbbf24" font-size="8" font-family="monospace" text-anchor="middle">Sub: /light</text>

    <text x="120" y="325" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">Tiny header (2 bytes).</text>
    <text x="120" y="340" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">Quality of Service (QoS) levels</text>
    <text x="120" y="355" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">for unstable mobile networks.</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'gRPC (Binary RPC)',
      description: 'Built on HTTP/2. Instead of requesting a URL and getting JSON back (REST), gRPC allows you to call a remote server function as if it were a local one. It uses **Protocol Buffers (protobufs)** to serialize data into binary, making payloads notably smaller than JSON. It supports **streaming** (Unidirectional and Bidirectional), making it the gold standard for high-performance internal microservices.'
    },
    {
      title: 'WebSockets vs SSE (Server-Sent Events)',
      description: 'While WebSockets provide full-duplex communication, **SSE** is a simpler, unidirectional alternative where the server pushes updates to the client over standard HTTP. SSE is easier to load-balance and automatically handles re-connections. Use WebSockets for interactive games/chat, and SSE for live news feeds or dashboards.'
    },
    {
      title: 'HTTP/3 (The QUIC Protocol)',
      description: 'The next evolution of HTTP. Unlike previous versions that run on TCP, HTTP/3 runs on **QUIC (built on UDP)**. It solves the "Head-of-Line Blocking" problem where one lost packet stalls all other streams. It also enables **0-RTT connection resumption**, making it incredibly fast for mobile users switching between networks (e.g., WiFi to 5G).'
    }
  ],
  comparisonTable: {
    headers: ['Protocol', 'Transport', 'Direction', 'Efficiency', 'Best For'],
    rows: [
      ['REST (HTTP/1.1)', 'TCP', 'Unidirectional', 'Medium (Plaintext)', 'Public APIs'],
      ['gRPC (HTTP/2)', 'TCP', 'Bidirectional', 'Very High (Binary)', 'Internal Comms'],
      ['WebSockets', 'TCP', 'Bidirectional', 'High (Persistent)', 'Real-time Chat'],
      ['HTTP/3 (QUIC)', 'UDP', 'Unidirectional+', 'Extreme (No HOLB)', 'Web Performance']
    ]
  },
  pitfalls: [
    'Using gRPC for the browser frontend: Browsers lack full native HTTP/2 trailer support, requiring a `gRPC-Web` proxy. REST/GraphQL are usually better for user-facing clients.',
    'Head-of-Line Blocking in HTTP/2: While HTTP/2 allows multiple requests on one TCP connection, a single lost packet still stalls the entire connection. HTTP/3 (QUIC) is required to fix this.',
    'WebSocket Scaling: Sticky sessions are mandatory because the socket is tied to one server. Use a Redis message bus to sync state across nodes.',
    'Ignoring SSE: For simple server-to-client notifications, WebSockets are often overkill. SSE uses standard HTTP and is much easier to manage operationally.'
  ]
};
