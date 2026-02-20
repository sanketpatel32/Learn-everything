import type { TopicContent } from '../topicContent';

export const circularQueueImplementation: TopicContent = {
  title: 'Circular Queue Implementation',
  description:
    'A circular queue uses fixed-size array storage where front and rear wrap using modulo arithmetic, avoiding costly element shifts.',
  example:
    'With capacity `5`, after enqueueing 5 items and dequeuing 2, new items can reuse freed slots at the beginning by wrapping rear index.',
  complexity: {
    time: 'O(1) enqueue/dequeue',
    space: 'O(K)'
  },
  approaches: [
    {
      title: 'Brute Force (Shift-on-Dequeue Queue)',
      content:
        'A naive array queue removes front by shifting all remaining elements left.\n\nStep-by-step mechanics:\n1. `enqueue` writes at the end if space exists.\n2. `dequeue` saves `arr[0]`, then shifts `arr[1..size-1]` left by one.\n3. Decrease size.\n\n```python\nfunction dequeueShift(queue):\n    if queue.size == 0:\n        return -1\n\n    value = queue.arr[0]\n    for i in range(1, queue.size):\n        queue.arr[i - 1] = queue.arr[i]\n    queue.size -= 1\n    return value\n```\n\nThis breaks queue performance under heavy traffic because every dequeue can be linear.',
      complexity: {
        time: 'O(N) dequeue',
        space: 'O(K)'
      }
    },
    {
      title: 'Optimal Approach (Ring Buffer)',
      content:
        'Track `head`, `tail`, and `size` in fixed array.\n\nStep-by-step mechanics:\n1. `enqueue(x)`: write at `tail`, then `tail = (tail + 1) % capacity`, increment size.\n2. `dequeue()`: read from `head`, then `head = (head + 1) % capacity`, decrement size.\n3. Full condition: `size == capacity`.\n4. Empty condition: `size == 0`.\n\n```python\nclass CircularQueue:\n    def __init__(self, k):\n        self.arr = [0] * k\n        self.capacity = k\n        self.head = 0\n        self.tail = 0\n        self.size = 0\n\n    def enqueue(self, x):\n        if self.size == self.capacity:\n            return False\n        self.arr[self.tail] = x\n        self.tail = (self.tail + 1) % self.capacity\n        self.size += 1\n        return True\n\n    def dequeue(self):\n        if self.size == 0:\n            return -1\n        value = self.arr[self.head]\n        self.head = (self.head + 1) % self.capacity\n        self.size -= 1\n        return value\n```\n\nModulo wraparound reuses slots naturally, so no shifting is needed.',
      complexity: {
        time: 'O(1)',
        space: 'O(K)'
      }
    }
  ],
  pitfalls: [
    'Confusing `tail` as last element instead of next insertion position.',
    'Using only `head == tail` for both empty and full without extra state leads to ambiguity.',
    'Off-by-one mistakes in modulo updates are very common.'
  ],
  concepts: [
    {
      name: 'Fixed-capacity Queue',
      details:
        'Ring buffers are preferred in systems programming where predictable memory and constant-time behavior matter.'
    },
    {
      name: 'State Invariants',
      details:
        'Maintain clear invariants for head/tail/size to make edge cases trivial and avoid logic drift.'
    }
  ]
};
