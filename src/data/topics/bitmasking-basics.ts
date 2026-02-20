import type { TopicContent } from '../topicContent';

export const bitmaskingBasics: TopicContent = {
  title: 'Bitmasking Basics',
  description:
    'Bitmasking compresses many boolean states into one integer and enables constant-time set/check/toggle transitions. It is foundational for subsets, permissions, feature flags, and combinatorial DP.',
  example:
    'Represent selected features with one integer: bit `0` for A, bit `1` for B, bit `2` for C. For example mask `101` (binary) means features A and C are enabled.',
  complexity: {
    time: 'O(1) per operation',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Boolean Array State)',
      content:
        'A direct alternative stores each state in a boolean array.\n\nStep-by-step mechanics:\n1. Create `flags[n]` initialized to false.\n2. Set bit-like state with `flags[i] = true`.\n3. Clear state with `flags[i] = false`.\n4. Check state with `flags[i]`.\n\n```python\nfunction setFlag(flags, i):\n    flags[i] = True\n\nfunction clearFlag(flags, i):\n    flags[i] = False\n\nfunction hasFlag(flags, i):\n    return flags[i]\n```\n\nThis is readable but less compact and less convenient for hashing/comparing full state snapshots.',
      complexity: {
        time: 'O(1)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Integer Bit Operations)',
      content:
        'Store all states in one integer and manipulate them with bitwise algebra.\n\nStep-by-step mechanics:\n1. Set bit `i`: `mask |= (1 << i)`.\n2. Clear bit `i`: `mask &= ~(1 << i)`.\n3. Toggle bit `i`: `mask ^= (1 << i)`.\n4. Check bit `i`: `(mask & (1 << i)) != 0`.\n5. Remove lowest set bit: `mask &= (mask - 1)`.\n6. Extract lowest set bit: `mask & -mask`.\n\n```python\nfunction setBit(mask, i):\n    return mask | (1 << i)\n\nfunction clearBit(mask, i):\n    return mask & (~(1 << i))\n\nfunction toggleBit(mask, i):\n    return mask ^ (1 << i)\n\nfunction hasBit(mask, i):\n    return (mask & (1 << i)) != 0\n\nfunction popLowest(mask):\n    return mask & (mask - 1)\n\nfunction lowbit(mask):\n    return mask & (-mask)\n```\n\nSubset iteration template:\n```python\nsub = mask\nwhile sub > 0:\n    # process sub\n    sub = (sub - 1) & mask\n```\n\nWhy this works:\nBits give constant-time random access to state membership while keeping the full state hashable and compact. That is why bitmasking is heavily used in subset DP and state compression.',
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Using signed integers can cause surprises with high bits in some languages.',
    'Forgetting parentheses like `(1 << i)` changes precedence and yields wrong results.',
    'Clearing with XOR is incorrect if you specifically need forced 0.',
    'Left-shifting beyond integer width is undefined/unsafe in some languages.'
  ],
  concepts: [
    {
      name: 'State Compression',
      details:
        'Bitmasks are a compact representation of subsets and feature toggles.'
    },
    {
      name: 'Bitwise Algebra',
      details:
        'AND, OR, XOR, and NOT form the core toolkit for low-level state updates.'
    },
    {
      name: 'State Hashability',
      details:
        'An integer mask is cheap to copy, compare, and memoize, which is why it outperforms many container-based state representations.'
    }
  ]
};
