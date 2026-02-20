import { TopicContent } from '../topicContent';

export const llTwoPtrVariants: TopicContent = {
  title: 'Linked List Fast & Slow Pointers',
  description: 'Explores the tortoise and hare algorithm for finding the middle, cycle entry point, and list intersections.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  concepts: [
    {
      name: 'Finding the Middle',
      details: 'A fast pointer moves two steps while a slow pointer moves one. When the fast pointer reaches the end, the slow pointer is at the middle.'
    },
    {
      name: 'Cycle Detection & Entry Point',
      details: 'After detecting a cycle (fast == slow), reset one pointer to the head. Advance both pointers one step at a time; their meeting point is the cycle start.'
    },
    {
      name: 'Intersection of Two Lists',
      details: 'Traverse lists A and B. When reaching the end of A, redirect to B. When reaching the end of B, redirect to A. They will meet at the intersection node.'
    }
  ],
  approaches: [
    {
      title: 'Tortoise and Hare Pattern',
      content: 'Initialize slow and fast pointers to the head. while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Not checking fast.next != null before calling fast.next.next causing NullPointerException.',
    'Forgetting to handle even vs odd length list definitions for finding exactly the first or second middle node.',
    'Misunderstanding the math behind cycle entry detection (Floyd\'s Algorithm).'
  ]
};
