import type { TopicContent } from '../topicContent';

export const monotonicStackQueue: TopicContent = {
  title: 'Monotonic Stack / Queue',
  description:
    'Monotonic structures keep elements in sorted order by value while scanning once. They are used to answer nearest greater/smaller or sliding window maximum queries efficiently.',
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
        'For each position, linearly scan to the right until a greater element is found.\n\nStep-by-step mechanics:\n1. For index `i`, set answer `-1` by default.\n2. Check indices `j = i + 1 ... n - 1`.\n3. First `nums[j] > nums[i]` becomes answer.\n4. Repeat for all `i`.\n\n```python\nfunction nextGreaterBruteForce(nums):\n    n = len(nums)\n    ans = [-1] * n\n\n    for i in range(0, n):\n        for j in range(i + 1, n):\n            if nums[j] > nums[i]:\n                ans[i] = nums[j]\n                break\n\n    return ans\n```\n\nThis double scan is too expensive for large arrays.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Monotonic Decreasing Stack)',
      content:
        'Use a stack of indices whose values are in decreasing order.\n\nStep-by-step mechanics:\n1. Traverse from left to right.\n2. While stack not empty and current value is greater than value at stack top, pop index and set its answer to current value.\n3. Push current index.\n4. Any leftover indices have no greater element and remain `-1`.\n\n```python\nfunction nextGreaterMonotonic(nums):\n    n = len(nums)\n    ans = [-1] * n\n    stack = []  # stores indices\n\n    for i in range(0, n):\n        while stack and nums[i] > nums[stack[-1]]:\n            idx = stack.pop()\n            ans[idx] = nums[i]\n        stack.append(i)\n\n    return ans\n```\n\nWhy `O(N)`:\nEach index is pushed once and popped once. Total stack operations are bounded by `2N`.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Mixing values and indices causes wrong comparisons when duplicates exist.',
    'Choosing wrong monotonic direction (increasing vs decreasing) for target query.',
    'For sliding window max, forgetting to evict out-of-window indices from deque front.'
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
    }
  ]
};
