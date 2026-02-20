import type { TopicContent } from '../topicContent';

export const stronglyConnectedComponents: TopicContent = {
  title: 'Strongly Connected (Tarjan/Kosaraju)',
  description:
    'A strongly connected component (SCC) in a directed graph is a maximal set of nodes where each node can reach every other node.',
  example:
    'In graph with cycles `0->1->2->0` and `3->4->3`, SCCs are `{0,1,2}` and `{3,4}`.',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V + E)'
  },
  approaches: [
    {
      title: 'Brute Force (Reachability for Every Pair)',
      content:
        'A naive method checks mutual reachability between nodes and groups accordingly.\n\nStep-by-step mechanics:\n1. For each node `u`, run DFS/BFS to find reachable nodes.\n2. For node pair `(u, v)`, if `u` reaches `v` and `v` reaches `u`, they belong to same SCC.\n3. Build components from these relations.\n\n```python\nfunction mutuallyReachable(u, v, graph):\n    return canReach(u, v, graph) and canReach(v, u, graph)\n```\n\nThis causes many repeated traversals and scales poorly.',
      complexity: {
        time: 'O(V * (V + E)) or worse',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Kosaraju / Tarjan)',
      content:
        'Use linear-time SCC algorithms built on DFS structure.\n\nStep-by-step mechanics for Kosaraju:\n1. DFS original graph and push nodes by finish time.\n2. Reverse all edges to build transpose graph.\n3. Pop nodes in reverse finish order; DFS on transpose.\n4. Each DFS tree in step 3 is one SCC.\n\n```python\nfunction kosaraju(adj, n):\n    visited = [False] * n\n    order = []\n\n    def dfs1(u):\n        visited[u] = True\n        for v in adj[u]:\n            if not visited[v]:\n                dfs1(v)\n        order.append(u)\n\n    for u in range(0, n):\n        if not visited[u]:\n            dfs1(u)\n\n    radj = reverseGraph(adj, n)\n    visited = [False] * n\n    sccs = []\n\n    while order:\n        u = order.pop()\n        if not visited[u]:\n            comp = []\n            dfs2(u, radj, visited, comp)\n            sccs.append(comp)\n\n    return sccs\n```\n\nWhy this works:\nFinish-time ordering isolates source components in transpose graph, allowing SCC extraction in linear passes.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      }
    }
  ],
  pitfalls: [
    'Treating SCC logic as undirected connectivity gives wrong components.',
    'In Kosaraju, processing order must be reverse finish order from first DFS.',
    'Tarjan implementations frequently break due to incorrect low-link updates.'
  ],
  concepts: [
    {
      name: 'Condensation DAG',
      details:
        'Collapsing each SCC into one node forms a DAG, which is useful for higher-level graph reasoning.'
    },
    {
      name: 'Low-link and Finish-time Theory',
      details:
        'SCC algorithms exploit DFS timestamps and ancestor reachability invariants.'
    }
  ]
};
