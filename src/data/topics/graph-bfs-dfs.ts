import type { TopicContent } from '../topicContent';

export const graphBfsDfs: TopicContent = {
  title: 'BFS & DFS Patterns',
  description:
    'BFS and DFS are the fundamental graph traversals. BFS expands by distance layers using a queue; DFS explores deep paths using recursion/stack and backtracks.',
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
        'A naive approach reruns full traversal for each query independently.\n\nStep-by-step mechanics:\n1. For every source-target query, initialize fresh `visited`.\n2. Run DFS/BFS until target is found or search exhausts.\n3. Repeat from scratch for next query.\n\n```python\nfunction pathExistsBrute(adj, s, t):\n    visited = set()\n    stack = [s]\n\n    while stack:\n        u = stack.pop()\n\n        if u == t:\n            return True\n\n        if u in visited:\n            continue\n\n        visited.add(u)\n\n        for v in adj[u]:\n            stack.append(v)\n\n    return False\n```\n\nCorrect for single checks, but redundant for repeated queries on the same graph.',
      complexity: {
        time: 'O(Q * (V + E)) for Q queries',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Single-pass Component Traversal)',
      content:
        'Traverse graph once per connected component and reuse traversal outputs.\n\nStep-by-step mechanics for BFS:\n1. Start queue with source and mark visited immediately.\n2. Pop nodes in FIFO order (layer by layer).\n3. Push unvisited neighbors and mark when enqueued.\n\nStep-by-step mechanics for DFS:\n1. Visit node and mark visited.\n2. Recursively/iteratively explore unvisited neighbors.\n3. Backtrack when no outgoing unvisited edges remain.\n\n```python\nfunction bfs(adj, start):\n    queue = [start]\n    visited = set([start])\n    dist = {start: 0}\n\n    while queue:\n        u = queue.pop(0)\n        for v in adj[u]:\n            if v not in visited:\n                visited.add(v)\n                dist[v] = dist[u] + 1\n                queue.append(v)\n\n    return visited, dist\n\nfunction dfs(adj, u, visited):\n    visited.add(u)\n    for v in adj[u]:\n        if v not in visited:\n            dfs(adj, v, visited)\n```\n\nWhy this works:\nVisited marking prevents reprocessing, so every vertex and edge is handled a bounded number of times (`O(V+E)`). BFS additionally guarantees shortest-edge distance in unweighted graphs.',
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
    'Using `list.pop(0)` in production Python BFS can be slow; deque is preferred.'
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
    }
  ]
};
