import type { TopicContent } from '../topicContent';

export const dpOnTrees: TopicContent = {
  title: 'DP on Trees',
  description:
    'Tree DP solves optimization and counting problems where each node state depends on subtree summaries. It is usually driven by DFS with carefully designed state vectors and merge formulas.',
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
        'Use direct include or exclude branching without memoized subtree states.\n\nStep-by-step mechanics:\n1. If node is selected, children cannot be selected.\n2. If node is skipped, children can be independently optimized.\n3. Return max of these two branches.\n\n```python\nfunction robBrute(node):\n    if node is null:\n        return 0\n\n    take = node.val\n    if node.left is not null:\n        take += robBrute(node.left.left) + robBrute(node.left.right)\n    if node.right is not null:\n        take += robBrute(node.right.left) + robBrute(node.right.right)\n\n    skip = robBrute(node.left) + robBrute(node.right)\n    return max(take, skip)\n```\n\nThis captures recurrence structure, but repeated subtree computation causes exponential blow-up.',
      complexity: {
        time: 'O(2^N) worst',
        space: 'O(H)'
      }
    },
    {
      title: 'Optimal Approach (Return Multi-state DP per Node)',
      content:
        'Return compact per-node state vectors and merge children in post-order.\n\nStep-by-step mechanics:\n1. DFS children before parent.\n2. For each node compute two states:\n   - `take`: best value when node is selected\n   - `skip`: best value when node is not selected\n3. Merge child states with local transition formulas.\n4. Root answer is `max(take, skip)`.\n\n```python\nfunction dfs(node):\n    if node is null:\n        return [0, 0]  # [take, skip]\n\n    left = dfs(node.left)\n    right = dfs(node.right)\n\n    take = node.val + left[1] + right[1]\n    skip = max(left[0], left[1]) + max(right[0], right[1])\n\n    return [take, skip]\n\nfunction solve(root):\n    res = dfs(root)\n    return max(res[0], res[1])\n```\n\nGeneralization pattern:\n- Replace `[take, skip]` with any required state tuple.\n- Parent formulas combine child tuples.\n- Time stays linear when merge per edge is constant.',
      complexity: {
        time: 'O(N)',
        space: 'O(H)'
      }
    },
    {
      title: 'Advanced Variant (Rerooting DP)',
      content:
        'Some problems require answer for every possible root. Rerooting computes all-root answers in linear time.\n\nStep-by-step mechanics:\n1. First DFS (downward pass): compute subtree DP from children to parent.\n2. Second DFS (upward pass): propagate parent-side contribution to each child.\n3. Combine child and parent contributions to get full-tree answer per node.\n\n```python\nfunction dfsDown(u, p):\n    down[u] = base(u)\n    for v in adj[u]:\n        if v == p:\n            continue\n        dfsDown(v, u)\n        down[u] = merge(down[u], contributeChild(v, down[v]))\n\nfunction dfsUp(u, p, upValue):\n    answer[u] = combine(down[u], upValue)\n\n    prefix = buildPrefixContribs(u, p)\n    suffix = buildSuffixContribs(u, p)\n\n    for each child v of u:\n        withoutV = merge(prefixBefore(v), suffixAfter(v))\n        nextUp = liftToChild(u, merge(upValue, withoutV))\n        dfsUp(v, u, nextUp)\n```\n\nWhy this matters:\nRerooting converts naive `O(N^2)` all-root recomputation into `O(N)` by reusing local merge results.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Trying to memoize only by node value instead of node identity breaks correctness with duplicate values.',
    'Incorrect merge logic between child states is the most common bug.',
    'For deep trees, recursion depth can overflow in strict runtime environments.',
    'Mixing pre-order logic into a post-order dependency problem produces incomplete child-state data.',
    'In rerooting, incorrect exclusion of current child contribution causes double counting.'
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
    },
    {
      name: 'Local-to-global Reuse',
      details:
        'Tree DP succeeds by exporting only reusable summaries and never recomputing full subtrees.'
    }
  ]
};
