import type { TopicContent } from '../topicContent';

export const fenwickTreeBit: TopicContent = {
  title: 'Fenwick Tree (BIT)',
  description:
    'Fenwick Tree (Binary Indexed Tree) is a compact data structure for dynamic prefix aggregates. It supports point updates and prefix queries in logarithmic time using lowbit index jumps.',
  example:
    'Maintain dynamic scores array with frequent updates and prefix/range sum queries in `O(log N)`.',
  complexity: {
    time: 'O(log N) update/query',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Dynamic Prefix Rebuild)',
      content:
        'Keep raw array and compute prefixes by direct accumulation.\n\nStep-by-step mechanics:\n1. Update writes at index in `O(1)`.\n2. Prefix query loops from `1` to `idx`.\n3. Range sum uses two prefix calls.\n\n```python\nfunction prefixSumBrute(arr, idx):\n    total = 0\n    for i in range(1, idx + 1):\n        total += arr[i]\n    return total\n\nfunction rangeSumBrute(arr, l, r):\n    return prefixSumBrute(arr, r) - prefixSumBrute(arr, l - 1)\n```\n\nThis is easy but expensive for frequent queries.',
      complexity: {
        time: 'O(N) query, O(1) update',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Fenwick with Lowbit Jumps)',
      content:
        'Store partial prefix blocks where each `bit[i]` covers a suffix block ending at `i`.\n\nStep-by-step mechanics:\n1. Use 1-based indexing.\n2. Update `add(i, delta)` climbs upward with `i += i & -i`.\n3. Query `prefix(i)` climbs downward with `i -= i & -i`.\n4. Convert range sum by subtracting prefixes.\n\n```python\nclass Fenwick:\n    def __init__(self, n):\n        self.bit = [0] * (n + 1)\n\n    def add(self, idx, delta):\n        while idx < len(self.bit):\n            self.bit[idx] += delta\n            idx += idx & -idx\n\n    def prefix(self, idx):\n        total = 0\n        while idx > 0:\n            total += self.bit[idx]\n            idx -= idx & -idx\n        return total\n\n    def range_sum(self, left, right):\n        return self.prefix(right) - self.prefix(left - 1)\n```\n\nOptional linear build:\n```python\nfor i in range(1, n + 1):\n    parent = i + (i & -i)\n    if parent <= n:\n        bit[parent] += bit[i]\n```\n\nWhy this works:\n`i & -i` isolates the lowest set bit, which maps directly to block size represented by each index.',
      complexity: {
        time: 'O(log N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Variant (Range Update + Range Query with Two BITs)',
      content:
        'A single BIT handles point update and prefix query. To support range add and range sum, use two BITs with difference transformation.\n\nStep-by-step mechanics:\n1. To add `delta` on interval `[l, r]`:\n   - update `B1` at `l` with `+delta`, at `r+1` with `-delta`\n   - update `B2` at `l` with `delta*(l-1)`, at `r+1` with `-delta*r`\n2. Prefix sum at `x` becomes:\n   - `sum(x) = x * query(B1, x) - query(B2, x)`\n3. Range sum `[l, r]` is `sum(r) - sum(l-1)`.\n\n```python\nfunction rangeAdd(l, r, delta):\n    add(B1, l, delta)\n    add(B1, r + 1, -delta)\n    add(B2, l, delta * (l - 1))\n    add(B2, r + 1, -delta * r)\n\nfunction prefix(x):\n    return x * query(B1, x) - query(B2, x)\n\nfunction rangeSum(l, r):\n    return prefix(r) - prefix(l - 1)\n```\n\nWhy this matters:\nTwo-BIT trick extends Fenwick to workloads that need range modifications without moving to full segment tree complexity.',
      complexity: {
        time: 'O(log N) update/query',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Forgetting 1-based indexing causes broken lowbit transitions.',
    'Fenwick is great for invertible prefix operations like sum; it is not a drop-in for all segment tree use-cases.',
    'Range updates require extended variants and are not identical to point update logic.',
    'Using direct assignment without computing delta breaks accumulated tree values.',
    'Passing 0 as Fenwick index leads to infinite loops in update routines.'
  ],
  concepts: [
    {
      name: 'Lowbit Decomposition',
      details:
        'Each index stores aggregate over a power-of-two suffix ending at that index.'
    },
    {
      name: 'Prefix-oriented Design',
      details:
        'Fenwick naturally answers prefix queries and derives range answers through subtraction.'
    },
    {
      name: 'Sparse Implicit Tree',
      details:
        'Fenwick behaves like a compressed binary tree encoded directly in an array by index bit patterns.'
    },
    {
      name: 'Difference Array Integration',
      details:
        'Range-update Fenwick variants rely on combining prefix sums over difference arrays.'
    }
  ]
};
