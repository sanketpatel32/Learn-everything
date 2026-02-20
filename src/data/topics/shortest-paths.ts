import type { TopicContent } from '../topicContent';

export const shortestPaths: TopicContent = {
  title: 'Shortest Paths (Dijkstra, Bellman-Ford)',
  description:
    'Shortest path strategy depends on edge constraints. Dijkstra is optimal for non-negative edges, while Bellman-Ford handles negative weights and can detect negative cycles.',
  example:
    'Given weighted graph from source `s`, compute minimum distance to every node.',
  complexity: {
    time: 'Dijkstra O((V+E) log V), Bellman-Ford O(V*E)',
    space: 'O(V)'
  },
  approaches: [
    {
      title: 'Brute Force (All-path Enumeration)',
      content:
        'Enumerate all simple source-to-target paths and track minimum cost.\n\nStep-by-step mechanics:\n1. DFS from source.\n2. Keep running path cost.\n3. Avoid revisiting nodes in current path to prevent immediate cycles.\n4. Update global minimum on reaching target.\n\n```python\nfunction shortestPathBrute(u, target, cost):\n    if u == target:\n        best = min(best, cost)\n        return\n\n    for (v, w) in graph[u]:\n        if v not in pathVisited:\n            pathVisited.add(v)\n            shortestPathBrute(v, target, cost + w)\n            pathVisited.remove(v)\n```\n\nThis is generally impractical because number of simple paths can be exponential.',
      complexity: {
        time: 'Exponential in path count',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Dijkstra or Bellman-Ford)',
      content:
        'Pick algorithm based on graph properties.\n\nStep-by-step mechanics for Dijkstra (non-negative edges):\n1. Set `dist[src] = 0`, others `INF`.\n2. Use min-priority queue of `(distance, node)`.\n3. Pop smallest candidate.\n4. If stale entry (`d > dist[u]`), skip.\n5. Relax each edge `u -> v`.\n\n```python\nfunction dijkstra(graph, n, src):\n    dist = [INF] * n\n    dist[src] = 0\n    pq = [(0, src)]\n\n    while pq:\n        d, u = heappop(pq)\n        if d > dist[u]:\n            continue\n\n        for (v, w) in graph[u]:\n            nd = d + w\n            if nd < dist[v]:\n                dist[v] = nd\n                heappush(pq, (nd, v))\n\n    return dist\n```\n\nStep-by-step mechanics for Bellman-Ford (negative edges allowed):\n1. Initialize distances similarly.\n2. Relax all edges `V - 1` times.\n3. One extra pass checks if any distance can still be improved.\n4. If improved, negative cycle is reachable.\n\n```python\nfunction bellmanFord(edges, n, src):\n    dist = [INF] * n\n    dist[src] = 0\n\n    for _ in range(0, n - 1):\n        changed = False\n        for (u, v, w) in edges:\n            if dist[u] != INF and dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                changed = True\n        if not changed:\n            break\n\n    for (u, v, w) in edges:\n        if dist[u] != INF and dist[u] + w < dist[v]:\n            return None  # negative cycle detected\n\n    return dist\n```\n\nWhy this works:\n- Dijkstra relies on non-negative edge weights to safely finalize closest unsettled node.\n- Bellman-Ford repeatedly propagates relaxations; if improvement persists after `V-1` rounds, cycle negativity is the only cause.',
      complexity: {
        time: 'Depends on algorithm and graph density',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Running Dijkstra on graphs with negative edge weights produces invalid results.',
    'For Bellman-Ford, missing the final cycle-check pass hides negative cycles.',
    'Using adjacency matrix on sparse graphs wastes memory and time.',
    'Not guarding `INF` before relaxation can cause overflow in fixed-width languages.'
  ],
  concepts: [
    {
      name: 'Edge Relaxation',
      details:
        'Core operation: if path through `u` improves `dist[v]`, update it.'
    },
    {
      name: 'Constraint-driven Algorithm Choice',
      details:
        'Graph properties (negative edges, density, source count) determine the right shortest-path strategy.'
    },
    {
      name: 'Greedy Finalization vs Iterative Relaxation',
      details:
        'Dijkstra finalizes distances greedily; Bellman-Ford converges through repeated global edge relaxations.'
    }
  ]
};
