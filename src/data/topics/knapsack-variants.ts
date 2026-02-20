import type { TopicContent } from '../topicContent';

export const knapsackVariants: TopicContent = {
  title: 'Knapsack Variants',
  description:
    'Knapsack problems optimize value under capacity constraints. Core variants include 0/1 Knapsack, Unbounded Knapsack, and bounded item counts.',
  example:
    'Given weights `[1,3,4,5]`, values `[1,4,5,7]`, capacity `7`, maximum value is `9`.',
  complexity: {
    time: 'O(N * W)',
    space: 'O(W) to O(N * W)'
  },
  approaches: [
    {
      title: 'Brute Force (Pick / Skip Recursion)',
      content:
        'At each item, recursively choose include or exclude.\n\nStep-by-step mechanics:\n1. Base case: no items left or capacity is 0.\n2. If item too heavy, skip it.\n3. Otherwise return max of:\n   - skip item\n   - take item plus best remaining capacity.\n\n```python\nfunction knapsackBrute(i, cap, wt, val):\n    if i == len(wt) or cap == 0:\n        return 0\n\n    if wt[i] > cap:\n        return knapsackBrute(i + 1, cap, wt, val)\n\n    skip = knapsackBrute(i + 1, cap, wt, val)\n    take = val[i] + knapsackBrute(i + 1, cap - wt[i], wt, val)\n    return max(skip, take)\n```\n\nThis explores overlapping subproblems exponentially.',
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (DP Table or 1D Compression)',
      content:
        'Cache subproblem answers by item index and remaining capacity.\n\nStep-by-step mechanics:\n1. Define `dp[c]` as max value for capacity `c` after processing items so far.\n2. For each item `(w, v)`, iterate capacities from high to low for 0/1 variant.\n3. Update `dp[c] = max(dp[c], v + dp[c - w])`.\n\n```python\nfunction knapsack01(wt, val, W):\n    dp = [0] * (W + 1)\n\n    for i in range(0, len(wt)):\n        w = wt[i]\n        v = val[i]\n        for c in range(W, w - 1, -1):\n            dp[c] = max(dp[c], v + dp[c - w])\n\n    return dp[W]\n```\n\nWhy this works:\nDP reuses previously solved capacities instead of recomputing recursive branches.',
      complexity: {
        time: 'O(N * W)',
        space: 'O(W)'
      }
    }
  ],
  pitfalls: [
    'Loop direction differs by variant: 0/1 uses descending capacity, unbounded uses ascending.',
    'Defining state poorly (missing index or capacity) causes invalid transitions.',
    'Large capacity values can make pseudo-polynomial DP too slow or memory-heavy.'
  ],
  concepts: [
    {
      name: 'State and Transition',
      details:
        'DP success depends on clear state definition and exhaustive valid transitions.'
    },
    {
      name: 'Pseudo-polynomial Complexity',
      details:
        'Runtime depends on numeric capacity `W`, not just number of items `N`.'
    }
  ]
};
