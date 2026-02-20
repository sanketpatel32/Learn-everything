import { TopicContent } from '../topicContent';

export const prefixSum: TopicContent = {
  title: 'Prefix Sum Pattern',
  description: 'Prefix Sum preprocesses cumulative totals so range-sum queries become constant-time subtraction instead of repeated scanning.',
  example: 'Given `nums = [3,1,4,1,5]`, query sum from index `1` to `3` is `1 + 4 + 1 = 6`.',
  complexity: {
    time: 'O(N) Prep / O(1) Query',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Scan Each Query Range)',
      content: 'For every query `[l, r]`, iterate directly from `l` to `r` and accumulate sum.\n\nStep-by-step mechanics:\n1. Initialize `sum = 0`.\n2. Loop `i` from `l` to `r`.\n3. Add `arr[i]` into `sum`.\n4. Return `sum`.\n\n```python\nfunction rangeSumBruteForce(arr, l, r):\n    total = 0\n    for i in range(l, r + 1):\n        total += arr[i]\n    return total\n```\n\nIf there are many queries, this repeated scan becomes costly.',
      complexity: {
        time: 'O(N) per query',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Prefix Array + Difference)',
      content: 'Build a cumulative sum array once, then answer queries using subtraction.\n\nStep-by-step mechanics:\n1. Create `prefix` of length `n + 1`, where `prefix[0] = 0`.\n2. For each index `i`, set `prefix[i + 1] = prefix[i] + arr[i]`.\n3. Query sum `[l, r]` becomes `prefix[r + 1] - prefix[l]`.\n\n```python\nfunction buildPrefix(arr):\n    n = len(arr)\n    prefix = [0] * (n + 1)\n\n    for i in range(0, n):\n        prefix[i + 1] = prefix[i] + arr[i]\n\n    return prefix\n\nfunction rangeSum(prefix, l, r):\n    return prefix[r + 1] - prefix[l]\n```\n\nWhy this works:\n`prefix[x]` stores sum of elements before index `x`. Subtracting two prefix values cancels everything outside the target interval.',
      complexity: {
        time: 'O(N) preprocess, O(1) query',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Off-by-one errors when mixing 0-based array indices with `n + 1` prefix indexing.',
    'For mutable arrays with frequent updates, static prefix arrays become inefficient.',
    'Integer overflow can occur for large cumulative sums in fixed-width integer types.'
  ],
  concepts: [
    {
      name: 'Static Data Only',
      details: 'Classic prefix sums are best for read-heavy workloads. For updates + queries, use Fenwick Tree or Segment Tree.'
    },
    {
      name: 'Difference of Prefixes',
      details: 'Range sum is derived by subtracting two cumulative boundaries, which is the central prefix-sum identity.'
    }
  ]
};
