import type { TopicContent } from '../topicContent';

export const binarySearchOnAnswer: TopicContent = {
  title: 'Binary Search on Answer',
  description:
    'Binary Search on Answer applies when the answer is numeric and a monotonic feasibility check exists. Instead of searching array indices, you search the candidate answer space.',
  example:
    'Find minimum eating speed `k` so Koko can finish all piles within `h` hours.',
  complexity: {
    time: 'O(N log R)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Try All Candidates)',
      content:
        'Try all candidate answers in order and stop at first feasible one.\n\nStep-by-step mechanics:\n1. Determine valid numeric range `[lo, hi]`.\n2. For each candidate `x`, run `isFeasible(x)`.\n3. Return first valid `x` for minimization problems.\n\n```python\nfunction minFeasibleBrute(lo, hi, isFeasible):\n    for x in range(lo, hi + 1):\n        if isFeasible(x):\n            return x\n    return -1\n```\n\nThis guarantees correctness but becomes too slow when search range is large (for example up to `10^9`).',
      complexity: {
        time: 'O(N * R)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Monotonic Feasibility Binary Search)',
      content:
        'Exploit monotonic feasibility boundary.\n\nMonotonic pattern for minimization:\n- `False False False True True True`\n- goal: find first `True`\n\nStep-by-step mechanics:\n1. Build tight numeric bounds from problem constraints.\n2. While `lo <= hi`, test midpoint.\n3. If midpoint is feasible:\n   - store it as candidate answer\n   - continue left to find smaller feasible value\n4. If midpoint is not feasible, move right.\n\n```python\nfunction binarySearchAnswer(lo, hi, isFeasible):\n    ans = -1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n\n        if isFeasible(mid):\n            ans = mid\n            hi = mid - 1\n        else:\n            lo = mid + 1\n\n    return ans\n```\n\nFeasibility example (Koko speed):\n```python\nfunction canFinish(piles, h, k):\n    hours = 0\n    for p in piles:\n        hours += (p + k - 1) // k\n    return hours <= h\n```\n\nMaximization variant template:\n- if feasible at `mid`, move right (`lo = mid + 1`) while storing `mid`.\n- else move left.\n\nWhy this works:\nOnce feasibility is monotonic, answer is a boundary index in a virtual sorted boolean array, and binary search finds that boundary in `O(log R)` checks.',
      complexity: {
        time: 'O(N log R)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Applying this pattern without a monotonic feasibility function leads to incorrect results.',
    'Incorrect low/high bounds can miss valid answers.',
    'Using `(lo + hi) // 2` without overflow-safe form can break in fixed-width integer languages.',
    'Not updating answer when feasible can return boundary-adjacent wrong values.'
  ],
  concepts: [
    {
      name: 'Decision to Optimization Reduction',
      details:
        'Convert optimization goal into yes/no feasibility and then locate boundary with binary search.'
    },
    {
      name: 'Search Space Engineering',
      details:
        'Choosing tight numeric bounds reduces iterations and simplifies correctness proofs.'
    },
    {
      name: 'Boundary-finding Template',
      details:
        'Binary search on answer is fundamentally first-true or last-true boundary detection over feasibility outcomes.'
    }
  ]
};
