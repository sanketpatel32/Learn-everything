import type { TopicContent } from '../topicContent';

export const segmentTrees: TopicContent = {
  title: 'Segment Trees',
  description:
    'Segment Tree stores interval aggregates in a balanced binary decomposition of the array. It supports dynamic point updates and range queries in logarithmic time, and extends to range updates with lazy propagation.',
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
        'For each query, scan the requested range directly.\n\nStep-by-step mechanics:\n1. Query `[l, r]` iterates from `l` to `r` and aggregates.\n2. Point update writes directly into base array.\n3. Next query repeats scanning again.\n\n```python\nfunction rangeSumBrute(arr, l, r):\n    total = 0\n    for i in range(l, r + 1):\n        total += arr[i]\n    return total\n\nfunction updateBrute(arr, idx, val):\n    arr[idx] = val\n```\n\nThis is only acceptable for tiny arrays or very low query counts.',
      complexity: {
        time: 'O(N) query, O(1) update',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Tree over Intervals)',
      content:
        'Build a tree where each node represents interval `[l, r]` and stores aggregate for that interval.\n\nStep-by-step mechanics:\n1. Build:\n   - leaf node stores one array value\n   - internal node stores merge of child aggregates\n2. Query:\n   - no overlap -> identity\n   - full overlap -> node aggregate\n   - partial overlap -> recurse children and merge\n3. Point update:\n   - descend to target leaf\n   - update leaf\n   - recompute aggregates on return path\n\n```python\nfunction build(node, l, r):\n    if l == r:\n        tree[node] = arr[l]\n        return\n\n    mid = (l + r) // 2\n    build(2 * node, l, mid)\n    build(2 * node + 1, mid + 1, r)\n    tree[node] = tree[2 * node] + tree[2 * node + 1]\n\nfunction query(node, l, r, ql, qr):\n    if qr < l or r < ql:\n        return 0\n\n    if ql <= l and r <= qr:\n        return tree[node]\n\n    mid = (l + r) // 2\n    leftVal = query(2 * node, l, mid, ql, qr)\n    rightVal = query(2 * node + 1, mid + 1, r, ql, qr)\n    return leftVal + rightVal\n\nfunction update(node, l, r, idx, val):\n    if l == r:\n        tree[node] = val\n        return\n\n    mid = (l + r) // 2\n    if idx <= mid:\n        update(2 * node, l, mid, idx, val)\n    else:\n        update(2 * node + 1, mid + 1, r, idx, val)\n\n    tree[node] = tree[2 * node] + tree[2 * node + 1]\n```\n\nWhy this works:\nAny query interval can be represented as merge of only `O(log N)` disjoint node intervals.',
      complexity: {
        time: 'O(log N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Advanced Approach (Lazy Propagation for Range Updates)',
      content:
        'If updates apply to full ranges, push updates lazily instead of descending to all leaves.\n\nStep-by-step mechanics:\n1. Keep `tree` for aggregates and `lazy` for pending updates.\n2. On visiting node, apply pending lazy value to current node aggregate.\n3. Propagate pending value to children only when needed.\n4. Range update:\n   - no overlap: return\n   - full overlap: update node aggregate, store lazy for children, stop\n   - partial overlap: recurse children, then recompute current node\n5. Range query performs the same lazy-push before overlap checks.\n\n```python\nfunction push(node, l, r):\n    if lazy[node] == 0:\n        return\n\n    tree[node] += (r - l + 1) * lazy[node]\n\n    if l != r:\n        lazy[2 * node] += lazy[node]\n        lazy[2 * node + 1] += lazy[node]\n\n    lazy[node] = 0\n\nfunction rangeAdd(node, l, r, ql, qr, delta):\n    push(node, l, r)\n\n    if qr < l or r < ql:\n        return\n\n    if ql <= l and r <= qr:\n        lazy[node] += delta\n        push(node, l, r)\n        return\n\n    mid = (l + r) // 2\n    rangeAdd(2 * node, l, mid, ql, qr, delta)\n    rangeAdd(2 * node + 1, mid + 1, r, ql, qr, delta)\n    tree[node] = tree[2 * node] + tree[2 * node + 1]\n```\n\nWhy this matters:\nLazy propagation keeps both range update and range query at `O(log N)` by postponing unnecessary subtree work.',
      complexity: {
        time: 'O(log N) update/query',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Wrong neutral element in out-of-range case breaks query correctness.',
    'Indexing mistakes between 0-based array and tree segment bounds are common.',
    'Recursive implementation can be verbose; iterative tree arrays reduce overhead but increase index complexity.',
    'For min or max queries, merge and identity must be changed consistently everywhere.',
    'Lazy propagation bugs usually come from forgetting to push pending values before splitting on children.'
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
    },
    {
      name: 'Deferred Work (Lazy Propagation)',
      details:
        'Range updates can be delayed and pushed only when affected children are actually queried or updated.'
    }
  ]
};
