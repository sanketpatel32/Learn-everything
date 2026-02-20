import type { TopicContent } from '../topicContent';

export const graphBfsDfs: TopicContent = {
  title: 'BFS & DFS Patterns',
  description:
    'BFS and DFS are foundational graph traversals. BFS expands by distance layers with a queue, while DFS explores deep paths with recursion or an explicit stack and then backtracks.',
  example:
    'In an unweighted graph, BFS from source returns shortest path length in number of edges.',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V)'
  },
  approaches: [
    {
      title: 'Brute Force (Repeated Reachability Searches)',
      content:
        'Re-run traversal independently for each query.\n\nStep-by-step mechanics:\n1. For each `(s, t)` query, initialize fresh `visited` set.\n2. Run DFS or BFS from `s`.\n3. Return once `t` is found or frontier is exhausted.\n4. Repeat for next query from scratch.\n\n```python\nfunction pathExistsBrute(adj, s, t):\n    visited = set()\n    stack = [s]\n\n    while stack:\n        u = stack.pop()\n\n        if u == t:\n            return True\n\n        if u in visited:\n            continue\n\n        visited.add(u)\n\n        for v in adj[u]:\n            stack.append(v)\n\n    return False\n```\n\nThis is acceptable for one-off checks but wasteful for many queries on the same graph.',
      complexity: {
        time: 'O(Q * (V + E)) for Q queries',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Single-pass Component Traversal)',
      content:
        'Traverse each component once and collect reusable traversal metadata.\n\nStep-by-step mechanics for BFS:\n1. Push source into queue and mark visited at enqueue time.\n2. Pop in FIFO order.\n3. Relax unvisited neighbors and assign `dist[neighbor] = dist[current] + 1`.\n4. Repeat until queue is empty.\n\nStep-by-step mechanics for DFS:\n1. Mark node visited when first entered.\n2. Recurse or push neighbors not yet visited.\n3. Backtrack after fully exploring current node.\n\n```python\nfrom collections import deque\n\nfunction bfs(adj, start):\n    q = deque([start])\n    visited = set([start])\n    dist = {start: 0}\n\n    while q:\n        u = q.popleft()\n\n        for v in adj[u]:\n            if v not in visited:\n                visited.add(v)\n                dist[v] = dist[u] + 1\n                q.append(v)\n\n    return visited, dist\n\nfunction dfsRecursive(adj, u, visited):\n    visited.add(u)\n\n    for v in adj[u]:\n        if v not in visited:\n            dfsRecursive(adj, v, visited)\n```\n\nDisconnected graph template:\n```python\nfunction fullTraversal(adj, n):\n    visited = set()\n\n    for u in range(0, n):\n        if u not in visited:\n            dfsRecursive(adj, u, visited)\n```\n\nWhy this works:\nEvery vertex is discovered once and every edge is examined a bounded number of times, yielding `O(V + E)` total complexity.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Marking visited too late can enqueue same node many times.',
    'For disconnected graphs, traversal must be started from every unvisited node.',
    'Recursive DFS can overflow call stack on deep graphs.',
    'Using `list.pop(0)` in production Python BFS can be slow; deque is preferred.',
    'For directed graphs, accidental undirected edge insertion changes reachability and component behavior.'
  ],
  concepts: [
    {
      name: 'Traversal Frontier',
      details:
        'BFS frontier represents nodes at next distance layer; DFS frontier represents current recursion path.'
    },
    {
      name: 'Connectivity Decomposition',
      details:
        'Running traversal from unvisited nodes partitions graph into connected components.'
    },
    {
      name: 'Layered Distance Property',
      details:
        'BFS discovers nodes in nondecreasing distance from source in unweighted graphs.'
    },
    {
      name: 'Traversal Metadata',
      details:
        'Parent arrays, discovery times, and component ids are often produced during traversal and reused by later algorithms.'
    }
  ]
};
