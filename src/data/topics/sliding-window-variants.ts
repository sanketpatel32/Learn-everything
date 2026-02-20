import { TopicContent } from '../topicContent';

export const slidingWindowVariants: TopicContent = {
  title: 'Sliding Window Variants',
  description: 'Explores the fixed-size and variable-size variations of the sliding window paradigm.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) to O(K)'
  },
  concepts: [
    {
      name: 'Fixed-Size Window',
      details: 'The window length is given and remains constant throughout the traversal (e.g., maximum sum subarray of size K).'
    },
    {
      name: 'Variable-Size Window',
      details: 'The window length expands and shrinks dynamically to satisfy a given condition (e.g., longest substring with K distinct characters).'
    }
  ],
  approaches: [
    {
      title: 'Fixed-Size Template',
      content: 'Maintain a window of size K. When the right pointer reaches K, process the window, then move the left pointer to keep the size at K.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Variable-Size Template',
      content: 'Expand the right pointer until the condition is violated. Then, shrink from the left until the condition is satisfied again. Track the optimal window at each valid state.',
      complexity: {
        time: 'O(N)',
        space: 'O(1) or O(K)'
      }
    }
  ],
  pitfalls: [
    'Forgetting to update the answer while sliding the window.',
    'Incorrect left pointer shrinking logic causing O(N^2) complexity.',
    'Not processing elements outside the window when shrinking.'
  ]
};
