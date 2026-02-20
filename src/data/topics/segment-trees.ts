import type { TopicContent } from '../topicContent';

export const segmentTrees: TopicContent = {
  title: 'Segment Trees',
  description:
    'Segment Tree is a range-query data structure that stores aggregates over intervals. It supports both query and update in logarithmic time, which makes it ideal when arrays are dynamic and query volume is high.',
  example:
    'For array `[1,3,5,7,9,11]`, query sum on `[1,3]` returns `15`; after update `arr[2] = 6`, same query returns `16` in `O(log N)`.',
  complexity: {
    time: 'O(log N) query/update',
    space: 'O(4N) typical array implementation'
  },
  approaches: [
    {
      title: 'Brute Force (Recompute Range Every Query)',
      content:
        'Without a tree, each range query recomputes by scanning the interval.\n\nStep-by-step mechanics:\n1. Query `[l, r]` loops from `l` to `r` and aggregates result.\n2. Point update writes directly into array.\n3. Repeat full scans for every query.\n\n```python\nfunction rangeSumBrute(arr, l, r):\n    total = 0\n    for i in range(l, r + 1):\n        total += arr[i]\n    return total\n\nfunction updateBrute(arr, idx, val):\n    arr[idx] = val\n```\n\nThis is acceptable only when either updates are rare and query count is tiny, or `N` is very small.',
      complexity: {
        time: 'O(N) query, O(1) update',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Tree over Intervals)',
      content:
        'Build a binary tree where each node covers a segment `[start, end]` and stores the aggregate for that segment.\n\nStep-by-step mechanics:\n1. Build phase:\n   - leaf stores one array element.\n   - internal node stores merge of left and right child aggregates.\n2. Query phase:\n   - no overlap: return identity value.\n   - total overlap: return node aggregate.\n   - partial overlap: recurse both children and merge.\n3. Update phase:\n   - descend to target leaf.\n   - replace leaf value.\n   - recompute aggregates on path back to root.\n\n```python\nfunction build(node, l, r):\n    if l == r:\n        tree[node] = arr[l]\n        return\n\n    mid = (l + r) // 2\n    build(2 * node, l, mid)\n    build(2 * node + 1, mid + 1, r)\n    tree[node] = tree[2 * node] + tree[2 * node + 1]\n\nfunction query(node, l, r, ql, qr):\n    if qr < l or r < ql:\n        return 0\n\n    if ql <= l and r <= qr:\n        return tree[node]\n\n    mid = (l + r) // 2\n    leftVal = query(2 * node, l, mid, ql, qr)\n    rightVal = query(2 * node + 1, mid + 1, r, ql, qr)\n    return leftVal + rightVal\n\nfunction update(node, l, r, idx, val):\n    if l == r:\n        tree[node] = val\n        return\n\n    mid = (l + r) // 2\n    if idx <= mid:\n        update(2 * node, l, mid, idx, val)\n    else:\n        update(2 * node + 1, mid + 1, r, idx, val)\n\n    tree[node] = tree[2 * node] + tree[2 * node + 1]\n```\n\nWhy this works:\nA query interval decomposes into `O(log N)` disjoint segment blocks, so the tree avoids touching unrelated elements.',
      complexity: {
        time: 'O(log N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Wrong neutral element in out-of-range case breaks query correctness.',
    'Indexing mistakes between 0-based array and tree segment bounds are common.',
    'Recursive implementation can be verbose; iterative tree arrays reduce overhead but increase index complexity.',
    'For min or max queries, merge and identity must be changed consistently everywhere.'
  ],
  concepts: [
    {
      name: 'Divide and Merge',
      details:
        'A segment tree decomposes a range query into disjoint segment aggregates and merges them.'
    },
    {
      name: 'Generic Monoid Pattern',
      details:
        'Any associative operation with an identity element can be used, not just sums.'
    },
    {
      name: 'Point Update Propagation',
      details:
        'Only ancestors of the updated index need recomputation, which is why updates stay logarithmic.'
    }
  ]
};
