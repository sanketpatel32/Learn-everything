import type { TopicContent } from '../topicContent';

export const networkFlowFordFulkerson: TopicContent = {
  title: 'Network Flow (Ford-Fulkerson)',
  description:
    'Network Flow computes the maximum feasible transfer from source to sink under edge capacities. Ford-Fulkerson augments flow along residual paths until no improvement is possible.',
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
        'A brute-force formulation tries many possible edge-flow assignments and validates constraints.\n\nStep-by-step mechanics:\n1. Guess flow on each directed edge.\n2. Check capacity bounds for every edge.\n3. Check conservation at non-source/non-sink vertices.\n4. Track largest valid source outflow.\n\n```python\nfunction bruteMaxFlow(graph, s, t):\n    best = 0\n\n    for assignment in allPossibleAssignments(graph):\n        if isCapacityValid(assignment, graph) and isConservationValid(assignment, s, t):\n            best = max(best, outFlow(assignment, s))\n\n    return best\n```\n\nThis explains constraints but is computationally infeasible for meaningful graph sizes.',
      complexity: {
        time: 'Exponential',
        space: 'Large enumeration state'
      }
    },
    {
      title: 'Optimal Approach (Ford-Fulkerson / Edmonds-Karp)',
      content:
        'Use residual graph and repeatedly push additional flow through augmenting paths.\n\nStep-by-step mechanics:\n1. Start with zero flow everywhere.\n2. Residual capacity on edge `(u,v)` is `cap[u][v] - flow[u][v]`.\n3. Find any residual path from `s` to `t`.\n4. Bottleneck is minimum residual capacity on that path.\n5. Augment path by bottleneck:\n   - add on forward edges\n   - subtract on reverse edges\n6. Repeat until sink becomes unreachable in residual graph.\n\n```python\nfunction edmondsKarp(capacity, s, t):\n    n = len(capacity)\n    flow = [[0] * n for _ in range(n)]\n    maxFlow = 0\n\n    while True:\n        parent = [-1] * n\n        parent[s] = s\n        queue = [s]\n\n        while queue and parent[t] == -1:\n            u = queue.pop(0)\n            for v in range(0, n):\n                residual = capacity[u][v] - flow[u][v]\n                if parent[v] == -1 and residual > 0:\n                    parent[v] = u\n                    queue.append(v)\n\n        if parent[t] == -1:\n            break\n\n        bottleneck = INF\n        v = t\n        while v != s:\n            u = parent[v]\n            bottleneck = min(bottleneck, capacity[u][v] - flow[u][v])\n            v = u\n\n        v = t\n        while v != s:\n            u = parent[v]\n            flow[u][v] += bottleneck\n            flow[v][u] -= bottleneck\n            v = u\n\n        maxFlow += bottleneck\n\n    return maxFlow\n```\n\nWhy Edmonds-Karp specifically:\n- It chooses shortest augmenting path in number of edges (BFS).\n- This gives polynomial bound `O(V*E^2)` unlike generic DFS-based Ford-Fulkerson bound depending on max-flow value.\n\nWhy this works:\nResidual updates preserve feasibility and allow rerouting past decisions. When no augmenting path exists, residual cut certifies optimality by Max-Flow Min-Cut theorem.',
      complexity: {
        time: 'O(V*E^2) with BFS path selection (Edmonds-Karp)',
        space: 'O(V^2) matrix form or O(V+E) adjacency form'
      }
    }
  ],
  pitfalls: [
    'Forgetting reverse residual edges prevents flow cancellation and gives wrong answers.',
    'Using DFS path selection can be correct but may be very slow on some inputs.',
    'Mixing up original capacity graph and residual graph updates causes subtle bugs.',
    'Integer overflow can occur for large capacities if flow type is too small.'
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
    },
    {
      name: 'Augmenting Path Paradigm',
      details:
        'Maximum flow is reached by repeatedly finding feasible improvement directions in residual space until local optimum equals global optimum.'
    }
  ]
};
