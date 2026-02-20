import type { TopicContent } from '../topicContent';

export const bitmaskingBasics: TopicContent = {
  title: 'Bitmasking Basics',
  description:
    'Bitmasking packs boolean states into bits of an integer, enabling constant-time set/check/toggle operations with minimal memory.',
  example:
    'Represent chosen features in a product using one integer: bit `0` for A, bit `1` for B, bit `2` for C.',
  complexity: {
    time: 'O(1) per operation',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Boolean Array State)',
      content:
        'Store each state in a separate boolean slot.\n\nStep-by-step mechanics:\n1. Create `flags[n]` initialized to false.\n2. Set state `i` with `flags[i] = true`.\n3. Clear state `i` with `flags[i] = false`.\n4. Check state `i` with `flags[i]`.\n\n```python\nfunction setFlag(flags, i):\n    flags[i] = True\n\nfunction clearFlag(flags, i):\n    flags[i] = False\n\nfunction hasFlag(flags, i):\n    return flags[i]\n```\n\nThis is readable but uses more memory and is slower to copy/compare for large state spaces.',
      complexity: {
        time: 'O(1)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Integer Bit Operations)',
      content:
        'Use one integer `mask` and manipulate bits using bitwise operators.\n\nStep-by-step mechanics:\n1. Set bit `i`: `mask |= (1 << i)`.\n2. Clear bit `i`: `mask &= ~(1 << i)`.\n3. Toggle bit `i`: `mask ^= (1 << i)`.\n4. Check bit `i`: `(mask & (1 << i)) != 0`.\n\n```python\nfunction setBit(mask, i):\n    return mask | (1 << i)\n\nfunction clearBit(mask, i):\n    return mask & (~(1 << i))\n\nfunction toggleBit(mask, i):\n    return mask ^ (1 << i)\n\nfunction hasBit(mask, i):\n    return (mask & (1 << i)) != 0\n```\n\nThis compresses many flags into one machine word and allows very fast state transitions.',
      complexity: {
        time: 'O(1)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Using signed integers can cause surprises with high bits in some languages.',
    'Forgetting parentheses like `(1 << i)` changes precedence and yields wrong results.',
    'Clearing with XOR is incorrect if you specifically need forced 0.'
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
    }
  ]
};
