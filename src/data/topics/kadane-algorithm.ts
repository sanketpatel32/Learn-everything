import type { TopicContent } from '../topicContent';

export const kadaneAlgorithm: TopicContent = {
  title: "Kadane's Algorithm",
  description:
    "Kadane's algorithm finds the maximum-sum contiguous subarray in linear time by making a local decision at each index: extend current subarray or restart at current element.",
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
        'Check every possible contiguous interval and keep the best sum.\n\nStep-by-step mechanics:\n1. Initialize `best = -INF`.\n2. Fix a start index.\n3. Grow end index while maintaining running sum.\n4. Update global best after each extension.\n\n```python\nfunction maxSubarrayBruteForce(nums):\n    best = -INF\n\n    for start in range(0, len(nums)):\n        running = 0\n        for end in range(start, len(nums)):\n            running += nums[end]\n            best = max(best, running)\n\n    return best\n```\n\nThis is a clean correctness baseline and useful to validate optimized implementations on small tests.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Kadane)',
      content:
        'Track local best ending at current index and global best seen so far.\n\nStep-by-step mechanics:\n1. `current` = best subarray sum that must end at index `i`.\n2. `best` = best subarray sum anywhere so far.\n3. Transition at value `x`:\n   - restart: `x`\n   - extend: `current + x`\n   - choose max as new `current`.\n4. Update `best` after every index.\n\n```python\nfunction kadane(nums):\n    current = nums[0]\n    best = nums[0]\n\n    for i in range(1, len(nums)):\n        x = nums[i]\n        current = max(x, current + x)\n        best = max(best, current)\n\n    return best\n```\n\nIndex reconstruction variant:\n```python\nfunction kadaneWithIndices(nums):\n    current = nums[0]\n    best = nums[0]\n\n    start = 0\n    bestL = 0\n    bestR = 0\n\n    for i in range(1, len(nums)):\n        if nums[i] > current + nums[i]:\n            current = nums[i]\n            start = i\n        else:\n            current = current + nums[i]\n\n        if current > best:\n            best = current\n            bestL = start\n            bestR = i\n\n    return best, bestL, bestR\n```\n\nWhy this works:\nA negative-contributing prefix can never help future sums, so dropping it is always safe. This turns a global optimization into one linear pass.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Initializing with `0` breaks cases where all elements are negative.',
    'For index reconstruction, you must track candidate start and best range endpoints.',
    'Kadane is for contiguous subarrays, not arbitrary subsets.',
    'Returning indices without handling ties consistently can cause nondeterministic outputs.'
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
    },
    {
      name: 'Rolling State DP',
      details:
        'Kadane is a one-dimensional DP where each state depends only on the previous one, so constant-space rolling state is enough.'
    }
  ]
};
