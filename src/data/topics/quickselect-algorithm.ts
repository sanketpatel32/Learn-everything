import type { TopicContent } from '../topicContent';

export const quickselectAlgorithm: TopicContent = {
  title: 'QuickSelect Algorithm',
  description:
    'QuickSelect finds one target rank (kth smallest/largest) using partition logic from QuickSort, but only recurses into the side containing the target index.',
  example:
    'In `[7,10,4,3,20,15]`, the 3rd smallest element is `7`.',
  complexity: {
    time: 'O(N) average, O(N^2) worst',
    space: 'O(1) iterative in-place'
  },
  approaches: [
    {
      title: 'Brute Force (Full Sort then Index)',
      content:
        'Sort the entire array and read the target position.\n\nStep-by-step mechanics:\n1. Sort ascending.\n2. kth smallest is at index `k - 1`.\n3. kth largest is at index `n - k`.\n\n```python\nfunction kthSmallestBySort(arr, k):\n    arr.sort()\n    return arr[k - 1]\n```\n\nThis is easy and robust, but it performs full ordering even though only one rank is requested.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) to O(N)'
      }
    },
    {
      title: 'Optimal Approach (Partition and Recurse One Side)',
      content:
        'Each partition places one pivot in its final sorted position, which gives rank information immediately.\n\nStep-by-step mechanics:\n1. Convert requested rank to target index.\n2. Choose pivot (randomized pivot helps avoid adversarial worst-case).\n3. Partition current range so pivot lands at index `p`.\n4. If `p == target`, answer found.\n5. If target is left of `p`, discard right side.\n6. If target is right of `p`, discard left side.\n\n```python\nfunction partition(arr, lo, hi):\n    pivot = arr[hi]\n    i = lo\n\n    for j in range(lo, hi):\n        if arr[j] < pivot:\n            arr[i], arr[j] = arr[j], arr[i]\n            i += 1\n\n    arr[i], arr[hi] = arr[hi], arr[i]\n    return i\n\nfunction quickselect(arr, k):\n    target = k - 1\n    lo = 0\n    hi = len(arr) - 1\n\n    while lo <= hi:\n        p = partition(arr, lo, hi)\n\n        if p == target:\n            return arr[p]\n        elif p < target:\n            lo = p + 1\n        else:\n            hi = p - 1\n```\n\nRandomized pivot pattern:\n1. Swap random index in `[lo, hi]` with `hi` before partition.\n2. Run normal partition logic.\n\nWhy this works:\nPartition fixes one element permanently at correct rank each round, so one full side of the search space is eliminated.',
      complexity: {
        time: 'O(N) average',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Worst-case `O(N^2)` occurs with poor pivot choices on adversarial inputs.',
    'Confusing kth smallest with kth largest requires index transformation.',
    'Partition boundaries are frequent off-by-one bug sources.',
    'Heavy duplicates can degrade naive two-way partition behavior; three-way partition can help.'
  ],
  concepts: [
    {
      name: 'Selection vs Sorting',
      details:
        'Selection only needs one rank, so it can skip fully ordering all elements.'
    },
    {
      name: 'In-place Partitioning',
      details:
        'Pivot partition is the core primitive shared by QuickSort and QuickSelect.'
    },
    {
      name: 'Rank-targeted Elimination',
      details:
        'Unlike QuickSort, QuickSelect keeps only one side after partition, which drives its linear expected runtime.'
    }
  ]
};
