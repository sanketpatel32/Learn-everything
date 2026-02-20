import type { TopicContent } from '../topicContent';

export const linkedListReversalPatterns: TopicContent = {
  title: 'Reversal Patterns',
  description:
    'Linked list reversal is pointer redirection. Instead of moving values, you rewire `next` references carefully so links point backward.',
  example:
    'Reverse `1 -> 2 -> 3 -> 4 -> null` into `4 -> 3 -> 2 -> 1 -> null`.',
  complexity: {
    time: 'O(N)',
    space: 'O(1) optimal'
  },
  approaches: [
    {
      title: 'Brute Force (Copy Values then Rewrite)',
      content:
        'A simple but less elegant approach stores node values and writes them back in reverse order.\n\nStep-by-step mechanics:\n1. Traverse the list and push values into `arr`.\n2. Traverse again and rewrite each node value from the end of `arr`.\n3. Return original head (links never changed).\n\n```python\nfunction reverseByValues(head):\n    arr = []\n    node = head\n\n    while node is not null:\n        arr.append(node.val)\n        node = node.next\n\n    node = head\n    i = len(arr) - 1\n    while node is not null:\n        node.val = arr[i]\n        i -= 1\n        node = node.next\n\n    return head\n```\n\nThis is valid for some interviews, but it does not test pointer mastery and uses extra memory.',
      complexity: {
        time: 'O(N)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Iterative Pointer Flip)',
      content:
        'Use three pointers to reverse links in one pass.\n\nStep-by-step mechanics:\n1. `prev = null`, `curr = head`.\n2. Save `nextNode = curr.next` before changing anything.\n3. Redirect `curr.next = prev`.\n4. Advance `prev = curr`, `curr = nextNode`.\n5. When `curr` becomes null, `prev` is new head.\n\n```python\nfunction reverseList(head):\n    prev = null\n    curr = head\n\n    while curr is not null:\n        nextNode = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nextNode\n\n    return prev\n```\n\nWhy this works:\nEach node is detached from forward chain and attached to reversed prefix exactly once, so total work is linear and in-place.',
      complexity: {
        time: 'O(N)',
        space: 'O(1)'
      }
    }
  ],
  pitfalls: [
    'Losing the rest of the list by assigning `curr.next` before storing `nextNode`.',
    'Returning `head` instead of `prev` after reversal completes.',
    'For sublist reversal, boundary reconnect logic is the common bug source.'
  ],
  concepts: [
    {
      name: 'Pointer Safety Order',
      details:
        'The operation order matters: save next, flip pointer, advance pointers. Any other order can drop nodes.'
    },
    {
      name: 'Reusable Reversal Primitive',
      details:
        'This pattern appears in many variants: reverse between positions, reverse in k-groups, and palindrome checks.'
    }
  ]
};
