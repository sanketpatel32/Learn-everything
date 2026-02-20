import type { TopicContent } from '../topicContent';

export const binarySearchOnAnswer: TopicContent = {
  title: 'Binary Search on Answer',
  description:
    'Binary Search on Answer is used when the answer is numeric and feasibility is monotonic. Instead of searching data positions, you search the candidate value range and locate the first or last feasible boundary.',
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
        'Enumerate each candidate answer and run feasibility check.\n\nStep-by-step mechanics:\n1. Derive valid range `[lo, hi]` from constraints.\n2. Iterate `x` from `lo` to `hi`.\n3. Return first feasible `x` for minimization, or scan all for maximization.\n\n```python\nfunction minFeasibleBrute(lo, hi, isFeasible):\n    for x in range(lo, hi + 1):\n        if isFeasible(x):\n            return x\n\n    return -1\n```\n\nThis is correct but infeasible when range size `R` is large.',
      complexity: {
        time: 'O(N * R)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Monotonic Feasibility Binary Search)',
      content:
        'Exploit boundary structure in monotonic feasibility results.\n\nBoundary patterns:\n- minimization: `False False False True True True` -> find first `True`\n- maximization: `True True True False False` -> find last `True`\n\nStep-by-step mechanics for first feasible value:\n1. Build tight `lo` and `hi` from problem constraints.\n2. Compute `mid = lo + (hi - lo) // 2`.\n3. If `isFeasible(mid)` is true, store `mid` and continue left.\n4. Otherwise continue right.\n5. End with smallest feasible candidate.\n\n```python\nfunction binarySearchFirstTrue(lo, hi, isFeasible):\n    ans = -1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n\n        if isFeasible(mid):\n            ans = mid\n            hi = mid - 1\n        else:\n            lo = mid + 1\n\n    return ans\n```\n\nFeasibility example (Koko speed):\n```python\nfunction canFinish(piles, h, k):\n    hours = 0\n\n    for p in piles:\n        hours += (p + k - 1) // k\n\n    return hours <= h\n```\n\nMaximization template (last true):\n```python\nfunction binarySearchLastTrue(lo, hi, isFeasible):\n    ans = -1\n\n    while lo <= hi:\n        mid = lo + (hi - lo) // 2\n\n        if isFeasible(mid):\n            ans = mid\n            lo = mid + 1\n        else:\n            hi = mid - 1\n\n    return ans\n```\n\nWhy this works:\nFeasibility outcomes are virtual sorted booleans. Binary search locates the transition boundary in `O(log R)` checks, each check usually costing `O(N)`.',
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
    'Not updating answer when feasible can return boundary-adjacent wrong values.',
    'Using floor or ceil inconsistently in feasibility math causes off-by-one errors.'
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
    },
    {
      name: 'Feasibility Oracle',
      details:
        'Correctness depends on designing a deterministic monotonic predicate that answers yes or no for each candidate.'
    }
  ]
};
