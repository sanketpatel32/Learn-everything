import type { TopicContent } from '../topicContent';

export const lcsLisPatterns: TopicContent = {
  title: 'LCS / LIS Patterns',
  description:
    'LCS and LIS are canonical sequence DP families. LCS is two-sequence alignment with match/skip transitions; LIS is one-sequence order optimization where state compression can reduce quadratic DP to logarithmic updates.',
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
        'LCS brute force recursively branches on whether to align or skip characters.\n\nStep-by-step mechanics:\n1. State `(i, j)` means LCS of suffixes `s1[i:]` and `s2[j:]`.\n2. If either string ends, result is `0`.\n3. If chars match, consume both and add 1.\n4. If chars differ, try skipping from either string and take max.\n\n```python\nfunction lcsBrute(s1, s2, i, j):\n    if i == len(s1) or j == len(s2):\n        return 0\n\n    if s1[i] == s2[j]:\n        return 1 + lcsBrute(s1, s2, i + 1, j + 1)\n\n    skipS1 = lcsBrute(s1, s2, i + 1, j)\n    skipS2 = lcsBrute(s1, s2, i, j + 1)\n    return max(skipS1, skipS2)\n```\n\nThis captures the exact recurrence but recomputes many identical states, causing exponential behavior.',
      complexity: {
        time: 'O(2^(N+M))',
        space: 'O(N+M)'
      }
    },
    {
      title: 'Optimal Approach (DP Table / Patience Sorting for LIS)',
      content:
        'Use explicit DP for LCS and compressed order-statistic state for LIS length.\n\nStep-by-step mechanics for LCS table:\n1. `dp[i][j]` = LCS length for prefixes `s1[:i]` and `s2[:j]`.\n2. Transition:\n   - if `s1[i-1] == s2[j-1]`: `1 + dp[i-1][j-1]`\n   - else: `max(dp[i-1][j], dp[i][j-1])`\n3. Answer is `dp[n][m]`.\n\n```python\nfunction lcsDP(s1, s2):\n    n = len(s1)\n    m = len(s2)\n    dp = [[0] * (m + 1) for _ in range(n + 1)]\n\n    for i in range(1, n + 1):\n        for j in range(1, m + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = 1 + dp[i - 1][j - 1]\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[n][m]\n```\n\nStep-by-step mechanics for LIS length (patience idea):\n1. Keep array `tails`.\n2. `tails[len-1]` stores the minimum possible tail value for increasing subsequence length `len`.\n3. For each `x`, replace first `tails[i] >= x` (lower_bound) or append if none.\n\n```python\nfunction lisLength(nums):\n    tails = []\n\n    for x in nums:\n        i = lower_bound(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n\n    return len(tails)\n```\n\nWhy this works:\n- LCS DP enumerates all prefix alignments exactly once.\n- LIS tails array preserves enough boundary information to track maximum subsequence length without storing all sequences.',
      complexity: {
        time: 'O(N*M) LCS, O(N log N) LIS',
        space: 'O(N*M) LCS, O(N) LIS'
      }
    }
  ],
  pitfalls: [
    'Confusing subsequence with substring changes transitions entirely.',
    'LIS `tails` array does not store the actual LIS sequence unless extra parent tracking is added.',
    'Incorrect DP indexing between 0-based strings and 1-based DP dimensions is common.',
    'For strictly increasing LIS, using upper_bound instead of lower_bound changes behavior with duplicates.'
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
    }
  ]
};
