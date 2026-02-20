import type { TopicContent } from '../topicContent';

export const topologicalSortKahn: TopicContent = {
  title: "Topological Sort / Kahn's",
  description:
    'Topological sort orders DAG vertices so every directed edge `u -> v` places `u` before `v`. Kahn algorithm achieves this by repeatedly scheduling zero-indegree nodes.',
  example:
    'Course scheduling: if prerequisite graph has a topological order, all courses can be completed.',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V)'
  },
  approaches: [
    {
      title: 'Brute Force (Repeated Prerequisite Scans)',
      content:
        'Repeatedly scan all nodes and pick those whose prerequisites are currently satisfied.\n\nStep-by-step mechanics:\n1. Keep set `done` of already scheduled nodes.\n2. For each round, scan all nodes and select eligible ones.\n3. Add eligible nodes to order and mark them done.\n4. If one full round makes no progress, cycle exists.\n\n```python\nfunction topoBrute(nodes, prereq):\n    order = []\n    done = set()\n\n    while len(done) < len(nodes):\n        progressed = False\n\n        for u in nodes:\n            if u in done:\n                continue\n\n            if all(p in done for p in prereq[u]):\n                done.add(u)\n                order.append(u)\n                progressed = True\n\n        if not progressed:\n            return []\n\n    return order\n```\n\nCorrect but inefficient because each round rescans many nodes repeatedly.',
      complexity: {
        time: 'O(V^2 + E)',
        space: 'O(V)'
      }
    },
    {
      title: "Optimal Approach (Kahn's Algorithm)",
      content:
        'Maintain indegree counts and process nodes exactly when they become dependency-free.\n\nStep-by-step mechanics:\n1. Build adjacency list and indegree array.\n2. Initialize queue with all nodes where indegree is `0`.\n3. Pop from queue and append to result.\n4. For each outgoing edge `u -> v`, decrement `indegree[v]`.\n5. If `indegree[v]` becomes `0`, enqueue `v`.\n6. If processed nodes are fewer than `V`, graph has a cycle.\n\n```python\nfunction kahnTopo(adj, n):\n    indeg = [0] * n\n\n    for u in range(0, n):\n        for v in adj[u]:\n            indeg[v] += 1\n\n    queue = [u for u in range(0, n) if indeg[u] == 0]\n    order = []\n\n    while queue:\n        u = queue.pop(0)\n        order.append(u)\n\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                queue.append(v)\n\n    return order if len(order) == n else []\n```\n\nWhy this works:\nA node is output only after all incoming edges are removed, so every prerequisite appears earlier in order. Cycles never expose a zero-indegree node for all members, which naturally detects impossibility.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Topological sorting applies only to DAGs; cycles invalidate full ordering.',
    'Incorrect edge direction in graph build reverses dependency semantics.',
    'For deterministic order requirements, use priority queue instead of plain queue.',
    'Failing to include isolated nodes (no edges) causes incomplete ordering.'
  ],
  concepts: [
    {
      name: 'Indegree as Readiness Metric',
      details:
        'Zero indegree means no unresolved prerequisites, so node is ready to schedule.'
    },
    {
      name: 'Cycle Detection by Exhaustion',
      details:
        'If nodes remain with positive indegree after processing, graph contains a cycle.'
    },
    {
      name: 'Dependency Release',
      details:
        'Processing one node removes constraints on downstream nodes by decreasing their indegree.'
    }
  ]
};
