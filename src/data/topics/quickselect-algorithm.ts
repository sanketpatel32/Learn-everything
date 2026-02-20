import type { TopicContent } from '../topicContent';

export const quickselectAlgorithm: TopicContent = {
  title: 'QuickSelect Algorithm',
  description:
    'QuickSelect solves selection queries (kth smallest or kth largest) using partitioning from QuickSort. Instead of fully sorting, it only keeps searching the side that can still contain the target rank, which gives linear expected time.',
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
        'Sort entire array, then read the target index.\n\nStep-by-step mechanics:\n1. Sort array in ascending order.\n2. kth smallest is `arr[k - 1]`.\n3. kth largest is `arr[n - k]`.\n\n```python\nfunction kthSmallestBySort(arr, k):\n    arr.sort()\n    return arr[k - 1]\n```\n\nThis is simple and reliable, but it does unnecessary work because all ranks are ordered even though only one rank is needed.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) to O(N)'
      }
    },
    {
      title: 'Optimal Approach (Randomized QuickSelect)',
      content:
        'Each partition places one pivot at its exact sorted index. That index gives rank information immediately.\n\nStep-by-step mechanics:\n1. Convert rank to zero-based target index.\n2. Pick random pivot in current range to reduce worst-case risk.\n3. Partition so all elements `< pivot` are left and all `>= pivot` are right.\n4. Let pivot final index be `p`.\n5. If `p == target`, return pivot.\n6. If `target < p`, continue on left side only.\n7. If `target > p`, continue on right side only.\n\n```python\nimport random\n\nfunction partition(arr, lo, hi, pivotIndex):\n    pivotValue = arr[pivotIndex]\n    arr[pivotIndex], arr[hi] = arr[hi], arr[pivotIndex]\n\n    store = lo\n    for i in range(lo, hi):\n        if arr[i] < pivotValue:\n            arr[store], arr[i] = arr[i], arr[store]\n            store += 1\n\n    arr[store], arr[hi] = arr[hi], arr[store]\n    return store\n\nfunction quickselect(arr, k):\n    target = k - 1\n    lo = 0\n    hi = len(arr) - 1\n\n    while lo <= hi:\n        pivotIndex = randomInt(lo, hi)\n        p = partition(arr, lo, hi, pivotIndex)\n\n        if p == target:\n            return arr[p]\n        if p < target:\n            lo = p + 1\n        else:\n            hi = p - 1\n```\n\nWhy this works:\nAfter each partition, one pivot is fixed at final rank and one side is discarded completely. Expected remaining search size shrinks geometrically.',
      complexity: {
        time: 'O(N) expected, O(N^2) worst',
        space: 'O(1)'
      }
    },
    {
      title: 'Advanced Approach (Median of Medians Pivot)',
      content:
        'If worst-case guarantees are required, choose pivots deterministically using the Median of Medians strategy.\n\nStep-by-step mechanics:\n1. Split array into groups of 5.\n2. Compute median of each group.\n3. Recursively select median of those medians as pivot.\n4. Partition around that pivot.\n5. Recurse into the relevant side as in QuickSelect.\n\n```python\nfunction deterministicSelect(arr, k):\n    if len(arr) <= 5:\n        arr.sort()\n        return arr[k]\n\n    groups = chunkIntoFives(arr)\n    medians = []\n    for g in groups:\n        g.sort()\n        medians.append(g[len(g) // 2])\n\n    pivot = deterministicSelect(medians, len(medians) // 2)\n    left, equal, right = partitionByValue(arr, pivot)\n\n    if k < len(left):\n        return deterministicSelect(left, k)\n    if k < len(left) + len(equal):\n        return pivot\n    return deterministicSelect(right, k - len(left) - len(equal))\n```\n\nWhy this works:\nThis pivot rule guarantees enough elements are discarded each round, producing linear worst-case runtime.',
      complexity: {
        time: 'O(N) worst-case',
        space: 'O(N) in simple recursive implementation'
      }
    }
  ],
  pitfalls: [
    'Confusing kth smallest and kth largest without correct index transformation is a common bug.',
    'Partition boundaries (`lo`, `hi`, `store`) are frequent off-by-one failure points.',
    'Always choosing edge pivots can trigger worst-case `O(N^2)` on sorted or adversarial inputs.',
    'In-place partition mutates input array; copy first if original order must be preserved.',
    'Arrays with many duplicates benefit from three-way partition to avoid slow progress.'
  ],
  concepts: [
    {
      name: 'Selection vs Sorting',
      details:
        'Selection asks for one rank only, so full global ordering is unnecessary.'
    },
    {
      name: 'Partition Primitive',
      details:
        'Partitioning is the core primitive that maps pivot to exact final rank.'
    },
    {
      name: 'Rank-targeted Elimination',
      details:
        'After partition, only one side can still contain the target rank, so the other side is discarded.'
    },
    {
      name: 'Randomization vs Guarantees',
      details:
        'Randomized pivots provide strong expected performance, while Median of Medians provides deterministic worst-case bounds.'
    }
  ]
};
