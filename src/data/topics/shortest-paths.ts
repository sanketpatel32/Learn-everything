import type { TopicContent } from '../topicContent';

export const shortestPaths: TopicContent = {
  title: 'Shortest Paths (Dijkstra, Bellman-Ford)',
  description:
    'Shortest-path algorithm choice depends on edge constraints. Dijkstra is efficient for non-negative weights, while Bellman-Ford supports negative edges and detects reachable negative cycles.',
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
        'Try all simple paths and keep minimum cost.\n\nStep-by-step mechanics:\n1. DFS from source to target.\n2. Track current path cost.\n3. Prevent immediate cycles with path-level visited set.\n4. Update global best when target is reached.\n\n```python\nfunction shortestPathBrute(u, target, cost):\n    if u == target:\n        best = min(best, cost)\n        return\n\n    for (v, w) in graph[u]:\n        if v not in pathVisited:\n            pathVisited.add(v)\n            shortestPathBrute(v, target, cost + w)\n            pathVisited.remove(v)\n```\n\nThis is usually impractical because the count of simple paths can be exponential.',
      complexity: {
        time: 'Exponential in path count',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Dijkstra or Bellman-Ford)',
      content:
        'Choose algorithm from weight constraints.\n\nDijkstra (all edges non-negative):\n1. Initialize `dist[src] = 0`, others `INF`.\n2. Pop closest unsettled node from min-heap.\n3. Skip stale heap entries.\n4. Relax outgoing edges.\n\n```python\nfunction dijkstra(graph, n, src):\n    dist = [INF] * n\n    dist[src] = 0\n    pq = [(0, src)]\n\n    while pq:\n        d, u = heappop(pq)\n\n        if d > dist[u]:\n            continue\n\n        for (v, w) in graph[u]:\n            nd = d + w\n\n            if nd < dist[v]:\n                dist[v] = nd\n                heappush(pq, (nd, v))\n\n    return dist\n```\n\nBellman-Ford (negative edges allowed):\n1. Initialize distances.\n2. Relax all edges exactly `V - 1` times.\n3. Optional early stop if no update in one full round.\n4. Extra pass detects reachable negative cycles.\n\n```python\nfunction bellmanFord(edges, n, src):\n    dist = [INF] * n\n    dist[src] = 0\n\n    for _ in range(0, n - 1):\n        changed = False\n\n        for (u, v, w) in edges:\n            if dist[u] != INF and dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                changed = True\n\n        if not changed:\n            break\n\n    for (u, v, w) in edges:\n        if dist[u] != INF and dist[u] + w < dist[v]:\n            return None\n\n    return dist\n```\n\nWhy this works:\n- Dijkstra uses greedy finalization, which is valid only when no negative edge can later reduce finalized nodes.\n- Bellman-Ford converges by repeated relaxation; improvement after `V - 1` rounds implies a negative cycle.',
      complexity: {
        time: 'Depends on algorithm and graph density',
        space: 'O(V)'
      }
    },
    {
      title: 'Alternative for DAGs (Topological Relaxation)',
      content:
        'If graph is a DAG, shortest paths are computable in linear time even with negative edges.\n\nStep-by-step mechanics:\n1. Compute topological order of DAG.\n2. Initialize `dist[src] = 0` and others `INF`.\n3. Process vertices in topological order.\n4. Relax each outgoing edge once.\n\n```python\nfunction dagShortestPath(adj, topoOrder, src, n):\n    dist = [INF] * n\n    dist[src] = 0\n\n    for u in topoOrder:\n        if dist[u] == INF:\n            continue\n\n        for (v, w) in adj[u]:\n            dist[v] = min(dist[v], dist[u] + w)\n\n    return dist\n```\n\nWhy this is powerful:\nTopological order guarantees all incoming contributors of a node are finalized before the node is processed.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Running Dijkstra on graphs with negative edge weights produces invalid results.',
    'For Bellman-Ford, missing the final cycle-check pass hides negative cycles.',
    'Using adjacency matrix on sparse graphs wastes memory and time.',
    'Not guarding `INF` before relaxation can cause overflow in fixed-width languages.',
    'Confusing directed and undirected edge insertion can double-relax edges incorrectly.'
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
    },
    {
      name: 'Algorithm Selection Matrix',
      details:
        'Use BFS for unweighted graphs, Dijkstra for non-negative weighted graphs, Bellman-Ford for negative edges, and topological DP for DAGs.'
    }
  ]
};
