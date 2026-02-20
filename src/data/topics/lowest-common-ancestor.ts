import type { TopicContent } from '../topicContent';

export const lowestCommonAncestor: TopicContent = {
  title: 'Lowest Common Ancestor',
  description:
    'The lowest common ancestor (LCA) of nodes `p` and `q` is the deepest node whose subtree contains both. LCA is a key primitive for distance queries, hierarchy checks, and path decomposition.',
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
        'Build root-to-node paths and compare them to find divergence point.\n\nStep-by-step mechanics:\n1. DFS to build `pathP` from root to `p`.\n2. DFS to build `pathQ` from root to `q`.\n3. Compare paths from root while node references match.\n4. Last common node is LCA.\n\n```python\nfunction findPath(node, target, path):\n    if node is null:\n        return False\n\n    path.append(node)\n\n    if node == target:\n        return True\n\n    if findPath(node.left, target, path) or findPath(node.right, target, path):\n        return True\n\n    path.pop()\n    return False\n\nfunction lcaByPaths(root, p, q):\n    pathP = []\n    pathQ = []\n\n    if not findPath(root, p, pathP) or not findPath(root, q, pathQ):\n        return null\n\n    i = 0\n    while i < len(pathP) and i < len(pathQ) and pathP[i] == pathQ[i]:\n        i += 1\n\n    return pathP[i - 1]\n```\n\nThis is easy to reason about, but uses extra path memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Single DFS Return Propagation)',
      content:
        'Use one post-order DFS; each subtree returns candidate match information upward.\n\nStep-by-step mechanics:\n1. Return `null` for empty subtree.\n2. If current node is `p` or `q`, return current node.\n3. Recurse left and right.\n4. If both children return non-null, current node is LCA split point.\n5. Else return whichever side is non-null.\n\n```python\nfunction lca(root, p, q):\n    if root is null:\n        return null\n\n    if root == p or root == q:\n        return root\n\n    left = lca(root.left, p, q)\n    right = lca(root.right, p, q)\n\n    if left is not null and right is not null:\n        return root\n\n    return left if left is not null else right\n```\n\nBST-specific optimization:\n```python\nfunction lcaBST(root, p, q):\n    curr = root\n\n    while curr is not null:\n        if p.val < curr.val and q.val < curr.val:\n            curr = curr.left\n        elif p.val > curr.val and q.val > curr.val:\n            curr = curr.right\n        else:\n            return curr\n\n    return null\n```\n\nWhy this works:\nLCA is the first node whose subtrees contain both targets in different branches or one target equals that node.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Advanced Approach (Binary Lifting for Many Queries)',
      content:
        'For static trees with many LCA queries, preprocess jump pointers (`2^k` ancestors) for each node.\n\nStep-by-step mechanics:\n1. Root tree and compute depth of every node.\n2. Build `up[v][k]` = `2^k`-th ancestor of node `v`.\n3. To query LCA of `a` and `b`:\n   - lift deeper node to same depth\n   - lift both nodes from high power to low until ancestors diverge\n   - parent of either node is LCA\n\n```python\nfunction lca(a, b):\n    if depth[a] < depth[b]:\n        a, b = b, a\n\n    diff = depth[a] - depth[b]\n    for k in range(MAXLOG - 1, -1, -1):\n        if (diff >> k) & 1:\n            a = up[a][k]\n\n    if a == b:\n        return a\n\n    for k in range(MAXLOG - 1, -1, -1):\n        if up[a][k] != up[b][k]:\n            a = up[a][k]\n            b = up[b][k]\n\n    return up[a][0]\n```\n\nWhy this matters:\nAfter `O(N log N)` preprocessing, each query is `O(log N)` instead of `O(N)`, which is critical for large query volumes.',
      complexity: {
        time: 'O(N log N) preprocess, O(log N) query',
        space: 'O(N log N)'
      }
    }
  ],
  pitfalls: [
    'Assuming both nodes exist without validation can produce misleading results.',
    'Confusing LCA in a BST with LCA in a general binary tree.',
    'Returning current node too early before evaluating both subtrees causes wrong ancestors.',
    'Comparing node values instead of node references fails when duplicate values exist.',
    'Binary lifting requires consistent root and parent initialization or jump table will be invalid.'
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
    },
    {
      name: 'Query Regime Optimization',
      details:
        'Single-query scenarios favor DFS solutions, while heavy query workloads favor preprocessing approaches like binary lifting.'
    }
  ]
};
