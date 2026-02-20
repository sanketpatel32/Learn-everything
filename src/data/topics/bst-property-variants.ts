import { TopicContent } from '../topicContent';

export const bstPropertyVariants: TopicContent = {
  title: 'BST Property Variants',
  description: 'Explores validation, in-order properties, k-th smallest element, and successor patterns in Binary Search Trees.',
  complexity: {
    time: 'O(N) or O(H)',
    space: 'O(H)'
  },
  concepts: [
    {
      name: 'In-order Traversal Guarantee',
      details: 'The fundamental property of a BST: an in-order traversal yields a strictly increasing sequence of values.'
    },
    {
      name: 'Min/Max Range Validation',
      details: 'Every node in a BST must fall within a strict open/closed boundary (minVal < node.val < maxVal) defined by its ancestors.'
    }
  ],
  approaches: [
    {
      title: 'Top-Down Range Validation',
      content: 'Pass (-Infinity, Infinity) down. For left child, update max to node.val. For right child, update min to node.val.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Iterative K-th Smallest',
      content: 'Use an explicit stack to perform in-order traversal. Decrement K every time a node is popped. Once K == 0, you found the element.',
      complexity: {
        time: 'O(H + K)',
        space: 'O(H)'
      }
    },
    {
      title: 'Inorder Successor Search',
      content: 'If node has right child, find minimum in right subtree. Otherwise, search from root updating successor when branching left.',
      complexity: {
        time: 'O(H)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Only checking if node > left and node < right, completely ignoring deeper descendants violating the BST rule.',
    'Integer overflow when using standard INT_MIN and INT_MAX limits interchangeably with generic limits.',
    'Not handling duplicates properly depending on if the BST definition allows them.'
  ]
};
