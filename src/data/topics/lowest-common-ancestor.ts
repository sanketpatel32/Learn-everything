import type { TopicContent } from '../topicContent';

export const lowestCommonAncestor: TopicContent = {
  title: 'Lowest Common Ancestor',
  description:
    'The lowest common ancestor of nodes `p` and `q` is the deepest node that has both in its subtree. It is a core primitive for tree-distance, route, permission-hierarchy, and dependency queries.',
  example:
    'In tree with root `3`, left child `5`, right child `1`, LCA of `5` and `1` is `3`; LCA of `5` and `4` is `5` because a node can be ancestor of itself.',
  complexity: {
    time: 'O(N) general tree, O(H) BST',
    space: 'O(H)'
  },
  approaches: [
    {
      title: 'Brute Force (Store Paths from Root)',
      content:
        'Build explicit root-to-node paths for both targets, then compare paths node-by-node.\n\nStep-by-step mechanics:\n1. DFS once to build `pathP` from root to `p`.\n2. DFS again to build `pathQ` from root to `q`.\n3. Walk both arrays from index `0` while references match.\n4. Last matching node before divergence is LCA.\n\n```python\nfunction findPath(node, target, path):\n    if node is null:\n        return False\n\n    path.append(node)\n    if node == target:\n        return True\n\n    if findPath(node.left, target, path) or findPath(node.right, target, path):\n        return True\n\n    path.pop()\n    return False\n\nfunction lcaByPaths(root, p, q):\n    pathP = []\n    pathQ = []\n\n    if not findPath(root, p, pathP) or not findPath(root, q, pathQ):\n        return null\n\n    i = 0\n    while i < len(pathP) and i < len(pathQ) and pathP[i] == pathQ[i]:\n        i += 1\n\n    return pathP[i - 1]\n```\n\nWhy this is useful:\nThe approach is easy to debug visually because paths are explicit. It also generalizes to "distance between two nodes" once paths are known.\n\nTradeoff:\nYou do two root-to-target searches and keep extra path memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Single DFS Return Propagation)',
      content:
        'Use one post-order DFS where each subtree returns whether it found a target.\n\nStep-by-step mechanics:\n1. If current node is `null`, return `null`.\n2. If current node equals `p` or `q`, return itself upward.\n3. Recursively query left and right subtrees.\n4. If both sides return non-null, current node is the split point and therefore LCA.\n5. Otherwise return whichever side is non-null.\n\n```python\nfunction lca(root, p, q):\n    if root is null:\n        return null\n\n    if root == p or root == q:\n        return root\n\n    left = lca(root.left, p, q)\n    right = lca(root.right, p, q)\n\n    if left is not null and right is not null:\n        return root\n\n    if left is not null:\n        return left\n    return right\n```\n\nExtended validation variant (if targets may be missing):\n1. Run DFS and also count how many targets were seen.\n2. Return LCA only if both targets were discovered.\n\nWhy this works:\nLCA is exactly the first node where search results from left and right branches both become true. That condition appears naturally in post-order return propagation.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    }
  ],
  pitfalls: [
    'Assuming both nodes exist without validation can produce misleading results.',
    'Confusing LCA in a BST with LCA in a general binary tree.',
    'Returning current node too early before evaluating both subtrees causes wrong ancestors.',
    'Comparing node values instead of node references fails when duplicate values exist.'
  ],
  concepts: [
    {
      name: 'Split Point Principle',
      details:
        'LCA is where search paths toward two targets diverge for the first time from root direction.'
    },
    {
      name: 'Post-order Reasoning',
      details:
        'The decision at each node depends on results from child subtrees, which is a post-order pattern.'
    }
  ]
};
