import type { TopicContent } from '../topicContent';

export const triesPrefixTree: TopicContent = {
  title: 'Tries (Prefix Tree)',
  description:
    'A Trie stores strings character-by-character, enabling prefix operations in time proportional to query length instead of number of stored words. It is the standard structure for auto-complete, spell-check dictionaries, and prefix counting.',
  example:
    'Insert `apple`, `app`, and `apt`; `search("app")` is true, `search("ap")` is false, and `startsWith("ap")` is true.',
  complexity: {
    time: 'O(L) for insert/search/prefix',
    space: 'O(total characters stored)'
  },
  approaches: [
    {
      title: 'Brute Force (String List Scans)',
      content:
        'Store words in a flat list and answer operations by scanning.\n\nStep-by-step mechanics:\n1. Insert by appending word into array.\n2. Exact search by scanning for full string equality.\n3. Prefix search by scanning and testing `word.startswith(prefix)`.\n4. For prefix counts, scan entire dictionary and count matches.\n\n```python\nfunction searchBrute(words, target):\n    for w in words:\n        if w == target:\n            return True\n    return False\n\nfunction startsWithBrute(words, prefix):\n    for w in words:\n        if w.startswith(prefix):\n            return True\n    return False\n\nfunction countPrefixBrute(words, prefix):\n    cnt = 0\n    for w in words:\n        if w.startswith(prefix):\n            cnt += 1\n    return cnt\n```\n\nThis baseline is acceptable for tiny dictionaries, but once `N` grows, every query becomes expensive because lookup cost depends on total word count rather than query length.',
      complexity: {
        time: 'O(N * L) query',
        space: 'O(total characters)'
      }
    },
    {
      title: 'Optimal Approach (Trie Node Graph)',
      content:
        'Use a root node where each edge represents one character transition. Each node stores `children` and an `isEnd` marker.\n\nStep-by-step mechanics:\n1. Insert:\n   - start at root.\n   - for each character, create child if missing.\n   - move to child.\n   - mark `isEnd = true` at final node.\n2. Search:\n   - follow all characters from root.\n   - fail immediately on missing edge.\n   - return `isEnd` at final node.\n3. Prefix:\n   - follow characters exactly like search.\n   - if traversal succeeds, prefix exists even if final node is not terminal.\n4. Optional optimization:\n   - maintain `prefixCount` at each node for fast `countPrefix` queries.\n\n```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.isEnd = False\n        self.prefixCount = 0\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n            node.prefixCount += 1\n        node.isEnd = True\n\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.isEnd\n\n    def startsWith(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return True\n```\n\nWhy this works:\nTrie traversal performs one transition per input character, so operation cost is `O(L)` independent of number of stored words.',
      complexity: {
        time: 'O(L)',
        space: 'O(total characters)'
      }
    }
  ],
  pitfalls: [
    'Confusing exact word search with prefix search by ignoring `isEnd`.',
    'Using fixed 26-array children without handling uppercase or unicode can break inputs.',
    'Memory usage can be high for sparse alphabets without compression.',
    'Delete operation is subtle because removing one word can affect shared prefix nodes used by other words.'
  ],
  concepts: [
    {
      name: 'Prefix-sharing',
      details:
        'Common prefixes are stored once, which makes repeated prefix operations efficient.'
    },
    {
      name: 'Automaton-like Traversal',
      details:
        'Each character transitions to the next state node; missing transition means query fails immediately.'
    },
    {
      name: 'Terminal vs Non-terminal Nodes',
      details:
        'A node can represent a valid prefix and also be a complete word when `isEnd` is set.'
    }
  ]
};
