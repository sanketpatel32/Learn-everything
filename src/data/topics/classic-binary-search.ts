import type { TopicContent } from '../topicContent';

export const classicBinarySearch: TopicContent = {
  title: 'Classic Binary Search',
  description:
    'Classic binary search finds a target in sorted data by repeatedly halving the search interval. It is one of the most important logarithmic-time templates in interviews.',
  example:
    'Given sorted array `[1, 3, 4, 7, 9, 12, 15]`, target `9` should return index `4`.',
  complexity: {
    time: 'O(log N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Linear Scan)',
      content:
        'A direct baseline scans the array from left to right.\n\nStep-by-step mechanics:\n1. Iterate index `i` from `0` to `n - 1`.\n2. If `arr[i] == target`, return `i`.\n3. If loop ends, target does not exist.\n\n```python\nfunction linearSearch(arr, target):\n    for i in range(0, len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n```\n\nThis is easy to implement, but it ignores sorted order and wastes work on large arrays.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Half-interval Elimination)',
      content:
        'Binary search uses sorted order to discard half of the remaining range each step.\n\nStep-by-step mechanics:\n1. Initialize `lo = 0`, `hi = n - 1`.\n2. Compute midpoint `mid = lo + (hi - lo) // 2`.\n3. Compare `arr[mid]` with target.\n4. If equal, return `mid`.\n5. If `arr[mid] < target`, move right: `lo = mid + 1`.\n6. Otherwise move left: `hi = mid - 1`.\n7. If `lo > hi`, target is absent.\n\n```python\nfunction binarySearch(arr, target):\n    lo = 0\n    hi = len(arr) - 1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n\n    return -1\n```\n\nBoundary variant (first occurrence):\n1. On match, store candidate and continue searching left.\n2. Return stored boundary index.\n\nWhy this works:\nSorted order guarantees that one side of `mid` cannot contain the target after comparison, so search space shrinks geometrically.',
      complexity: {
        time: 'O(log N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Using `mid = (lo + hi) // 2` can overflow in fixed-width integer languages.',
    'Incorrect loop condition (`<` vs `<=`) can miss single-element ranges.',
    'Boundary-search problems require modified update rules even after a match.'
  ],
  concepts: [
    {
      name: 'Monotonic Order Exploitation',
      details:
        'Binary search relies on sorted or monotonic structure so comparisons remove half of candidates safely.'
    },
    {
      name: 'Boundary Search Template',
      details:
        'Many interview variants ask for first or last valid index rather than exact equality.'
    }
  ]
};
