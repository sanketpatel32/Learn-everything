import type { TopicContent } from '../topicContent';

export const disjointSetUnion: TopicContent = {
  title: 'Disjoint Set Union (DSU)',
  description:
    'DSU (Union-Find) maintains dynamic connectivity among elements under merge operations. It is the default tool for component tracking in graph connectivity, Kruskal MST, and cycle detection.',
  example:
    'In cycle detection for an undirected graph, if edge `(u, v)` connects two vertices with same root, that edge closes a cycle.',
  complexity: {
    time: 'Near O(1) amortized',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Re-label Components)',
      content:
        'A naive dynamic-connectivity model keeps a component label for every element.\n\nStep-by-step mechanics:\n1. Initialize `comp[i] = i` so every node starts in separate set.\n2. Connectivity check compares `comp[a]` and `comp[b]`.\n3. Union merges by scanning entire array and rewriting one label into the other.\n\n```python\nfunction unionBrute(comp, a, b):\n    ca = comp[a]\n    cb = comp[b]\n    if ca == cb:\n        return\n\n    for i in range(0, len(comp)):\n        if comp[i] == cb:\n            comp[i] = ca\n\nfunction connectedBrute(comp, a, b):\n    return comp[a] == comp[b]\n```\n\nThis is easy to reason about but too slow because union is linear in `N`.',
      complexity: {
        time: 'O(N) union',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Path Compression + Union by Rank)',
      content:
        'Model each set as a rooted tree with a representative root.\n\nStep-by-step mechanics:\n1. `find(x)` climbs parent pointers to root representative.\n2. Path compression flattens traversed nodes to point directly at root.\n3. `union(a, b)` finds roots and joins smaller-rank tree below larger-rank tree.\n4. Connectivity check is `find(a) == find(b)`.\n\n```python\nfunction find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\n\nfunction union(a, b):\n    ra = find(a)\n    rb = find(b)\n\n    if ra == rb:\n        return False\n\n    if rank[ra] < rank[rb]:\n        parent[ra] = rb\n    elif rank[ra] > rank[rb]:\n        parent[rb] = ra\n    else:\n        parent[rb] = ra\n        rank[ra] += 1\n\n    return True\n\nfunction connected(a, b):\n    return find(a) == find(b)\n```\n\nApplied pattern for cycle detection (undirected graph):\n1. For each edge `(u, v)`, check roots.\n2. If roots match, cycle found.\n3. Otherwise union roots.\n\nWhy this works:\nPath compression and rank heuristics keep trees shallow, so long sequences of operations have near-constant amortized cost.',
      complexity: {
        time: 'O(alpha(N)) amortized',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Using union without first finding roots breaks component invariants.',
    'Path compression must update parents during recursion, not after returning unrelated values.',
    'Assuming DSU supports edge deletions directly is incorrect.',
    'For directed graph SCC problems, DSU is not a substitute for Tarjan or Kosaraju.'
  ],
  concepts: [
    {
      name: 'Representative-based Sets',
      details:
        'Every component is identified by one root representative returned by `find`.'
    },
    {
      name: 'Inverse Ackermann Complexity',
      details:
        'With both optimizations, complexity grows so slowly that it is effectively constant for practical inputs.'
    },
    {
      name: 'Amortized Efficiency',
      details:
        'Single operations are not always constant, but over many operations average cost remains extremely low.'
    }
  ]
};
