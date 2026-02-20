import type { TopicContent } from '../topicContent';

export const topologicalSortKahn: TopicContent = {
  title: "Topological Sort / Kahn's",
  description:
    'Topological sort orders DAG vertices so every edge `u -> v` places `u` before `v`. Kahn algorithm performs this by repeatedly scheduling nodes with zero indegree.',
  example:
    'Course scheduling: if prerequisite graph has a topological order, all courses can be completed.',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V)'
  },
  approaches: [
    {
      title: 'Brute Force (Repeated Prerequisite Scans)',
      content:
        'Repeatedly scan all nodes and schedule whichever currently has all prerequisites done.\n\nStep-by-step mechanics:\n1. Track scheduled nodes in `done`.\n2. In each pass, scan all nodes and check prerequisite satisfaction.\n3. Add newly eligible nodes to answer.\n4. If one full pass adds nothing, a cycle prevents completion.\n\n```python\nfunction topoBrute(nodes, prereq):\n    order = []\n    done = set()\n\n    while len(done) < len(nodes):\n        progressed = False\n\n        for u in nodes:\n            if u in done:\n                continue\n\n            if all(p in done for p in prereq[u]):\n                done.add(u)\n                order.append(u)\n                progressed = True\n\n        if not progressed:\n            return []\n\n    return order\n```\n\nThis is conceptually simple but repeatedly rescans prerequisites, causing avoidable overhead.',
      complexity: {
        time: 'O(V^2 + E)',
        space: 'O(V)'
      }
    },
    {
      title: "Optimal Approach (Kahn's Algorithm)",
      content:
        'Maintain indegree as dependency count and release nodes when their count reaches zero.\n\nStep-by-step mechanics:\n1. Build adjacency list and indegree array.\n2. Initialize queue with all vertices where indegree is `0`.\n3. Pop one node, append to order.\n4. For every outgoing edge `u -> v`, decrement `indegree[v]`.\n5. If `indegree[v]` hits `0`, enqueue `v`.\n6. After processing, if order length is less than `n`, a cycle exists.\n\n```python\nfrom collections import deque\n\nfunction kahnTopo(adj, n):\n    indeg = [0] * n\n\n    for u in range(0, n):\n        for v in adj[u]:\n            indeg[v] += 1\n\n    q = deque()\n    for u in range(0, n):\n        if indeg[u] == 0:\n            q.append(u)\n\n    order = []\n\n    while q:\n        u = q.popleft()\n        order.append(u)\n\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                q.append(v)\n\n    if len(order) != n:\n        return []\n\n    return order\n```\n\nWhy this works:\nA vertex is emitted only after all incoming constraints are removed. Cycles preserve positive indegree for remaining cycle nodes, so full ordering is impossible and detected naturally.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    },
    {
      title: 'Alternative Optimal (DFS Postorder)',
      content:
        'Topological order can also be built by DFS finishing times.\n\nStep-by-step mechanics:\n1. Use colors: `0 = unvisited`, `1 = visiting`, `2 = done`.\n2. DFS each node.\n3. On entering node, mark visiting.\n4. DFS all neighbors.\n5. If visiting neighbor is seen, cycle exists.\n6. On exit, mark done and append node to list.\n7. Reverse final list for topological order.\n\n```python\nfunction topoDfs(adj, n):\n    state = [0] * n\n    post = []\n    hasCycle = False\n\n    function dfs(u):\n        nonlocal hasCycle\n        state[u] = 1\n\n        for v in adj[u]:\n            if state[v] == 0:\n                dfs(v)\n            elif state[v] == 1:\n                hasCycle = True\n\n        state[u] = 2\n        post.append(u)\n\n    for u in range(0, n):\n        if state[u] == 0:\n            dfs(u)\n\n    if hasCycle:\n        return []\n\n    post.reverse()\n    return post\n```\n\nWhy this is useful:\nDFS approach naturally integrates cycle detection and is often convenient when recursion-based graph tooling already exists.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Topological sorting applies only to DAGs; cycles invalidate full ordering.',
    'Incorrect edge direction in graph build reverses dependency semantics.',
    'For deterministic order requirements, use priority queue instead of plain queue.',
    'Failing to include isolated nodes (no edges) causes incomplete ordering.',
    'For DFS variant, forgetting recursion-stack state leads to missed cycle detection.'
  ],
  concepts: [
    {
      name: 'Indegree as Readiness Metric',
      details:
        'Zero indegree means no unresolved prerequisites, so node is ready to schedule.'
    },
    {
      name: 'Cycle Detection by Exhaustion',
      details:
        'If nodes remain with positive indegree after processing, graph contains a cycle.'
    },
    {
      name: 'Dependency Release',
      details:
        'Processing one node removes constraints on downstream nodes by decreasing their indegree.'
    },
    {
      name: 'Multiple Valid Orders',
      details:
        'A DAG can have many valid topological orders; uniqueness is not guaranteed unless constraints enforce it.'
    }
  ]
};
