import type { TopicContent } from '../topicContent';

export const recursiveIterativeTraversals: TopicContent = {
  title: 'Recursive & Iterative Traversals',
  description:
    'Tree traversal is the foundation for almost every tree problem. Mastery means knowing not only pre-order, in-order, and post-order visit orders, but also when recursion is safe and when iterative control is required.',
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
        'Recursion mirrors the inductive shape of a tree and is often the fastest way to reason about correctness.\n\nStep-by-step mechanics:\n1. Define a base case: if node is `null`, return immediately.\n2. Choose where the "visit" operation happens relative to child calls.\n3. Maintain output list passed by reference.\n4. Repeat identical logic for every subtree.\n\n```python\nfunction preorder(node, ans):\n    if node is null:\n        return\n    ans.append(node.val)\n    preorder(node.left, ans)\n    preorder(node.right, ans)\n\nfunction inorder(node, ans):\n    if node is null:\n        return\n    inorder(node.left, ans)\n    ans.append(node.val)\n    inorder(node.right, ans)\n\nfunction postorder(node, ans):\n    if node is null:\n        return\n    postorder(node.left, ans)\n    postorder(node.right, ans)\n    ans.append(node.val)\n```\n\nWhy interviewers still ask this:\n- It reveals whether you understand structural recursion.\n- Many later problems (validate BST, height, diameter, path sum) are just customized DFS visits.\n\nTradeoff:\nElegant and short, but call-stack depth is `O(H)` and can overflow on worst-case skewed trees.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (Iterative Stack Traversal)',
      content:
        'Use an explicit stack when recursion depth might be unsafe or when you need tighter traversal-state control.\n\nStep-by-step mechanics for iterative in-order:\n1. Initialize `stack = []`, `curr = root`, `ans = []`.\n2. Push left chain while `curr` is non-null.\n3. Pop one node, visit it.\n4. Shift to popped node\'s right child.\n5. Repeat until both `curr` is null and stack is empty.\n\n```python\nfunction inorderIterative(root):\n    stack = []\n    ans = []\n    curr = root\n\n    while curr is not null or stack:\n        while curr is not null:\n            stack.append(curr)\n            curr = curr.left\n\n        curr = stack.pop()\n        ans.append(curr.val)\n        curr = curr.right\n\n    return ans\n```\n\nIterative pre-order template:\n```python\nfunction preorderIterative(root):\n    if root is null:\n        return []\n\n    stack = [root]\n    ans = []\n\n    while stack:\n        node = stack.pop()\n        ans.append(node.val)\n        if node.right is not null:\n            stack.append(node.right)\n        if node.left is not null:\n            stack.append(node.left)\n\n    return ans\n```\n\nWhy this works:\nThe explicit stack is a manual simulation of recursive frames, but now you control push/pop order directly, which makes traversal order and memory behavior predictable.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    }
  ],
  pitfalls: [
    'Mixing traversal orders leads to subtle logic errors in downstream algorithms.',
    'In iterative pre-order, pushing `left` before `right` visits nodes in wrong order.',
    'For iterative DFS, forgetting the `curr is not null or stack` loop condition misses nodes.',
    'Very deep skewed trees can crash recursive implementations.'
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
    }
  ]
};
