import type { TopicContent } from '../topicContent';

export const dpOnTrees: TopicContent = {
  title: 'DP on Trees',
  description:
    'Tree DP solves optimization/counting tasks where each node state depends on child subtree states. It is usually implemented with post-order DFS because parent transitions require completed child results.',
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
        'A naive recursion branches on whether to include current node or not.\n\nStep-by-step mechanics:\n1. If taking current node, direct children become unavailable.\n2. If skipping current node, both children remain available.\n3. Return max of the two choices.\n\n```python\nfunction robBrute(node):\n    if node is null:\n        return 0\n\n    take = node.val\n    if node.left is not null:\n        take += robBrute(node.left.left) + robBrute(node.left.right)\n    if node.right is not null:\n        take += robBrute(node.right.left) + robBrute(node.right.right)\n\n    skip = robBrute(node.left) + robBrute(node.right)\n\n    return max(take, skip)\n```\n\nThis expresses the recurrence but repeatedly recomputes identical subtrees across branches.',
      complexity: {
        time: 'O(2^N) worst',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (Return Multi-state DP per Node)',
      content:
        'Return a compact DP state per node, usually a tuple of alternatives.\n\nStep-by-step mechanics:\n1. Post-order DFS computes child states first.\n2. For each node return `[take, skip]`:\n   - `take`: best value when current node is selected.\n   - `skip`: best value when current node is not selected.\n3. Merge child states into parent state.\n4. Final answer comes from root state.\n\n```python\nfunction dfs(node):\n    if node is null:\n        return [0, 0]  # [take, skip]\n\n    left = dfs(node.left)\n    right = dfs(node.right)\n\n    take = node.val + left[1] + right[1]\n    skip = max(left[0], left[1]) + max(right[0], right[1])\n\n    return [take, skip]\n\nfunction solve(root):\n    res = dfs(root)\n    return max(res[0], res[1])\n```\n\nGeneralization pattern:\n- Tree DP often returns vectors with multiple states (coloring, matching, distances, subtree counts).\n- Parent transition combines children via fixed formulas.\n\nWhy this works:\nEvery subtree is solved once, and each node exports exactly the state information required by its parent transition.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    }
  ],
  pitfalls: [
    'Trying to memoize only by node value instead of node identity breaks correctness with duplicate values.',
    'Incorrect merge logic between child states is the most common bug.',
    'For deep trees, recursion depth can overflow in strict runtime environments.',
    'Mixing pre-order logic into a post-order dependency problem produces incomplete child-state data.'
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
    },
    {
      name: 'State Vector Design',
      details:
        'Choosing minimal but sufficient state per node is the core design task in tree DP problems.'
    }
  ]
};
