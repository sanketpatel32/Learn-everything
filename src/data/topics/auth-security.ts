import { TopicContent } from '../topicContent';

export const authSecurity: TopicContent = {
  title: 'Authentication (OAuth2, OIDC, JWT)',
  description: 'In modern distributed applications, security involves three distinct concepts: Identity (who are you?), Authentication (verifying who you are), and Authorization (what are you allowed to do?). Relying on traditional server-side sessions breaks down in stateless microservices and SPAs. We rely on JWTs (JSON Web Tokens) and delegated authorization protocols like OAuth 2.0.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="authzGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="resourceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowAuth" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User / Resource Owner -->
  <circle cx="100" cy="100" r="25" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="100" cy="90" r="10" fill="#cbd5e1"/>
  <path d="M 85 115 q 15 -15 30 0" stroke="#cbd5e1" stroke-width="15" fill="none" stroke-linecap="round"/>
  <text x="100" y="145" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Resource Owner</text>
  <text x="100" y="160" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">(The User)</text>

  <!-- Client Application -->
  <rect x="40" y="240" width="120" height="100" fill="url(#clientGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="100" y="280" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Client App</text>
  <text x="100" y="295" fill="#bfdbfe" font-size="10" font-family="sans-serif" text-anchor="middle">(React SPA or Mobile)</text>
  <text x="100" y="315" fill="#bfdbfe" font-size="10" font-family="monospace" text-anchor="middle">Needs Access to API</text>

  <!-- Authorization Server (Okta/Auth0) -->
  <rect x="340" y="60" width="160" height="100" fill="url(#authzGrad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="420" y="95" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Authorization</text>
  <text x="420" y="115" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Server (IdP)</text>
  <text x="420" y="135" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">Auth0, Keycloak, Okta</text>

  <!-- Resource Server (API) -->
  <rect x="580" y="240" width="180" height="100" fill="url(#resourceGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="670" y="280" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Resource Server</text>
  <text x="670" y="295" fill="#a7f3d0" font-size="10" font-family="sans-serif" text-anchor="middle">(Microservices API)</text>
  <text x="670" y="315" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Validates Cryptographic JWT</text>


  <!-- OAuth2 Flow Operations -->
  <!-- 1. Auth Request -->
  <path d="M 160 260 L 330 140" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowAuth)"/>
  <rect x="220" y="180" width="20" height="20" fill="#334155" rx="10"/>
  <text x="230" y="194" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">1</text>
  <text x="180" y="170" fill="#cbd5e1" font-size="10" font-family="sans-serif">Redirect to Auth Server</text>

  <!-- 2. User logs in & grants consent -->
  <path d="M 130 100 L 330 100" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowAuth)"/>
  <rect x="230" y="90" width="20" height="20" fill="#334155" rx="10"/>
  <text x="240" y="104" fill="#fbbf24" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">2</text>
  <text x="150" y="80" fill="#cbd5e1" font-size="10" font-family="sans-serif">User Logs In & Consents</text>

  <!-- 3. Auth Server returns Tokens to Client -->
  <path d="M 350 160 L 160 290" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowAuth)"/>
  <rect x="220" y="225" width="20" height="20" fill="#334155" rx="10"/>
  <text x="230" y="239" fill="#f8fafc" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">3</text>
  <text x="260" y="235" fill="#fbbf24" font-size="11" font-weight="bold" font-family="monospace">Return Access Token (JWT)</text>

  <!-- 4. Client accesses API with Token -->
  <path d="M 160 310 L 570 310" stroke="#34d399" stroke-width="4" fill="none" marker-end="url(#arrowAuth)"/>
  <rect x="390" y="300" width="20" height="20" fill="#1e293b" rx="10" stroke="#34d399"/>
  <text x="400" y="314" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">4</text>
  <text x="300" y="350" fill="#6ee7b7" font-size="12" font-weight="bold" font-family="sans-serif">GET /api/data  [Header: Auth Bearer &lt;JWT&gt;]</text>

  <!-- Anatomy of JWT -->
  <rect x="200" y="370" width="400" height="60" fill="#0f172a" rx="6" stroke="#fbbf24" stroke-width="2" stroke-dasharray="2"/>
  <text x="400" y="390" fill="#fde68a" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Anatomy of a JWT (Stateless Verification)</text>
  <text x="400" y="410" fill="#e2e8f0" font-size="14" font-family="monospace" text-anchor="middle">
     <tspan fill="#ef4444">Header</tspan>.<tspan fill="#a855f7">Payload (sub, role, exp)</tspan>.<tspan fill="#10b981">Signature (RSA/HMAC)</tspan>
  </text>
</svg>
  `,
  keyPoints: [
    {
      title: 'Stateful Sessions vs Stateless Tokens',
      description: 'Traditionally, servers stored a `SESSION_ID` in memory or Redis and issued a cookie. In heavily scaled microservices, routing a user back to the exact server that holds their session in memory is difficult, and DB lookups for every request add latency. Modern architectures use stateless authentication, where the client holds the cryptographically signed proof of identity.'
    },
    {
      title: 'JSON Web Tokens (JWT)',
      description: 'A JWT is a Base64-encoded JSON payload (e.g. `{"userId": 5, "role": "admin", "exp": 1690000}`) strictly signed with a cryptographic secret or PKI private key. When the Client sends this to the Resource Server as a Bearer token, the server runs a math operation to verify the signature. If it matches, the payload is trusted implicitly. NO database lookup is required to verify the user.'
    },
    {
      title: 'OAuth 2.0 (Delegated Authorization)',
      description: 'OAuth2 is not an authentication protocol, it is an authorization framework. It allows an application (Spotify) to access resources from another application (Facebook) on behalf of a user, WITHOUT the user giving Spotify their Facebook password. It issues Access Tokens with specifically scoped permissions.'
    },
    {
      title: 'OpenID Connect (OIDC)',
      description: 'Since OAuth2 only issues Access Tokens (which just say "this app has permission X"), it provides no information about WHO the user actually is. OIDC is a layer built on top of OAuth2 that issues an `id_token` (always a JWT) containing profile information (Email, Name) providing true authentication.'
    }
  ],
  comparisonTable: {
    headers: ['Concept', 'Primary Purpose', 'Artifact Exchanged', 'Common Analogy'],
    rows: [
      ['Authentication (OIDC)', 'Proving identity (Who are you?)', 'ID Token (JWT)', 'A Passport (proves you are a citizen)'],
      ['Authorization (OAuth2)', 'Granting access (What can you do?)', 'Access Token (Opaque or JWT)', 'A Hotel Keycard (access to Room 402)'],
      ['SAML (Enterprise)', 'SSO for corporate environments', 'XML Assertions', 'A corporate badge scanning system']
    ]
  },
  pitfalls: [
    'Assuming JWTs are encrypted: The payload of a JWT is strictly Base64 encoded for transmission, NOT encrypted. Erroneously putting an SSN or plaintext password in a JWT payload means anyone with a web browser can read it.',
    'No Revocation Strategy: Because JWT verification happens locally, if a hacker steals a valid JWT, you cannot invalidate it with a DB switch. You must implement short token lifetimes (15 mins) combined with Refresh Tokens, or maintain a centralized Redis blocklist, which defeats the stateless benefit of JWTs.',
    'Storing JWTs in LocalStorage: This is extremely vulnerable to XSS (Cross-Site Scripting) attacks where malevolent JS reads the token. Browser clients should ideally use `HttpOnly`, `Secure`, `SameSite` cookies.'
  ]
};
