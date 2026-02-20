import type { TopicContent } from '../topicContent';

export const backtrackingTemplate: TopicContent = {
  title: 'Backtracking Template',
  description:
    'Backtracking explores a decision tree with controlled mutation: choose, recurse, undo. It is the primary template for permutations, combinations, N-Queens, Sudoku-like constraints, and partitioning problems.',
  example:
    'Generate all permutations of `[1,2,3]` by choosing one unused element at each position and backtracking after recursion.',
  complexity: {
    time: 'Exponential (problem dependent)',
    space: 'O(depth) recursion + output'
  },
  approaches: [
    {
      title: 'Brute Force (Generate Then Filter)',
      content:
        'Naive generation produces many invalid candidates before checking constraints.\n\nStep-by-step mechanics:\n1. Generate broad candidate space.\n2. Validate candidates after full construction.\n3. Keep only valid ones.\n\n```python\nfunction generateAndFilter(nums):\n    candidates = allSequences(nums)\n    ans = []\n\n    for cand in candidates:\n        if isValid(cand):\n            ans.append(cand)\n\n    return ans\n```\n\nThis approach is easy to conceptualize but inefficient because invalid branches are not cut early.',
      complexity: {
        time: 'Very high exponential',
        space: 'Large candidate storage'
      }
    },
    {
      title: 'Optimal Approach (Choice -> Recurse -> Undo)',
      content:
        'Backtracking mutates shared state in-place and restores it after recursion.\n\nCanonical template:\n1. Base case: state is complete, record answer.\n2. Iterate choices available at current depth.\n3. Prune invalid choices early.\n4. Apply choice (mutate state).\n5. Recurse to next depth.\n6. Undo mutation to restore previous state.\n\n```python\nfunction backtrack(path, used):\n    if len(path) == n:\n        ans.append(path.copy())\n        return\n\n    for i in range(0, n):\n        if used[i]:\n            continue\n\n        # prune example\n        if not feasible(path, nums[i]):\n            continue\n\n        # choose\n        used[i] = True\n        path.append(nums[i])\n\n        # explore\n        backtrack(path, used)\n\n        # undo\n        path.pop()\n        used[i] = False\n```\n\nCombination variant:\n- Pass `start` index and iterate `i` from `start` onward to avoid reordering duplicates.\n\nN-Queens style variant:\n- Keep auxiliary sets (`cols`, `diag1`, `diag2`) for O(1) validity checks.\n\nWhy this works:\nThe recursion tree covers all valid possibilities, and pruning removes entire invalid subtrees before expansion, dramatically reducing practical runtime.',
      complexity: {
        time: 'O(branch^depth) worst-case',
        space: 'O(depth)'
      }
    }
  ],
  pitfalls: [
    'Forgetting to undo state causes cross-branch contamination.',
    'Appending `path` without copying stores references to mutable list.',
    'Weak pruning conditions can make runtime explode unnecessarily.',
    'Global mutable state must be restored exactly once per recursion branch.'
  ],
  concepts: [
    {
      name: 'Search Tree',
      details:
        'Each recursive frame is a node in an implicit decision tree over choices.'
    },
    {
      name: 'Early Pruning',
      details:
        'Constraint checks should run as soon as possible to cut invalid branches before deeper recursion.'
    },
    {
      name: 'State Restoration Discipline',
      details:
        'Correctness depends on returning to the exact pre-choice state after each recursive call.'
    }
  ]
};
