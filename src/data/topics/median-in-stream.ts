import type { TopicContent } from '../topicContent';

export const medianInStream: TopicContent = {
  title: 'Median in a Stream',
  description:
    'Streaming median requires dynamic insertion and constant-time median read after each insert. The canonical solution is a two-heap partition around the middle.',
  example:
    'Stream: `5, 15, 1, 3` gives medians `5, 10, 5, 4` after each insertion.',
  complexity: {
    time: 'O(log N) insert, O(1) median',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Insert + Re-sort Array)',
      content:
        'Keep all values in a list and re-sort after each insertion.\n\nStep-by-step mechanics:\n1. Append incoming value.\n2. Sort full list.\n3. Compute median by parity:\n   - odd length: middle element\n   - even length: average of two middle elements\n\n```python\nfunction addNumBrute(arr, x):\n    arr.append(x)\n    arr.sort()\n\nfunction findMedianBrute(arr):\n    n = len(arr)\n    if n % 2 == 1:\n        return arr[n // 2]\n    return (arr[n // 2 - 1] + arr[n // 2]) / 2.0\n```\n\nThis is easy to implement but scales poorly because insertion triggers global reordering.',
      complexity: {
        time: 'O(N log N) per insert',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (MaxHeap Left + MinHeap Right)',
      content:
        'Split the stream into two halves:\n- `left` max-heap stores smaller half\n- `right` min-heap stores larger half\n\nCore invariants:\n1. Size difference is at most 1.\n2. Every value in `left` is less than or equal to every value in `right`.\n\nStep-by-step mechanics:\n1. Insert into one heap based on comparison with `left` max.\n2. Rebalance if one heap is larger by more than 1.\n3. Median read:\n   - equal sizes: average of two tops\n   - otherwise top of larger heap\n\n```python\nimport heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.left = []   # max-heap simulated via negative values\n        self.right = []  # min-heap\n\n    def addNum(self, x):\n        if not self.left or x <= -self.left[0]:\n            heapq.heappush(self.left, -x)\n        else:\n            heapq.heappush(self.right, x)\n\n        if len(self.left) > len(self.right) + 1:\n            heapq.heappush(self.right, -heapq.heappop(self.left))\n        elif len(self.right) > len(self.left) + 1:\n            heapq.heappush(self.left, -heapq.heappop(self.right))\n\n    def findMedian(self):\n        if len(self.left) == len(self.right):\n            return (-self.left[0] + self.right[0]) / 2.0\n        if len(self.left) > len(self.right):\n            return -self.left[0]\n        return self.right[0]\n```\n\nWhy this works:\nThe median boundary lies between lower and upper halves. Heap tops expose those boundary values directly while logarithmic insertion maintains partition invariants.',
      complexity: {
        time: 'O(log N) insert, O(1) median',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Forgetting rebalance conditions causes skewed heaps and wrong medians.',
    'In languages without built-in max-heap, sign inversion must be handled carefully.',
    'Using integer division for even count median can truncate values.',
    'If insertion rule and rebalance rule conflict, ordering invariant (`left <= right`) can break.'
  ],
  concepts: [
    {
      name: 'Order Statistic Maintenance',
      details:
        'Median is the middle order statistic; two heaps maintain lower and upper partitions incrementally.'
    },
    {
      name: 'Balance Invariant',
      details:
        'Heap size difference must stay at most 1 for constant-time median extraction.'
    },
    {
      name: 'Boundary Representation',
      details:
        'The two heap tops represent the lower and upper middle boundaries of sorted stream state.'
    }
  ]
};
