import type { TopicContent } from '../topicContent';

export const bitTricksPowerSingle: TopicContent = {
  title: 'Power of Two / Single Number',
  description:
    'Classic bit tricks use binary identities to replace heavier data structures. These problems test whether you can reason at bit-level instead of value-level.',
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
        'Frequency counting is a straightforward baseline.\n\nStep-by-step mechanics:\n1. Build map `freq[val]` for all values.\n2. Scan map for the key with count `1`.\n\n```python\nfunction singleNumberMap(nums):\n    freq = dict()\n\n    for x in nums:\n        freq[x] = freq.get(x, 0) + 1\n\n    for key, count in freq.items():\n        if count == 1:\n            return key\n\n    return -1\n```\n\nThis solves many variants but uses extra memory and misses the bit-level insight interviewers often expect.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (XOR + Bit Identity)',
      content:
        'Use binary identities instead of explicit counting.\n\nCore identities:\n- `x ^ x = 0`\n- `x ^ 0 = x`\n- XOR is associative/commutative\n\nStep-by-step mechanics for single number (duplicates appear twice):\n1. Initialize `ans = 0`.\n2. XOR all numbers.\n3. Pairs cancel, unique value remains.\n\nStep-by-step mechanics for power of two:\n1. Power of two has exactly one set bit.\n2. `n & (n - 1)` clears lowest set bit.\n3. If result becomes `0` and `n > 0`, exactly one bit existed.\n\n```python\nfunction singleNumberXor(nums):\n    ans = 0\n    for x in nums:\n        ans ^= x\n    return ans\n\nfunction isPowerOfTwo(n):\n    if n <= 0:\n        return False\n    return (n & (n - 1)) == 0\n```\n\nUseful extension (two unique numbers):\n1. XOR all values to get `x = a ^ b`.\n2. Isolate distinguishing bit `lb = x & -x`.\n3. Partition numbers by `lb` and XOR each bucket.\n\nWhy this works:\nXOR tracks parity of each bit-position independently, which naturally eliminates even duplicates without auxiliary memory.',
      complexity: {
        time: 'O(N) for single number, O(1) for power check',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Power-of-two check must guard `n > 0` first.',
    'XOR trick applies when duplicates appear exactly twice; variants require different bit counting.',
    'Mixing decimal intuition with binary operations leads to incorrect assumptions.',
    'Sign bits in two\'s-complement representations can surprise when debugging negative values.'
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
    },
    {
      name: 'Bit-partition Strategy',
      details:
        'When values differ in at least one bit, that bit can split data into groups for independent cancellation.'
    }
  ]
};
