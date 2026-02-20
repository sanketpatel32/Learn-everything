import type { TopicContent } from '../topicContent';

export const topKElements: TopicContent = {
  title: 'Top K Elements',
  description:
    'Top-K problems ask for the largest or smallest `k` items without fully sorting all values. The key idea is to maintain only useful candidates instead of ordering the entire input.',
  example:
    'Given `[3,2,1,5,6,4]` and `k = 2`, the 2nd largest element is `5`. For top-2 largest elements, a valid output set is `[6,5]`.',
  complexity: {
    time: 'O(N log K) typical',
    space: 'O(K)'
  },
  approaches: [
    {
      title: 'Brute Force (Full Sort)',
      content:
        'Sort the entire array and read answer by index.\n\nStep-by-step mechanics:\n1. Sort input ascending.\n2. For kth largest, return index `n - k`.\n3. For top-k list, return suffix `arr[n-k:]`.\n\n```python\nfunction kthLargestSort(nums, k):\n    nums.sort()\n    return nums[len(nums) - k]\n\nfunction topKLargestSort(nums, k):\n    nums.sort()\n    return nums[len(nums) - k : ]\n```\n\nThis is simple and often acceptable in interviews for small constraints, but it does unnecessary ordering work when only a tiny top subset is required.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) to O(N) depending on sort'
      }
    },
    {
      title: 'Optimal Approach (Min Heap of Size K)',
      content:
        'Maintain only the current best `k` elements in a min-heap.\n\nStep-by-step mechanics:\n1. Iterate through values one by one.\n2. Push value into min-heap.\n3. If heap size exceeds `k`, pop one element (the smallest among current candidates).\n4. At the end:\n   - heap root is kth largest.\n   - heap contents are the top-k elements (unsorted).\n\n```python\nimport heapq\n\nfunction kthLargestHeap(nums, k):\n    minHeap = []\n\n    for x in nums:\n        heapq.heappush(minHeap, x)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n\n    return minHeap[0]\n\nfunction topKHeap(nums, k):\n    minHeap = []\n\n    for x in nums:\n        heapq.heappush(minHeap, x)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n\n    return list(minHeap)\n```\n\nInvariant to remember:\n- Heap size is never more than `k`.\n- Every element outside heap is less than or equal to at least one heap element after processing.\n\nWhy this works:\nWhenever heap grows beyond `k`, removing the smallest preserves only the `k` largest seen so far. After full scan, that candidate set must be globally top-k.',
      complexity: {
        time: 'O(N log K)',
        space: 'O(K)'
      }
    }
  ],
  pitfalls: [
    'Using max-heap for this exact variant adds unnecessary complexity.',
    'Confusing kth largest with index `k` in 0-based sorted order.',
    'For very small `k`, full sort is wasteful compared with heap or quickselect.',
    'If `k` is invalid (`k <= 0` or `k > n`), logic should guard early.'
  ],
  concepts: [
    {
      name: 'Streaming Selection',
      details:
        'Heap-based top-k works naturally on streaming input without storing everything sorted.'
    },
    {
      name: 'Partial Order Maintenance',
      details:
        'You only maintain order among top candidates, not across entire dataset.'
    },
    {
      name: 'Candidate-set Invariant',
      details:
        'A bounded heap lets you preserve only necessary candidates while discarding provably irrelevant values immediately.'
    }
  ]
};
