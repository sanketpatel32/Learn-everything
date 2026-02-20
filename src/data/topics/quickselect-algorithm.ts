import type { TopicContent } from '../topicContent';

export const quickselectAlgorithm: TopicContent = {
  title: 'QuickSelect Algorithm',
  description:
    'QuickSelect finds the kth smallest or largest element using partition logic from QuickSort but only explores one side of the partition.',
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
        'Sort all elements and return the kth by index.\n\nStep-by-step mechanics:\n1. Sort ascending.\n2. For kth smallest, return `arr[k - 1]`.\n\n```python\nfunction kthSmallestBySort(arr, k):\n    arr.sort()\n    return arr[k - 1]\n```\n\nThis is easy but does unnecessary ordering work for elements far from target rank.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) to O(N)'
      }
    },
    {
      title: 'Optimal Approach (Partition and Recurse One Side)',
      content:
        'Partition around pivot so pivot lands in final sorted position.\n\nStep-by-step mechanics:\n1. Choose pivot and partition array into `< pivot` and `>= pivot`.\n2. Let pivot final index be `p`.\n3. If `p == target`, return pivot.\n4. If `target < p`, recurse/iterate left side.\n5. Else recurse/iterate right side.\n\n```python\nfunction quickselect(arr, k):\n    target = k - 1\n    lo = 0\n    hi = len(arr) - 1\n\n    while lo <= hi:\n        p = partition(arr, lo, hi)\n\n        if p == target:\n            return arr[p]\n        elif p < target:\n            lo = p + 1\n        else:\n            hi = p - 1\n```\n\nWhy this works:\nPartition places pivot at exact rank, so one side can be discarded completely each step.',
      complexity: {
        time: 'O(N) average',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Worst-case `O(N^2)` occurs with poor pivot choices on adversarial inputs.',
    'Confusing kth smallest with kth largest requires index transformation.',
    'Partition boundaries are frequent off-by-one bug sources.'
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
    }
  ]
};
