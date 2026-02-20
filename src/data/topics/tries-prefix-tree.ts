import type { TopicContent } from '../topicContent';

export const triesPrefixTree: TopicContent = {
  title: 'Tries (Prefix Tree)',
  description:
    'Trie stores words character-by-character so lookup cost depends on query length, not dictionary size. It is a core structure for auto-complete, prefix counting, and lexicon membership checks.',
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
        'Store all words in a plain array and scan for each operation.\n\nStep-by-step mechanics:\n1. Insert by append.\n2. Search by full-string scan.\n3. Prefix query by checking `startswith` on each word.\n4. Prefix count by counting matches in full scan.\n\n```python\nfunction searchBrute(words, target):\n    for w in words:\n        if w == target:\n            return True\n    return False\n\nfunction startsWithBrute(words, prefix):\n    for w in words:\n        if w.startswith(prefix):\n            return True\n    return False\n\nfunction countPrefixBrute(words, prefix):\n    cnt = 0\n    for w in words:\n        if w.startswith(prefix):\n            cnt += 1\n    return cnt\n```\n\nThis is fine for tiny sets but scales poorly when dictionary size grows.',
      complexity: {
        time: 'O(N * L) query',
        space: 'O(total characters)'
      }
    },
    {
      title: 'Optimal Approach (Trie Node Graph)',
      content:
        'Model strings as paths from root; each edge is one character transition.\n\nStep-by-step mechanics:\n1. Insert:\n   - start at root\n   - create missing child for each character\n   - move forward\n   - mark final node `isEnd = true`\n2. Search:\n   - traverse characters\n   - fail immediately on missing child\n   - succeed only if final node is terminal\n3. Prefix query:\n   - same traversal as search\n   - success does not require terminal node\n4. Prefix count:\n   - increment `prefixCount` while inserting\n   - read count at terminal prefix node\n\n```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.isEnd = False\n        self.prefixCount = 0\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n            node.prefixCount += 1\n        node.isEnd = True\n\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return node.isEnd\n\n    def startsWith(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children:\n                return False\n            node = node.children[ch]\n        return True\n```\n\nWhy this works:\nOperations traverse at most one node per character, so runtime is `O(L)` regardless of number of stored words.',
      complexity: {
        time: 'O(L)',
        space: 'O(total characters)'
      }
    },
    {
      title: 'Advanced Variant (Delete and Compressed Trie)',
      content:
        'Production tries often need delete support and memory optimization.\n\nStep-by-step mechanics for safe delete:\n1. Traverse word and store path stack.\n2. If terminal marker is absent at end, word not present.\n3. Unmark terminal.\n4. Walk path backward and remove nodes that:\n   - are not terminal\n   - have no children\n   - are no longer needed by other words.\n\n```python\nfunction delete(word):\n    stack = []\n    node = root\n\n    for ch in word:\n        if ch not in node.children:\n            return False\n        stack.append((node, ch))\n        node = node.children[ch]\n\n    if not node.isEnd:\n        return False\n\n    node.isEnd = False\n\n    while stack and not node.isEnd and len(node.children) == 0:\n        parent, ch = stack.pop()\n        del parent.children[ch]\n        node = parent\n\n    return True\n```\n\nCompressed trie (radix tree) idea:\n- Merge single-child chains into one edge labeled by a string segment.\n- Reduces memory and depth for sparse dictionaries.\n\nWhy this matters:\nNaive trie can become memory-heavy; compressed variants and correct delete logic are key for real systems.',
      complexity: {
        time: 'O(L)',
        space: 'Reduced compared to naive trie in sparse datasets'
      }
    }
  ],
  pitfalls: [
    'Confusing exact word search with prefix search by ignoring `isEnd`.',
    'Using fixed 26-array children without handling uppercase or unicode can break inputs.',
    'Memory usage can be high for sparse alphabets without compression.',
    'Delete operation is subtle because removing one word can affect shared prefix nodes used by other words.',
    'For duplicate inserts, frequency tracking is required if delete should remove one occurrence at a time.'
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
    },
    {
      name: 'Path Compression',
      details:
        'Radix compression merges single-child chains to reduce memory and traversal overhead.'
    }
  ]
};
