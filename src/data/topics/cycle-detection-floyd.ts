import type { TopicContent } from '../topicContent';

export const cycleDetectionFloyd: TopicContent = {
  title: 'Cycle Detection (Floyd)',
  description:
    "Floyd's Tortoise and Hare detects linked list cycles in constant space by moving two pointers at different speeds and exploiting modular distance inside the cycle.",
  example:
    'Given `3 -> 2 -> 0 -> -4` where `-4.next` points back to `2`, detect a cycle and find entry node `2`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1)'
  },
  approaches: [
    {
      title: 'Brute Force (Visited Set)',
      content:
        'Track node identities in a hash set during traversal.\n\nStep-by-step mechanics:\n1. Start from head and visit nodes one by one.\n2. If a node address/reference appears twice, cycle exists.\n3. If traversal reaches `null`, list is acyclic.\n\n```python\nfunction hasCycleWithSet(head):\n    seen = set()\n    node = head\n\n    while node is not null:\n        if node in seen:\n            return true\n        seen.add(node)\n        node = node.next\n\n    return false\n```\n\nThis is the easiest method to implement and debug, but it requires `O(N)` extra memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: "Optimal Approach (Tortoise and Hare)",
      content:
        'Use two pointers with different velocities.\n\nStep-by-step mechanics:\n1. Initialize `slow = head`, `fast = head`.\n2. Advance `slow` by 1 and `fast` by 2.\n3. If pointers meet, cycle exists.\n4. For entry node:\n   - keep one pointer at meeting point.\n   - start another from head.\n   - move both one step; meeting point is cycle entry.\n\n```python\nfunction detectCycleStart(head):\n    slow = head\n    fast = head\n\n    while fast is not null and fast.next is not null:\n        slow = slow.next\n        fast = fast.next.next\n\n        if slow == fast:\n            ptr = head\n            while ptr != slow:\n                ptr = ptr.next\n                slow = slow.next\n            return ptr\n\n    return null\n```\n\nDistance proof intuition:\n- Let `L` be head-to-entry distance.\n- Let `x` be entry-to-meeting distance.\n- Let cycle length be `C`.\nAt meeting: fast has traveled twice slow, so distances differ by multiple of `C`.\nThis yields `L ≡ -x (mod C)`, meaning pointer from head and pointer from meeting point align at entry when moved equally.\n\nWhy this works:\nRelative speed guarantees eventual collision inside cycle; modular distance relationship pinpoints entry without extra memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Missing null checks on `fast` and `fast.next` causes runtime crashes.',
    'Comparing node values instead of node references gives false positives.',
    'After detecting meeting point, forgetting the second phase to locate cycle entry.',
    'Resetting both pointers to head in phase two is incorrect; only one pointer resets.'
  ],
  concepts: [
    {
      name: 'Relative Speed',
      details:
        'Inside a cycle, the fast pointer gains one node per iteration on slow, so collision is guaranteed.'
    },
    {
      name: 'Distance Decomposition',
      details:
        'The head-to-entry distance equals meeting-to-entry distance modulo cycle length, enabling entry recovery.'
    },
    {
      name: 'Modular Traversal',
      details:
        'Once inside a cycle, pointer movement is modular arithmetic over cycle length, which enables algebraic correctness proofs.'
    }
  ]
};
