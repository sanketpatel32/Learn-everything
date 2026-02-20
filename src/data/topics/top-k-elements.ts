import type { TopicContent } from '../topicContent';

export const topKElements: TopicContent = {
  title: 'Top K Elements',
  description:
    'Top-K problems select best `k` elements or kth rank without fully sorting everything. The main design choice is whether to optimize for one-shot query, streaming updates, or multiple repeated queries.',
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
        'Sort all values and read target rank or suffix.\n\nStep-by-step mechanics:\n1. Sort ascending.\n2. kth largest index is `n-k`.\n3. Top-k largest is last `k` elements.\n\n```python\nfunction kthLargestSort(nums, k):\n    nums.sort()\n    return nums[len(nums) - k]\n\nfunction topKLargestSort(nums, k):\n    nums.sort()\n    return nums[len(nums) - k : ]\n```\n\nThis is robust but pays full `O(N log N)` even when only one rank is needed.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1) to O(N) depending on sort'
      }
    },
    {
      title: 'Optimal Approach (Min Heap of Size K)',
      content:
        'Maintain a bounded min-heap containing current top `k` candidates.\n\nStep-by-step mechanics:\n1. Stream each value into min-heap.\n2. If size exceeds `k`, pop minimum.\n3. Heap root is kth largest after full stream.\n4. Heap contents are top-k set (unsorted).\n\n```python\nimport heapq\n\nfunction kthLargestHeap(nums, k):\n    minHeap = []\n\n    for x in nums:\n        heapq.heappush(minHeap, x)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n\n    return minHeap[0]\n\nfunction topKHeap(nums, k):\n    minHeap = []\n\n    for x in nums:\n        heapq.heappush(minHeap, x)\n        if len(minHeap) > k:\n            heapq.heappop(minHeap)\n\n    return list(minHeap)\n```\n\nAdvanced choice guidance:\n- one-shot kth query: quickselect often faster average\n- streaming top-k: heap is the natural data structure\n- many repeated queries with static data: pre-sort once\n\nWhy this works:\nEach pop removes the smallest among candidates, preserving exactly the `k` largest seen prefix-invariant at every step.',
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
    },
    {
      name: 'Streaming-friendly Selection',
      details:
        'Heap-based top-k does not require storing sorted order for all elements, which makes it ideal for online/large-stream workloads.'
    }
  ]
};
