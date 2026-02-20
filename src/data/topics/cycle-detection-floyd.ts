import type { TopicContent } from '../topicContent';

export const cycleDetectionFloyd: TopicContent = {
  title: 'Cycle Detection (Floyd)',
  description:
    "Floyd's Tortoise and Hare detects linked list cycles with constant extra space by moving two pointers at different speeds and using modular-distance properties inside the cycle.",
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
        'Store visited node references during traversal.\n\nStep-by-step mechanics:\n1. Traverse node by node from head.\n2. If current node reference already exists in `seen`, a cycle is present.\n3. If traversal reaches `null`, no cycle exists.\n\n```python\nfunction hasCycleWithSet(head):\n    seen = set()\n    node = head\n\n    while node is not null:\n        if node in seen:\n            return true\n\n        seen.add(node)\n        node = node.next\n\n    return false\n```\n\nThis is easy and reliable, but uses linear memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Tortoise and Hare)',
      content:
        'Use two pointers with different speeds to force a collision if a cycle exists.\n\nStep-by-step mechanics:\n1. Initialize `slow = head` and `fast = head`.\n2. Move `slow` by one and `fast` by two.\n3. If they ever meet, cycle exists.\n4. To find entry:\n   - keep one pointer at meeting node\n   - reset second pointer to head\n   - move both one step at a time\n   - first common node is entry\n\n```python\nfunction detectCycleStart(head):\n    slow = head\n    fast = head\n\n    while fast is not null and fast.next is not null:\n        slow = slow.next\n        fast = fast.next.next\n\n        if slow == fast:\n            ptr = head\n\n            while ptr != slow:\n                ptr = ptr.next\n                slow = slow.next\n\n            return ptr\n\n    return null\n```\n\nDistance proof intuition:\n- Let `L` be distance from head to cycle entry.\n- Let `x` be distance from entry to first meeting point.\n- Let cycle length be `C`.\nAt meeting, fast has covered twice the distance of slow, so distance difference is a multiple of `C`.\nThis gives `L + x` congruent to `0` modulo `C`, so head pointer and meeting pointer align at cycle entry when moved equally.\n\nWhy this works:\nRelative speed guarantees collision within cycle. Modular distance relation then recovers entry without extra memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    },
    {
      title: 'Advanced Variant (Compute Cycle Length)',
      content:
        'After collision, cycle length can be measured by one extra lap.\n\nStep-by-step mechanics:\n1. Detect meeting point using Floyd.\n2. Keep one pointer fixed at meeting node.\n3. Move another pointer until it returns to meeting node.\n4. Count steps taken during this loop.\n\n```python\nfunction cycleLength(head):\n    slow = head\n    fast = head\n\n    while fast is not null and fast.next is not null:\n        slow = slow.next\n        fast = fast.next.next\n\n        if slow == fast:\n            length = 1\n            curr = slow.next\n\n            while curr != slow:\n                curr = curr.next\n                length += 1\n\n            return length\n\n    return 0\n```\n\nWhy this is useful:\nKnowing cycle length supports advanced linked-list tasks such as explicit entry offset calculations or specialized diagnostics.',
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
    'Resetting both pointers to head in phase two is incorrect; only one pointer resets.',
    'Using this method on non-linked structures without deterministic next pointers is invalid.'
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
    },
    {
      name: 'Two-phase Algorithm Design',
      details:
        'Phase one answers existence, phase two derives cycle entry or extra metrics from the collision state.'
    }
  ]
};