import { TopicContent } from '../topicContent';

export const zeroTrust: TopicContent = {
  title: 'Zero Trust Security Architecture',
  description: 'Traditional security relied on the "Castle and Moat" model: a strong firewall to keep bad actors out of the corporate network, but once inside the VPN, a user or device was implicitly trusted. "Zero Trust" assumes the network is already compromised. No entity (user, device, or microservice) is ever trusted by default, regardless of whether it is inside or outside the network perimeter.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect width="40" height="40" fill="none"/>
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" stroke-width="1" opacity="0.5"/>
    </pattern>
    <marker id="arrowZT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
    </marker>
    <marker id="arrowZTOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
    </marker>
  </defs>

  <!-- Background Base -->
  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>
  
  <!-- Left Side: Old "Castle & Moat" -->
  <rect x="20" y="40" width="360" height="380" fill="#1e293b" rx="12" stroke="#475569" stroke-width="2"/>
  <rect x="20" y="40" width="360" height="380" fill="url(#grid)" rx="12"/>
  
  <text x="200" y="70" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Obsolete: Castle & Moat Architecture</text>

  <!-- The "Moat" Firewall -->
  <rect x="180" y="100" width="40" height="280" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
  <text x="200" y="240" fill="#fca5a5" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle" transform="rotate(-90, 200, 240)">Perimeter Firewall / VPN</text>

  <!-- Outside Users -->
  <circle cx="80" cy="150" r="15" fill="#334155" stroke="#94a3b8"/>
  <text x="80" y="180" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">External Hacker</text>
  <path d="M 100 150 L 170 150" stroke="#ef4444" stroke-width="3" fill="none" marker-end="url(#arrowZT)"/>

  <!-- Inside the Network -->
  <rect x="250" y="100" width="110" height="280" fill="#064e3b" rx="8" opacity="0.3"/>
  <text x="305" y="120" fill="#6ee7b7" font-size="10" font-family="sans-serif" text-anchor="middle">"Trusted internal network"</text>

  <!-- Compromised App moving laterally -->
  <rect x="270" y="150" width="70" height="40" fill="#ef4444" rx="4"/>
  <text x="305" y="175" fill="#fff" font-size="12" font-family="sans-serif" text-anchor="middle">Hacked Svc</text>

  <!-- Database -->
  <rect x="270" y="280" width="70" height="60" fill="#1d4ed8" rx="6"/>
  <text x="305" y="315" fill="#fff" font-size="12" font-family="sans-serif" text-anchor="middle">Database</text>

  <!-- Lateral Movement (The problem) -->
  <path d="M 305 200 L 305 270" stroke="#ef4444" stroke-width="4" fill="none" marker-end="url(#arrowZT)" stroke-dasharray="6"/>
  <text x="255" y="240" fill="#fca5a5" font-size="10" font-family="sans-serif" font-weight="bold" transform="rotate(-90, 255, 240)">Lateral Movement</text>
  <text x="200" y="405" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">"Once you breach the firewall, everything is wide open."</text>

  <!-- Divider -->
  <line x1="400" y1="20" x2="400" y2="430" stroke="#334155" stroke-width="3" stroke-dasharray="10"/>

  <!-- Right Side: Zero Trust Architecture -->
  <rect x="420" y="40" width="360" height="380" fill="url(#cloudGrad)" rx="12" stroke="#3b82f6" stroke-width="2"/>
  <text x="600" y="70" fill="#f8fafc" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Modern: Zero Trust Architecture</text>

  <!-- Policy Decision Point (Centralized Auth) -->
  <rect x="500" y="100" width="200" height="50" fill="#6366f1" rx="8" stroke="#818cf8"/>
  <text x="600" y="120" fill="#fff" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Policy Decision Point (PDP)</text>
  <text x="600" y="135" fill="#c7d2fe" font-size="10" font-family="sans-serif" text-anchor="middle">(Verify Identity & Device Posture)</text>

  <!-- Microservice A -->
  <rect x="460" y="200" width="100" height="60" fill="#1e293b" rx="6" stroke="#475569"/>
  <!-- Micro-perimeter (Proxy) -->
  <rect x="455" y="195" width="110" height="70" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4" rx="8"/>
  <text x="510" y="225" fill="#cbd5e1" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Frontend</text>
  <text x="510" y="240" fill="#a7f3d0" font-size="9" font-family="monospace" text-anchor="middle">mTLS Proxy</text>

  <!-- Microservice B (DB) -->
  <rect x="640" y="280" width="100" height="60" fill="#1e293b" rx="6" stroke="#475569"/>
  <!-- Micro-perimeter (Proxy) -->
  <rect x="635" y="275" width="110" height="70" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4" rx="8"/>
  <text x="690" y="305" fill="#cbd5e1" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Database</text>
  <text x="690" y="320" fill="#a7f3d0" font-size="9" font-family="monospace" text-anchor="middle">mTLS Proxy</text>

  <!-- External User -->
  <circle cx="460" cy="130" r="15" fill="#334155" stroke="#94a3b8"/>
  
  <!-- Interactions -->
  <path d="M 460 150 L 460 185" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrowZTOk)"/>
  
  <path d="M 520 265 L 630 295" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowZTOk)"/>
  <text x="560" y="275" fill="#6ee7b7" font-size="10" font-weight="bold" font-family="monospace" transform="rotate(15, 560, 275)">Mutually Auth TLS</text>

  <!-- Constant verification lines to PDP -->
  <path d="M 500 195 L 530 155" stroke="#818cf8" stroke-width="1" stroke-dasharray="2" fill="none"/>
  <path d="M 690 270 L 630 155" stroke="#818cf8" stroke-width="1" stroke-dasharray="2" fill="none"/>
  <text x="670" y="195" fill="#a5b4fc" font-size="9" font-family="sans-serif" text-anchor="middle">Continuous Auth</text>

  <text x="600" y="380" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">"Never Trust, Always Verify."</text>
  <text x="600" y="395" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">Every single component generates its own</text>
  <text x="600" y="410" fill="#cbd5e1" font-size="11" font-family="sans-serif" text-anchor="middle">micro-boundary, even inside the same building.</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'The Demise of the Perimeter',
      description: 'In the past, accessing an internal database required being on physical corporate Wi-Fi or connected to a VPN. If an attacker got past the VPN (via a phishing attack), they had carte blanche access to the entire internal network to move laterally and steal databases. The cloud, remote work, and BYOD (Bring Your Own Device) have effectively eroded the concept of a "trusted internal network".'
    },
    {
      title: 'Never Trust, Always Verify',
      description: 'Zero Trust assumes the network is perpetually hostile. An API call originating from an internal office machine is treated exactly the same as an API call originating from a public coffee shop. Both are denied by default. Every single request, regardless of origin, must carry strong cryptographic proof of identity and authority.'
    },
    {
      title: 'Mutual TLS (mTLS) Everywhere',
      description: 'In conventional web architecture, only the client verifies the server (HTTPS). In Zero Trust microservices, mTLS is mandated. Service A must present a cryptographically signed certificate to prove it is Service A, AND Service B must present a certificate to prove it is Service B before a single byte of application data is transmitted over the internal network. Service Meshes (like Istio) handle this transparently.'
    },
    {
      title: 'Device Posture and Context',
      description: 'Authentication is not just username and password. The Policy Decision Point analyzes context in real time: Is the user accessing from an unusual geographic location? Is the corporate laptop lacking the latest OS security patch? If the device posture is weak, access to sensitive systems is denied, even if the password is correct.'
    }
  ],
  comparisonTable: {
    headers: ['Security Paradigm', 'Network Assumption', 'Access Control', 'Microservice Auth'],
    rows: [
      ['Traditional Perimeter (Castle/Moat)', 'Internal = Safe, External = Unsafe', 'Verified once at the VPN / Gateway boundary', 'Relying on internal IP ranges (Implicit Trust)'],
      ['Zero Trust Architecture', 'All networks are breached/hostile', 'Continuously verified per-request, assessing device posture', 'Requires cryptographic mTLS certificates between every node']
    ]
  },
  pitfalls: [
    'Adding to Legacy Applications: Simply slapping a new IAM (Identity Access Management) provider on top of a 20-year-old monolithic database does not create "Zero Trust". The applications themselves must be refactored to consume fine-grained tokens rather than trusting static IPs.',
    'User Friction: If misconfigured (e.g., forcing a user to do SMS 2FA for every single action), Zero Trust architectures become incredibly disruptive to company productivity. Context-aware AI analysis (invisible background checks) is crucial to offset MFA fatigue.',
    'Complexity in Operations: Securing every single internal microservice endpoint radically increases configuration overhead. Without automation (Infrastructure as Code and Service Meshes), rotating thousands of internal X.509 certificates manually guarantees a catastrophic system outage.'
  ]
};
