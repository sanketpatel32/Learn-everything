import { TopicContent } from '../topicContent';

export const treePathVariants: TopicContent = {
  title: 'Tree Path Patterns',
  description: 'Explores variants such as max path sum, root to leaf paths, and path given sum in binary trees.',
  complexity: {
    time: 'O(N)',
    space: 'O(H)'
  },
  concepts: [
    {
      name: 'Root to Leaf Path',
      details: 'A path starting at the root node and ending at any leaf node.'
    },
    {
      name: 'Any Node to Any Node Path',
      details: 'A path connecting any two nodes in the tree. The highest node in the path acts as the "LCA" of the path.'
    }
  ],
  approaches: [
    {
      title: 'Top-Down DFS (State Passing)',
      content: 'Pass current sum or path string down to children. When a leaf is reached, evaluate the accumulated path.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Bottom-Up DFS (Return Values)',
      content: 'Children return max straight path downwards. The parent combines these to find an "inverted V" path and updates a global max variable.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    }
  ],
  pitfalls: [
    'Forgetting that tree paths can have negative node values, thus requiring initialization with negative infinity.',
    'Only passing values down and failing to consider paths that "bend" at an intermediate parent node.',
    'Modifying arrays/lists passed by reference without proper backtracking/undo in DFS.'
  ]
};
