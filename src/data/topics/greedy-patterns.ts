import type { TopicContent } from '../topicContent';

export const greedyProofPatterns: TopicContent = {
  title: 'Greedy Proof Patterns',
  description:
    'Greedy algorithms make locally optimal choices that must be proven globally correct. Typical proof tools are exchange arguments and staying-ahead invariants.',
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
        'The baseline explores all possible valid selections and keeps the best objective.\n\nStep-by-step mechanics:\n1. Generate all subsets or recursive choices.\n2. Validate each candidate set.\n3. Compute objective and keep optimum.\n\n```python\nfunction maxActivitiesBrute(intervals, i, lastEnd):\n    if i == len(intervals):\n        return 0\n\n    skip = maxActivitiesBrute(intervals, i + 1, lastEnd)\n\n    take = 0\n    if intervals[i][0] >= lastEnd:\n        take = 1 + maxActivitiesBrute(intervals, i + 1, intervals[i][1])\n\n    return max(skip, take)\n```\n\nThis gives correctness baseline but exponential complexity.',
      complexity: {
        time: 'O(2^N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Sort + Greedy Selection with Proof)',
      content:
        'Choose items by a key that guarantees future flexibility.\n\nStep-by-step mechanics (activity selection):\n1. Sort intervals by end time ascending.\n2. Pick first interval.\n3. Repeatedly pick next interval whose start is not before current end.\n4. Count picks.\n\n```python\nfunction maxActivitiesGreedy(intervals):\n    intervals.sort(key=lambda x: x[1])\n\n    count = 0\n    lastEnd = -INF\n\n    for start, end in intervals:\n        if start >= lastEnd:\n            count += 1\n            lastEnd = end\n\n    return count\n```\n\nProof sketch style:\n1. Greedy picks earliest finishing interval `g`.\n2. Any optimal solution can swap its first chosen interval with `g` without reducing feasibility for later intervals.\n3. Reduced subproblem remains same form.\n4. Repeat inductively.\n\nWhy this works:\nGreedy choice preserves maximum remaining room for future selections, so local optimality extends globally with proof.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Using greedy without proof can pass samples but fail hidden counterexamples.',
    'Wrong sorting key (for example start time instead of end time) can break optimality.',
    'Some problems look greedy but actually require DP when local choices interact strongly.'
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
    }
  ]
};
