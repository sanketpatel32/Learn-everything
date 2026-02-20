import type { TopicContent } from '../topicContent';

export const monotonicStackQueue: TopicContent = {
  title: 'Monotonic Stack / Queue',
  description:
    'Monotonic stack/queue maintains order constraints during a linear scan. It solves nearest greater/smaller and window extrema by dropping dominated candidates early.',
  example:
    'For Next Greater Element on `[2,1,2,4,3]`, output is `[4,2,4,-1,-1]`.',
  complexity: {
    time: 'O(N)',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Scan Right for Every Index)',
      content:
        'For each index, linearly search the right side for first greater value.\n\nStep-by-step mechanics:\n1. Initialize all answers to `-1`.\n2. For each `i`, scan `j = i+1..n-1`.\n3. First `nums[j] > nums[i]` becomes answer for `i`.\n\n```python\nfunction nextGreaterBruteForce(nums):\n    n = len(nums)\n    ans = [-1] * n\n\n    for i in range(0, n):\n        for j in range(i + 1, n):\n            if nums[j] > nums[i]:\n                ans[i] = nums[j]\n                break\n\n    return ans\n```\n\nThis is simple and correct, but repeated scans create quadratic runtime.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Monotonic Decreasing Stack)',
      content:
        'Maintain stack of unresolved indices in decreasing-value order.\n\nStep-by-step mechanics:\n1. Iterate `i` from left to right.\n2. While current value resolves previous smaller values, pop indices.\n3. Assign current value as next-greater for popped indices.\n4. Push current index as unresolved candidate.\n\n```python\nfunction nextGreaterMonotonic(nums):\n    n = len(nums)\n    ans = [-1] * n\n    stack = []  # indices with decreasing values\n\n    for i in range(0, n):\n        while stack and nums[i] > nums[stack[-1]]:\n            idx = stack.pop()\n            ans[idx] = nums[i]\n        stack.append(i)\n\n    return ans\n```\n\nSliding-window maximum variant (monotonic deque):\n1. Keep deque decreasing by value.\n2. Remove out-of-window indices from front.\n3. Remove smaller tail indices before push.\n4. Front always holds window max index.\n\nWhy `O(N)`:\nEach index is inserted and removed at most once, so total operations are linear (amortized analysis).',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Mixing values and indices causes wrong comparisons when duplicates exist.',
    'Choosing wrong monotonic direction (increasing vs decreasing) for target query.',
    'For sliding window max, forgetting to evict out-of-window indices from deque front.',
    'Handling duplicates (`>=` vs `>`) changes which candidate survives and can affect tie behavior.'
  ],
  concepts: [
    {
      name: 'Amortized Analysis',
      details:
        'Even with nested while loops, each element can only be removed once, so total complexity stays linear.'
    },
    {
      name: 'Query-driven Ordering',
      details:
        'Use decreasing order for next greater and max-window style queries; increasing order for next smaller and min-window queries.'
    },
    {
      name: 'Dominance Pruning',
      details:
        'Elements that can never become optimal answers are removed immediately, shrinking future search work.'
    }
  ]
};
