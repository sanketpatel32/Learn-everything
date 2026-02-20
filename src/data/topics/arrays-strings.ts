import { TopicContent } from '../topicContent';

export const arraysStrings: TopicContent = {
  title: 'Arrays & Strings',
  description: 'Arrays and strings are contiguous memory structures. Mastering them means understanding how index math, in-place mutations, and traversal strategies translate directly into performance.',
  example: 'Rotate an array to the right by `k` steps. Example: `[1,2,3,4,5,6,7]`, `k = 3` becomes `[5,6,7,1,2,3,4]`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) optimal'
  },
  approaches: [
    {
      title: 'Brute Force (Shift One Step, k Times)',
      content: 'The direct approach repeats a single-step right shift exactly `k` times.\n\nStep-by-step mechanics:\n1. Normalize `k` with `k % n`.\n2. For each of the `k` rounds:\n   - store last element in `temp`.\n   - shift every element right by one index.\n   - place `temp` at index `0`.\n\n```python\nfunction rotateBruteForce(nums, k):\n    n = len(nums)\n    k = k % n\n\n    for _ in range(0, k):\n        temp = nums[n - 1]\n        for i in range(n - 1, 0, -1):\n            nums[i] = nums[i - 1]\n        nums[0] = temp\n\n    return nums\n```\n\nThis is simple, but repeatedly shifting the full array is expensive when `k` is large.',
      complexity: {
        time: 'O(N * K)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Three Reversals)',
      content: 'A right rotation can be decomposed into reversible segments.\n\nStep-by-step mechanics:\n1. Normalize `k = k % n`.\n2. Reverse the entire array.\n3. Reverse first `k` elements.\n4. Reverse remaining `n - k` elements.\n\n```python\nfunction reverse(nums, left, right):\n    while left < right:\n        nums[left], nums[right] = nums[right], nums[left]\n        left += 1\n        right -= 1\n\nfunction rotateOptimal(nums, k):\n    n = len(nums)\n    k = k % n\n\n    reverse(nums, 0, n - 1)\n    reverse(nums, 0, k - 1)\n    reverse(nums, k, n - 1)\n\n    return nums\n```\n\nWhy this works:\nGlobal reverse brings the last `k` elements to the front but in reverse order; the two segment reversals restore the correct internal ordering.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  concepts: [
    {
      name: 'Contiguous Memory Advantage',
      details: 'Array indexing is `O(1)` because address lookup is computed directly from base pointer and offset.'
    },
    {
      name: 'Transform by Decomposition',
      details: 'Many array operations become linear when you split them into reversible primitive operations.'
    }
  ],
  pitfalls: [
    'Forgetting `k = k % n` causes unnecessary work and edge-case failures.',
    'Off-by-one boundaries in reversal ranges are a common source of bugs.',
    'For strings in immutable languages, in-place style operations require conversion to char arrays first.'
  ]
};
