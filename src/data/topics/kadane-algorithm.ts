import type { TopicContent } from '../topicContent';

export const kadaneAlgorithm: TopicContent = {
  title: "Kadane's Algorithm",
  description:
    "Kadane's algorithm finds the maximum sum contiguous subarray in linear time by deciding at each index whether to extend the current subarray or restart from the current value.",
  example:
    'For `[-2,1,-3,4,-1,2,1,-5,4]`, the maximum subarray is `[4,-1,2,1]` with sum `6`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (All Subarrays)',
      content:
        'Enumerate every start and end pair, compute each subarray sum, and track the largest.\n\nStep-by-step mechanics:\n1. Set `best = -INF`.\n2. For every `start`, build a running sum while extending `end`.\n3. Update `best` with every new subarray sum.\n\n```python\nfunction maxSubarrayBruteForce(nums):\n    best = -INF\n\n    for start in range(0, len(nums)):\n        running = 0\n        for end in range(start, len(nums)):\n            running += nums[end]\n            best = max(best, running)\n\n    return best\n```\n\nThis works, but nested loops make it too slow for large arrays.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Kadane)',
      content:
        'Maintain two values while scanning left to right.\n\nStep-by-step mechanics:\n1. `current` means the best subarray sum ending exactly at current index.\n2. `best` means best sum seen globally so far.\n3. At each value `x`, choose the better option:\n   - start fresh at `x`\n   - extend old chain: `current + x`\n4. Update `best` with new `current`.\n\n```python\nfunction kadane(nums):\n    current = nums[0]\n    best = nums[0]\n\n    for i in range(1, len(nums)):\n        x = nums[i]\n        current = max(x, current + x)\n        best = max(best, current)\n\n    return best\n```\n\nWhy this works:\nIf `current` becomes worse than starting from `x`, the old prefix is harmful and should be dropped. This local decision is globally safe for maximum subarray sum.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Initializing with `0` breaks cases where all elements are negative.',
    'For index reconstruction, you must track candidate start and best range endpoints.',
    'Kadane is for contiguous subarrays, not arbitrary subsets.'
  ],
  concepts: [
    {
      name: 'Local vs Global Optimum',
      details:
        '`current` stores local best ending at index `i`, while `best` stores global best across all positions.'
    },
    {
      name: 'Negative Prefix Elimination',
      details:
        'Any prefix with negative contribution only hurts future sums, so Kadane discards it automatically.'
    }
  ]
};
