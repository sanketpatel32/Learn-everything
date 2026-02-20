import { TopicContent } from '../topicContent';

export const telemetry: TopicContent = {
  title: 'Observability (Metrics, Logs, Tracing)',
  description: 'Observability is the ability to measure the internal states of a system by examining its external outputs. In a distributed microservices environment, when a user request fails after hitting 15 different internal services, logging into individual servers via SSH to read text files is impossible. A robust observability stack collects Metrics, Logs, and Distributed Traces into a centralized pane of glass.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="metricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="logGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="traceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <marker id="arrowT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <text x="400" y="30" fill="#f8fafc" font-size="20" font-weight="bold" font-family="sans-serif" text-anchor="middle">The Three Pillars of Observability</text>
  
  <!-- Pillar 1: Metrics -->
  <rect x="30" y="70" width="230" height="340" fill="#1e293b" rx="12" stroke="#3b82f6" stroke-width="2"/>
  <rect x="30" y="70" width="230" height="40" fill="url(#metricGrad)" rx="12" stroke="none" clip-path="inset(0 0 20px 0)"/>
  <text x="145" y="95" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">1. Metrics</text>
  
  <text x="145" y="130" fill="#bfdbfe" font-size="12" font-family="sans-serif" text-anchor="middle">Aggregated numeric data</text>
  <text x="145" y="145" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">(CPU%, Latency p99, Error Rate)</text>
  
  <rect x="45" y="160" width="200" height="80" fill="#0f172a" rx="6" stroke="#475569"/>
  <!-- Example line chart -->
  <polyline points="55,220 75,200 95,210 115,180 135,190 155,170 175,210 195,175 215,220" fill="none" stroke="#60a5fa" stroke-width="3"/>
  <text x="145" y="255" fill="#fcd34d" font-size="10" font-family="monospace" text-anchor="middle">PromQL: rate(http_requests[5m])</text>

  <text x="145" y="280" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Usage: Alerting / Dashboards</text>
  <text x="145" y="300" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">"Is there a problem right now?"</text>
  <text x="145" y="325" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Tools: Prometheus, Grafana, Datadog</text>
  
  <rect x="45" y="350" width="200" height="40" fill="#1e3a8a" rx="4"/>
  <text x="145" y="375" fill="#93c5fd" font-size="12" font-family="monospace" text-anchor="middle">Cost: EXTREMELY CHEAP</text>


  <!-- Pillar 2: Logging -->
  <rect x="285" y="70" width="230" height="340" fill="#1e293b" rx="12" stroke="#10b981" stroke-width="2"/>
  <rect x="285" y="70" width="230" height="40" fill="url(#logGrad)" rx="12" stroke="none" clip-path="inset(0 0 20px 0)"/>
  <text x="400" y="95" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">2. Logging</text>
  
  <text x="400" y="130" fill="#a7f3d0" font-size="12" font-family="sans-serif" text-anchor="middle">Discrete, unstructured text</text>
  <text x="400" y="145" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Emitted by application print statements</text>
  
  <rect x="300" y="160" width="200" height="80" fill="#0f172a" rx="6" stroke="#475569"/>
  <text x="310" y="180" fill="#94a3b8" font-size="8" font-family="monospace">10:01 [INFO] Order Starting...</text>
  <text x="310" y="195" fill="#fcd34d" font-size="8" font-family="monospace">10:01 [WARN] DB connection slow</text>
  <text x="310" y="210" fill="#ef4444" font-size="8" font-family="monospace">10:02 [ERR] NullPtr Exception</text>
  <text x="310" y="225" fill="#94a3b8" font-size="8" font-family="monospace">    at com.myapp.Order.process()</text>

  <text x="400" y="280" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Usage: Deep Debugging</text>
  <text x="400" y="300" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">"WHY did this specific error occur?"</text>
  <text x="400" y="325" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Tools: ELK Stack (Elastic), Splunk</text>

  <rect x="300" y="350" width="200" height="40" fill="#064e3b" rx="4"/>
  <text x="400" y="375" fill="#6ee7b7" font-size="12" font-family="monospace" text-anchor="middle">Cost: VERY EXPENSIVE</text>


  <!-- Pillar 3: Distributed Tracing -->
  <rect x="540" y="70" width="230" height="340" fill="#1e293b" rx="12" stroke="#f59e0b" stroke-width="2"/>
  <rect x="540" y="70" width="230" height="40" fill="url(#traceGrad)" rx="12" stroke="none" clip-path="inset(0 0 20px 0)"/>
  <text x="655" y="95" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">3. Tracing</text>
  
  <text x="655" y="130" fill="#fde68a" font-size="12" font-family="sans-serif" text-anchor="middle">Request flow across boundaries</text>
  <text x="655" y="145" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Correlated via 'Trace ID' injection</text>
  
  <!-- Span Chart representation -->
  <rect x="555" y="160" width="200" height="80" fill="#0f172a" rx="6" stroke="#475569"/>
  <rect x="565" y="170" width="160" height="10" fill="#3b82f6" rx="2"/>
  <text x="565" y="165" fill="#60a5fa" font-size="6" font-family="monospace">API Gateway (250ms)</text>
  
  <rect x="585" y="190" width="80" height="10" fill="#10b981" rx="2"/>
  <text x="585" y="185" fill="#34d399" font-size="6" font-family="monospace">Auth Service (80ms)</text>

  <rect x="670" y="210" width="55" height="10" fill="#ef4444" rx="2"/>
  <text x="670" y="205" fill="#fca5a5" font-size="6" font-family="monospace">DB Query (170ms) - TIMEOUT</text>

  <!-- Cascading line -->
  <path d="M 575 180 L 575 195" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <path d="M 660 180 L 660 215" stroke="#94a3b8" stroke-width="1" fill="none"/>


  <text x="655" y="280" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Usage: Bottleneck Analysis</text>
  <text x="655" y="300" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">"WHERE in the chain is it slow/failing?"</text>
  <text x="655" y="325" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Tools: Jaeger, OpenTelemetry</text>

  <rect x="555" y="350" width="200" height="40" fill="#78350f" rx="4"/>
  <text x="655" y="375" fill="#fcd34d" font-size="12" font-family="monospace" text-anchor="middle">Cost: MEDIUM (Sampling)</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Metrics (Is something wrong right now?)',
      description: 'Metrics are numbers optimized for storage. You don\'t store "User John logged in at 10:00", you store "Counter: Number of Logins = +1". Because it\'s just counting and discarding payload data, storing millions of metrics per second is incredibly cheap. You use Metrics and PromQL (Prometheus Query Language) to build dashboards and trigger PagerDuty alerts (e.g., "Error Rate > 5% for 10 minutes").'
    },
    {
      title: 'Distributed Tracing (Where exactly is it wrong?)',
      description: 'When an alert fires, you look at a Trace. The API Gateway receives an HTTP request and assigns it a unique UUID (the `Trace-Id`). This UUID is injected into the HTTP Header of every downstream microservice call. The Trace UI (like Jaeger) collects all these spans, visualizing the exact sequence, allowing you to quickly spot that "Service D spent 5 seconds executing a bad SQL query".'
    },
    {
      title: 'Logs (Why is it wrong?)',
      description: 'Once the Trace identifies Service D, you search the Logs strictly for that specifically failed `Trace-Id` to see the unstructured text errors ("NullPointerException at Line 42"). Logging everything is extremely expensive in terms of network IO and storage (ElasticSearch indices can grow to terabytes per day). Log strategically.'
    },
    {
      title: 'OpenTelemetry',
      description: 'Historically, you needed Datadog SDKs for metrics, Jaeger SDKs for tracing, and ELK for logs. OpenTelemetry (OTel) is the modern CNCF standard: a single vendor-neutral SDK and Agent that collects all three pillars and exports them to whatever backend you prefer.'
    }
  ],
  comparisonTable: {
    headers: ['Pillar', 'Data Structure', 'Role in Debugging', 'Storage Cost'],
    rows: [
      ['Metrics', 'Time-Series Floats (Counters, Gauges)', 'Alerting: Triggering the alarm when thresholds fail', 'Cheap (highly compressible aggregations)'],
      ['Tracing', 'Spans with Parent/Child IDs (Trace-Id)', 'Isolation: Finding WHICH microservice caused the latency/error', 'Medium (Usually requires sampling, e.g., keeping only 1% of successful traces)'],
      ['Logs', 'JSON or Unstructured Text (Strings)', 'Investigation: Finding the root human-readable cause in code', 'Expensive (High disk I/O, heavy text indexing)']
    ]
  },
  pitfalls: [
    'Logging like a Monolith: Writing unformatted `console.log("Error here")`. In modern systems, logs MUST be formatted as Structured JSON (e.g. `{"level":"error", "traceId":"123", "msg":"..."}`) so log aggregates can parse and filter them indexed efficiently.',
    'High Cardinality Metrics: If you make a Prometheus counter like `http_requests_total{user_id="10293"}`, you generate a unique time-series for every user in your database. This will instantly OOM (Out of Memory) crash your metrics server. Tags must have low cardinality (e.g. HTTP status codes).',
    'Not Implementing Trace Context Propagation: If one mid-level service forgets to read the `traceparent` HTTP header and pass it down to the next service, the distributed trace breaks in half, rendering it useless.'
  ]
};
