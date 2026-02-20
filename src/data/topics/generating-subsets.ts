import type { TopicContent } from '../topicContent';

export const generatingSubsets: TopicContent = {
  title: 'Generating Subsets',
  description:
    'Subset generation enumerates the power set of `n` elements. The total output size is `2^N`, so optimal algorithms focus on clean state transitions, not beating exponential output.',
  example:
    'For `[1,2,3]`, subsets are `[]`, `[1]`, `[2]`, `[3]`, `[1,2]`, `[1,3]`, `[2,3]`, `[1,2,3]`.',
  complexity: {
    time: 'O(N * 2^N)',
    space: 'O(N) recursion or O(1) iterative extra'
  },
  approaches: [
    {
      title: 'Brute Force (Backtracking Include/Exclude)',
      content:
        'At each index, branch into two choices: include element or skip it.\n\nStep-by-step mechanics:\n1. Start DFS at index `0` with empty `path`.\n2. Recurse with element included.\n3. Backtrack and recurse with element excluded.\n4. When index reaches `n`, append current `path` to answer.\n\n```python\nfunction subsetsBacktracking(nums):\n    ans = []\n    path = []\n\n    def dfs(i):\n        if i == len(nums):\n            ans.append(path.copy())\n            return\n\n        path.append(nums[i])\n        dfs(i + 1)\n        path.pop()\n\n        dfs(i + 1)\n\n    dfs(0)\n    return ans\n```\n\nThis is the standard interview baseline and clearly models choice trees.',
      complexity: {
        time: 'O(N * 2^N)',
        space: 'O(N) recursion depth'
      }
    },
    {
      title: 'Optimal Approach (Bitmask Enumeration)',
      content:
        'Interpret each integer from `0` to `2^N - 1` as a subset mask.\n\nStep-by-step mechanics:\n1. Loop `mask` across all binary states.\n2. For each bit position `i`, if bit `i` is set, include `nums[i]`.\n3. Append built subset.\n\n```python\nfunction subsetsBitmask(nums):\n    n = len(nums)\n    total = 1 << n\n    ans = []\n\n    for mask in range(0, total):\n        subset = []\n        for i in range(0, n):\n            if (mask & (1 << i)) != 0:\n                subset.append(nums[i])\n        ans.append(subset)\n\n    return ans\n```\n\nWhy this is powerful:\nEvery subset corresponds to exactly one bit pattern, which makes iteration deterministic and easy to optimize in bitmask-DP problems.',
      complexity: {
        time: 'O(N * 2^N)',
        space: 'O(1) extra excluding output'
      }
    }
  ],
  pitfalls: [
    'Trying to reduce below `2^N` runtime ignores output-size lower bound.',
    'Mutating shared subset arrays without copying leads to duplicated final output.',
    'Bit-to-index mapping must stay consistent across loop boundaries.'
  ],
  concepts: [
    {
      name: 'Power Set Cardinality',
      details:
        'Each element has 2 states (included or not), so total combinations are `2^N`.'
    },
    {
      name: 'State Encoding',
      details:
        'A mask is a compact representation of selection decisions and is reusable for subset DP.'
    }
  ]
};
