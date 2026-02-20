import type { TopicContent } from '../topicContent';

export const monotonicStackQueue: TopicContent = {
  title: 'Monotonic Stack / Queue',
  description:
    'Monotonic stack and monotonic deque maintain candidates in sorted order during one linear pass. They solve nearest greater or smaller queries and sliding-window extrema by discarding dominated elements early.',
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
        'For each index, scan to the right until first greater element appears.\n\nStep-by-step mechanics:\n1. Initialize answer array with `-1`.\n2. For each position `i`, iterate `j = i + 1 .. n - 1`.\n3. First `nums[j] > nums[i]` becomes answer for `i`.\n\n```python\nfunction nextGreaterBruteForce(nums):\n    n = len(nums)\n    ans = [-1] * n\n\n    for i in range(0, n):\n        for j in range(i + 1, n):\n            if nums[j] > nums[i]:\n                ans[i] = nums[j]\n                break\n\n    return ans\n```\n\nThis is correct but repeatedly rescans overlapping suffixes, so total work is quadratic.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Monotonic Decreasing Stack)',
      content:
        'Keep unresolved indices in decreasing value order. The stack top is the closest unresolved index waiting for a larger element.\n\nStep-by-step mechanics:\n1. Traverse array from left to right.\n2. While current value is greater than value at stack top index, pop and resolve that index.\n3. Push current index after resolving smaller ones.\n4. Any index still in stack has no greater element on the right.\n\n```python\nfunction nextGreaterMonotonic(nums):\n    n = len(nums)\n    ans = [-1] * n\n    stack = []  # indices with decreasing values\n\n    for i in range(0, n):\n        while stack and nums[i] > nums[stack[-1]]:\n            idx = stack.pop()\n            ans[idx] = nums[i]\n\n        stack.append(i)\n\n    return ans\n```\n\nInvariant:\n- Stack indices are increasing.\n- Values at those indices are strictly decreasing.\n- Every stacked index is unresolved and waiting for first greater element.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Queue Variant (Monotonic Deque for Sliding Window Max)',
      content:
        'For window maximum, maintain deque of indices in decreasing-value order. Front always stores current window maximum index.\n\nStep-by-step mechanics:\n1. Remove front index if it is outside current window.\n2. Remove back indices while their values are smaller than current value because they are dominated.\n3. Push current index at back.\n4. Once window size reaches `k`, report value at front index.\n\n```python\nfrom collections import deque\n\nfunction maxSlidingWindow(nums, k):\n    dq = deque()  # indices, values decreasing\n    ans = []\n\n    for i in range(0, len(nums)):\n        while dq and dq[0] <= i - k:\n            dq.popleft()\n\n        while dq and nums[dq[-1]] <= nums[i]:\n            dq.pop()\n\n        dq.append(i)\n\n        if i >= k - 1:\n            ans.append(nums[dq[0]])\n\n    return ans\n```\n\nWhy this is linear:\nEach index enters deque once and exits deque at most once, so total operations are `O(N)` by amortized analysis.',
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
    'Handling duplicates (`>=` vs `>`) changes which candidate survives and can affect tie behavior.',
    'Using values instead of indices in window problems prevents correct expiry checks.'
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
    },
    {
      name: 'Data Structure Fit',
      details:
        'Use stack for nearest-element queries and deque for fixed-size window extrema.'
    }
  ]
};
