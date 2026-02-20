import type { TopicContent } from '../topicContent';

export const circularQueueImplementation: TopicContent = {
  title: 'Circular Queue Implementation',
  description:
    'A circular queue (ring buffer) uses fixed-size array storage with wrap-around indices, giving `O(1)` enqueue and dequeue without shifting elements.',
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
        'Naive array queue removes front by shifting remaining elements.\n\nStep-by-step mechanics:\n1. `enqueue` writes at next free tail position.\n2. `dequeue` returns first element.\n3. Shift all later elements left by one.\n4. Decrement size.\n\n```python\nfunction dequeueShift(queue):\n    if queue.size == 0:\n        return -1\n\n    value = queue.arr[0]\n    for i in range(1, queue.size):\n        queue.arr[i - 1] = queue.arr[i]\n\n    queue.size -= 1\n    return value\n```\n\nThis fails throughput targets because dequeue is linear.',
      complexity: {
        time: 'O(N) dequeue',
        space: 'O(K)'
      }
    },
    {
      title: 'Optimal Approach (Ring Buffer)',
      content:
        'Track queue boundaries with modulo arithmetic instead of shifting elements.\n\nStep-by-step mechanics:\n1. Maintain:\n   - `head`: front element index\n   - `tail`: next insertion index\n   - `size`: active element count\n2. Enqueue:\n   - fail if full\n   - write at `tail`\n   - move `tail = (tail + 1) % capacity`\n   - increment size\n3. Dequeue:\n   - fail if empty\n   - read `arr[head]`\n   - move `head = (head + 1) % capacity`\n   - decrement size\n\n```python\nclass CircularQueue:\n    def __init__(self, k):\n        self.arr = [0] * k\n        self.capacity = k\n        self.head = 0\n        self.tail = 0\n        self.size = 0\n\n    def enqueue(self, x):\n        if self.size == self.capacity:\n            return False\n\n        self.arr[self.tail] = x\n        self.tail = (self.tail + 1) % self.capacity\n        self.size += 1\n        return True\n\n    def dequeue(self):\n        if self.size == 0:\n            return -1\n\n        value = self.arr[self.head]\n        self.head = (self.head + 1) % self.capacity\n        self.size -= 1\n        return value\n\n    def front(self):\n        if self.size == 0:\n            return -1\n        return self.arr[self.head]\n```\n\nInvariant:\n`size` elements exist in FIFO order starting from `head`, and `tail` always points to next free slot.',
      complexity: {
        time: 'O(1)',
        space: 'O(K)'
      }
    },
    {
      title: 'Alternative Design (Head/Tail with One-slot Gap)',
      content:
        'Another common implementation avoids explicit `size` by reserving one empty slot.\n\nStep-by-step mechanics:\n1. Allocate array of size `k + 1` for logical capacity `k`.\n2. Empty condition: `head == tail`.\n3. Full condition: `(tail + 1) % cap == head`.\n4. Enqueue writes at `tail`, then advances `tail`.\n5. Dequeue reads at `head`, then advances `head`.\n\n```python\nclass RingNoSize:\n    def __init__(self, k):\n        self.cap = k + 1\n        self.arr = [0] * self.cap\n        self.head = 0\n        self.tail = 0\n\n    def isEmpty(self):\n        return self.head == self.tail\n\n    def isFull(self):\n        return (self.tail + 1) % self.cap == self.head\n```\n\nWhy this matters:\nThis variant simplifies state bookkeeping and is common in low-level systems and interview implementations.',
      complexity: {
        time: 'O(1)',
        space: 'O(K)'
      }
    }
  ],
  pitfalls: [
    'Confusing `tail` as last element instead of next insertion position.',
    'Using only `head == tail` for both empty and full without extra state leads to ambiguity.',
    'Off-by-one mistakes in modulo updates are very common.',
    'When capacity is zero or one, edge conditions should be tested explicitly.',
    'In one-slot-gap design, forgetting extra array slot reduces usable capacity incorrectly.'
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
    },
    {
      name: 'Logical vs Physical Order',
      details:
        'Physical array indices wrap, but logical queue order remains FIFO through head progression.'
    },
    {
      name: 'State Encoding Choices',
      details:
        'Queue state can be encoded using `(head, tail, size)` or `(head, tail)` with one-slot gap; both are valid if invariants are preserved.'
    }
  ]
};
