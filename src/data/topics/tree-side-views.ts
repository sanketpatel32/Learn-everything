import type { TopicContent } from '../topicContent';

export const treeSideViews: TopicContent = {
  title: 'Side Views (Left/Right/Top)',
  description:
    'Tree view problems ask which nodes remain visible under a geometric projection. Left/right views are depth boundary selections, while top view is a horizontal-distance visibility problem.',
  example:
    'For right-side view of `[1,2,3,null,5,null,4]`, output is `[1,3,4]`.',
  complexity: {
    time: 'O(N)',
    space: 'O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (DFS with Level Tracking)',
      content:
        'A DFS baseline records one visible candidate for each depth.\n\nStep-by-step mechanics for right view:\n1. Traverse in `root -> right -> left` order.\n2. First node seen at depth `d` is visible from right side.\n3. Save it only if depth has no existing recorded value.\n\nTo compute left view, just switch traversal order to `root -> left -> right`.\n\n```python\nfunction rightViewDFS(root):\n    ans = []\n\n    def dfs(node, depth):\n        if node is null:\n            return\n\n        if depth == len(ans):\n            ans.append(node.val)\n\n        dfs(node.right, depth + 1)\n        dfs(node.left, depth + 1)\n\n    dfs(root, 0)\n    return ans\n```\n\nWhy this works:\nDepth-first order decides visibility priority. Visiting the side you care about first guarantees first arrival at each depth is the visible boundary node.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (BFS by Levels)',
      content:
        'Level-order traversal gives exact control over boundaries at every depth.\n\nStep-by-step mechanics for side views:\n1. Push root to queue.\n2. Process one full level at a time.\n3. First node in level is left view candidate; last node is right view candidate.\n\nStep-by-step mechanics for top view:\n1. BFS with pairs `(node, hd)` where `hd` is horizontal distance.\n2. If `hd` is unseen, store node value.\n3. Left child uses `hd - 1`, right child uses `hd + 1`.\n4. Output values by sorted `hd`.\n\n```python\nfunction rightViewBFS(root):\n    if root is null:\n        return []\n\n    queue = [root]\n    ans = []\n\n    while queue:\n        size = len(queue)\n        for i in range(0, size):\n            node = queue.pop(0)\n            if i == size - 1:\n                ans.append(node.val)\n            if node.left is not null:\n                queue.append(node.left)\n            if node.right is not null:\n                queue.append(node.right)\n\n    return ans\n\nfunction topViewBFS(root):\n    if root is null:\n        return []\n\n    queue = [(root, 0)]\n    firstAtHd = {}\n\n    while queue:\n        node, hd = queue.pop(0)\n        if hd not in firstAtHd:\n            firstAtHd[hd] = node.val\n\n        if node.left is not null:\n            queue.append((node.left, hd - 1))\n        if node.right is not null:\n            queue.append((node.right, hd + 1))\n\n    return [firstAtHd[k] for k in sorted(firstAtHd.keys())]\n```\n\nWhy this works:\nBFS guarantees the first node encountered at each depth or horizontal distance is the visually front-most node for that projection.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Not separating levels in BFS leads to incorrect boundary picks.',
    'Top view requires first node per horizontal distance, not per depth.',
    'For DFS side views, traversal order must match desired direction.',
    'If top-view output is not sorted by horizontal distance, final order is incorrect.'
  ],
  concepts: [
    {
      name: 'Projection-based Queries',
      details:
        'Different views correspond to different ordering rules over nodes that share geometric projections.'
    },
    {
      name: 'Depth Bucketing',
      details:
        'Grouping nodes by depth is the key primitive for left and right side views.'
    }
  ]
};
