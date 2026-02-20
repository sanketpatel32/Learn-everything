import type { TopicContent } from '../topicContent';

export const generatingSubsets: TopicContent = {
  title: 'Generating Subsets',
  description:
    'Subset generation enumerates the power set of `n` elements. Since output size is `2^N`, optimization focuses on correct state transitions and minimal overhead rather than asymptotic reduction.',
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
        'Model each index as a binary decision: include or exclude.\n\nStep-by-step mechanics:\n1. DFS state is current index `i` and partial subset `path`.\n2. Branch 1: include `nums[i]`.\n3. Branch 2: exclude `nums[i]`.\n4. Base case at `i == n`: copy `path` to output.\n\n```python\nfunction subsetsBacktracking(nums):\n    ans = []\n    path = []\n\n    def dfs(i):\n        if i == len(nums):\n            ans.append(path.copy())\n            return\n\n        # include\n        path.append(nums[i])\n        dfs(i + 1)\n        path.pop()\n\n        # exclude\n        dfs(i + 1)\n\n    dfs(0)\n    return ans\n```\n\nThis is the cleanest conceptual model and directly visualizes the `2^N` decision tree.',
      complexity: {
        time: 'O(N * 2^N)',
        space: 'O(N) recursion depth'
      }
    },
    {
      title: 'Optimal Approach (Bitmask Enumeration)',
      content:
        'Interpret numbers `0 ... (1<<n)-1` as subset signatures.\n\nStep-by-step mechanics:\n1. Each bit position corresponds to one element.\n2. For each `mask`, include `nums[i]` when bit `i` is set.\n3. Append constructed subset.\n\n```python\nfunction subsetsBitmask(nums):\n    n = len(nums)\n    total = 1 << n\n    ans = []\n\n    for mask in range(0, total):\n        subset = []\n        for i in range(0, n):\n            if (mask & (1 << i)) != 0:\n                subset.append(nums[i])\n        ans.append(subset)\n\n    return ans\n```\n\nIteration order insight:\n- Increasing mask order gives deterministic subset order.\n- `gray code` order can be used when you want only one element change between consecutive subsets.\n\nWhy this is powerful:\nBitmask form is iterative, deterministic, and naturally compatible with subset DP and combinatorial state encoding.',
      complexity: {
        time: 'O(N * 2^N)',
        space: 'O(1) extra excluding output'
      }
    }
  ],
  pitfalls: [
    'Trying to reduce below `2^N` runtime ignores output-size lower bound.',
    'Mutating shared subset arrays without copying leads to duplicated final output.',
    'Bit-to-index mapping must stay consistent across loop boundaries.',
    'For inputs with duplicates, naive subset generation may produce duplicate subsets unless dedup logic is added.'
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
    },
    {
      name: 'Output-sensitive Lower Bound',
      details:
        'Any algorithm must at least emit all `2^N` subsets, so exponential output size is unavoidable.'
    }
  ]
};
