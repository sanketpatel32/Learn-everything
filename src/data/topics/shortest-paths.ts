import type { TopicContent } from '../topicContent';

export const shortestPaths: TopicContent = {
  title: 'Shortest Paths (Dijkstra, Bellman-Ford)',
  description:
    'Shortest path algorithms differ by edge constraints. Dijkstra is fast for non-negative edges; Bellman-Ford handles negative edges and can detect negative cycles.',
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
        'Enumerate all possible paths from source to target and pick minimum cost.\n\nStep-by-step mechanics:\n1. DFS over all path choices.\n2. Track cumulative cost.\n3. Keep minimum over complete source-target paths.\n\n```python\nfunction shortestPathBrute(u, target, cost):\n    if u == target:\n        best = min(best, cost)\n        return\n\n    for (v, w) in graph[u]:\n        if v not in pathVisited:\n            pathVisited.add(v)\n            shortestPathBrute(v, target, cost + w)\n            pathVisited.remove(v)\n```\n\nThis becomes exponential with cycles/branching and is not practical.',
      complexity: {
        time: 'Exponential in path count',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Dijkstra or Bellman-Ford)',
      content:
        'Choose algorithm by edge constraints.\n\nStep-by-step mechanics for Dijkstra:\n1. Initialize `dist[source] = 0`, others `INF`.\n2. Use min-priority queue by current distance.\n3. Pop nearest node and relax outgoing edges.\n4. Push updated neighbor distances.\n\nStep-by-step mechanics for Bellman-Ford:\n1. Repeat edge relaxation for `V - 1` rounds.\n2. Extra round detects negative cycle if any distance still improves.\n\n```python\nfunction dijkstra(graph, n, src):\n    dist = [INF] * n\n    dist[src] = 0\n    pq = [(0, src)]\n\n    while pq:\n        d, u = heappop(pq)\n        if d > dist[u]:\n            continue\n\n        for (v, w) in graph[u]:\n            nd = d + w\n            if nd < dist[v]:\n                dist[v] = nd\n                heappush(pq, (nd, v))\n\n    return dist\n```\n\nWhy this works:\nDijkstra greedily finalizes the next closest node when edges are non-negative. Bellman-Ford uses repeated relaxation to propagate improvements even with negative edges.',
      complexity: {
        time: 'Depends on algorithm and graph density',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Running Dijkstra on graphs with negative edge weights produces invalid results.',
    'For Bellman-Ford, missing the final cycle-check pass hides negative cycles.',
    'Using adjacency matrix on sparse graphs wastes memory and time.'
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
    }
  ]
};
