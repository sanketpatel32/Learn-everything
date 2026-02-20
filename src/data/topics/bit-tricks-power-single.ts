import type { TopicContent } from '../topicContent';

export const bitTricksPowerSingle: TopicContent = {
  title: 'Power of Two / Single Number',
  description:
    'Classic bit-trick problems use binary properties to replace hash maps and loops with compact constant-space logic.',
  example:
    'Given `[4,1,2,1,2]`, find the number that appears once. Answer: `4`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) optimal'
  },
  approaches: [
    {
      title: 'Brute Force (Counting with Hash Map)',
      content:
        'Count frequencies and return the value with frequency 1.\n\nStep-by-step mechanics:\n1. Build `freq[val] += 1` for each number.\n2. Iterate map and return key with count `1`.\n\n```python\nfunction singleNumberMap(nums):\n    freq = dict()\n    for x in nums:\n        freq[x] = freq.get(x, 0) + 1\n\n    for key, count in freq.items():\n        if count == 1:\n            return key\n\n    return -1\n```\n\nThis works for many variants but costs extra memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (XOR + Bit Identity)',
      content:
        'XOR has two critical rules: `x ^ x = 0` and `x ^ 0 = x`.\n\nStep-by-step mechanics for single number:\n1. Initialize `ans = 0`.\n2. XOR every value into `ans`.\n3. Paired values cancel out, leaving unique number.\n\nStep-by-step mechanics for power of two:\n1. Positive power of two has one set bit.\n2. Expression `n & (n - 1)` removes lowest set bit.\n3. If result is 0 and `n > 0`, then `n` is power of two.\n\n```python\nfunction singleNumberXor(nums):\n    ans = 0\n    for x in nums:\n        ans ^= x\n    return ans\n\nfunction isPowerOfTwo(n):\n    if n <= 0:\n        return False\n    return (n & (n - 1)) == 0\n```\n\nThese identities remove auxiliary storage and run in linear or constant time.',
      complexity: {
        time: 'O(N) for single number, O(1) for power check',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Power-of-two check must guard `n > 0` first.',
    'XOR trick applies when duplicates appear exactly twice; variants require different bit counting.',
    'Mixing decimal intuition with binary operations leads to incorrect assumptions.'
  ],
  concepts: [
    {
      name: 'Cancellation Property',
      details:
        'XOR behaves like parity counting per bit, causing even occurrences to vanish.'
    },
    {
      name: 'Set-bit Geometry',
      details:
        '`n & (n - 1)` is a canonical way to drop the least significant set bit.'
    }
  ]
};
