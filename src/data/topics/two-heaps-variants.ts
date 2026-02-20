import { TopicContent } from '../topicContent';

export const twoHeapsVariants: TopicContent = {
  title: 'Two Heaps Pattern',
  description: 'Explores the two-heap technique used for sliding window median, scheduling/meeting rooms, and stream median problems.',
  complexity: {
    time: 'O(log N)',
    space: 'O(N)'
  },
  concepts: [
    {
      name: 'Balancing Two Heaps',
      details: 'Using a Max-Heap for the smaller half of a dataset and a Min-Heap for the larger half guarantees O(1) median access.'
    },
    {
      name: 'Sliding Window Median',
      details: 'As items enter and exit a window, the heaps are rebalanced. A hash map or lazy deletion method tracks elements exiting the window.'
    }
  ],
  approaches: [
    {
      title: 'Stream Median',
      content: 'Maintain maxHeap (left half) and minHeap (right half). Push to maxHeap first. Pop maxHeap to minHeap to ensure minHeap elements are strictly greater. Balance so maxHeap count >= minHeap count.',
      complexity: {
        time: 'O(log N) insertion, O(1) query',
        space: 'O(N)'
      }
    },
    {
      title: 'Meeting Rooms / Scheduling',
      content: 'Sort intervals by start time. Use a minHeap tracking end times of currently active meetings. If a new meeting starts after the earliest end time, pop the minHeap. The size of the heap is the number of concurrent rooms needed.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Inserting integers without rebalancing heaps, skewing the median output entirely.',
    'Forgetting to eagerly remove delayed/deleted numbers that happen to sit at the top of the heap in sliding window problems.',
    'Not realizing JavaScript requires a custom Priority Queue implementation since it lacks a native heap structure.'
  ]
};
