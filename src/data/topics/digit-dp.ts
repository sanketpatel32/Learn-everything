import type { TopicContent } from '../topicContent';

export const digitDp: TopicContent = {
  title: 'Digit DP',
  description:
    'Digit DP solves counting problems over large numeric ranges by processing one digit position at a time with state constraints (tight bound, leading zeros, and custom properties).',
  example:
    'Count numbers in range `[1, N]` whose digit sum is divisible by `k` without iterating through all values.',
  complexity: {
    time: 'O(positions * stateSpace * 10)',
    space: 'O(positions * stateSpace)'
  },
  approaches: [
    {
      title: 'Brute Force (Enumerate All Numbers)',
      content:
        'The direct method checks each number in the range and tests the property independently.\n\nStep-by-step mechanics:\n1. Loop `x` from `L` to `R`.\n2. Extract digits of `x`.\n3. Evaluate property (for example, digit sum modulo `k`).\n4. Increment answer if valid.\n\n```python\nfunction countBrute(L, R, k):\n    ans = 0\n\n    for x in range(L, R + 1):\n        s = 0\n        t = x\n        while t > 0:\n            s += t % 10\n            t //= 10\n\n        if s % k == 0:\n            ans += 1\n\n    return ans\n```\n\nThis is easy to write but infeasible when `R` is very large (for example up to `10^18`).',
      complexity: {
        time: 'O((R-L+1) * digits)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Top-down Digit DP with Tight State)',
      content:
        'Convert counting into prefix query `f(N)` and use memoized DFS over digits.\n\nStep-by-step mechanics:\n1. Define `f(N)` = count of valid integers in `[0, N]`.\n2. Convert `N` to digit array.\n3. Use DFS state:\n   - `pos`: current digit index\n   - `tight`: whether prefix already equals upper bound prefix\n   - `started`: whether non-leading digit has started\n   - problem state (for example `sumMod`)\n4. Transition over next digit `d` from `0` to limit.\n5. Memoize states where `tight = 0`.\n6. Final range answer is `f(R) - f(L - 1)`.\n\n```python\nfunction countUpTo(N, k):\n    digits = list(map(int, str(N)))\n    memo = dict()\n\n    def dfs(pos, tight, started, sumMod):\n        if pos == len(digits):\n            if started and sumMod == 0:\n                return 1\n            return 0\n\n        key = (pos, started, sumMod)\n        if not tight and key in memo:\n            return memo[key]\n\n        limit = digits[pos] if tight else 9\n        ans = 0\n\n        for d in range(0, limit + 1):\n            ntight = tight and (d == limit)\n            nstarted = started or (d != 0)\n\n            if nstarted:\n                nsum = (sumMod + d) % k\n            else:\n                nsum = 0\n\n            ans += dfs(pos + 1, ntight, nstarted, nsum)\n\n        if not tight:\n            memo[key] = ans\n\n        return ans\n\n    if N < 0:\n        return 0\n\n    return dfs(0, True, False, 0)\n\nfunction countRange(L, R, k):\n    return countUpTo(R, k) - countUpTo(L - 1, k)\n```\n\nWhy this works:\nDigit DP groups huge numbers into shared prefix states. Instead of evaluating each number, it counts entire valid suffix spaces via memoized transitions.',
      complexity: {
        time: 'O(numDigits * k * 2 * 2 * 10)',
        space: 'O(numDigits * k * 2)'
      }
    }
  ],
  pitfalls: [
    'For range queries, forgetting `f(R) - f(L-1)` leads to off-by-one errors.',
    'Memoizing `tight = 1` states incorrectly can mix bound-specific results.',
    'Leading zero handling (`started` flag) must be explicit for properties like digit count or zero inclusion.'
  ],
  concepts: [
    {
      name: 'Prefix Constraint (Tight)',
      details:
        'The `tight` flag controls whether current digit choices are still bounded by the original upper-limit prefix.'
    },
    {
      name: 'Range by Prefix Function',
      details:
        'Most digit-DP range problems are solved by building `f(N)` and subtracting two prefix counts.'
    }
  ]
};
