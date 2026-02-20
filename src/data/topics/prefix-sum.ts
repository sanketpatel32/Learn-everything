import { TopicContent } from '../topicContent';

export const prefixSum: TopicContent = {
  title: 'Prefix Sum Pattern',
  description:
    'Prefix Sum precomputes cumulative totals so repeated range queries are answered by constant-time subtraction instead of rescanning subarrays. It is one of the most important precomputation patterns for read-heavy workloads.',
  example: 'Given `nums = [3,1,4,1,5]`, query sum from index `1` to `3` is `1 + 4 + 1 = 6`.',
  complexity: {
    time: 'O(N) Prep / O(1) Query',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Scan Each Query Range)',
      content:
        'Answer each query independently by scanning the requested range.\n\nStep-by-step mechanics:\n1. For query `[l, r]`, initialize `total = 0`.\n2. Iterate from index `l` to `r`.\n3. Add each element into `total`.\n4. Return `total`.\n\n```python\nfunction rangeSumBruteForce(arr, l, r):\n    total = 0\n    for i in range(l, r + 1):\n        total += arr[i]\n    return total\n```\n\nWhy it does not scale:\nWith `Q` queries, total work becomes `O(Q * N)` in the worst case, because overlapping ranges are recomputed repeatedly.',
      complexity: {
        time: 'O(N) per query',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Prefix Array + Difference)',
      content:
        'Precompute one cumulative array and reuse it for all queries.\n\nStep-by-step mechanics:\n1. Build `prefix` with one extra sentinel slot: `prefix[0] = 0`.\n2. For each `i`, store cumulative sum: `prefix[i + 1] = prefix[i] + arr[i]`.\n3. Query `[l, r]` becomes `prefix[r + 1] - prefix[l]`.\n\n```python\nfunction buildPrefix(arr):\n    n = len(arr)\n    prefix = [0] * (n + 1)\n\n    for i in range(0, n):\n        prefix[i + 1] = prefix[i] + arr[i]\n\n    return prefix\n\nfunction rangeSum(prefix, l, r):\n    return prefix[r + 1] - prefix[l]\n```\n\nWhy this works:\n`prefix[x]` stores sum of indices `[0, x - 1]`. Subtracting two boundaries cancels everything outside `[l, r]`.',
      complexity: {
        time: 'O(N) preprocess, O(1) query',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Variant (2D Prefix Sum for Matrix Queries)',
      content:
        'For submatrix sum queries, extend the same idea into two dimensions with inclusion-exclusion.\n\nStep-by-step mechanics:\n1. Build `pref` of size `(rows + 1) x (cols + 1)`.\n2. Each cell stores sum of rectangle from origin to that cell.\n3. Query rectangle `(r1, c1)` to `(r2, c2)` by combining four prefix corners.\n\n```python\nfunction build2DPrefix(mat):\n    rows = len(mat)\n    cols = len(mat[0])\n    pref = [[0] * (cols + 1) for _ in range(rows + 1)]\n\n    for r in range(1, rows + 1):\n        for c in range(1, cols + 1):\n            pref[r][c] = (\n                mat[r - 1][c - 1]\n                + pref[r - 1][c]\n                + pref[r][c - 1]\n                - pref[r - 1][c - 1]\n            )\n\n    return pref\n\nfunction query2D(pref, r1, c1, r2, c2):\n    return (\n        pref[r2 + 1][c2 + 1]\n        - pref[r1][c2 + 1]\n        - pref[r2 + 1][c1]\n        + pref[r1][c1]\n    )\n```\n\nWhy this matters:\nMany grid problems become tractable once rectangular sums are reduced from `O(area)` to `O(1)`.',
      complexity: {
        time: 'O(R * C) preprocess, O(1) query',
        space: 'O(R * C)'
      }
    }
  ],
  pitfalls: [
    'Off-by-one errors when mixing 0-based array indices with `n + 1` prefix indexing.',
    'For mutable arrays with frequent updates, static prefix arrays become inefficient.',
    'Integer overflow can occur for large cumulative sums in fixed-width integer types.',
    'In 2D prefix sums, sign mistakes in inclusion-exclusion (`+ - - +`) produce silent wrong answers.'
  ],
  concepts: [
    {
      name: 'Prefix Identity',
      details:
        'Range sum equals difference of two cumulative boundaries: `sum(l..r) = prefix[r+1] - prefix[l]`.'
    },
    {
      name: 'Read-heavy Optimization',
      details:
        'Classic prefix arrays are ideal when updates are rare and queries are frequent.'
    },
    {
      name: 'Static vs Dynamic Query Models',
      details:
        'When both updates and range queries are frequent, Fenwick Tree and Segment Tree replace static prefix sums.'
    },
    {
      name: 'Inclusion-Exclusion in 2D',
      details:
        'Rectangle queries in matrices use four prefix corners with add-subtract compensation.'
    }
  ]
};
