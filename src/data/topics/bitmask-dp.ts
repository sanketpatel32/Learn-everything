import type { TopicContent } from '../topicContent';

export const bitmaskDp: TopicContent = {
  title: 'Bitmask DP',
  description:
    'Bitmask DP compresses subset states into integers. It is the standard technique for small-`N` combinatorial optimization such as TSP variants, assignment matching, and subset-transition counting.',
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
        'For ordering-based combinatorial tasks, brute force checks every valid permutation or assignment.\n\nStep-by-step mechanics:\n1. Generate all candidates.\n2. Evaluate objective value for each candidate.\n3. Keep best answer.\n\n```python\nfunction tspBrute(nodes):\n    best = INF\n\n    for order in permutations(nodes):\n        best = min(best, routeCost(order))\n\n    return best\n```\n\nThis is feasible only for very small `N`, but useful as a correctness oracle for test generation.',
      complexity: {
        time: 'O(N!)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Top-down DP over Subset Masks)',
      content:
        'Represent selected set as mask and memoize each `(mask, last)` state once.\n\nStep-by-step mechanics:\n1. Define state: `solve(mask, u)` is best completion cost from node `u` after visiting set `mask`.\n2. Base case: if all nodes visited, return terminal cost.\n3. Transition to every unvisited node `v`.\n4. Build next mask with `nextMask = mask | (1 << v)`.\n5. Memoize and reuse results.\n\n```python\nfunction solve(mask, u):\n    if mask == FULL_MASK:\n        return dist[u][0]\n\n    if memo[mask][u] != -1:\n        return memo[mask][u]\n\n    ans = INF\n\n    for v in range(0, n):\n        if (mask & (1 << v)) == 0:\n            nextMask = mask | (1 << v)\n            ans = min(ans, dist[u][v] + solve(nextMask, v))\n\n    memo[mask][u] = ans\n    return ans\n```\n\nWhy this works:\nMany recursive branches share identical remaining-state structure. Memoization collapses those duplicates from factorial to `O(N^2 * 2^N)`.',
      complexity: {
        time: 'O(N^2 * 2^N)',
        space: 'O(N * 2^N)'
      }
    },
    {
      title: 'Alternative Optimal (Bottom-up Held-Karp Style)',
      content:
        'Build DP table iteratively over increasing masks.\n\nStep-by-step mechanics:\n1. Initialize all DP entries to `INF`.\n2. Seed `dp[1 << start][start] = 0`.\n3. For each `mask`, iterate endpoint `u` already in `mask`.\n4. Try extending to every `v` not in `mask`.\n5. Relax `dp[mask | (1 << v)][v]`.\n\n```python\nfunction tspBottomUp(dist, n, start):\n    FULL = (1 << n)\n    dp = [[INF] * n for _ in range(FULL)]\n    dp[1 << start][start] = 0\n\n    for mask in range(0, FULL):\n        for u in range(0, n):\n            if dp[mask][u] == INF:\n                continue\n            if (mask & (1 << u)) == 0:\n                continue\n\n            for v in range(0, n):\n                if (mask & (1 << v)) != 0:\n                    continue\n\n                nextMask = mask | (1 << v)\n                dp[nextMask][v] = min(dp[nextMask][v], dp[mask][u] + dist[u][v])\n```\n\nSubset-iteration helper pattern:\n```python\nsub = mask\nwhile sub:\n    # process sub\n    sub = (sub - 1) & mask\n```\n\nWhy this variant matters:\nBottom-up is iterative, recursion-safe, and often faster in contest implementations due to predictable memory access.',
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
    'Using `-1` as memo sentinel is unsafe when valid optimal answer can also be `-1`.',
    'Confusing bit position and node id mapping causes silent state corruption.'
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
    },
    {
      name: 'Subset Transition Engineering',
      details:
        'Performance depends on efficient enumeration of next states and careful pruning of impossible transitions.'
    }
  ]
};
