import { TopicContent } from '../topicContent';

export const googleDrive: TopicContent = {
  title: 'Design Google Drive (File Storage)',
  description: 'Google Drive is a massive cloud synchronization service. The core challenge is not just storing files, but synchronizing changes to 10MB or 1GB files across multiple devices (Laptop, Phone, Tablet) instantly and efficiently without exhausting the user\'s mobile data or bandwidth.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="s3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Client Side Architecture (The Heavy Lifter) -->
  <rect x="20" y="40" width="160" height="300" fill="url(#clientGrad)" rx="8" stroke="#60a5fa" stroke-width="2"/>
  <text x="100" y="70" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Local Laptop Client</text>
  <text x="100" y="85" fill="#bfdbfe" font-size="9" text-anchor="middle">(Thick Client)</text>

  <rect x="40" y="100" width="120" height="60" fill="#1e3a8a" rx="4" stroke="#3b82f6"/>
  <text x="100" y="125" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Chunker / Hasher</text>
  <text x="100" y="140" fill="#bfdbfe" font-size="8" text-anchor="middle">Splits 10MB into 2MB</text>
  <text x="100" y="150" fill="#bfdbfe" font-size="8" text-anchor="middle">Calculates SHA-256</text>

  <rect x="40" y="170" width="120" height="40" fill="#1e3a8a" rx="4" stroke="#3b82f6"/>
  <text x="100" y="195" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Local SQLite DB</text>
  <text x="100" y="205" fill="#bfdbfe" font-size="8" text-anchor="middle">Tracks Sync State</text>
  
  <rect x="40" y="220" width="120" height="40" fill="#1e3a8a" rx="4" stroke="#3b82f6"/>
  <text x="100" y="240" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Uploader Queue</text>
  <text x="100" y="250" fill="#bfdbfe" font-size="8" text-anchor="middle">Retry with Exponential Backoff</text>


  <!-- The Cloud (Backend APIs) -->
  <line x1="260" y1="20" x2="260" y2="430" stroke="#334155" stroke-width="2" stroke-dasharray="8"/>

  <!-- Block Servers -->
  <rect x="360" y="60" width="140" height="100" fill="url(#apiGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="430" y="90" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Block API</text>
  <text x="430" y="105" fill="#a7f3d0" font-size="9" text-anchor="middle">(Uploads/Downloads Chunks)</text>
  <rect x="400" y="115" width="60" height="30" fill="#064e3b" rx="2" stroke="#10b981"/>
  <text x="430" y="130" fill="#ffffff" font-size="8" text-anchor="middle">Upload C_4</text>
  <text x="430" y="140" fill="#a7f3d0" font-size="7" text-anchor="middle">SHA: ab9x</text>

  <!-- Object Storage -->
  <rect x="580" y="60" width="120" height="100" fill="url(#s3Grad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="640" y="90" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Amazon S3</text>
  <text x="640" y="105" fill="#fde68a" font-size="9" text-anchor="middle">(Object Storage)</text>
  <text x="640" y="130" fill="#fef3c7" font-size="9" font-family="monospace" text-anchor="middle">C_1 (2MB)</text>
  <text x="640" y="145" fill="#fef3c7" font-size="9" font-family="monospace" text-anchor="middle">C_4 (2MB)</text>

  <!-- Flow (Upload Block) -->
  <path d="M 180 120 L 360 120" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="270" y="110" fill="#cbd5e1" font-size="9" text-anchor="middle">1. Send ONLY changed chunk C_4</text>

  <path d="M 500 110 L 580 110" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- Metadata Servers -->
  <rect x="360" y="240" width="140" height="80" fill="url(#dbGrad)" rx="8" stroke="#a855f7" stroke-width="2"/>
  <text x="430" y="270" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Metadata API</text>
  <text x="430" y="285" fill="#e9d5ff" font-size="9" text-anchor="middle">(Manages File Hierarchy)</text>
  <text x="430" y="305" fill="#e9d5ff" font-size="9" text-anchor="middle">Updates "Doc.txt" Manifest</text>

  <!-- Flow (Update Metadata) -->
  <path d="M 180 260 L 360 260" stroke="#a855f7" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="270" y="250" fill="#d8b4fe" font-size="9" text-anchor="middle">2. "Doc.txt is now chunks [1..4]"</text>


  <!-- Notification Service (Pub/Sub) -->
  <rect x="20" y="360" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="378" fill="#f8fafc" font-size="10" text-anchor="middle">Phone App</text>
  <text x="60" y="390" fill="#94a3b8" font-size="8" text-anchor="middle">(Idle)</text>

  <rect x="360" y="350" width="140" height="60" fill="#0f172a" rx="6" stroke="#475569" stroke-width="2"/>
  <text x="430" y="375" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Notification Svc</text>
  <text x="430" y="390" fill="#94a3b8" font-size="9" text-anchor="middle">(Long Polling / WS)</text>

  <path d="M 430 320 L 430 350" stroke="#a855f7" stroke-width="2" stroke-dasharray="2" fill="none" marker-end="url(#arrow)"/>
  
  <path d="M 360 380 L 100 380" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <text x="230" y="370" fill="#6ee7b7" font-size="9" text-anchor="middle">3. PUSH: "Doc.txt updated!"</text>


  <!-- Key Explanation -->
  <rect x="520" y="200" width="260" height="180" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="650" y="220" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Delta Synchronization</text>
  
  <text x="540" y="250" fill="#94a3b8" font-size="10" font-weight="bold">If User adds a word to a 10MB PDF:</text>
  <text x="540" y="270" fill="#ef4444" font-size="10">Naive: Re-upload entire 10MB to Cloud.</text>
  <text x="540" y="285" fill="#ef4444" font-size="9">(Wastes bandwidth, extremely slow).</text>

  <text x="540" y="315" fill="#34d399" font-size="10">Google Drive: Uses rsync algorithm.</text>
  <text x="540" y="330" fill="#34d399" font-size="9">Client splits 10MB into five 2MB chunks.</text>
  <text x="540" y="345" fill="#34d399" font-size="9">Hashes each chunk. Only the one chunk</text>
  <text x="540" y="360" fill="#34d399" font-size="9">whose hash changed is uploaded (Delta).</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Block-Level Delta Sync',
      description: 'Efficiency is achieved by splitting files into immutable chunks (e.g., 4MB). Only modified chunks are re-uploaded. The "rsync" algorithm allows the client to detect which specific byte ranges changed, minimizing data transfer to the theoretical minimum.'
    },
    {
      title: 'Sync Conflict Resolution',
      description: 'When two devices update the same file offline, a conflict arises. Drive maintains an "incremental version number" in the Metadata DB. The first server update wins ($v1 \\to v2$); the second device is prompted to save a copy ("file (1).txt") or merge manually.'
    },
    {
      title: 'Object Storage Deduplication',
      description: 'By hashing chunks (Content-Addressable Storage), the system avoids storing duplicate data globally. If multiple users upload the same 1GB Linux ISO, only one physical copy is stored, while the Metadata DB maps each user to that same set of hashes.'
    }
  ],
  comparisonTable: {
    headers: ['Feature', 'Block Storage (S3)', 'Metadata (SQL)', 'Why?'],
    rows: [
      ['Data Type', 'File Chunks (2-4MB)', 'File Hierarchy / Ownership', 'Binary data is huge, metadata is structured.'],
      ['Scaling', 'Horizontal (Infinite)', 'Sharded RDBMS / NoSQL', 'S3 scales natively; SQL needs sharding by UserID.'],
      ['Consistency', 'Strong (per object)', 'Strong (ACID)', 'Metadata must be perfect to prevent data loss.'],
    ]
  },
  videoUrl: 'https://www.youtube.com/watch?v=AAbn9l0v1V0',
  concepts: [
    {
      name: 'Merkle Trees for Sync',
      details: 'Clients use Merkle Trees to quickly identify which sub-folder or sub-block has changed by comparing root hashes, avoiding full file scans.'
    }
  ],
  pitfalls: [
    'Naive Polling: 100M clients checking for updates every minute crashes the DB. Always use Pub/Sub or Long Polling for change notifications.',
    'Server-side Hashing: Generates unnecessary traffic. Clients MUST hash blocks locally and only upload if the server doesn\'t have that hash.',
    'Large File Metadata: Storing millions of block pointers in one SQL row is inefficient. Use a dedicated mapping table or a Document store for file manifests.'
  ]
};
