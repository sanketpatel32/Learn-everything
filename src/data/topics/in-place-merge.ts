import type { TopicContent } from '../topicContent';

export const inPlaceMerge: TopicContent = {
  title: 'In-place Merge',
  description:
    'In-place merge is about write direction. When destination overlaps source and has tail buffer, writing from the back prevents overwriting unread values.',
  example:
    'Merge `nums1 = [1,2,3,0,0,0]` (`m=3`) and `nums2 = [2,5,6]` (`n=3`) into sorted `nums1 = [1,2,2,3,5,6]`.',
  complexity: {
    time: 'O(M + N)',
    space: 'O(1) optimal'
  },
  approaches: [
    {
      title: 'Brute Force (Copy then Sort)',
      content:
        'Append second array into destination buffer, then sort full combined array.\n\nStep-by-step mechanics:\n1. Copy `nums2` into trailing empty segment of `nums1`.\n2. Sort entire `nums1`.\n3. Return merged result.\n\n```python\nfunction mergeBySort(nums1, m, nums2, n):\n    for i in range(0, n):\n        nums1[m + i] = nums2[i]\n\n    nums1.sort()\n    return nums1\n```\n\nThis is implementation-friendly but ignores the fact that both inputs are already sorted.',
      complexity: {
        time: 'O((M + N) log(M + N))',
        space: 'O(1) extra (language sort may vary)'
      }
    },
    {
      title: 'Optimal Approach (Three Pointers from End)',
      content:
        'Use three pointers and write largest remaining value into the last free slot.\n\nStep-by-step mechanics:\n1. `i = m - 1` points to last valid value in `nums1`.\n2. `j = n - 1` points to last value in `nums2`.\n3. `k = m + n - 1` points to final destination slot.\n4. Compare `nums1[i]` and `nums2[j]`, place larger at `nums1[k]`.\n5. Move the pointer that provided value and decrement `k`.\n6. After one side is exhausted, copy leftovers from `nums2` if any.\n\n```python\nfunction mergeInPlace(nums1, m, nums2, n):\n    i = m - 1\n    j = n - 1\n    k = m + n - 1\n\n    while i >= 0 and j >= 0:\n        if nums1[i] > nums2[j]:\n            nums1[k] = nums1[i]\n            i -= 1\n        else:\n            nums1[k] = nums2[j]\n            j -= 1\n        k -= 1\n\n    while j >= 0:\n        nums1[k] = nums2[j]\n        j -= 1\n        k -= 1\n\n    return nums1\n```\n\nInvariant:\n- `nums1[k+1:]` always contains final sorted suffix.\n- Unprocessed values remain in `nums1[:i+1]` and `nums2[:j+1]`.\n\nWhy this works:\nLargest remaining item must go to rightmost free slot. Backward writing avoids destroying unread values in `nums1`.',
      complexity: {
        time: 'O(M + N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Writing from the front overwrites values in `nums1` before they are compared.',
    'Forgetting to copy leftover values from `nums2`.',
    'Do not copy leftover `nums1`; those values are already in correct place.',
    'Using strict `>` vs `>=` only affects stability, not correctness for value-only tasks.'
  ],
  concepts: [
    {
      name: 'Write Direction Strategy',
      details:
        'When destination overlaps source, pick a write direction that protects unread data.'
    },
    {
      name: 'Two Sorted Streams',
      details:
        'Merging sorted lists is a stable linear-time primitive used in merge sort and external sorting.'
    },
    {
      name: 'Suffix Finalization Invariant',
      details:
        'At each step, the right side of destination is finalized, shrinking uncertainty toward the left.'
    }
  ]
};
