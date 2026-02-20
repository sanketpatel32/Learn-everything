import type { TopicContent } from '../topicContent';

export const greedyProofPatterns: TopicContent = {
  title: 'Greedy Proof Patterns',
  description:
    'Greedy algorithms commit to locally optimal steps and require proof that local choices preserve global optimality. Core proof styles are exchange argument, cut property, and stays-ahead invariants.',
  example:
    'Activity selection: choose intervals by earliest finish time to maximize number of non-overlapping meetings.',
  complexity: {
    time: 'Usually O(N log N)',
    space: 'O(1) to O(N)'
  },
  approaches: [
    {
      title: 'Brute Force (Try All Choice Combinations)',
      content:
        'Baseline brute force explores include/exclude choices and computes exact optimum.\n\nStep-by-step mechanics:\n1. Recursively branch on taking or skipping each candidate.\n2. Carry current feasibility state (for example last end time).\n3. Return max objective among valid branches.\n\n```python\nfunction maxActivitiesBrute(intervals, i, lastEnd):\n    if i == len(intervals):\n        return 0\n\n    skip = maxActivitiesBrute(intervals, i + 1, lastEnd)\n\n    take = 0\n    if intervals[i][0] >= lastEnd:\n        take = 1 + maxActivitiesBrute(intervals, i + 1, intervals[i][1])\n\n    return max(skip, take)\n```\n\nThis is ideal as a truth oracle for small cases, but complexity is exponential.',
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Sort + Greedy Selection with Proof)',
      content:
        'Pick by a key that maximizes future flexibility, then prove safety of each choice.\n\nStep-by-step mechanics (activity selection):\n1. Sort intervals by end time ascending.\n2. Iterate and accept interval if it starts after or at current `lastEnd`.\n3. Update `lastEnd` when accepted.\n\n```python\nfunction maxActivitiesGreedy(intervals):\n    intervals.sort(key=lambda x: x[1])\n\n    count = 0\n    lastEnd = -INF\n\n    for start, end in intervals:\n        if start >= lastEnd:\n            count += 1\n            lastEnd = end\n\n    return count\n```\n\nExchange proof template:\n1. Let greedy pick `g` first.\n2. Take any optimal solution `OPT` with first pick `o`.\n3. Since `g` ends no later than `o`, replacing `o` with `g` keeps remaining feasibility.\n4. New solution has same size as `OPT` and starts with greedy choice.\n5. Apply recursively to suffix.\n\nCommon greedy signals:\n- locally minimal cost yields globally minimal frontier\n- matroid-like independence structure\n- cut property (MST)\n\nWhy this works:\nGreedy is valid only when local decision does not reduce reachable optimal future states. Proof, not intuition, is the acceptance criterion.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Using greedy without proof can pass samples but fail hidden counterexamples.',
    'Wrong sorting key (for example start time instead of end time) can break optimality.',
    'Some problems look greedy but actually require DP when local choices interact strongly.',
    'Tie-breaking rules may matter for correctness in edge-heavy inputs.'
  ],
  concepts: [
    {
      name: 'Exchange Argument',
      details:
        'Show any optimal solution can be transformed to include greedy choice without harming objective.'
    },
    {
      name: 'Stays-ahead Invariant',
      details:
        'After each step, greedy partial solution is at least as good as any other partial solution under a measurable criterion.'
    },
    {
      name: 'Greedy-choice Property',
      details:
        'A problem is greedily solvable only if an optimal solution exists that begins with the greedy choice at every step.'
    }
  ]
};
