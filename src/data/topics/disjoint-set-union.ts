import type { TopicContent } from '../topicContent';

export const disjointSetUnion: TopicContent = {
  title: 'Disjoint Set Union (DSU)',
  description:
    'DSU (Union-Find) maintains dynamic connectivity under merge operations. It is the standard tool for component tracking in Kruskal MST, undirected cycle detection, and connectivity queries.',
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
        'Maintain explicit component ids and rewrite them on merge.\n\nStep-by-step mechanics:\n1. Start with `comp[i] = i`.\n2. `connected(a, b)` checks id equality.\n3. `union(a, b)` scans full array and rewrites one component id to another.\n\n```python\nfunction unionBrute(comp, a, b):\n    ca = comp[a]\n    cb = comp[b]\n\n    if ca == cb:\n        return\n\n    for i in range(0, len(comp)):\n        if comp[i] == cb:\n            comp[i] = ca\n\nfunction connectedBrute(comp, a, b):\n    return comp[a] == comp[b]\n```\n\nSimple but union is `O(N)`, so large operation sequences become slow.',
      complexity: {
        time: 'O(N) union',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Path Compression + Union by Rank)',
      content:
        'Represent each set as a rooted tree identified by root representative.\n\nStep-by-step mechanics:\n1. `find(x)` returns root of `x`.\n2. Path compression rewires nodes on find-path directly to root.\n3. `union(a, b)` merges roots only.\n4. Union-by-rank or union-by-size keeps tree shallow.\n\n```python\nfunction find(x):\n    if parent[x] != x:\n        parent[x] = find(parent[x])\n    return parent[x]\n\nfunction union(a, b):\n    ra = find(a)\n    rb = find(b)\n\n    if ra == rb:\n        return False\n\n    if rank[ra] < rank[rb]:\n        parent[ra] = rb\n    elif rank[ra] > rank[rb]:\n        parent[rb] = ra\n    else:\n        parent[rb] = ra\n        rank[ra] += 1\n\n    return True\n\nfunction connected(a, b):\n    return find(a) == find(b)\n```\n\nKruskal usage pattern:\n1. Sort edges by weight.\n2. Add edge if its endpoints are in different sets.\n3. Union chosen endpoints.\n\nWhy this works:\nPath compression and rank balancing make trees extremely shallow, giving near-constant amortized operation cost.',
      complexity: {
        time: 'O(alpha(N)) amortized',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Variant (DSU with Rollback)',
      content:
        'For offline dynamic connectivity or divide-and-conquer over time, DSU rollback supports undo operations.\n\nStep-by-step mechanics:\n1. Disable path compression for rollback-friendly parent history.\n2. On every union, record changed parent and size/rank values on a stack.\n3. To rollback, pop history entries and restore previous values.\n4. Combine with segment-tree-over-time for add/remove edge queries.\n\n```python\nfunction unionWithHistory(a, b):\n    ra = findNoCompress(a)\n    rb = findNoCompress(b)\n\n    if ra == rb:\n        history.push(None)\n        return\n\n    if size[ra] < size[rb]:\n        ra, rb = rb, ra\n\n    history.push((rb, parent[rb], ra, size[ra]))\n    parent[rb] = ra\n    size[ra] += size[rb]\n\nfunction rollback():\n    rec = history.pop()\n    if rec is None:\n        return\n\n    rb, oldParent, ra, oldSize = rec\n    parent[rb] = oldParent\n    size[ra] = oldSize\n```\n\nWhy this matters:\nStandard DSU does not support deletions, but rollback extends it for powerful offline dynamic-connectivity frameworks.',
      complexity: {
        time: 'Near O(log N) to O(alpha(N)) per op depending on framework',
        space: 'O(N + operations)'
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
    },
    {
      name: 'Offline Dynamic Connectivity',
      details:
        'With rollback and time-segment decomposition, DSU can answer connectivity under edge additions and removals offline.'
    }
  ]
};
