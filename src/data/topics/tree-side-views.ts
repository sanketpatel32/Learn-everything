import type { TopicContent } from '../topicContent';

export const treeSideViews: TopicContent = {
  title: 'Side Views (Left/Right/Top)',
  description:
    'Tree view problems select visible nodes under different geometric projections. Left and right views are depth-boundary selections, while top and bottom views are horizontal-distance visibility rules.',
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
        'A DFS baseline stores first visible candidate at each depth.\n\nStep-by-step mechanics for right view:\n1. Traverse in `root -> right -> left` order.\n2. First node encountered at each depth is rightmost visible.\n3. Record only when depth appears first time.\n\nLeft view is symmetric with `root -> left -> right` order.\n\n```python\nfunction rightViewDFS(root):\n    ans = []\n\n    def dfs(node, depth):\n        if node is null:\n            return\n\n        if depth == len(ans):\n            ans.append(node.val)\n\n        dfs(node.right, depth + 1)\n        dfs(node.left, depth + 1)\n\n    dfs(root, 0)\n    return ans\n```\n\nThis is concise and often enough for side-view interview questions.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (BFS by Levels)',
      content:
        'BFS by levels gives deterministic access to leftmost and rightmost nodes per depth.\n\nStep-by-step mechanics for side views:\n1. Push root into queue.\n2. Process one full level each loop.\n3. First node in level gives left view; last node gives right view.\n\nStep-by-step mechanics for top view:\n1. BFS with `(node, hd)` where `hd` is horizontal distance from root.\n2. First node seen at each `hd` is top-view visible.\n3. Sort by `hd` for final order.\n\n```python\nfrom collections import deque\n\nfunction rightViewBFS(root):\n    if root is null:\n        return []\n\n    q = deque([root])\n    ans = []\n\n    while q:\n        size = len(q)\n        for i in range(0, size):\n            node = q.popleft()\n            if i == size - 1:\n                ans.append(node.val)\n            if node.left is not null:\n                q.append(node.left)\n            if node.right is not null:\n                q.append(node.right)\n\n    return ans\n\nfunction topViewBFS(root):\n    if root is null:\n        return []\n\n    q = deque([(root, 0)])\n    firstAtHd = {}\n\n    while q:\n        node, hd = q.popleft()\n        if hd not in firstAtHd:\n            firstAtHd[hd] = node.val\n\n        if node.left is not null:\n            q.append((node.left, hd - 1))\n        if node.right is not null:\n            q.append((node.right, hd + 1))\n\n    return [firstAtHd[k] for k in sorted(firstAtHd.keys())]\n```\n\nWhy this works:\nLevel-order traversal ensures first encounter at a projection bucket corresponds to nearest visible node for that bucket.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Variant (Bottom View via Last Seen per HD)',
      content:
        'Bottom view uses the deepest visible node at each horizontal distance. BFS can capture this by overwriting per-`hd` values while scanning levels.\n\nStep-by-step mechanics:\n1. BFS queue stores `(node, hd)`.\n2. For each popped node, write `valueAtHd[hd] = node.val` (overwrite allowed).\n3. Push children with `hd - 1` and `hd + 1`.\n4. Final answer is values sorted by `hd`.\n\n```python\nfrom collections import deque\n\nfunction bottomView(root):\n    if root is null:\n        return []\n\n    q = deque([(root, 0)])\n    valueAtHd = {}\n\n    while q:\n        node, hd = q.popleft()\n        valueAtHd[hd] = node.val\n\n        if node.left is not null:\n            q.append((node.left, hd - 1))\n        if node.right is not null:\n            q.append((node.right, hd + 1))\n\n    return [valueAtHd[k] for k in sorted(valueAtHd.keys())]\n```\n\nWhy this matters:\nTop and bottom views differ only in first-seen versus last-seen policy per horizontal distance, which is a reusable design pattern.',
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
    'If top-view output is not sorted by horizontal distance, final order is incorrect.',
    'For bottom view, using first-seen instead of last-seen per horizontal distance gives top-view-like output.'
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
    },
    {
      name: 'Horizontal Distance Mapping',
      details:
        'Top and bottom views reduce to choosing representative nodes per horizontal-distance bucket.'
    }
  ]
};
