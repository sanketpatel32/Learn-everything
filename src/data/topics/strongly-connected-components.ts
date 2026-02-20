import type { TopicContent } from '../topicContent';

export const stronglyConnectedComponents: TopicContent = {
  title: 'Strongly Connected (Tarjan/Kosaraju)',
  description:
    'A strongly connected component (SCC) in a directed graph is a maximal vertex set with mutual reachability. SCC decomposition is fundamental for cycle condensation, dependency analysis, and many directed-graph optimizations.',
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
        'Naive SCC detection repeatedly checks mutual reachability.\n\nStep-by-step mechanics:\n1. For each node, compute reachable vertices via DFS or BFS.\n2. Two nodes are in same SCC if each can reach the other.\n3. Group by this mutual-reachability relation.\n\n```python\nfunction mutuallyReachable(u, v, graph):\n    return canReach(u, v, graph) and canReach(v, u, graph)\n```\n\nCorrect but expensive due to repeated traversals over overlapping subgraphs.',
      complexity: {
        time: 'O(V * (V + E)) or worse',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Kosaraju / Tarjan)',
      content:
        'Use linear-time DFS decomposition. Kosaraju is usually easiest to implement correctly.\n\nStep-by-step mechanics for Kosaraju:\n1. DFS on original graph and push nodes by finish time.\n2. Reverse all edges to create transpose graph.\n3. Pop nodes in reverse finish order.\n4. DFS on transpose from each unvisited popped node gives one SCC.\n\n```python\nfunction kosaraju(adj, n):\n    visited = [False] * n\n    order = []\n\n    def dfs1(u):\n        visited[u] = True\n        for v in adj[u]:\n            if not visited[v]:\n                dfs1(v)\n        order.append(u)\n\n    for u in range(0, n):\n        if not visited[u]:\n            dfs1(u)\n\n    radj = reverseGraph(adj, n)\n    visited = [False] * n\n    sccs = []\n\n    def dfs2(u, comp):\n        visited[u] = True\n        comp.append(u)\n        for v in radj[u]:\n            if not visited[v]:\n                dfs2(v, comp)\n\n    while order:\n        u = order.pop()\n        if not visited[u]:\n            comp = []\n            dfs2(u, comp)\n            sccs.append(comp)\n\n    return sccs\n```\n\nWhy this works:\nReverse-finish processing ensures each second-pass DFS starts at SCC entry points in condensation order, capturing exactly one SCC per DFS.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V + E)'
      }
    },
    {
      title: 'Advanced Approach (Tarjan Single-pass Low-link)',
      content:
        'Tarjan finds SCCs in one DFS pass using discovery indices and low-link values.\n\nStep-by-step mechanics:\n1. Assign each node discovery index when first visited.\n2. Maintain stack of active DFS path nodes.\n3. Compute `low[u]`: smallest discovery index reachable from `u` including back edges to active nodes.\n4. If `low[u] == disc[u]`, `u` is SCC root; pop stack until `u`.\n\n```python\nfunction tarjan(adj, n):\n    disc = [-1] * n\n    low = [0] * n\n    inStack = [False] * n\n    st = []\n    timer = 0\n    sccs = []\n\n    def dfs(u):\n        nonlocal timer\n        disc[u] = timer\n        low[u] = timer\n        timer += 1\n\n        st.append(u)\n        inStack[u] = True\n\n        for v in adj[u]:\n            if disc[v] == -1:\n                dfs(v)\n                low[u] = min(low[u], low[v])\n            elif inStack[v]:\n                low[u] = min(low[u], disc[v])\n\n        if low[u] == disc[u]:\n            comp = []\n            while True:\n                x = st.pop()\n                inStack[x] = False\n                comp.append(x)\n                if x == u:\n                    break\n            sccs.append(comp)\n\n    for u in range(0, n):\n        if disc[u] == -1:\n            dfs(u)\n\n    return sccs\n```\n\nWhy this matters:\nTarjan avoids transpose construction and provides SCC decomposition in a single traversal.',
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
    'For very deep graphs, recursion depth can become a practical runtime issue.',
    'In Tarjan, back-edge low-link updates must only use nodes currently in stack.'
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
    },
    {
      name: 'Root Criterion',
      details:
        'In Tarjan, a node with `low[u] == disc[u]` identifies the root boundary of one SCC in DFS stack.'
    }
  ]
};
