import type { TopicContent } from '../topicContent';

export const dpOnTrees: TopicContent = {
  title: 'DP on Trees',
  description:
    'Tree DP solves optimization/counting tasks where each node decision depends on child subtree results. It is typically implemented with post-order DFS.',
  example:
    'House Robber III: maximize sum of non-adjacent tree nodes where selecting a node forbids selecting its children.',
  complexity: {
    time: 'O(N)',
    space: 'O(H)'
  },
  approaches: [
    {
      title: 'Brute Force (Try Include/Exclude Recursively)',
      content:
        'A naive recursion considers selecting or skipping each node, re-solving overlapping subtrees repeatedly.\n\nStep-by-step mechanics:\n1. If selecting node, skip direct children and recurse grandchildren.\n2. If skipping node, recurse children freely.\n3. Take max of both choices.\n\n```python\nfunction robBrute(node):\n    if node is null:\n        return 0\n\n    take = node.val\n    if node.left is not null:\n        take += robBrute(node.left.left) + robBrute(node.left.right)\n    if node.right is not null:\n        take += robBrute(node.right.left) + robBrute(node.right.right)\n\n    skip = robBrute(node.left) + robBrute(node.right)\n    return max(take, skip)\n```\n\nThis recalculates identical subtrees and can become exponential.',
      complexity: {
        time: 'O(2^N) worst',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (Return Multi-state DP per Node)',
      content:
        'Return a state pair from each node: value if node is taken and if node is skipped.\n\nStep-by-step mechanics:\n1. DFS post-order so child states are computed first.\n2. For node:\n   - `take = node.val + left.skip + right.skip`\n   - `skip = max(left.take, left.skip) + max(right.take, right.skip)`\n3. Final answer is `max(root.take, root.skip)`.\n\n```python\nfunction dfs(node):\n    if node is null:\n        return [0, 0]  # [take, skip]\n\n    left = dfs(node.left)\n    right = dfs(node.right)\n\n    take = node.val + left[1] + right[1]\n    skip = max(left[0], left[1]) + max(right[0], right[1])\n\n    return [take, skip]\n\nfunction solve(root):\n    res = dfs(root)\n    return max(res[0], res[1])\n```\n\nWhy this works:\nEach node summarizes exactly the information parent needs, eliminating repeated subtree recomputation.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    }
  ],
  pitfalls: [
    'Trying to memoize only by node value instead of node identity breaks correctness with duplicate values.',
    'Incorrect merge logic between child states is the most common bug.',
    'For deep trees, recursion depth can overflow in strict runtime environments.'
  ],
  concepts: [
    {
      name: 'Subtree State Summaries',
      details:
        'Each subtree returns compact state vectors consumed by parent transitions.'
    },
    {
      name: 'Post-order Dependency',
      details:
        'Parent decisions depend on completed child results, making post-order traversal natural for tree DP.'
    }
  ]
};
