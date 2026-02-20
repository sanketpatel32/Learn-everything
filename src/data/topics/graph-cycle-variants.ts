import { TopicContent } from '../topicContent';

export const graphCycleVariants: TopicContent = {
  title: 'Graph Cycle Detection Variants',
  description: 'Explores directed vs undirected cycle detection in graphs using DFS, BFS/Kahn\'s algorithm, and DSU.',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V)'
  },
  concepts: [
    {
      name: 'Undirected Graph Cycle',
      details: 'A cycle exists if we visit an already visited node that is NOT the direct parent of the current node.'
    },
    {
      name: 'Directed Graph Cycle',
      details: 'A cycle exists if we visit a node that is currently in the active DFS recursion stack (back edge), or if Kahn\'s algorithm cannot process all vertices.'
    }
  ],
  approaches: [
    {
      title: 'DFS Stack Array (Directed)',
      content: 'Maintain a boolean array pathVisited. If we encounter a node that is visited AND pathVisited is true, a cycle is detected.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    },
    {
      title: 'Kahn\'s BFS (Directed)',
      content: 'Calculate in-degrees. Decrement in-degree of neighbors as you process nodes with 0 in-degree. If the count of processed nodes != V, there is a cycle.',
      complexity: {
        time: 'O(V + E)',
        space: 'O(V)'
      }
    },
    {
      title: 'Disjoint Set Union (Undirected)',
      content: 'Iterate through all edges. If both endpoints belong to the same parent set, a cycle exists. This only works for undirected graphs.',
      complexity: {
        time: 'O(E * α(V))',
        space: 'O(V)'
      }
    }
  ],
  pitfalls: [
    'Applying undirected cycle logic to a directed graph (parent check does not apply).',
    'Forgetting to reset the pathVisited flag upon returning from DFS recursion.',
    'Not handling disconnected graph components when starting validations.'
  ]
};
