import { TopicContent } from '../topicContent';

export const vectorDb: TopicContent = {
  title: 'Vector Databases & RAG',
  description: 'With the rise of Large Language Models (LLMs), searching by keyword (SQL/ElasticSearch) is no longer enough. We need to search by "meaning" or semantic similarity. Vector Databases store data as high-dimensional mathematical arrays (Embeddings) and use specialized indexes (HNSW) to find nearest neighbors at massive scale, powering Retrieval-Augmented Generation (RAG).',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="embedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="vdbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="llmGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrowV" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- User Query -->
  <rect x="20" y="240" width="100" height="60" fill="#1e293b" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="70" y="265" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">User Query</text>
  <text x="70" y="280" fill="#cbd5e1" font-size="9" font-style="italic" text-anchor="middle">"How do I reset my pwd?"</text>

  <!-- Ingestion Pipeline (Top) -->
  <rect x="20" y="40" width="100" height="60" fill="#1e293b" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="70" y="65" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Company Docs</text>
  <text x="70" y="80" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">PDFs, Confluence</text>

  <rect x="180" y="20" width="120" height="100" fill="url(#embedGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="240" y="45" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">Embedding Model</text>
  <text x="240" y="60" fill="#bfdbfe" font-size="9" text-anchor="middle">(e.g., text-embedding-3)</text>
  <text x="240" y="85" fill="#dbeafe" font-size="10" font-family="monospace" text-anchor="middle">[0.12, -0.45, 0.89...]</text>
  <text x="240" y="100" fill="#dbeafe" font-size="9" font-family="monospace" text-anchor="middle">1536 Dimensions</text>

  <!-- Vector Database -->
  <rect x="380" y="80" width="160" height="240" fill="url(#vdbGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="460" y="110" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">Vector DB</text>
  <text x="460" y="130" fill="#e9d5ff" font-size="10" text-anchor="middle">(Pinecone, Milvus, pgvector)</text>
  
  <rect x="400" y="150" width="120" height="150" fill="#4c1d95" rx="4" stroke="#7c3aed"/>
  <text x="460" y="170" fill="#ddd6fe" font-size="10" font-weight="bold" text-anchor="middle">ANN Index (HNSW)</text>

  <!-- HNSW Graph Visualization -->
  <circle cx="430" cy="200" r="4" fill="#10b981"/>
  <circle cx="470" cy="220" r="4" fill="#3b82f6"/>
  <circle cx="490" cy="190" r="4" fill="#10b981"/>
  <circle cx="440" cy="250" r="4" fill="#f59e0b"/>
  <circle cx="480" cy="270" r="4" fill="#ef4444"/>

  <path d="M 430 200 L 470 220 L 490 190 L 430 200 Z" stroke="#8b5cf6" stroke-width="1" fill="none"/>
  <path d="M 470 220 L 440 250 L 480 270 Z" stroke="#8b5cf6" stroke-width="1" fill="none"/>
  
  <circle cx="450" cy="230" r="3" fill="#fff"/>
  <text x="450" y="245" fill="#fff" font-size="8" font-family="monospace" text-anchor="middle">Query Vector</text>

  <!-- The LLM -->
  <rect x="620" y="180" width="140" height="110" fill="url(#llmGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="690" y="210" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">LLM (GPT-4)</text>
  <rect x="630" y="220" width="120" height="60" fill="#064e3b" rx="4"/>
  <text x="635" y="235" fill="#6ee7b7" font-size="9" font-family="monospace">Prompt: Answer user</text>
  <text x="635" y="250" fill="#6ee7b7" font-size="9" font-family="monospace">using ONLY this context:</text>
  <text x="635" y="265" fill="#a7f3d0" font-size="9" font-family="monospace">[Doc1, Doc2]</text>


  <!-- Flow Lines -->
  <!-- Ingestion -->
  <path d="M 120 70 L 180 70" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowV)"/>
  
  <path d="M 300 70 L 420 70 L 420 80" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrowV)"/>
  <text x="360" y="60" fill="#cbd5e1" font-size="10" font-family="sans-serif" text-anchor="middle">1. Store Vectors</text>

  <!-- Querying -->
  <path d="M 120 270 L 180 270" stroke="#60a5fa" stroke-width="2" fill="none" marker-end="url(#arrowV)"/>

  <!-- Move Embedding Model Box down virtually for query -->
  <rect x="180" y="240" width="120" height="50" fill="#1e3a8a" rx="4" stroke="#3b82f6" stroke-width="1"/>
  <text x="240" y="260" fill="#bfdbfe" font-size="10" text-anchor="middle">Embed User Query</text>

  <path d="M 300 265 L 380 265" stroke="#60a5fa" stroke-width="3" fill="none" marker-end="url(#arrowV)"/>
  <text x="340" y="255" fill="#93c5fd" font-size="10" font-weight="bold" text-anchor="middle">2. Search</text>

  <path d="M 540 220 L 620 220" stroke="#a855f7" stroke-width="3" fill="none" marker-end="url(#arrowV)"/>
  <text x="580" y="210" fill="#d8b4fe" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">3. Return Top 3 Docs</text>

  <path d="M 690 180 L 690 120 L 80 120 L 80 240" stroke="#10b981" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrowV)"/>
  <text x="690" y="110" fill="#6ee7b7" font-size="10" font-family="sans-serif" text-anchor="middle">4. Generated Answer (No Hallucinations)</text>

  <!-- Explanatory Box -->
  <rect x="250" y="380" width="300" height="40" fill="#1e293b" rx="6" stroke="#fbbf24"/>
  <text x="400" y="405" fill="#fde68a" font-size="12" font-family="sans-serif" text-anchor="middle">Retrieval-Augmented Generation (RAG) Architecture</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Embeddings (Text to Numbers)',
      description: 'You cannot perform math on words. An Embedding Model (like OpenAI\'s `text-embedding-3-small`) takes a paragraph of text and converts it into a dense vector (an array of e.g. 1536 floating-point numbers). Texts with similar meanings will be placed mathematically close to each other in this 1536-dimensional space, even if they use completely different keywords.'
    },
    {
      title: 'Vector Databases',
      description: 'Standard databases (PostgreSQL, MongoDB) organize data in BTrees or Hash Maps for exact matches (`SELECT * WHERE id=5`). Vector Databases (Pinecone, Milvus, Qdrant) are purpose-built to store these mathematical arrays and rapidly calculate the "distance" (Cosine Similarity or Euclidean Distance) between a query vector and millions of document vectors.'
    },
    {
      title: 'Approximate Nearest Neighbor (ANN / HNSW)',
      description: 'If you have 1 Billion documents, calculating the cosine similarity against every single one for every query is O(N) and would take minutes. To achieve millisecond latency, Vector DBs use ANN algorithms, most notably HNSW (Hierarchical Navigable Small World). It builds a multi-layered graph of vectors, trading perfect accuracy (exact nearest neighbor) for blazing fast approximate speed (O(log N)).'
    },
    {
      title: 'Retrieval-Augmented Generation (RAG)',
      description: 'LLMs like ChatGPT hallucinate and don\'t know your company\'s private data. RAG solves this: 1) User asks a question. 2) System embeds question and searches Vector DB. 3) Vector DB returns 3 highly relevant private documents. 4) System hands both the user\'s question AND the 3 documents to the LLM and says "Answer the question using ONLY these documents".'
    }
  ],
  comparisonTable: {
    headers: ['Database Type', 'Core Search Paradigm', 'Key Algorithm/Index', 'Best Use Case'],
    rows: [
      ['Relational (SQL)', 'Exact Match / Filtering', 'B+Tree', 'Financial records, transactional data (ACID).'],
      ['Lexical Search (ElasticSearch)', 'Keyword Matching (BM25)', 'Inverted Index', 'Searching for a specific error code or exact product name.'],
      ['Vector Database (Pinecone)', 'Semantic / Meaning Similarity', 'HNSW (ANN)', 'AI chat, recommendation systems, semantic search (RAG).']
    ]
  },
  pitfalls: [
    'Vectorizing entire 50-page PDFs at once: An embedding model has a contextual limit. Compressing 50 pages into 1536 numbers destroys detail. You must implement "Chunking" (splitting PDFs into 500-word paragraphs) before embedding and storing them.',
    'Ignoring Hybrid Search: Vector search is great for meaning ("How do I fix my phone?"), but terrible at exact keyword matching ("Order ID 8492X"). Modern architecture use Hybrid Search, running a Vector Search (Dense) alongside an ElasticSearch (Sparse/BM25) and combining the scores via Reciprocal Rank Fusion (RRF).',
    'Re-embedding when the model changes: If OpenAI releases `text-embedding-4` and you upgrade, your new search queries will be mathematically incompatible with the millions of `embedding-3` vectors already in your database. You must completely re-embed and re-index your entire dataset.'
  ]
};
