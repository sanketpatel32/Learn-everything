import type { TopicContent } from '../topicContent';

export const graphBfsDfs: TopicContent = {
  title: 'BFS & DFS Patterns',
  description:
    'BFS and DFS are the fundamental graph traversals. BFS explores level by level using a queue; DFS explores depth-first using recursion or a stack.',
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
        'A naive strategy may launch fresh traversal for each query or node pair without caching visited structure.\n\nStep-by-step mechanics:\n1. For each source-target check, run standalone traversal.\n2. Reset visited structure each time.\n3. Repeat across queries.\n\n```python\nfunction pathExistsBrute(adj, s, t):\n    visited = set()\n    stack = [s]\n\n    while stack:\n        u = stack.pop()\n        if u == t:\n            return True\n        if u in visited:\n            continue\n        visited.add(u)\n        for v in adj[u]:\n            stack.append(v)\n\n    return False\n```\n\nThis is fine for one query, but redundant for many related queries.',
      complexity: {
        time: 'O(Q * (V + E)) for Q queries',
        space: 'O(V)'
      }
    },
    {
      title: 'Optimal Approach (Single-pass Component Traversal)',
      content:
        'Traverse each component once and reuse results where possible.\n\nStep-by-step mechanics for BFS:\n1. Initialize queue with start node and mark visited.\n2. Pop front, process neighbors.\n3. Push unvisited neighbors and mark immediately.\n\nStep-by-step mechanics for DFS:\n1. Recursively visit a node.\n2. For each unvisited neighbor, recurse.\n3. Backtrack after all neighbors processed.\n\n```python\nfunction bfs(adj, start):\n    queue = [start]\n    visited = set([start])\n\n    while queue:\n        u = queue.pop(0)\n        for v in adj[u]:\n            if v not in visited:\n                visited.add(v)\n                queue.append(v)\n\n    return visited\n```\n\nWhy this works:\nEach vertex and edge is processed a constant number of times, giving linear graph traversal complexity.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Marking visited too late can enqueue same node many times.',
    'For disconnected graphs, traversal must be started from every unvisited node.',
    'Recursive DFS can overflow call stack on deep graphs.'
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
    }
  ]
};
