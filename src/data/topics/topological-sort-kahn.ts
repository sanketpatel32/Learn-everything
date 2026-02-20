import type { TopicContent } from '../topicContent';

export const topologicalSortKahn: TopicContent = {
  title: "Topological Sort / Kahn's",
  description:
    'Topological sort orders DAG vertices so every directed edge `u -> v` places `u` before `v`. Kahn algorithm uses indegrees and a queue.',
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
        'Repeatedly scan for nodes whose prerequisites are all satisfied, then remove them.\n\nStep-by-step mechanics:\n1. Maintain set of processed nodes.\n2. In each round, scan all nodes to find currently valid nodes.\n3. Add them to order and mark processed.\n4. Repeat until no progress.\n\n```python\nfunction topoBrute(nodes, prereq):\n    order = []\n    done = set()\n\n    while len(done) < len(nodes):\n        progressed = False\n        for u in nodes:\n            if u in done:\n                continue\n            if all(p in done for p in prereq[u]):\n                done.add(u)\n                order.append(u)\n                progressed = True\n\n        if not progressed:\n            return []\n\n    return order\n```\n\nMultiple full scans make this slower than needed.',
      complexity: {
        time: 'O(V^2 + E)',
        space: 'O(V)'
      }
    },
    {
      title: "Optimal Approach (Kahn's Algorithm)",
      content:
        'Track indegree counts and process zero-indegree nodes in queue.\n\nStep-by-step mechanics:\n1. Compute indegree for each node.\n2. Initialize queue with nodes whose indegree is 0.\n3. Pop node, append to topological order.\n4. For each outgoing edge, decrement neighbor indegree.\n5. If neighbor indegree becomes 0, enqueue it.\n6. If processed count < `V`, a cycle exists.\n\n```python\nfunction kahnTopo(adj, n):\n    indeg = [0] * n\n    for u in range(0, n):\n        for v in adj[u]:\n            indeg[v] += 1\n\n    queue = [u for u in range(0, n) if indeg[u] == 0]\n    order = []\n\n    while queue:\n        u = queue.pop(0)\n        order.append(u)\n        for v in adj[u]:\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                queue.append(v)\n\n    return order if len(order) == n else []\n```\n\nWhy this works:\nOnly nodes with no remaining prerequisites are emitted, preserving all dependency directions.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Topological sorting applies only to DAGs; cycles invalidate full ordering.',
    'Incorrect edge direction in graph build reverses dependency semantics.',
    'For deterministic order requirements, use priority queue instead of plain queue.'
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
    }
  ]
};
