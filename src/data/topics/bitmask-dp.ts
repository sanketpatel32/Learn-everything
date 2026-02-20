import type { TopicContent } from '../topicContent';

export const bitmaskDp: TopicContent = {
  title: 'Bitmask DP',
  description:
    'Bitmask DP models subset states as bitmasks, making it ideal for small `N` combinatorial problems like TSP variants, assignment, and subset transitions.',
  example:
    'Traveling Salesman DP state: `dp[mask][u]` = minimum cost to visit nodes in `mask` and end at node `u`.',
  complexity: {
    time: 'Often O(N^2 * 2^N)',
    space: 'O(N * 2^N)'
  },
  approaches: [
    {
      title: 'Brute Force (Enumerate All Permutations)',
      content:
        'For subset ordering problems, brute force enumerates all possible visit orders.\n\nStep-by-step mechanics:\n1. Generate every permutation of nodes.\n2. Compute objective cost for each permutation.\n3. Return minimum/maximum cost.\n\n```python\nfunction tspBrute(nodes):\n    best = INF\n    for order in permutations(nodes):\n        best = min(best, routeCost(order))\n    return best\n```\n\nThis explodes factorially and becomes infeasible quickly.',
      complexity: {
        time: 'O(N!)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (DP over Subset Masks)',
      content:
        'Represent visited set by `mask` and memoize results.\n\nStep-by-step mechanics:\n1. State `dp(mask, u)` captures best cost from state `(mask, u)`.\n2. Transition by trying an unvisited node `v`.\n3. New mask is `mask | (1 << v)`.\n4. Memoize state to avoid recomputation.\n\n```python\nfunction solve(mask, u):\n    if mask == FULL_MASK:\n        return dist[u][0]\n\n    if memo[mask][u] != -1:\n        return memo[mask][u]\n\n    ans = INF\n    for v in range(0, n):\n        if (mask & (1 << v)) == 0:\n            ans = min(ans, dist[u][v] + solve(mask | (1 << v), v))\n\n    memo[mask][u] = ans\n    return ans\n```\n\nWhy this works:\nEach subset configuration is solved once; exponential states remain, but factorial permutation duplication is removed.',
      complexity: {
        time: 'O(N^2 * 2^N)',
        space: 'O(N * 2^N)'
      }
    }
  ],
  pitfalls: [
    'Using bitmask DP for large `N` quickly exceeds memory/time limits.',
    'Bit operations with wrong precedence can corrupt masks.',
    'Missing memoization turns DP back into exponential recursion.'
  ],
  concepts: [
    {
      name: 'Subset State Compression',
      details:
        'A mask compactly represents visited/selected elements, enabling direct subset transitions.'
    },
    {
      name: 'Exponential but Structured',
      details:
        'Bitmask DP is still exponential, but it is often optimal for small constrained `N`.'
    }
  ]
};
