import { TopicContent } from '../topicContent';

export const binarySearchVariants: TopicContent = {
  title: 'Binary Search Variants',
  description: 'Explores lower/upper bound and searching on the answer variations of binary search.',
  complexity: {
    time: 'O(log N) or O(N log(Max-Min))',
    space: 'O(1)'
  },
  concepts: [
    {
      name: 'Lower Bound / Upper Bound',
      details: 'Finding the first occurrence or first element strictly greater than a target.'
    },
    {
      name: 'Binary Search on Answer',
      details: 'When the search space is monotonic (e.g. true, true, false, false), we binary search for the first valid or invalid condition.'
    },
    {
      name: 'Rotated Sorted Array Search',
      details: 'Finding a pivot or searching in an array that has been rotated by an unknown number of positions.'
    }
  ],
  approaches: [
    {
      title: 'Monotonic Predicate Method',
      content: 'Define a function isValid(mid). If isValid(mid) is true, we might search left (or right) to find the extremum. Update low = mid + 1 or high = mid - 1 based on the predicate.',
      complexity: {
        time: 'O(N log(Max-Min))',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Infinite loops when calculating mid = low + (high - low) / 2 without handling low <= high properly.',
    'Off-by-one errors returning low or high depending on the termination condition.',
    'Not ensuring the domain is strictly monotonic before applying binary search.'
  ]
};
