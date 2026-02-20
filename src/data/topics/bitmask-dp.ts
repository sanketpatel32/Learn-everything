import type { TopicContent } from '../topicContent';

export const bitmaskDp: TopicContent = {
  title: 'Bitmask DP',
  description:
    'Bitmask DP models subset states as integer masks, which is ideal for small-`N` combinatorial optimization such as TSP variants, assignment matching, and subset transition problems.',
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
        'For route/assignment problems, brute force checks every valid ordering.\n\nStep-by-step mechanics:\n1. Generate all permutations or assignments.\n2. Compute total objective value for each candidate.\n3. Keep global best.\n\n```python\nfunction tspBrute(nodes):\n    best = INF\n\n    for order in permutations(nodes):\n        best = min(best, routeCost(order))\n\n    return best\n```\n\nThis is only useful for tiny `N`, usually as a validation baseline for small test generation.',
      complexity: {
        time: 'O(N!)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (DP over Subset Masks)',
      content:
        'Represent selected/visited set via bitmask and memoize each state exactly once.\n\nStep-by-step mechanics:\n1. State definition (TSP flavor): `dp(mask, u)` = minimum extra cost to complete tour when current node is `u` and visited set is `mask`.\n2. Base case: if `mask` includes all nodes, return cost to go back/start or terminal condition.\n3. Transition over all nodes `v` not in mask.\n4. Set next state with `nextMask = mask | (1 << v)`.\n5. Memoize result for `(mask, u)`.\n\n```python\nfunction solve(mask, u):\n    if mask == FULL_MASK:\n        return dist[u][0]\n\n    if memo[mask][u] != -1:\n        return memo[mask][u]\n\n    ans = INF\n\n    for v in range(0, n):\n        if (mask & (1 << v)) == 0:\n            nextMask = mask | (1 << v)\n            ans = min(ans, dist[u][v] + solve(nextMask, v))\n\n    memo[mask][u] = ans\n    return ans\n```\n\nBottom-up style (common in contests):\n1. Initialize `dp[1<<start][start] = 0`.\n2. Iterate masks; for each current endpoint, relax transitions to unvisited nodes.\n\nWhy this works:\nMany permutations map to the same `(mask, u)` state. DP collapses these duplicates, reducing factorial explosion to structured exponential complexity.',
      complexity: {
        time: 'O(N^2 * 2^N)',
        space: 'O(N * 2^N)'
      }
    }
  ],
  pitfalls: [
    'Using bitmask DP for large `N` quickly exceeds memory/time limits.',
    'Bit operations with wrong precedence can corrupt masks.',
    'Missing memoization turns DP back into exponential recursion.',
    'Using `-1` as memo sentinel is unsafe when valid optimal answer can also be `-1`.'
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
    },
    {
      name: 'State-space Compression',
      details:
        'Bit operations provide constant-time subset updates/checks, enabling dense DP over combinatorial states.'
    }
  ]
};
