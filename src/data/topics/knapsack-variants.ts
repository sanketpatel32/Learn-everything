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
  diagram: `
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="takeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.1" />
    </linearGradient>
    <linearGradient id="skipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="800" height="400" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Decision Tree / State Table -->
  <text x="50" y="40" fill="#64748b" font-size="14" font-weight="bold">Decision at State (i, Capacity)</text>
  
  <g transform="translate(300, 100)">
    <!-- Base Node -->
    <rect x="-60" y="-30" width="120" height="60" fill="#1e293b" rx="8" stroke="#334155" stroke-width="2"/>
    <text x="0" y="5" fill="#f8fafc" font-size="14" font-weight="bold" text-anchor="middle">f(i, cap)</text>

    <!-- Take Path -->
    <path d="M -60 30 L -150 120" stroke="#10b981" stroke-width="2" fill="none" stroke-dasharray="4"/>
    <rect x="-210" y="120" width="120" height="60" fill="url(#takeGrad)" rx="8" stroke="#10b981" stroke-width="2"/>
    <text x="-150" y="145" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">TAKE ITEM i</text>
    <text x="-150" y="165" fill="#a7f3d0" font-size="10" text-anchor="middle">val[i] + f(i+1, cap-wt[i])</text>

    <!-- Skip Path -->
    <path d="M 60 30 L 150 120" stroke="#ef4444" stroke-width="2" fill="none" stroke-dasharray="4"/>
    <rect x="90" y="120" width="120" height="60" fill="url(#skipGrad)" rx="8" stroke="#ef4444" stroke-width="2"/>
    <text x="150" y="145" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">SKIP ITEM i</text>
    <text x="150" y="165" fill="#fca5a5" font-size="10" text-anchor="middle">f(i+1, cap)</text>
  </g>

  <!-- DP Table Intuition -->
  <rect x="50" y="280" width="700" height="80" fill="#1e293b" rx="8" stroke="#334155"/>
  <text x="400" y="305" fill="#94a3b8" font-size="14" font-weight="bold" text-anchor="middle">The "Magic" of 1D Space Optimization</text>
  <text x="400" y="330" fill="#cbd5e1" font-size="12" text-anchor="middle">0/1 Knapsack: Loop Capacity BACKWARDS (W to wt[i]) to use previous row's state.</text>
  <text x="400" y="350" fill="#cbd5e1" font-size="12" text-anchor="middle">Unbounded: Loop Capacity FORWARDS (wt[i] to W) to allow reuse of current item.</text>
</svg>
  `,
  keyPoints: [
    {
      title: 'State Definition',
      description: 'The standard state is $dp[i][c]$, representing the maximum value using first $i$ items with total capacity $c$.'
    },
    {
      title: 'Space Complexity Trick',
      description: 'You can reduce space from $O(N \\times W)$ to $O(W)$ by only keeping the previous row (or even just one row with a specific loop direction).'
    },
    {
      title: 'Difference in Transitions',
      description: 'In 0/1, you either take an item or skip it ($i \\to i+1$). In Unbounded, taking an item allows you to stay at index $i$ ($i \\to i$).'
    }
  ],
  comparisonTable: {
    headers: ['Variant', 'Item Usage', 'Capacity Loop Direction', 'Recursive Branch'],
    rows: [
      ['0/1 Knapsack', 'Exactly once', 'Outer: 0 to N, Inner: W down to 0', '`max(pick[i+1], skip[i+1])`'],
      ['Unbounded', 'Infinite times', 'Outer: 0 to N, Inner: 0 up to W', '`max(pick[i], skip[i+1])`'],
      ['Bounded', 'At most K times', 'Binary Splitting into 0/1', 'Variable'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=nLmhmB6NzcM',
  concepts: [
    {
      name: 'Pseudo-Polynomial Time',
      details: 'The complexity $O(N \\times W)$ depends on the *value* of the capacity, not just the number of items. If $W$ is very large (e.g., $10^9$), this DP approach fails.'
    }
  ]
};
