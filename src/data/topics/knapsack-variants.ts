import type { TopicContent } from '../topicContent';

export const knapsackVariants: TopicContent = {
  title: 'Knapsack Variants',
  description:
    'Knapsack problems optimize objective under capacity constraints. Main variants are 0/1 knapsack, unbounded knapsack, and bounded multiplicity forms, each defined by state design and transition direction.',
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
        'Use recursive pick or skip branching for each item.\n\nStep-by-step mechanics:\n1. State is `(i, cap)` where `i` is item index and `cap` is remaining capacity.\n2. Base case: if `i == n` or `cap == 0`, return `0`.\n3. If item does not fit, skip it.\n4. Else choose best of skip and take branches.\n\n```python\nfunction knapsackBrute(i, cap, wt, val):\n    if i == len(wt) or cap == 0:\n        return 0\n\n    if wt[i] > cap:\n        return knapsackBrute(i + 1, cap, wt, val)\n\n    skip = knapsackBrute(i + 1, cap, wt, val)\n    take = val[i] + knapsackBrute(i + 1, cap - wt[i], wt, val)\n\n    return max(skip, take)\n```\n\nThis expresses recurrence clearly, but repeated subproblems make it exponential.',
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (DP Table or 1D Compression)',
      content:
        'Memoize overlapping states using dynamic programming.\n\nStep-by-step mechanics for 0 or 1 knapsack with 1D compression:\n1. Let `dp[c]` be best value at capacity `c` after processing some prefix of items.\n2. For each item `(w, v)`, traverse capacity from high to low.\n3. Transition: `dp[c] = max(dp[c], v + dp[c - w])` when `c >= w`.\n4. Descending loop guarantees each item is used at most once.\n\n```python\nfunction knapsack01(wt, val, W):\n    dp = [0] * (W + 1)\n\n    for i in range(0, len(wt)):\n        w = wt[i]\n        v = val[i]\n\n        for c in range(W, w - 1, -1):\n            dp[c] = max(dp[c], v + dp[c - w])\n\n    return dp[W]\n```\n\nUnbounded variant transition:\n- Iterate `c` in ascending order so current item can contribute multiple times.\n\n```python\nfunction unboundedKnapsack(wt, val, W):\n    dp = [0] * (W + 1)\n\n    for i in range(0, len(wt)):\n        w = wt[i]\n        v = val[i]\n\n        for c in range(w, W + 1):\n            dp[c] = max(dp[c], v + dp[c - w])\n\n    return dp[W]\n```\n\nWhy this works:\nDP computes each `(item prefix, capacity)` state once and reuses it, collapsing exponential recursion to pseudo-polynomial time.',
      complexity: {
        time: 'O(N * W)',
        space: 'O(W)'
      }
    },
    {
      title: 'Advanced Variant (Bounded Multiplicity via Binary Splitting)',
      content:
        'If item `i` can be taken at most `cnt[i]` times, split it into powers of two pseudo-items and run 0 or 1 knapsack.\n\nStep-by-step mechanics:\n1. Decompose count `cnt` into groups: `1, 2, 4, ... , remainder`.\n2. For each group size `g`, create pseudo-item with:\n   - weight `g * w`\n   - value `g * v`\n3. Run standard 0 or 1 DP on these pseudo-items.\n\n```python\nfunction expandBoundedItems(wt, val, cnt):\n    items = []\n\n    for i in range(0, len(wt)):\n        c = cnt[i]\n        k = 1\n\n        while k <= c:\n            items.append((k * wt[i], k * val[i]))\n            c -= k\n            k *= 2\n\n        if c > 0:\n            items.append((c * wt[i], c * val[i]))\n\n    return items\n```\n\nWhy this helps:\nBinary splitting reduces multiplicity handling from `O(cnt)` pseudo-items per type to `O(log cnt)`.',
      complexity: {
        time: 'O(W * sum(log cnt_i))',
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
    },
    {
      name: 'Variant Reduction',
      details:
        'Many knapsack variants are solved by transforming them into standard 0 or 1 or unbounded formulations.'
    }
  ]
};
