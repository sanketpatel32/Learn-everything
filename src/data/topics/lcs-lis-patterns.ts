import type { TopicContent } from '../topicContent';

export const lcsLisPatterns: TopicContent = {
  title: 'LCS / LIS Patterns',
  description:
    'LCS and LIS are canonical sequence-DP families. LCS is two-sequence alignment with match or skip transitions, while LIS is one-sequence order optimization where compressed state can reduce `O(N^2)` DP to `O(N log N)`.',
  example:
    'For strings `abcde` and `ace`, LCS length is `3`. For array `[10,9,2,5,3,7,101,18]`, LIS length is `4`.',
  complexity: {
    time: 'O(N*M) for LCS, O(N log N) optimal LIS',
    space: 'O(N*M) or optimized variants'
  },
  approaches: [
    {
      title: 'Brute Force (Exponential Recursion)',
      content:
        'Direct recursion for LCS explores all skip or match branches.\n\nStep-by-step mechanics:\n1. State `(i, j)` is LCS of suffixes `s1[i:]` and `s2[j:]`.\n2. If either suffix is empty, result is `0`.\n3. If `s1[i] == s2[j]`, consume both and add `1`.\n4. Otherwise try skipping one side and take maximum.\n\n```python\nfunction lcsBrute(s1, s2, i, j):\n    if i == len(s1) or j == len(s2):\n        return 0\n\n    if s1[i] == s2[j]:\n        return 1 + lcsBrute(s1, s2, i + 1, j + 1)\n\n    return max(\n        lcsBrute(s1, s2, i + 1, j),\n        lcsBrute(s1, s2, i, j + 1)\n    )\n```\n\nCorrect recurrence, but heavy overlap makes it exponential.',
      complexity: {
        time: 'O(2^(N+M))',
        space: 'O(N+M)'
      }
    },
    {
      title: 'Optimal Approach (LCS Table + LIS Tails)',
      content:
        'Use full DP table for LCS and tails-based binary-search optimization for LIS length.\n\nStep-by-step mechanics for LCS:\n1. `dp[i][j]` is LCS length for prefixes `s1[:i]`, `s2[:j]`.\n2. Matching chars extend diagonal.\n3. Non-matching chars choose best of top or left.\n\n```python\nfunction lcsDP(s1, s2):\n    n = len(s1)\n    m = len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[n][m]\n```\n\nStep-by-step mechanics for LIS length:\n1. Maintain `tails`, where `tails[k]` is smallest tail for subsequence length `k + 1`.\n2. For each value `x`, find first index `i` with `tails[i] >= x`.\n3. Replace `tails[i]` with `x` or append if `i` is past end.\n\n```python\nfunction lisLength(nums):\n    tails = []\n\n    for x in nums:\n        i = lower_bound(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n\n    return len(tails)\n```\n\nWhy this works:\nLCS DP solves each prefix pair once; LIS tails keeps only best boundary values needed for future extension.',
      complexity: {
        time: 'O(N*M) LCS, O(N log N) LIS',
        space: 'O(N*M) LCS, O(N) LIS'
      }
    },
    {
      title: 'Advanced Variant (Reconstruct Sequence, Not Just Length)',
      content:
        'Many tasks require actual subsequence, not only its length.\n\nStep-by-step mechanics for LCS reconstruction:\n1. Build standard LCS DP table.\n2. Start from `(n, m)` and walk backward:\n   - if chars match, include char and move diagonal\n   - else move toward larger neighbor (`up` or `left`)\n3. Reverse collected characters.\n\n```python\nfunction buildLCS(s1, s2, dp):\n    i = len(s1)\n    j = len(s2)\n    out = []\n\n    while i > 0 and j > 0:\n        if s1[i - 1] == s2[j - 1]:\n            out.append(s1[i - 1])\n            i -= 1\n            j -= 1\n        elif dp[i - 1][j] >= dp[i][j - 1]:\n            i -= 1\n        else:\n            j -= 1\n\n    out.reverse()\n    return \"\".join(out)\n```\n\nStep-by-step mechanics for LIS reconstruction (`O(N log N)` length + parent arrays):\n1. Track `tailIndex[len]` and `parent[i]`.\n2. On placing `nums[i]` at LIS position `pos`, set `parent[i] = tailIndex[pos - 1]`.\n3. Recover sequence by backtracking from index of last LIS element.\n\nWhy this matters:\nLength-only DP is often insufficient in interviews and contests where explicit sequence output is required.',
      complexity: {
        time: 'O(N*M) LCS rebuild, O(N log N) LIS rebuild',
        space: 'O(N*M) for LCS, O(N) for LIS auxiliary arrays'
      }
    }
  ],
  pitfalls: [
    'Confusing subsequence with substring changes transitions entirely.',
    'LIS `tails` array does not store the actual LIS sequence unless extra parent tracking is added.',
    'Incorrect DP indexing between 0-based strings and 1-based DP dimensions is common.',
    'For strictly increasing LIS, using upper_bound instead of lower_bound changes behavior with duplicates.',
    'In reconstruction, tie-breaking direction differences can produce different valid LCS strings.'
  ],
  concepts: [
    {
      name: 'Sequence Alignment DP',
      details:
        'LCS is a blueprint for two-sequence dynamic programming problems.'
    },
    {
      name: 'State Compression',
      details:
        'LIS length can be solved without full `O(N^2)` DP by keeping compressed order statistics.'
    },
    {
      name: 'Alignment vs Ordering',
      details:
        'LCS optimizes alignment between two sequences, while LIS optimizes order consistency within one sequence.'
    },
    {
      name: 'Length vs Witness',
      details:
        'Many DP designs first compute optimal value and then add parent or backtracking data to extract one optimal witness sequence.'
    }
  ]
};
