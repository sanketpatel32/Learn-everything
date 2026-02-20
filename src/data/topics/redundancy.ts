import { TopicContent } from '../topicContent';

export const redundancy: TopicContent = {
  title: 'Redundancy (Active-Passive vs Active-Active)',
  description: 'Redundancy is the duplication of critical components to increase system reliability. When a component fails, the redundant component takes over, minimizing or eliminating downtime. The two primary strategies for redundancy are Active-Passive and Active-Active.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="passiveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>
    <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
    </marker>
    <marker id="arrowHeartbeat" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
    </marker>
  </defs>

  <!-- Left Side: Active-Passive -->
  <g transform="translate(20, 20)">
    <rect x="0" y="0" width="360" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Active-Passive</text>
    <text x="180" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Failover Architecture</text>

    <!-- Load Balancer -->
    <rect x="130" y="100" width="100" height="40" fill="#334155" stroke="#f8fafc" rx="8"/>
    <text x="180" y="125" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Load Balancer</text>

    <!-- Client Traffic -->
    <path d="M 180 50 L 180 95" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
    <text x="210" y="80" fill="#94a3b8" font-size="12" font-family="sans-serif">Traffic</text>

    <!-- Active Node -->
    <rect x="50" y="200" width="100" height="60" fill="url(#activeGrad)" rx="8" shadow="true"/>
    <text x="100" y="235" fill="#fff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Active</text>
    
    <!-- Passive Node -->
    <rect x="210" y="200" width="100" height="60" fill="url(#passiveGrad)" rx="8"/>
    <text x="260" y="225" fill="#cbd5e1" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Passive</text>
    <text x="260" y="245" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">(Standby)</text>

    <!-- Routing Lines -->
    <path d="M 160 140 L 100 195" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
    <path d="M 200 140 L 260 195" stroke="#475569" stroke-dasharray="4 4" stroke-width="2" fill="none"/>
    <text x="260" y="170" fill="#94a3b8" font-size="12" font-family="sans-serif" text-anchor="middle">No Traffic</text>

    <!-- Heartbeat -->
    <path d="M 100 280 C 100 320, 260 320, 260 280" stroke="#f43f5e" stroke-dasharray="6 4" stroke-width="2" fill="none" marker-end="url(#arrowHeartbeat)"/>
    <text x="180" y="325" fill="#f43f5e" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Heartbeat Link</text>
    
    <!-- Explanation -->
    <text x="180" y="370" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">If Active fails, Passive promotes itself</text>
  </g>

  <!-- Right Side: Active-Active -->
  <g transform="translate(420, 20)">
    <rect x="0" y="0" width="360" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>
    <text x="180" y="40" fill="#f8fafc" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle">Active-Active</text>
    <text x="180" y="65" fill="#94a3b8" font-size="13" font-family="sans-serif" text-anchor="middle">Distributed Architecture</text>

    <!-- Load Balancer -->
    <rect x="130" y="100" width="100" height="40" fill="#334155" stroke="#f8fafc" rx="8"/>
    <text x="180" y="125" fill="#f8fafc" font-size="14" font-weight="bold" font-family="sans-serif" text-anchor="middle">Load Balancer</text>

    <!-- Client Traffic -->
    <path d="M 180 50 L 180 95" stroke="#f8fafc" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
    <text x="210" y="80" fill="#94a3b8" font-size="12" font-family="sans-serif">Traffic</text>

    <!-- Active Node 1 -->
    <rect x="50" y="200" width="100" height="60" fill="url(#activeGrad)" rx="8" shadow="true"/>
    <text x="100" y="235" fill="#fff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Active A</text>
    
    <!-- Active Node 2 -->
    <rect x="210" y="200" width="100" height="60" fill="url(#activeGrad)" rx="8" shadow="true"/>
    <text x="260" y="235" fill="#fff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">Active B</text>

    <!-- Routing Lines -->
    <path d="M 160 140 L 100 195" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
    <path d="M 200 140 L 260 195" stroke="#10b981" stroke-width="3" fill="none" marker-end="url(#arrowR)"/>
    <text x="100" y="170" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">50%</text>
    <text x="260" y="170" fill="#34d399" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">50%</text>

    <!-- Sync Link -->
    <path d="M 100 280 C 100 320, 260 320, 260 280" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <path d="M 260 280 C 260 320, 100 320, 100 280" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <path d="M 100 280 L 110 275 L 110 285 Z" fill="#3b82f6"/>
    <path d="M 260 280 L 250 275 L 250 285 Z" fill="#3b82f6"/>
    <text x="180" y="325" fill="#60a5fa" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle">Bidirectional Sync</text>
    
    <!-- Explanation -->
    <text x="180" y="370" fill="#94a3b8" font-size="11" font-family="sans-serif" text-anchor="middle">Both process traffic; complex state sync required</text>
  </g>
</svg>
  `,
  keyPoints: [
    {
      title: 'Active-Passive (Failover)',
      description: 'In an Active-Passive setup, one identical server (the Active node) handles 100% of the live traffic. The second server (the Passive node) sits completely idle in standby mode. The Passive server continuously monitors the health of the Active server via a low-level network connection called a **Heartbeat**. If the heartbeat drops, indicating the Active server died, the Passive server immediately commandeers the primary IP address and begins serving traffic.'
    },
    {
      title: 'Active-Active',
      description: 'In an Active-Active setup, two or more identical servers process live traffic simultaneously. A Load Balancer distributes requests evenly among them. Since all nodes are mutating state, they must continuously synchronize their data (Bidirectional Sync) to avoid collisions and data loss. This maximizes hardware utilization (no idle servers) but drastically increases architectural complexity.'
    },
    {
      title: 'The Database Factor',
      description: 'While web servers are easily deployed as Active-Active (since they are stateless), databases are notoriously difficult to configure this way due to write conflicts. Database clusters usually default to Active-Passive (Leader-Follower replication), where writes only go to the Active leader, but reads can be distributed to Passive replicas.'
    }
  ],
  comparisonTable: {
    headers: ['Attribute', 'Active-Passive', 'Active-Active'],
    rows: [
      ['Hardware Utilization', 'Poor. 50% of your expensive hardware sits idle.', 'Excellent. 100% of resources are actively processing traffic.'],
      ['Configuration Complexity', 'Simple. No risk of state collisions or split-brain scenarios.', 'Extremely Complex. Requires robust bidirectional state synchronization.'],
      ['Failover Time', 'Moderate. Takes seconds to minutes for the Passive node to boot up, take over the IP, and warm caches.', 'Instant (Zero downtime). If Node A dies, the LB simply routes 100% of traffic to Node B.'],
      ['Cost', 'Paying for hardware that does nothing until disaster strikes.', 'High ROI, but higher engineering/maintenance costs.'],
      ['Primary Use Case', 'Database Leaders, Legacy Stateful Apps', 'Stateless Web Servers, Microservices']
    ]
  },
  pitfalls: [
    'Split-Brain Syndrome in Active-Passive: If the heartbeat network cord gets cut, but both servers are actually still alive, the Passive server assumes the Active one is dead and promotes itself. Now you have TWO "Active" nodes blindly overwriting the database without syncing.',
    'Under-provisioning Active-Active: If you run two Active-Active nodes at 80% CPU utilization, and one node dies, the remaining node cannot absorb 160% traffic. It will melt down immediately (Cascading Failure). You must run Active-Active nodes at <50% utilization for safe failover.'
  ]
};
