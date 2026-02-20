import type { TopicContent } from '../topicContent';

export const inPlaceMerge: TopicContent = {
  title: 'In-place Merge',
  description:
    'In-place merge is primarily a write-direction problem. When destination overlaps a source segment and includes trailing buffer, backward writes preserve unread values and guarantee safe linear merging.',
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
        'Append second array and globally sort combined result.\n\nStep-by-step mechanics:\n1. Copy `nums2` into free tail region of `nums1`.\n2. Sort whole `nums1`.\n3. Return sorted merged array.\n\n```python\nfunction mergeBySort(nums1, m, nums2, n):\n    for i in range(0, n):\n        nums1[m + i] = nums2[i]\n\n    nums1.sort()\n    return nums1\n```\n\nThis is simple but wastes sorted-input structure and increases complexity.',
      complexity: {
        time: 'O((M + N) log(M + N))',
        space: 'O(1) extra (language sort may vary)'
      }
    },
    {
      title: 'Better Approach (Auxiliary Array Merge)',
      content:
        'Classic merge with temporary buffer is easier to reason about and verify.\n\nStep-by-step mechanics:\n1. Keep pointers `i` in `nums1[0..m-1]` and `j` in `nums2`.\n2. Push smaller current value into temporary array.\n3. Append leftovers from non-exhausted side.\n4. Copy temporary array back to `nums1`.\n\n```python\nfunction mergeWithTemp(nums1, m, nums2, n):\n    i = 0\n    j = 0\n    temp = []\n\n    while i < m and j < n:\n        if nums1[i] <= nums2[j]:\n            temp.append(nums1[i])\n            i += 1\n        else:\n            temp.append(nums2[j])\n            j += 1\n\n    while i < m:\n        temp.append(nums1[i])\n        i += 1\n\n    while j < n:\n        temp.append(nums2[j])\n        j += 1\n\n    for k in range(0, m + n):\n        nums1[k] = temp[k]\n\n    return nums1\n```\n\nWhy this variant matters:\nIt is the cleanest correctness baseline and often used before optimizing to strict `O(1)` extra space.',
      complexity: {
        time: 'O(M + N)',
        space: 'O(M + N)'
      }
    },
    {
      title: 'Optimal Approach (Three Pointers from End)',
      content:
        'Write from the back so unread values in `nums1` are never overwritten.\n\nStep-by-step mechanics:\n1. `i = m - 1` at end of initialized part of `nums1`.\n2. `j = n - 1` at end of `nums2`.\n3. `k = m + n - 1` at final write slot in `nums1`.\n4. Place larger of `nums1[i]` and `nums2[j]` at `nums1[k]`.\n5. Move source pointer used in previous step and decrement `k`.\n6. Copy leftover `nums2` values when `i` side is exhausted.\n\n```python\nfunction mergeInPlace(nums1, m, nums2, n):\n    i = m - 1\n    j = n - 1\n    k = m + n - 1\n\n    while i >= 0 and j >= 0:\n        if nums1[i] > nums2[j]:\n            nums1[k] = nums1[i]\n            i -= 1\n        else:\n            nums1[k] = nums2[j]\n            j -= 1\n\n        k -= 1\n\n    while j >= 0:\n        nums1[k] = nums2[j]\n        j -= 1\n        k -= 1\n\n    return nums1\n```\n\nInvariant:\n- `nums1[k + 1 ... end]` is finalized sorted suffix.\n- Remaining candidates are `nums1[0..i]` and `nums2[0..j]`.\n\nWhy this works:\nThe largest remaining element always belongs at current rightmost free position. Backward placement preserves all unread data.',
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
    'Using strict `>` vs `>=` only affects stability, not correctness for value-only tasks.',
    'Handling empty-array cases (`m = 0` or `n = 0`) incorrectly can break boundary logic.'
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
    },
    {
      name: 'Stable Merge Semantics',
      details:
        'Tie handling determines stability, which matters if values have associated metadata.'
    }
  ]
};
