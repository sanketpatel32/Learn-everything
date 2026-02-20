import { TopicContent } from '../topicContent';

export const serviceMesh: TopicContent = {
  title: 'Service Mesh (Istio, Linkerd)',
  description: 'In a microservices architecture with hundreds of services, managing networking (retries, timeouts, mutual TLS encryption, telemetry) inside the application code becomes an unmaintainable nightmare. A Service Mesh extracts all of this networking logic out of the code and pushes it down into the infrastructure layer using "Sidecar" proxies.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="sidecarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="controlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>
    <marker id="arrowM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowSync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#a5b4fc" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Application Code (Before Service Mesh) - Just conceptual, we'll draw the Mesh architecture directly -->
  <text x="400" y="40" fill="#f8fafc" font-size="20" font-weight="bold" font-family="sans-serif" text-anchor="middle">Data Plane (Sidecar Proxies)</text>

  <!-- Node / Pod 1 -->
  <rect x="80" y="80" width="240" height="150" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2"/>
  <text x="200" y="70" fill="#94a3b8" font-size="12" font-family="monospace" text-anchor="middle">Kubernetes Pod A</text>

  <rect x="100" y="100" width="120" height="100" fill="url(#serviceGrad)" rx="8"/>
  <text x="160" y="145" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Order Svc</text>
  <text x="160" y="165" fill="#bfdbfe" font-size="10" font-family="sans-serif" text-anchor="middle">Business Logic Only</text>

  <rect x="230" y="100" width="70" height="100" fill="url(#sidecarGrad)" rx="8"/>
  <text x="265" y="140" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Envoy</text>
  <text x="265" y="155" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Proxy</text>

  <!-- Internal Pod Traffic -->
  <path d="M 220 150 L 230 150" stroke="#fbbf24" stroke-width="4" fill="none"/>
  
  <!-- Node / Pod 2 -->
  <rect x="480" y="80" width="240" height="150" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2"/>
  <text x="600" y="70" fill="#94a3b8" font-size="12" font-family="monospace" text-anchor="middle">Kubernetes Pod B</text>

  <rect x="500" y="100" width="70" height="100" fill="url(#sidecarGrad)" rx="8"/>
  <text x="535" y="140" fill="#fff" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Envoy</text>
  <text x="535" y="155" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">Proxy</text>

  <rect x="580" y="100" width="120" height="100" fill="url(#serviceGrad)" rx="8"/>
  <text x="640" y="145" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Auth Svc</text>
  <text x="640" y="165" fill="#bfdbfe" font-size="10" font-family="sans-serif" text-anchor="middle">Business Logic Only</text>

  <!-- Internal Pod Traffic -->
  <path d="M 570 150 L 580 150" stroke="#fbbf24" stroke-width="4" fill="none"/>

  <!-- Network Traffic (mTLS) -->
  <path d="M 300 150 L 500 150" stroke="#34d399" stroke-width="6" fill="none" marker-end="url(#arrowM)"/>
  <rect x="360" y="138" width="80" height="24" fill="#0f172a" rx="4" stroke="#10b981"/>
  <text x="400" y="154" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">mTLS</text>

  <text x="400" y="180" fill="#cbd5e1" font-size="10" font-style="italic" font-family="sans-serif" text-anchor="middle">Secure, cross-node network call</text>
  <text x="400" y="195" fill="#cbd5e1" font-size="10" font-style="italic" font-family="sans-serif" text-anchor="middle">intercepted by Proxies</text>

  <!-- Control Plane -->
  <rect x="250" y="280" width="300" height="120" fill="url(#controlGrad)" rx="12" stroke="#818cf8" stroke-width="3"/>
  <text x="400" y="310" fill="#ffffff" font-size="18" font-weight="bold" font-family="sans-serif" text-anchor="middle">Control Plane (e.g. Istiod)</text>
  <text x="400" y="330" fill="#c7d2fe" font-size="12" font-family="sans-serif" text-anchor="middle">Configures all Proxies globally</text>
  
  <rect x="270" y="350" width="70" height="30" fill="#312e81" rx="4"/>
  <text x="305" y="369" fill="#a5b4fc" font-size="10" font-family="sans-serif" text-anchor="middle">Routing</text>

  <rect x="365" y="350" width="70" height="30" fill="#312e81" rx="4"/>
  <text x="400" y="369" fill="#a5b4fc" font-size="10" font-family="sans-serif" text-anchor="middle">Security</text>

  <rect x="460" y="350" width="70" height="30" fill="#312e81" rx="4"/>
  <text x="495" y="369" fill="#a5b4fc" font-size="10" font-family="sans-serif" text-anchor="middle">Telemetry</text>

  <!-- Control Plane sync arrows -->
  <path d="M 330 280 L 265 200" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowSync)"/>
  <path d="M 470 280 L 535 200" stroke="#818cf8" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowSync)"/>

  <text x="400" y="425" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">The Developer writes standard HTTP code. The Proxy intercepts it and magically adds Retries, Circuit Breaking, and Security.</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'The "Fat Client" Problem',
      description: 'Ten years ago, teams imported large libraries (like Netflix Hystrix) directly into their application code to handle network retries, service discovery, and circuit breaking. This meant every microservice (in Java, Go, Python, Node) had to maintain and configure identical networking code. This was operational hell.'
    },
    {
      title: 'The Sidecar Pattern (Data Plane)',
      description: 'A Service Mesh uses Kubernetes to inject a literal second container (a "Sidecar" proxy like Envoy) into the same Pod as your application. When your application tries to make an HTTP call to a database, it actually talks to localhost. The local Envoy Proxy intercepts the call, wraps it in heavy encryption (mTLS), executes retries if it fails, and routes it to the destination proxy.'
    },
    {
      title: 'The Control Plane',
      description: 'You cannot manually configure thousands of proxies. The Control Plane (like Istiod) is a centralized brain. Operators define rules here ("Route 10% of traffic to v2", or "Timeout after 500ms"), and the Control Plane pushes these configurations down to all the proxies in real-time.'
    },
    {
      title: 'Free Observability',
      description: 'Because ALL network traffic must pass through the proxies, the Service Mesh can automatically generate extremely detailed metrics, distributed tracing spans, and logs for every single hop in the cluster, requiring zero code changes from developers.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Application Library (Before Mesh)', 'Service Mesh (Sidecar)'],
    rows: [
      ['Language Dependency', 'Required different library for Java, Node, Python', 'Language Agnostic (Runs as a separate container)'],
      ['Encryption (mTLS)', 'Developers must manage certificates in code', 'Automatic. Proxies handle cert rotation silently'],
      ['Traffic Routing', 'Code deployments required', 'Dynamic. Configured via YAML in the Control Plane'],
      ['Performance', 'Marginally faster (no proxy hops)', 'Adds slight latency (~1-5ms) due to double proxying']
    ]
  },
  pitfalls: [
    'Over-engineering: Do not install Istio on a cluster with 5 microservices. The operational complexity of managing a Service Mesh frequently outweighs the benefits unless you are at serious scale.',
    'Memory Overhead: Every single pod gets an Envoy sidecar. If you have 1,000 pods, you suddenly have 1,000 Envoy proxies running, which can consume gigabytes of cluster Memory.',
    'eBPF Alternatives: Modern approaches (like Cilium) are bypassing sidecars entirely by using eBPF (Extended Berkeley Packet Filter) within the Linux Kernel for even lower-latency networking without sidecars.'
  ]
};
