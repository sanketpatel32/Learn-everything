import { TopicContent } from '../topicContent';

export const youtube: TopicContent = {
  title: 'Design YouTube (Video Storage & CDN)',
  description: 'Designing YouTube involves handling immense write load (500 hours of video uploaded every minute), massive processing requirements (transcoding video to 1080p, 720p, 480p), and astronomical read scale (billions of daily views). This architecture centers entirely around Blob Storage, encoding pipelines, and multi-tier Content Delivery Networks.',
  diagram: `
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto drop-shadow-2xl">
  <defs>
    <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1e40af" />
    </linearGradient>
    <linearGradient id="s3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="encoderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <linearGradient id="cdnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
    </marker>
    <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
    </marker>
  </defs>

  <rect x="0" y="0" width="800" height="450" fill="#0f172a" rx="16" stroke="#1e293b"/>

  <!-- Left: Upload Flow -->
  <rect x="20" y="40" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">Creator</text>
  <text x="60" y="70" fill="#94a3b8" font-size="8" text-anchor="middle">(Uploads 2GB MP4)</text>

  <!-- Upload App Servers -->
  <rect x="160" y="20" width="100" height="60" fill="url(#apiGrad)" rx="6" stroke="#60a5fa" stroke-width="2"/>
  <text x="210" y="45" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Upload API</text>
  <text x="210" y="60" fill="#bfdbfe" font-size="9" text-anchor="middle">Chunked Resumable</text>

  <path d="M 100 60 L 160 60" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <!-- Original Video Storage -->
  <rect x="320" y="20" width="120" height="60" fill="#020617" rx="8" stroke="#334155" stroke-width="2"/>
  <text x="380" y="45" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Original Storage</text>
  <text x="380" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">(S3 Cold Blob)</text>

  <path d="M 260 50 L 320 50" stroke="#cbd5e1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>


  <!-- Encoding Pipeline (DAG) -->
  <rect x="120" y="140" width="320" height="120" fill="#1e293b" rx="8" stroke="#475569" stroke-width="2" stroke-dasharray="4"/>
  <text x="280" y="160" fill="#f8fafc" font-size="12" font-weight="bold" text-anchor="middle">Video Encoding Pipeline (Distributed Workers)</text>

  <rect x="140" y="180" width="80" height="60" fill="url(#encoderGrad)" rx="4" stroke="#a855f7"/>
  <text x="180" y="205" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Thumbnail</text>
  <text x="180" y="220" fill="#ddd6fe" font-size="8" text-anchor="middle">Generator</text>

  <rect x="240" y="180" width="80" height="60" fill="url(#encoderGrad)" rx="4" stroke="#a855f7"/>
  <text x="280" y="200" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Transcoder</text>
  <text x="280" y="215" fill="#ddd6fe" font-size="8" text-anchor="middle">1080p, 720p</text>
  <text x="280" y="225" fill="#ddd6fe" font-size="8" text-anchor="middle">H.264, VP9</text>

  <rect x="340" y="180" width="80" height="60" fill="url(#encoderGrad)" rx="4" stroke="#a855f7"/>
  <text x="380" y="205" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Audio</text>
  <text x="380" y="220" fill="#ddd6fe" font-size="8" text-anchor="middle">Extraction</text>

  <path d="M 380 80 L 380 140" stroke="#a855f7" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="400" y="110" fill="#a855f7" font-size="10">Event: Trigger Jobs</text>

  <!-- Processed Video Storage -->
  <rect x="520" y="140" width="140" height="120" fill="url(#s3Grad)" rx="8" stroke="#fbbf24" stroke-width="2"/>
  <text x="590" y="170" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">Transcoded DB</text>
  <text x="590" y="185" fill="#fde68a" font-size="9" text-anchor="middle">(Hot S3 Buckets)</text>

  <rect x="540" y="200" width="100" height="15" fill="#b45309" rx="2"/>
  <text x="590" y="210" fill="#fef3c7" font-size="8" text-anchor="middle">seg_001_1080.ts</text>
  <rect x="540" y="220" width="100" height="15" fill="#b45309" rx="2"/>
  <text x="590" y="230" fill="#fef3c7" font-size="8" text-anchor="middle">seg_002_1080.ts</text>
  <rect x="540" y="240" width="100" height="15" fill="#b45309" rx="2"/>
  <text x="590" y="250" fill="#fef3c7" font-size="8" text-anchor="middle">seg_001_720.ts</text>

  <path d="M 440 200 L 520 200" stroke="#fbbf24" stroke-width="2" fill="none" marker-end="url(#arrowB)"/>


  <!-- Right/Bottom: Viewer Stream Flow -->
  <rect x="20" y="340" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="358" fill="#f8fafc" font-size="10" text-anchor="middle">Viewer A</text>
  <text x="60" y="370" fill="#94a3b8" font-size="8" text-anchor="middle">(Streams 1080p)</text>
  
  <rect x="20" y="400" width="80" height="40" fill="#1e293b" rx="4" stroke="#475569"/>
  <text x="60" y="418" fill="#f8fafc" font-size="10" text-anchor="middle">Viewer B</text>
  <text x="60" y="430" fill="#94a3b8" font-size="8" text-anchor="middle">(Streams 480p)</text>

  <rect x="200" y="360" width="340" height="60" fill="url(#cdnGrad)" rx="8" stroke="#34d399" stroke-width="2"/>
  <text x="370" y="380" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Edge CDN Caching (Open Connect)</text>
  <text x="370" y="395" fill="#a7f3d0" font-size="9" text-anchor="middle">Serving segmented DASH/HLS \`.ts\` video files locally.</text>

  <!-- Read Lines -->
  <path d="M 100 360 L 200 380" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
  <path d="M 100 420 L 200 400" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

  <path d="M 540 380 L 590 380 L 590 260" stroke="#10b981" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow)"/>
  <text x="640" y="340" fill="#a7f3d0" font-size="10" font-style="italic" text-anchor="middle">CDN Miss -> Fetch from Core</text>


  <!-- Key Explanation -->
  <rect x="680" y="20" width="100" height="410" fill="#1e293b" rx="6" stroke="#475569"/>
  <text x="730" y="40" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">Concepts</text>
  
  <text x="730" y="80" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Split Chunks</text>
  <circle cx="730" cy="100" r="14" fill="#1e3a8a"/>
  <text x="730" y="103" fill="#ffffff" font-size="8" text-anchor="middle">5 Secs</text>

  <text x="730" y="140" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">MPEG-DASH & HLS</text>
  <text x="730" y="190" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Adaptive Bitrate</text>
  <circle cx="730" cy="210" r="14" fill="#064e3b"/>
  <text x="730" y="213" fill="#ffffff" font-size="8" text-anchor="middle">wifi=4K</text>
  <circle cx="730" cy="240" r="14" fill="#7f1d1d"/>
  <text x="730" y="243" fill="#ffffff" font-size="8" text-anchor="middle">3G=360p</text>

  <text x="730" y="290" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Upload</text>
  <text x="730" y="300" fill="#94a3b8" font-size="8" text-anchor="middle">Resumable Chunk</text>
  
  <text x="730" y="330" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">CDN Binge</text>
  <text x="730" y="340" fill="#94a3b8" font-size="8" text-anchor="middle">Predictive Fetch</text>

</svg>
  `,
  keyPoints: [
    {
      title: 'Resumable Chunked Uploads',
      description: 'A 2GB 4K video takes time to upload. If the connection drops at 99%, restarting is disastrous. The Upload Service accepts video in small 5MB chunks via a presigned URL directly to S3. If it fails, the client simply asks the server, "What was the last chunk you got?" and resumes from chunk #390.'
    },
    {
      title: 'Transcoding Pipeline (DAG)',
      description: 'A raw `.mp4` from an iPhone isn\'t streamed to users. It\'s heavily compressed. A Directed Acyclic Graph (DAG) task runner splits the video into 10-second segments. Distributed workers transcode these segments concurrently into various bitrates (144p, 360p, 720p, 1080p) and formats (H.264, VP9) for massive parallel processing speed.'
    },
    {
      title: 'Adaptive Bitrate Streaming (HLS / DASH)',
      description: 'Instead of serving one massive 500MB file, YouTube serves a "Playlist" (Manifest file) of endless 5-second video chunks. If a user starts walking and their 5G drops to 3G, the client simply requests the next 5-second chunk seamlessly from the `360p` bucket instead of the `1080p` bucket, preventing buffering.'
    },
    {
      title: 'CDN and Edge Delivery',
      description: 'A viral MrBeast video is not served from a core database. YouTube streams 99% of its data from Global Content Delivery Networks positioned deep within ISPs. The moment a video goes viral, its video chunks are cached directly inside your local internet provider\'s building for ultra-low latency reads.'
    }
  ],
  comparisonTable: {
    headers: ['Video Standard', 'Single File Stream (MP4)', 'Segmented Streaming (HLS/DASH)'],
    rows: [
      ['Network Quality Drop', 'Entire video buffers and freezes.', 'Client dynamically requests lower quality for the next 5 seconds.'],
      ['Memory Usage', 'Requires loading massive byte ranges into memory.', 'Requires only the tiny 5 second chunk currently playing.'],
      ['CDN Caching', 'Hard to securely cache an interrupted large file proxy.', 'Incredible CDN hit rates since small segments are universally requested.']
    ]
  },
  pitfalls: [
    'Serving static MP4 files directly: This ensures all mobile users on poor networks will buffer forever, or users on 4K networks get blurry artifacts. Streaming MUST be adaptive and segmented.',
    'Encoding video synchronously: Forcing an upload API server to run `FFmpeg` blocks the CPU for hours. Encoding must be entirely asynchronous, message queue-driven, and highly horizontal.',
    'Storing every uploaded clip on edge CDNs (Thrashing): 80% of videos uploaded to YouTube have < 100 views. Pushing a random home-movie into premium ISP Edge caches pushes out highly valuable data (Cache Thrashing). Edge nodes should only cache viral/popular segmented chunks.'
  ]
};
