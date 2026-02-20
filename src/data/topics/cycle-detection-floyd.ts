import type { TopicContent } from '../topicContent';

export const cycleDetectionFloyd: TopicContent = {
  title: 'Cycle Detection (Floyd)',
  description:
    "Floyd's Tortoise and Hare algorithm detects linked list cycles using two pointers at different speeds, without extra memory.",
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
        'Track every visited node in a hash set. If a node repeats, a cycle exists.\n\nStep-by-step mechanics:\n1. Initialize empty set `seen`.\n2. Traverse node by node.\n3. If current node already in `seen`, return cycle found.\n4. Otherwise add it and continue.\n\n```python\nfunction hasCycleWithSet(head):\n    seen = set()\n    node = head\n\n    while node is not null:\n        if node in seen:\n            return true\n        seen.add(node)\n        node = node.next\n\n    return false\n```\n\nThis approach is straightforward but uses linear memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: "Optimal Approach (Tortoise and Hare)",
      content:
        'Move one pointer by 1 step and another by 2 steps.\n\nStep-by-step mechanics:\n1. Start `slow = head`, `fast = head`.\n2. While `fast` and `fast.next` exist:\n   - move `slow = slow.next`\n   - move `fast = fast.next.next`\n3. If they ever meet, a cycle exists.\n4. To find cycle entry, place `ptr = head` and move both `ptr` and `slow` one step at a time until they meet.\n\n```python\nfunction detectCycleStart(head):\n    slow = head\n    fast = head\n\n    while fast is not null and fast.next is not null:\n        slow = slow.next\n        fast = fast.next.next\n\n        if slow == fast:\n            ptr = head\n            while ptr != slow:\n                ptr = ptr.next\n                slow = slow.next\n            return ptr\n\n    return null\n```\n\nWhy entry detection works:\nThe distance math guarantees that after meeting inside the cycle, moving one pointer from head and one from meeting point at equal speed makes them collide at the cycle start.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Missing null checks on `fast` and `fast.next` causes runtime crashes.',
    'Comparing node values instead of node references gives false positives.',
    'After detecting meeting point, forgetting the second phase to locate cycle entry.'
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
    }
  ]
};
