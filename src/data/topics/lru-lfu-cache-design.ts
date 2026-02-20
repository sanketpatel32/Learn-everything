import type { TopicContent } from '../topicContent';

export const lruLfuCacheDesign: TopicContent = {
  title: 'LRU & LFU Cache Design',
  description:
    'Cache design problems require `O(1)`-style `get` and `put` with strict eviction rules. LRU optimizes recency, while LFU optimizes frequency with recency tie-breaking inside equal-frequency buckets.',
  example:
    'For LRU capacity `2`: `put(1,1), put(2,2), get(1), put(3,3)` should evict key `2` because key `1` was just used.',
  complexity: {
    time: 'O(1) target for get/put',
    space: 'O(Capacity)'
  },
  approaches: [
    {
      title: 'Brute Force (Array or List Scan)',
      content:
        'Maintain cache entries in plain list and linearly scan for operations.\n\nStep-by-step mechanics:\n1. `get(key)` scans for matching key.\n2. If found, update metadata (`lastUsed`, `freq`).\n3. `put(key, value)` scans to update existing or append new.\n4. On overflow, scan again to pick eviction victim.\n\n```python\nfunction getBrute(cacheList, key):\n    for entry in cacheList:\n        if entry.key == key:\n            entry.lastUsed = now()\n            entry.freq += 1\n            return entry.value\n    return -1\n```\n\nCorrect but each operation can degrade to linear time.',
      complexity: {
        time: 'O(N) per op',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (LRU: Hash Map + Doubly Linked List)',
      content:
        'LRU design composes two structures.\n\nStep-by-step mechanics:\n1. Hash map `key -> node` for direct access.\n2. Doubly linked list ordered by recency.\n3. `get` moves node to head (most recent).\n4. `put` inserts or updates at head.\n5. On overflow, evict tail (least recently used).\n\n```python\nfunction get(key):\n    if key not in map:\n        return -1\n\n    node = map[key]\n    remove(node)\n    addToHead(node)\n    return node.value\n\nfunction put(key, value):\n    if capacity == 0:\n        return\n\n    if key in map:\n        node = map[key]\n        node.value = value\n        remove(node)\n        addToHead(node)\n        return\n\n    node = Node(key, value)\n    map[key] = node\n    addToHead(node)\n\n    if size > capacity:\n        victim = removeTail()\n        del map[victim.key]\n```\n\nWhy this works:\nHash lookup plus O(1) linked-list move/delete satisfies constant-time target.',
      complexity: {
        time: 'O(1) amortized',
        space: 'O(Capacity)'
      }
    },
    {
      title: 'Advanced Approach (LFU: Key Map + Frequency Buckets)',
      content:
        'LFU requires two-dimensional ordering: frequency first, recency tie-break inside same frequency.\n\nStep-by-step mechanics:\n1. `keyToNode`: maps key to node (`key`, `value`, `freq`).\n2. `freqToList`: maps frequency to doubly linked list of nodes with that frequency, ordered by recency.\n3. `minFreq`: smallest frequency currently present.\n4. `get(key)`:\n   - find node\n   - remove from old freq list\n   - increment freq\n   - insert into new freq list head\n   - update `minFreq` when old bucket becomes empty\n5. `put(key, value)`:\n   - if key exists, update value and call frequency-increment routine\n   - else evict least-recent node from `freqToList[minFreq]` when full\n   - insert new node with freq `1` and set `minFreq = 1`\n\n```python\nfunction touch(node):\n    oldFreq = node.freq\n    freqToList[oldFreq].remove(node)\n\n    if oldFreq == minFreq and freqToList[oldFreq].isEmpty():\n        minFreq += 1\n\n    node.freq += 1\n    freqToList[node.freq].addToHead(node)\n\nfunction get(key):\n    if key not in keyToNode:\n        return -1\n\n    node = keyToNode[key]\n    touch(node)\n    return node.value\n\nfunction put(key, value):\n    if capacity == 0:\n        return\n\n    if key in keyToNode:\n        node = keyToNode[key]\n        node.value = value\n        touch(node)\n        return\n\n    if size == capacity:\n        victim = freqToList[minFreq].removeTail()\n        del keyToNode[victim.key]\n        size -= 1\n\n    node = Node(key, value, freq=1)\n    keyToNode[key] = node\n    freqToList[1].addToHead(node)\n    minFreq = 1\n    size += 1\n```\n\nWhy this matters:\nLFU cannot be implemented with one recency list alone. Frequency buckets plus `minFreq` are the core invariants for `O(1)` behavior.',
      complexity: {
        time: 'O(1) amortized',
        space: 'O(Capacity)'
      }
    }
  ],
  pitfalls: [
    'Using singly linked list makes middle-node deletion `O(N)` and breaks performance target.',
    'For LFU, forgetting to update `minFreq` after moving nodes across frequency lists.',
    'Eviction logic must run only after inserting/updating, with strict capacity checks.',
    'Capacity zero edge case must be handled explicitly (`put` should no-op).',
    'In LFU, ties must be resolved by recency within the same frequency bucket.'
  ],
  concepts: [
    {
      name: 'Data Structure Composition',
      details:
        'No single structure solves this. Fast design comes from combining hash maps with linked lists.'
    },
    {
      name: 'Recency vs Frequency',
      details:
        'LRU optimizes temporal locality, LFU optimizes repeated popularity; each fails in different workload patterns.'
    },
    {
      name: 'Policy-specific Metadata',
      details:
        'Cache eviction is a data-structure problem driven by maintaining policy metadata (`time`, `freq`, or both) efficiently.'
    },
    {
      name: 'Invariant-driven Design',
      details:
        'Correctness depends on maintaining map-list consistency, accurate bucket membership, and valid `minFreq` after each operation.'
    }
  ]
};
