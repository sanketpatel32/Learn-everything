import { TopicContent } from '../topicContent';

export const twoPointers: TopicContent = {
  title: 'Two Pointers Technique',
  description: 'Two pointers convert quadratic pair checks into a linear pass by exploiting order and pointer movement rules. This pattern appears in pair-sum, deduplication, partitioning, and palindrome validation.',
  example: 'Given sorted array `[1,2,4,6,10,12]` and target `16`, return indices of pair that sums to target. Valid answer: values `4` and `12`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Check Every Pair)',
      content: 'The brute force strategy tests all `i, j` pairs and checks whether `arr[i] + arr[j] == target`.\n\nStep-by-step mechanics:\n1. Loop `i` from `0` to `n - 1`.\n2. For each `i`, loop `j` from `i + 1` to `n - 1`.\n3. If pair sum matches target, return pair.\n\n```python\nfunction twoSumBruteForce(arr, target):\n    n = len(arr)\n    for i in range(0, n):\n        for j in range(i + 1, n):\n            if arr[i] + arr[j] == target:\n                return [i, j]\n    return [-1, -1]\n```\n\nThis has complete coverage, but duplicated work across overlapping pair ranges makes it quadratic.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Opposite-Direction Pointers)',
      content: 'For sorted arrays, pointer movement can eliminate impossible regions deterministically.\n\nStep-by-step mechanics:\n1. Initialize `left = 0`, `right = n - 1`.\n2. Compute `sum = arr[left] + arr[right]`.\n3. If `sum == target`, return indices.\n4. If `sum < target`, increase `left` (need a bigger value).\n5. If `sum > target`, decrease `right` (need a smaller value).\n6. Stop when pointers cross.\n\n```python\nfunction twoSumTwoPointers(arr, target):\n    left = 0\n    right = len(arr) - 1\n\n    while left < right:\n        s = arr[left] + arr[right]\n\n        if s == target:\n            return [left, right]\n        elif s < target:\n            left += 1\n        else:\n            right -= 1\n\n    return [-1, -1]\n```\n\nWhy this works:\nSorted order guarantees monotonic behavior. Moving `left` right increases sum, moving `right` left decreases sum, so each move discards an entire set of invalid pairs.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Applying opposite-direction pointer logic to unsorted arrays without preprocessing.',
    'Using `while left <= right` for pair problems can accidentally reuse same index.',
    'For duplicate-sensitive tasks, pointer moves after a match must skip repeated values correctly.'
  ],
  concepts: [
    {
      name: 'Opposite Directions',
      details: 'Pointers start at extremes and move inward based on comparison result.'
    },
    {
      name: 'Fast & Slow',
      details: 'A second two-pointer family where both start near head but move at different speeds, useful in linked list cycle detection.'
    }
  ]
};
