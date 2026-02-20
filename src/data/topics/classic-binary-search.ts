import type { TopicContent } from '../topicContent';

export const classicBinarySearch: TopicContent = {
  title: 'Classic Binary Search',
  description:
    'Classic binary search finds a target in sorted data by repeatedly halving candidate space. Mastery requires clear invariants and correct boundary updates for exact-match and boundary variants.',
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
        'Baseline scan ignores sorted property and checks every position.\n\nStep-by-step mechanics:\n1. Loop through all indices.\n2. Compare each value with target.\n3. Return matching index or `-1`.\n\n```python\nfunction linearSearch(arr, target):\n    for i in range(0, len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n```\n\nUseful for sanity-checking but not competitive for large sorted arrays.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Half-interval Elimination)',
      content:
        'Maintain a sorted search window `[lo, hi]` and shrink it by comparison.\n\nCore invariant:\n- if target exists, it must be inside current `[lo, hi]`.\n\nStep-by-step mechanics:\n1. Initialize `lo = 0`, `hi = n - 1`.\n2. Compute midpoint safely.\n3. Compare midpoint value with target.\n4. Discard impossible half.\n5. Continue until found or window is empty.\n\n```python\nfunction binarySearch(arr, target):\n    lo = 0\n    hi = len(arr) - 1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n\n    return -1\n```\n\nFirst-occurrence boundary template:\n```python\nfunction firstOccurrence(arr, target):\n    lo = 0\n    hi = len(arr) - 1\n    ans = -1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n        if arr[mid] >= target:\n            if arr[mid] == target:\n                ans = mid\n            hi = mid - 1\n        else:\n            lo = mid + 1\n\n    return ans\n```\n\nWhy this works:\nEach comparison removes at least half of remaining indices while preserving invariant correctness, yielding logarithmic search depth.',
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
    },
    {
      name: 'Invariant-driven Debugging',
      details:
        'Binary search bugs are usually boundary-update mistakes; writing and checking invariants prevents off-by-one errors.'
    }
  ]
};
