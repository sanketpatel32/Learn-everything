import type { TopicContent } from '../topicContent';

export const knapsackVariants: TopicContent = {
  title: 'Knapsack Variants',
  description:
    'Knapsack problems optimize value under capacity constraints. Core variants include 0/1 Knapsack, Unbounded Knapsack, and bounded multiplicity variants, each with different DP transition direction.',
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
        'The direct recursive formulation makes an include/exclude decision per item.\n\nStep-by-step mechanics:\n1. State is `(i, cap)` where `i` is current item index and `cap` is remaining capacity.\n2. Base case: if no items left or capacity is zero, answer is `0`.\n3. If item is too heavy, only skip branch is valid.\n4. Otherwise compute best of:\n   - skip item `i`\n   - take item `i` and reduce capacity.\n\n```python\nfunction knapsackBrute(i, cap, wt, val):\n    if i == len(wt) or cap == 0:\n        return 0\n\n    if wt[i] > cap:\n        return knapsackBrute(i + 1, cap, wt, val)\n\n    skip = knapsackBrute(i + 1, cap, wt, val)\n    take = val[i] + knapsackBrute(i + 1, cap - wt[i], wt, val)\n\n    return max(skip, take)\n```\n\nThis is conceptually clean, but many `(i, cap)` states repeat across branches, causing exponential growth.',
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (DP Table or 1D Compression)',
      content:
        'Memoize repeated subproblems using DP over item index and capacity.\n\nStep-by-step mechanics for 0/1 knapsack (1D compressed DP):\n1. `dp[c]` = best value achievable with current processed items and capacity `c`.\n2. Process items one by one.\n3. Iterate capacity in descending order to prevent reusing the same item multiple times.\n4. Transition: `dp[c] = max(dp[c], value + dp[c - weight])`.\n\n```python\nfunction knapsack01(wt, val, W):\n    dp = [0] * (W + 1)\n\n    for i in range(0, len(wt)):\n        w = wt[i]\n        v = val[i]\n        for c in range(W, w - 1, -1):\n            dp[c] = max(dp[c], v + dp[c - w])\n\n    return dp[W]\n```\n\nVariant note:\n- Unbounded knapsack uses ascending `c` loop (`for c in range(w, W+1)`) because current item can be reused.\n\nWhy this works:\nEach DP state is solved once, and transitions mirror recursive pick/skip logic without recomputation.',
      complexity: {
        time: 'O(N * W)',
        space: 'O(W)'
      }
    }
  ],
  pitfalls: [
    'Loop direction differs by variant: 0/1 uses descending capacity, unbounded uses ascending.',
    'Defining state poorly (missing index or capacity) causes invalid transitions.',
    'Large capacity values can make pseudo-polynomial DP too slow or memory-heavy.',
    'Using `int` with huge value sums can overflow in fixed-width languages.'
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
    },
    {
      name: 'Transition Direction',
      details:
        'Capacity iteration direction encodes whether an item can be used once (descending) or multiple times (ascending).'
    }
  ]
};
