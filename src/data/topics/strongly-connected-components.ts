import type { TopicContent } from '../topicContent';

export const stronglyConnectedComponents: TopicContent = {
  title: 'Strongly Connected (Tarjan/Kosaraju)',
  description:
    'A strongly connected component (SCC) in a directed graph is a maximal set of vertices with mutual reachability. SCC decomposition is fundamental for cycle condensation and dependency analysis.',
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
        'Naive SCC detection checks mutual reachability for many node pairs.\n\nStep-by-step mechanics:\n1. For each node `u`, run graph traversal to compute reachable set.\n2. Two nodes are SCC-equivalent if each can reach the other.\n3. Group nodes by this equivalence relation.\n\n```python\nfunction mutuallyReachable(u, v, graph):\n    return canReach(u, v, graph) and canReach(v, u, graph)\n```\n\nCorrect in principle, but repeated traversals cause heavy redundancy.',
      complexity: {
        time: 'O(V * (V + E)) or worse',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Kosaraju / Tarjan)',
      content:
        'Use linear-time DFS-based SCC decomposition.\n\nStep-by-step mechanics for Kosaraju:\n1. DFS on original graph and push vertices by finish time.\n2. Build transpose graph with all edges reversed.\n3. Pop vertices in reverse finish order.\n4. DFS in transpose from each unvisited popped vertex forms one SCC.\n\n```python\nfunction kosaraju(adj, n):\n    visited = [False] * n\n    order = []\n\n    def dfs1(u):\n        visited[u] = True\n        for v in adj[u]:\n            if not visited[v]:\n                dfs1(v)\n        order.append(u)\n\n    for u in range(0, n):\n        if not visited[u]:\n            dfs1(u)\n\n    radj = reverseGraph(adj, n)\n    visited = [False] * n\n    sccs = []\n\n    def dfs2(u, comp):\n        visited[u] = True\n        comp.append(u)\n        for v in radj[u]:\n            if not visited[v]:\n                dfs2(v, comp)\n\n    while order:\n        u = order.pop()\n        if not visited[u]:\n            comp = []\n            dfs2(u, comp)\n            sccs.append(comp)\n\n    return sccs\n```\n\nTarjan alternative (single DFS pass):\n- Track discovery index, low-link value, and an active stack.\n- Root of SCC is found when `low[u] == disc[u]`.\n\nWhy this works:\nFinish order from first pass guarantees that DFS on transpose starts from component "sources" in SCC DAG, extracting one complete SCC at a time.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      }
    }
  ],
  pitfalls: [
    'Treating SCC logic as undirected connectivity gives wrong components.',
    'In Kosaraju, processing order must be reverse finish order from first DFS.',
    'Tarjan implementations frequently break due to incorrect low-link updates.',
    'For very deep graphs, recursion depth can become a practical runtime issue.'
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
    },
    {
      name: 'Component-level Reasoning',
      details:
        'SCC condensation reduces cyclic directed graphs into a DAG where many higher-level DP and scheduling techniques apply.'
    }
  ]
};
