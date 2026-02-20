import type { TopicContent } from '../topicContent';

export const circularQueueImplementation: TopicContent = {
  title: 'Circular Queue Implementation',
  description:
    'A circular queue (ring buffer) uses fixed array storage with wrap-around indices, enabling constant-time enqueue/dequeue without element shifting.',
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
        'Naive array queue removes front by shifting all items left.\n\nStep-by-step mechanics:\n1. `enqueue` appends at array tail.\n2. `dequeue` reads first element.\n3. Shift all remaining elements one step left.\n4. Decrease size counter.\n\n```python\nfunction dequeueShift(queue):\n    if queue.size == 0:\n        return -1\n\n    value = queue.arr[0]\n    for i in range(1, queue.size):\n        queue.arr[i - 1] = queue.arr[i]\n    queue.size -= 1\n\n    return value\n```\n\nThis makes dequeues linear and unsuitable for high-throughput queue workloads.',
      complexity: {
        time: 'O(N) dequeue',
        space: 'O(K)'
      }
    },
    {
      title: 'Optimal Approach (Ring Buffer)',
      content:
        'Ring buffer tracks logical front and next-write positions with modulo wrap.\n\nStep-by-step mechanics:\n1. State variables:\n   - `head`: index of current front element\n   - `tail`: index where next enqueue will write\n   - `size`: number of elements in queue\n2. Enqueue:\n   - reject if full\n   - write at `tail`\n   - advance `tail = (tail + 1) % capacity`\n   - increment size\n3. Dequeue:\n   - reject if empty\n   - read at `head`\n   - advance `head = (head + 1) % capacity`\n   - decrement size\n\n```python\nclass CircularQueue:\n    def __init__(self, k):\n        self.arr = [0] * k\n        self.capacity = k\n        self.head = 0\n        self.tail = 0\n        self.size = 0\n\n    def enqueue(self, x):\n        if self.size == self.capacity:\n            return False\n\n        self.arr[self.tail] = x\n        self.tail = (self.tail + 1) % self.capacity\n        self.size += 1\n        return True\n\n    def dequeue(self):\n        if self.size == 0:\n            return -1\n\n        value = self.arr[self.head]\n        self.head = (self.head + 1) % self.capacity\n        self.size -= 1\n        return value\n\n    def front(self):\n        if self.size == 0:\n            return -1\n        return self.arr[self.head]\n```\n\nInvariant:\n- Valid elements occupy `size` logical slots from `head` forward with wraparound.\n- `tail` always points to next insertion slot.\n\nWhy this works:\nModulo arithmetic maps logical queue movement onto fixed-size storage, reusing freed positions without data movement.',
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
    'When capacity is zero or one, edge conditions should be tested explicitly.'
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
    }
  ]
};
