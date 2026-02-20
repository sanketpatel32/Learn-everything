import type { TopicContent } from '../topicContent';

export const kadaneAlgorithm: TopicContent = {
  title: "Kadane's Algorithm",
  description:
    "Kadane's algorithm finds the maximum-sum contiguous subarray in linear time by deciding at each index whether to extend current segment or restart from current element.",
  example:
    'For `[-2,1,-3,4,-1,2,1,-5,4]`, the maximum subarray is `[4,-1,2,1]` with sum `6`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (All Subarrays)',
      content:
        'Enumerate all contiguous ranges and track best sum.\n\nStep-by-step mechanics:\n1. Set global `best = -INF`.\n2. Fix `start` index.\n3. Extend `end` while maintaining running sum.\n4. Update best at each extension.\n\n```python\nfunction maxSubarrayBruteForce(nums):\n    best = -INF\n\n    for start in range(0, len(nums)):\n        running = 0\n        for end in range(start, len(nums)):\n            running += nums[end]\n            best = max(best, running)\n\n    return best\n```\n\nThis is useful as a small-input validator for optimized implementations.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Kadane)',
      content:
        'Maintain two states:\n- `current`: best sum of subarray ending at current index\n- `best`: best sum seen globally\n\nStep-by-step mechanics:\n1. Initialize both with first value.\n2. For each next value `x`, choose better of:\n   - restart at `x`\n   - extend previous subarray `current + x`\n3. Update global best.\n\n```python\nfunction kadane(nums):\n    current = nums[0]\n    best = nums[0]\n\n    for i in range(1, len(nums)):\n        x = nums[i]\n        current = max(x, current + x)\n        best = max(best, current)\n\n    return best\n```\n\nIndex reconstruction variant:\n```python\nfunction kadaneWithIndices(nums):\n    current = nums[0]\n    best = nums[0]\n\n    start = 0\n    bestL = 0\n    bestR = 0\n\n    for i in range(1, len(nums)):\n        if nums[i] > current + nums[i]:\n            current = nums[i]\n            start = i\n        else:\n            current = current + nums[i]\n\n        if current > best:\n            best = current\n            bestL = start\n            bestR = i\n\n    return best, bestL, bestR\n```\n\nWhy this works:\nAny prefix with negative contribution only hurts future sums, so optimal strategy can safely discard it.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Advanced Variant (Maximum Sum Rectangle in 2D)',
      content:
        '2D maximum subarray uses Kadane as a subroutine after compressing row ranges.\n\nStep-by-step mechanics:\n1. Fix top row.\n2. Extend bottom row and accumulate column sums between top and bottom.\n3. Run 1D Kadane on compressed column array.\n4. Track global best rectangle sum.\n\n```python\nfunction maxSumRectangle(mat):\n    rows = len(mat)\n    cols = len(mat[0])\n    best = -INF\n\n    for top in range(0, rows):\n        col = [0] * cols\n\n        for bottom in range(top, rows):\n            for c in range(0, cols):\n                col[c] += mat[bottom][c]\n\n            best = max(best, kadane(col))\n\n    return best\n```\n\nWhy this matters:\nKadane generalizes to higher dimensions by dimension compression, a common interview and contest extension.',
      complexity: {
        time: 'O(R^2 * C)',
        space: 'O(C)'
      }
    }
  ],
  pitfalls: [
    'Initializing with `0` breaks cases where all elements are negative.',
    'For index reconstruction, you must track candidate start and best range endpoints.',
    'Kadane is for contiguous subarrays, not arbitrary subsets.',
    'Returning indices without handling ties consistently can cause nondeterministic outputs.',
    'In 2D extension, forgetting to reset compressed columns for each new top row gives wrong sums.'
  ],
  concepts: [
    {
      name: 'Local vs Global Optimum',
      details:
        '`current` stores local best ending at index `i`, while `best` stores global best across all positions.'
    },
    {
      name: 'Negative Prefix Elimination',
      details:
        'Any prefix with negative contribution only hurts future sums, so Kadane discards it automatically.'
    },
    {
      name: 'Rolling State DP',
      details:
        'Kadane is a one-dimensional DP where each state depends only on the previous one, so constant-space rolling state is enough.'
    },
    {
      name: 'Dimension Compression',
      details:
        'Higher-dimensional max-subarray variants often reduce to repeated 1D Kadane runs over compressed sums.'
    }
  ]
};
