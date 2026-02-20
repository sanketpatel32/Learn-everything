import { TopicContent } from '../topicContent';

export const twoPointers: TopicContent = {
  title: 'Two Pointers Technique',
  description:
    'Two pointers replace nested scans by maintaining two moving boundaries with deterministic movement rules. The pattern appears in pair-sum, partitioning, palindrome checks, deduplication, and linked-list cycle problems.',
  example: 'Given sorted array `[1,2,4,6,10,12]` and target `16`, return indices of pair that sums to target. Valid answer: values `4` and `12`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Check Every Pair)',
      content:
        'Test all possible pairs and return the first valid match.\n\nStep-by-step mechanics:\n1. Choose first index `i`.\n2. Pair it with every `j > i`.\n3. Check if `arr[i] + arr[j] == target`.\n\n```python\nfunction twoSumBruteForce(arr, target):\n    n = len(arr)\n    for i in range(0, n):\n        for j in range(i + 1, n):\n            if arr[i] + arr[j] == target:\n                return [i, j]\n    return [-1, -1]\n```\n\nThis is exhaustive but quadratic, so it does not scale for large inputs.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Better Approach (Sort + Two Pointers for Unsorted Input)',
      content:
        'If input is unsorted but you need index output, sort value-index pairs, then apply two pointers.\n\nStep-by-step mechanics:\n1. Build `pairs = [(value, originalIndex)]`.\n2. Sort pairs by `value`.\n3. Use opposite pointers on sorted values.\n4. Return stored original indices once target is found.\n\n```python\nfunction twoSumSortAndPointers(arr, target):\n    pairs = []\n    for i in range(0, len(arr)):\n        pairs.append((arr[i], i))\n\n    pairs.sort(key=lambda x: x[0])\n\n    left = 0\n    right = len(pairs) - 1\n\n    while left < right:\n        s = pairs[left][0] + pairs[right][0]\n\n        if s == target:\n            return [pairs[left][1], pairs[right][1]]\n        if s < target:\n            left += 1\n        else:\n            right -= 1\n\n    return [-1, -1]\n```\n\nTrade-off:\nYou pay `O(N log N)` sorting cost, but still get clear two-pointer elimination logic.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Opposite-Direction Pointers on Sorted Input)',
      content:
        'For already sorted arrays, two pointers give true linear-time selection.\n\nStep-by-step mechanics:\n1. Set `left = 0`, `right = n - 1`.\n2. Compute `s = arr[left] + arr[right]`.\n3. If equal, done.\n4. If `s < target`, move `left` right to increase sum.\n5. If `s > target`, move `right` left to decrease sum.\n6. Continue until pointers cross.\n\n```python\nfunction twoSumTwoPointers(arr, target):\n    left = 0\n    right = len(arr) - 1\n\n    while left < right:\n        s = arr[left] + arr[right]\n\n        if s == target:\n            return [left, right]\n        elif s < target:\n            left += 1\n        else:\n            right -= 1\n\n    return [-1, -1]\n```\n\nWhy this works:\nSorted order makes pointer moves monotonic. One move eliminates many impossible pairs at once, so each index is visited at most once by each pointer.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Applying opposite-direction pointer logic to unsorted arrays without preprocessing leads to wrong elimination.',
    'Using `while left <= right` for pair problems can accidentally reuse the same index.',
    'For duplicate-sensitive tasks, pointer updates after a match must skip repeated values correctly.',
    'Returning indices from sorted-pair approach requires mapping back to original indices.',
    'Integer overflow can occur when summing large values in fixed-width integer types.'
  ],
  concepts: [
    {
      name: 'Monotonic Elimination',
      details:
        'Pointer movement is justified by sorted order, allowing whole regions of impossible answers to be discarded.'
    },
    {
      name: 'Fast & Slow',
      details:
        'Another two-pointer family where pointers move at different speeds, useful for cycle detection and middle-node queries.'
    },
    {
      name: 'Problem Preconditions',
      details:
        'The same pointer idea has different guarantees depending on input properties such as sortedness and duplicate handling.'
    }
  ]
};
