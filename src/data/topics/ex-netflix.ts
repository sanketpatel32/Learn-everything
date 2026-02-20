import { TopicContent } from '../topicContent';

export const netflix: TopicContent = {
  title: 'Design Netflix (Video Streaming)',
  description: 'Netflix accounts for a massive percentage of global internet traffic. Designing it requires understanding how to ingest video files, transcode them into multiple resolutions and bitrates, and securely distribute them globally using a Content Delivery Network (CDN) to ensure zero buffering.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#6d28d9" />
    </linearGradient>
    <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="storageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrowN" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowStream" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Client Devices -->
  <rect x="40" y="80" width="80" height="50" fill="url(#clientGrad)" rx="6"/>
  <text x="80" y="105" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Smart TV</text>
  <text x="80" y="120" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">(4K)</text>

  <rect x="40" y="170" width="80" height="50" fill="url(#clientGrad)" rx="6"/>
  <text x="80" y="195" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Laptop</text>
  <text x="80" y="210" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">(1080p)</text>

  <rect x="40" y="260" width="80" height="50" fill="url(#clientGrad)" rx="6"/>
  <text x="80" y="285" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Mobile</text>
  <text x="80" y="300" fill="#bfdbfe" font-size="9" font-family="monospace" text-anchor="middle">(720p)</text>

  <!-- Control Plane (API Gateway / Microservices) -->
  <rect x="260" y="140" width="140" height="100" fill="url(#apiGrad)" rx="8" stroke="#a78bfa" stroke-width="2"/>
  <text x="330" y="170" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Control Plane</text>
  <text x="330" y="185" fill="#e9d5ff" font-size="10" font-family="sans-serif" text-anchor="middle">Auth, UI, Billing</text>
  <rect x="270" y="200" width="120" height="30" fill="#4c1d95" rx="4"/>
  <text x="330" y="218" fill="#d8b4fe" font-size="10" font-family="monospace" text-anchor="middle">AWS Microservices</text>

  <!-- Control Plane Connections -->
  <path d="M 120 105 L 260 170" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowN)"/>
  <path d="M 120 195 L 260 195" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowN)"/>
  <path d="M 120 285 L 260 220" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowN)"/>
  
  <text x="180" y="150" fill="#94a3b8" font-size="10" font-family="sans-serif" transform="rotate(30, 180, 150)">Login & Browse</text>

  <!-- Data Plane (Open Connect / CDN) -->
  <rect x="520" y="60" width="220" height="160" fill="url(#cdnGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="630" y="90" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Data Plane (Netflix OCA)</text>
  <text x="630" y="105" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Global Content Delivery Network</text>
  
  <rect x="540" y="120" width="80" height="40" fill="#064e3b" rx="4"/>
  <text x="580" y="145" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">ISP Server CA</text>

  <rect x="640" y="120" width="80" height="40" fill="#064e3b" rx="4"/>
  <text x="680" y="145" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">ISP Server NY</text>

  <rect x="540" y="170" width="180" height="30" fill="#064e3b" rx="4"/>
  <text x="630" y="190" fill="#6ee7b7" font-size="10" font-family="monospace" text-anchor="middle">ISP Server EU</text>


  <!-- Streaming connections (Thick lines) -->
  <path d="M 520 130 L 120 105" stroke="#10b981" stroke-width="4" fill="none" marker-end="url(#arrowStream)"/>
  <text x="350" y="100" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif" transform="rotate(-5, 350, 100)">Streams 4K Video Data</text>

  <path d="M 540 160 L 120 285" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowStream)"/>

  <!-- Encoding Pipeline -->
  <rect x="250" y="320" width="490" height="100" fill="#1e293b" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="495" y="340" fill="#fde68a" font-size="14" font-weight="bold" text-anchor="middle">Video Ingestion & Transcoding Pipeline</text>

  <rect x="270" y="360" width="100" height="40" fill="url(#storageGrad)" rx="4"/>
  <text x="320" y="385" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Raw Storage</text>
  
  <path d="M 370 380 L 410 380" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowN)"/>

  <rect x="420" y="360" width="140" height="40" fill="#78350f" rx="4"/>
  <text x="490" y="385" fill="#fde68a" font-size="12" font-weight="bold" text-anchor="middle">Transcoder Fleet</text>
  
  <!-- Chunks generation -->
  <path d="M 560 370 L 600 370" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowN)"/>
  <path d="M 560 390 L 600 390" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowN)"/>

  <rect x="610" y="350" width="110" height="50" fill="#b45309" rx="4"/>
  <text x="665" y="370" fill="#fff" font-size="10" font-family="monospace" text-anchor="middle">4K, 1080p, 720p</text>
  <text x="665" y="385" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">Video Chunks</text>

  <!-- Send to CDN -->
  <path d="M 665 350 L 665 220" stroke="#f59e0b" stroke-width="3" stroke-dasharray="4" fill="none" marker-end="url(#arrowN)"/>
  <text x="675" y="280" fill="#fbbf24" font-size="10" font-weight="bold" transform="rotate(-90, 675, 280)">Proactive Push to CDN</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Control Plane vs Data Plane',
      description: 'Netflix separates "clicking around the UI" (Control Plane) from "actually watching the video" (Data Plane). The Control Plane runs entirely on AWS microservices. Once you hit "Play", the Control Plane tells your client exactly which CDN server handles the video file, and the client streams directly from the Data Plane, completely bypassing AWS.'
    },
    {
      title: 'Open Connect (Custom CDN)',
      description: 'Netflix does not use Akamai or Cloudflare for video. They build their own hardware servers holding terabytes of SSDs containing Netflix titles. They literally mail these physical servers to local Internet Service Providers (Comcast, AT&T) worldwide. When you watch Netflix, you are often streaming from a box sitting 5 miles from your house.'
    },
    {
      title: 'Video Transcoding & Chunking',
      description: 'A raw movie file is massive. Netflix splits it into 3-second "Chunks". Each chunk is fed into a massive parallel computing fleet that encodes the 3-second clip into dozens of different formats (4K, 1080p, 720p, 480p) and bitrates.'
    },
    {
      title: 'Adaptive Bitrate Streaming (DASH/HLS)',
      description: 'The Netflix client on your TV is constantly monitoring your internet speed. If your Wi-Fi suddenly drops, the client automatically requests the next 3-second chunk in 480p instead of 4K. Because the video is pre-chunked on the CDN, the transition is seamless with zero buffering.'
    }
  ],
  comparisonTable: {
    headers: ['Component', 'Technology', 'Purpose in Architecture'],
    rows: [
      ['Control Plane', 'AWS / Spring Boot / gRPC', 'Handles user login, UI rendering, recommendation algorithms, and billing.'],
      ['Data Plane', 'Netflix Open Connect (OCA)', 'Custom CDN racks embedded inside local ISP networks to serve massive video files.'],
      ['Storage', 'Amazon S3', 'Stores the original raw Hollywood master files.'],
      ['Client Player', 'DASH / HLS', 'Downloads manifest files and requests individual video chunks based on active network speed.'],
      ['Database', 'Cassandra', 'Stores global watch history and user profiles (highly available, multi-region).']
    ]
  },
  pitfalls: [
    'Serving Video through the API Gateway: A classic beginner mistake. Text data (JSON) and Video data must travel completely different paths. Routing a 4K video stream through your user-auth microservice will instantly bottleneck and crash your entire system.',
    'Transcoding on the Fly: Video encoding is extremely CPU intensive. You cannot transcode a movie at the exact moment a user hits "Play". All formatting and chunking must happen asynchronously when the movie is first added to the library.',
    'Not Predicitive Caching: Netflix does not push the entire catalog to every OCA box. They use ML to predict what will be popular tomorrow (e.g., a new season of Stranger Things) and proactively push just those chunks to the edge caches during off-peak night hours.'
  ]
};
