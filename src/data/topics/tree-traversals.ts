import type { TopicContent } from '../topicContent';

export const recursiveIterativeTraversals: TopicContent = {
  title: 'Recursive & Iterative Traversals',
  description:
    'Tree traversal is the base layer for most tree algorithms. Mastery means understanding visit order semantics (pre, in, post), stack behavior, and when to switch between recursion, explicit stacks, or threaded traversal.',
  example:
    'For tree `1 / \\ 2 3 / \\ 4 5`, pre-order is `[1,2,4,5,3]`, in-order is `[4,2,5,1,3]`, and post-order is `[4,5,2,3,1]`.',
  complexity: {
    time: 'O(N)',
    space: 'O(H) recursion stack or explicit stack'
  },
  approaches: [
    {
      title: 'Brute Force (Recursive DFS)',
      content:
        'Recursion directly mirrors tree structure and makes correctness reasoning straightforward.\n\nStep-by-step mechanics:\n1. Base case: return on `null` node.\n2. Place visit action before, between, or after child calls depending on traversal order.\n3. Recurse into left and right children.\n\n```python\nfunction preorder(node, ans):\n    if node is null:\n        return\n    ans.append(node.val)\n    preorder(node.left, ans)\n    preorder(node.right, ans)\n\nfunction inorder(node, ans):\n    if node is null:\n        return\n    inorder(node.left, ans)\n    ans.append(node.val)\n    inorder(node.right, ans)\n\nfunction postorder(node, ans):\n    if node is null:\n        return\n    postorder(node.left, ans)\n    postorder(node.right, ans)\n    ans.append(node.val)\n```\n\nWhy this is foundational:\nMany tree tasks are traversal + local logic (height, BST validation, subtree sums, diameters).',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (Iterative Stack Traversal)',
      content:
        'Use explicit stacks when recursion depth is unsafe or when traversal state needs manual control.\n\nStep-by-step mechanics for iterative in-order:\n1. Keep `curr` pointer and stack.\n2. Push full left chain.\n3. Pop node, visit it, then move to its right child.\n4. Continue until both stack and `curr` are empty.\n\n```python\nfunction inorderIterative(root):\n    stack = []\n    ans = []\n    curr = root\n\n    while curr is not null or stack:\n        while curr is not null:\n            stack.append(curr)\n            curr = curr.left\n\n        curr = stack.pop()\n        ans.append(curr.val)\n        curr = curr.right\n\n    return ans\n```\n\nIterative post-order (single stack with last-visited pointer):\n```python\nfunction postorderIterative(root):\n    stack = []\n    ans = []\n    curr = root\n    last = null\n\n    while curr is not null or stack:\n        if curr is not null:\n            stack.append(curr)\n            curr = curr.left\n        else:\n            peek = stack[-1]\n            if peek.right is not null and last != peek.right:\n                curr = peek.right\n            else:\n                ans.append(peek.val)\n                last = stack.pop()\n\n    return ans\n```\n\nWhy this works:\nStack frames are simulated explicitly, so each node is visited with deterministic push-pop order.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Advanced Variant (Morris In-order, O(1) Extra Space)',
      content:
        'Morris traversal performs in-order without stack or recursion by temporarily threading predecessor links.\n\nStep-by-step mechanics:\n1. If current node has no left child, visit it and move right.\n2. Otherwise find rightmost node of left subtree (`pred`).\n3. If `pred.right` is null, set `pred.right = curr` (thread) and move left.\n4. If `pred.right` already points to `curr`, remove thread, visit `curr`, move right.\n\n```python\nfunction inorderMorris(root):\n    ans = []\n    curr = root\n\n    while curr is not null:\n        if curr.left is null:\n            ans.append(curr.val)\n            curr = curr.right\n        else:\n            pred = curr.left\n            while pred.right is not null and pred.right != curr:\n                pred = pred.right\n\n            if pred.right is null:\n                pred.right = curr\n                curr = curr.left\n            else:\n                pred.right = null\n                ans.append(curr.val)\n                curr = curr.right\n\n    return ans\n```\n\nWhy this matters:\nMorris gives `O(1)` extra traversal space, useful under strict memory constraints while preserving `O(N)` time.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Mixing traversal orders leads to subtle logic errors in downstream algorithms.',
    'In iterative pre-order, pushing `left` before `right` visits nodes in wrong order.',
    'For iterative DFS, forgetting the `curr is not null or stack` loop condition misses nodes.',
    'Very deep skewed trees can crash recursive implementations.',
    'Morris traversal must restore modified links, or the original tree structure is corrupted.'
  ],
  concepts: [
    {
      name: 'Traversal Order Semantics',
      details:
        'Pre-order is useful for serialization, in-order for BST sorted output, and post-order for bottom-up computations.'
    },
    {
      name: 'Explicit Stack Simulation',
      details:
        'Any recursive traversal can be transformed into an iterative one by tracking pending nodes in a stack.'
    },
    {
      name: 'Threaded Traversal',
      details:
        'Morris traversal reuses null child pointers temporarily as return links, removing auxiliary stack usage.'
    }
  ]
};
