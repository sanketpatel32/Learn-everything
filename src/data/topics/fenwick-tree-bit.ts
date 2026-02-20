import type { TopicContent } from '../topicContent';

export const fenwickTreeBit: TopicContent = {
  title: 'Fenwick Tree (BIT)',
  description:
    'Fenwick Tree is a compact indexed structure for dynamic prefix aggregates. It supports point updates and prefix queries in logarithmic time using bitwise jumps.',
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
        'Keep the raw array and compute every prefix by linear accumulation.\n\nStep-by-step mechanics:\n1. Point update writes value or delta at index.\n2. Prefix query loops from `1` to `idx` and accumulates.\n3. Range sum `[l, r]` uses `prefix(r) - prefix(l - 1)` but each prefix is still linear.\n\n```python\nfunction prefixSumBrute(arr, idx):\n    total = 0\n    for i in range(1, idx + 1):\n        total += arr[i]\n    return total\n\nfunction rangeSumBrute(arr, l, r):\n    return prefixSumBrute(arr, r) - prefixSumBrute(arr, l - 1)\n```\n\nWhen query count is large, this becomes too slow because each request touches many elements.',
      complexity: {
        time: 'O(N) query, O(1) update',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Fenwick with Lowbit Jumps)',
      content:
        'Fenwick stores partial prefix sums where each index is responsible for a power-of-two suffix ending at that index.\n\nStep-by-step mechanics:\n1. Use 1-based `bit` array.\n2. `add(idx, delta)` updates all responsible buckets by jumping upward using `idx += idx & -idx`.\n3. `prefix(idx)` accumulates contributions while jumping downward using `idx -= idx & -idx`.\n4. Range sum is derived by subtraction of two prefixes.\n\n```python\nclass Fenwick:\n    def __init__(self, n):\n        self.bit = [0] * (n + 1)\n\n    def add(self, idx, delta):\n        while idx < len(self.bit):\n            self.bit[idx] += delta\n            idx += idx & -idx\n\n    def prefix(self, idx):\n        total = 0\n        while idx > 0:\n            total += self.bit[idx]\n            idx -= idx & -idx\n        return total\n\n    def range_sum(self, left, right):\n        return self.prefix(right) - self.prefix(left - 1)\n```\n\nOptional build optimization:\n- repeated `add` calls build in `O(N log N)`.\n- specialized linear build exists but is less commonly used in interviews.\n\nWhy this works:\n`idx & -idx` isolates the lowest set bit, which directly represents the range length covered by each Fenwick bucket.',
      complexity: {
        time: 'O(log N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Forgetting 1-based indexing causes broken lowbit transitions.',
    'Fenwick is great for invertible prefix operations like sum; it is not a drop-in for all segment tree use-cases.',
    'Range updates require extended variants and are not identical to point update logic.',
    'Using direct assignment without computing delta breaks accumulated tree values.'
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
    }
  ]
};
