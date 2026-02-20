import { TopicContent } from '../topicContent';

export const twoPointers: TopicContent = {
  title: 'Two Pointers Technique',
  description: 'Using two independent markers to scan an array. Usually one starts at the beginning and one at the end.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  tutorialSteps: [
    {
      title: 'The Strategy',
      content: 'Instead of one loop inside another, use two "pointers" that move towards each other based on what they find.'
    },
    {
      title: 'Common Scenario',
      content: 'Perfect for sorted arrays. If the sum of left + right is too high, move the right one down. If too low, move the left one up.'
    }
  ],
  pitfalls: [
    'Trying to use this on unsorted data without sorting it first.',
    "Incorrect stopping condition (e.g., pointers crossing when they shouldn't)."
  ],
  concepts: [
    {
      name: 'Opposite Directions',
      details: 'Pointers move from both ends towards the middle (e.g., reversing a string).'
    },
    {
      name: 'Fast & Slow',
      details: 'Both start at the beginning, but one moves twice as fast (useful for finding biological cycles in lists).'
    }
  ],
  example: 'Flipping a sentence horizontally or finding two numbers that add up to a target.'
};
