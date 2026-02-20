import type { TopicContent } from '../topicContent';

export const digitDp: TopicContent = {
  title: 'Digit DP',
  description:
    'Digit DP solves large-range counting queries by traversing number digits from most significant to least significant with memoized state. It is the standard tool when constraints reach `10^18` and direct iteration is impossible.',
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
        'Brute force checks each value and evaluates digit property directly.\n\nStep-by-step mechanics:\n1. Iterate every integer in `[L, R]`.\n2. Extract digits for each number.\n3. Evaluate constraint (for example sum modulo, forbidden digit, digit frequency).\n4. Count valid numbers.\n\n```python\nfunction countBrute(L, R, k):\n    ans = 0\n\n    for x in range(L, R + 1):\n        s = 0\n        t = x\n        while t > 0:\n            s += t % 10\n            t //= 10\n\n        if s % k == 0:\n            ans += 1\n\n    return ans\n```\n\nThis is correct but unusable for large bounds because complexity depends on interval length, not digit count.',
      complexity: {
        time: 'O((R-L+1) * digits)',
        space: 'O(1)'
      }
    },
    {
      title: 'Optimal Approach (Top-down Digit DP with Tight State)',
      content:
        'Convert range counting into prefix counting and run DFS over digit positions with memoized state.\n\nCanonical transformation:\n- `answer(L, R) = F(R) - F(L - 1)` where `F(x)` counts valid numbers in `[0, x]`.\n\nCore DFS state:\n- `pos`: current digit index\n- `tight`: whether prefix is exactly bound so far\n- `started`: whether non-leading digit has appeared\n- problem state (for example `sumMod`, `count`, `prevDigit`, `mask`)\n\nStep-by-step mechanics:\n1. Convert bound `N` to digit array.\n2. DFS chooses next digit from `0..limit` (`limit = boundDigit` if tight else `9`).\n3. Transition updates problem state.\n4. Memoize only non-tight states for reuse across many branches.\n5. Aggregate counts from child states.\n\n```python\nfunction countUpTo(N, k):\n    digits = list(map(int, str(N)))\n    memo = dict()\n\n    def dfs(pos, tight, started, sumMod):\n        if pos == len(digits):\n            if started and sumMod == 0:\n                return 1\n            return 0\n\n        key = (pos, started, sumMod)\n        if not tight and key in memo:\n            return memo[key]\n\n        limit = digits[pos] if tight else 9\n        ans = 0\n\n        for d in range(0, limit + 1):\n            ntight = tight and (d == limit)\n            nstarted = started or (d != 0)\n            nsum = (sumMod + d) % k if nstarted else 0\n\n            ans += dfs(pos + 1, ntight, nstarted, nsum)\n\n        if not tight:\n            memo[key] = ans\n\n        return ans\n\n    if N < 0:\n        return 0\n\n    return dfs(0, True, False, 0)\n\nfunction countRange(L, R, k):\n    return countUpTo(R, k) - countUpTo(L - 1, k)\n```\n\nAdvanced extensions:\n- add `prevDigit` for no-adjacent-equal constraints\n- add bitmask state for used-digit constraints\n- add automaton state for substring-avoidance constraints\n\nWhy this works:\nDigit DP compresses huge intervals into repeated prefix subproblems. Shared state reuse replaces linear range iteration with digit-position transitions.',
      complexity: {
        time: 'O(numDigits * k * 2 * 2 * 10)',
        space: 'O(numDigits * k * 2)'
      }
    }
  ],
  pitfalls: [
    'For range queries, forgetting `f(R) - f(L-1)` leads to off-by-one errors.',
    'Memoizing `tight = 1` states incorrectly can mix bound-specific results.',
    'Leading zero handling (`started` flag) must be explicit for properties like digit count or zero inclusion.',
    'Base-case acceptance rules for number `0` are problem-specific and easy to mis-handle.'
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
    },
    {
      name: 'State Design',
      details:
        'Performance and correctness depend on choosing minimal sufficient state dimensions for the target digit property.'
    }
  ]
};
