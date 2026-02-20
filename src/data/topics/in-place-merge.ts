import type { TopicContent } from '../topicContent';

export const inPlaceMerge: TopicContent = {
  title: 'In-place Merge',
  description:
    'Merging sorted structures in-place depends on write direction. If destination has buffer at the end, fill from the back to avoid overwriting unread values.',
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
        'A direct strategy is appending all of `nums2` into `nums1` and then sorting.\n\nStep-by-step mechanics:\n1. Write `nums2` values into trailing buffer of `nums1`.\n2. Sort the full array.\n3. Return `nums1`.\n\n```python\nfunction mergeBySort(nums1, m, nums2, n):\n    for i in range(0, n):\n        nums1[m + i] = nums2[i]\n\n    nums1.sort()\n    return nums1\n```\n\nThis is easy but wastes the sorted property of inputs.',
      complexity: {
        time: 'O((M + N) log(M + N))',
        space: 'O(1) extra (language sort may vary)'
      }
    },
    {
      title: 'Optimal Approach (Three Pointers from End)',
      content:
        'Use three pointers at the end to place largest remaining element first.\n\nStep-by-step mechanics:\n1. `i = m - 1` on last valid element of `nums1`.\n2. `j = n - 1` on last element of `nums2`.\n3. `k = m + n - 1` on final write position in `nums1`.\n4. Compare `nums1[i]` and `nums2[j]`, write larger to `nums1[k]`, and move corresponding pointer.\n5. If `nums2` still has elements, copy them.\n\n```python\nfunction mergeInPlace(nums1, m, nums2, n):\n    i = m - 1\n    j = n - 1\n    k = m + n - 1\n\n    while i >= 0 and j >= 0:\n        if nums1[i] > nums2[j]:\n            nums1[k] = nums1[i]\n            i -= 1\n        else:\n            nums1[k] = nums2[j]\n            j -= 1\n        k -= 1\n\n    while j >= 0:\n        nums1[k] = nums2[j]\n        j -= 1\n        k -= 1\n\n    return nums1\n```\n\nWhy this works:\nWriting from the back preserves unread smaller values at the front and guarantees each element is placed once.',
      complexity: {
        time: 'O(M + N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Writing from the front overwrites values in `nums1` before they are compared.',
    'Forgetting to copy leftover values from `nums2`.',
    'Do not copy leftover `nums1`; those values are already in correct place.'
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
    }
  ]
};
