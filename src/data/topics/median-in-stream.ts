import type { TopicContent } from '../topicContent';

export const medianInStream: TopicContent = {
  title: 'Median in a Stream',
  description:
    'Median in a stream is an online order-statistics problem: after each new value arrives, you must report the middle value without reprocessing the full sequence. The standard solution keeps two balanced heaps that represent values below and above the median boundary.',
  example:
    'For stream `5, 15, 1, 3`, medians after each insertion are `5`, `10`, `5`, `4`.',
  complexity: {
    time: 'O(log N) insert, O(1) median',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Insert + Re-sort Array)',
      content:
        'Store every value in an array and perform full sorting after each insertion.\n\nStep-by-step mechanics:\n1. Append incoming value `x`.\n2. Sort entire array.\n3. Read middle element(s):\n   - odd `n`: index `n // 2`\n   - even `n`: average of indices `n // 2 - 1` and `n // 2`\n\n```python\nfunction addNumBrute(arr, x):\n    arr.append(x)\n    arr.sort()\n\nfunction findMedianBrute(arr):\n    n = len(arr)\n    if n % 2 == 1:\n        return arr[n // 2]\n    leftMid = arr[n // 2 - 1]\n    rightMid = arr[n // 2]\n    return (leftMid + rightMid) / 2.0\n```\n\nWhy this is slow:\nEvery new element triggers global reordering. For long streams, repeating `O(N log N)` work per insertion becomes a bottleneck.',
      complexity: {
        time: 'O(N log N) per insert',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (MaxHeap Left + MinHeap Right)',
      content:
        'Maintain a moving partition around the median with two heaps:\n- `left`: max-heap of lower half\n- `right`: min-heap of upper half\n\nCore invariants:\n1. `abs(len(left) - len(right)) <= 1`\n2. Every value in `left` is less than or equal to every value in `right`\n\nA robust insertion recipe:\n1. Push into `left` first.\n2. Move max from `left` to `right` so ordering invariant is restored.\n3. If `right` gets larger than `left`, move min from `right` back to `left`.\n4. Median query:\n   - if sizes equal: average of both tops\n   - else: top of larger heap\n\n```python\nimport heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.left = []   # max-heap via negatives\n        self.right = []  # min-heap\n\n    def addNum(self, x):\n        heapq.heappush(self.left, -x)\n        heapq.heappush(self.right, -heapq.heappop(self.left))\n\n        if len(self.right) > len(self.left):\n            heapq.heappush(self.left, -heapq.heappop(self.right))\n\n    def findMedian(self):\n        if len(self.left) > len(self.right):\n            return float(-self.left[0])\n        return (-self.left[0] + self.right[0]) / 2.0\n```\n\nWhy this works:\nThe two heaps always represent lower and upper partitions of the sorted stream. Their top elements are exactly the middle boundary values, so median extraction is constant time.',
      complexity: {
        time: 'O(log N) insert, O(1) median',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Skipping rebalance logic quickly breaks the size invariant and produces wrong medians.',
    'In languages without native max-heap, sign inversion must be handled consistently on push and pop.',
    'Averaging two large integers can overflow in fixed-width integer types; cast to wider type first.',
    'Returning integer division for even counts truncates fractional medians.',
    'If you only rebalance sizes but never enforce ordering (`left <= right`), heaps can overlap incorrectly.'
  ],
  concepts: [
    {
      name: 'Online Order Statistics',
      details:
        'The median is the middle rank after each update, so the data structure must support incremental rank maintenance.'
    },
    {
      name: 'Partition Invariants',
      details:
        'Correctness depends on both size balance and value ordering across the two heaps.'
    },
    {
      name: 'Boundary Representation',
      details:
        'Heap tops are the exact lower and upper median boundaries of the sorted stream.'
    },
    {
      name: 'Amortized Stream Thinking',
      details:
        'Each insertion performs local maintenance only, avoiding global reprocessing of historical data.'
    }
  ]
};
