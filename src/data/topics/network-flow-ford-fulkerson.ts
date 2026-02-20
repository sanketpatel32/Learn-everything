import type { TopicContent } from '../topicContent';

export const networkFlowFordFulkerson: TopicContent = {
  title: 'Network Flow (Ford-Fulkerson)',
  description:
    'Network Flow finds maximum transferable flow from source to sink under edge capacity constraints. Ford-Fulkerson builds flow incrementally through augmenting paths in the residual graph.',
  example:
    'Given directed capacities from source `s` to sink `t`, compute maximum flow value (for example, in bipartite matching or bandwidth routing).',
  complexity: {
    time: 'O(E * maxFlow) for basic Ford-Fulkerson, O(V*E^2) for Edmonds-Karp',
    space: 'O(V + E)'
  },
  approaches: [
    {
      title: 'Brute Force (Try All Flow Assignments)',
      content:
        'A naive strategy enumerates possible flow assignments and checks feasibility constraints.\n\nStep-by-step mechanics:\n1. Assign tentative flow on each edge.\n2. Validate capacity constraints (`0 <= f(u,v) <= c(u,v)`).\n3. Validate flow conservation on non-terminal vertices.\n4. Keep maximum feasible source outflow.\n\n```python\nfunction bruteMaxFlow(graph, s, t):\n    best = 0\n\n    for assignment in allPossibleAssignments(graph):\n        if isCapacityValid(assignment, graph) and isConservationValid(assignment, s, t):\n            best = max(best, outFlow(assignment, s))\n\n    return best\n```\n\nThis is conceptually correct but combinatorially intractable.',
      complexity: {
        time: 'Exponential',
        space: 'Large enumeration state'
      }
    },
    {
      title: 'Optimal Approach (Ford-Fulkerson / Edmonds-Karp)',
      content:
        'Maintain residual capacities and repeatedly augment along `s -> t` paths until none exists.\n\nStep-by-step mechanics:\n1. Initialize all flows to `0`.\n2. Build residual graph where each edge has remaining capacity.\n3. Find augmenting path from `s` to `t`.\n4. Compute bottleneck capacity (minimum residual edge on path).\n5. Add bottleneck to forward edges and subtract on reverse edges.\n6. Repeat until no augmenting path remains.\n\n```python\nfunction edmondsKarp(capacity, s, t):\n    n = len(capacity)\n    flow = [[0] * n for _ in range(n)]\n    maxFlow = 0\n\n    while True:\n        parent = [-1] * n\n        parent[s] = s\n        queue = [s]\n\n        while queue and parent[t] == -1:\n            u = queue.pop(0)\n            for v in range(0, n):\n                residual = capacity[u][v] - flow[u][v]\n                if parent[v] == -1 and residual > 0:\n                    parent[v] = u\n                    queue.append(v)\n\n        if parent[t] == -1:\n            break\n\n        bottleneck = INF\n        v = t\n        while v != s:\n            u = parent[v]\n            bottleneck = min(bottleneck, capacity[u][v] - flow[u][v])\n            v = u\n\n        v = t\n        while v != s:\n            u = parent[v]\n            flow[u][v] += bottleneck\n            flow[v][u] -= bottleneck\n            v = u\n\n        maxFlow += bottleneck\n\n    return maxFlow\n```\n\nWhy this works:\nEach augmentation improves total flow while preserving constraints. When no augmenting path exists in residual graph, current flow is maximum (Max-Flow Min-Cut theorem).',
      complexity: {
        time: 'O(V*E^2) with BFS path selection (Edmonds-Karp)',
        space: 'O(V^2) matrix form or O(V+E) adjacency form'
      }
    }
  ],
  pitfalls: [
    'Forgetting reverse residual edges prevents flow cancellation and gives wrong answers.',
    'Using DFS path selection can be correct but may be very slow on some inputs.',
    'Mixing up original capacity graph and residual graph updates causes subtle bugs.'
  ],
  concepts: [
    {
      name: 'Residual Graph',
      details:
        'Residual edges represent how much additional flow can be pushed (forward) or undone (reverse).'
    },
    {
      name: 'Max-Flow Min-Cut',
      details:
        'Algorithm terminates at optimum when no augmenting path exists; flow value equals capacity of a minimum `s-t` cut.'
    }
  ]
};
