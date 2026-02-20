import { TopicContent } from '../topicContent';

export const exGoogleDocs: TopicContent = {
  title: 'Design Google Docs (Collaborative Editing)',
  description: 'Designing a real-time collaborative text editor where multiple users can type in the same document simultaneously without conflicts.',
  concepts: [
    {
      name: 'Concurrency Control',
      details: 'The challenge of merging independent keystrokes from multiple geographically distributed users in real-time.'
    },
    {
      name: 'WebSockets',
      details: 'Providing a persistent, bidirectional channel for streaming operations between the central server and different browsers with minimal latency.'
    }
  ],
  approaches: [
    {
      title: 'Operational Transformation (OT)',
      content: 'The traditional approach. It transforms operational indices dynamically. If User A deletes index 3 and User B inserts at index 5, the server calculates the transformed operations so both clients reach identical states.',
      complexity: { time: '-', space: '-' }
    },
    {
      title: 'CRDTs (Conflict-free Replicated Data Types)',
      content: 'A mathematical data structure approach where every character inserted is assigned a fractional, unique global index. Conflicts are impossible by design, allowing true peer-to-peer or serverless sync.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Attempting to use simple diff/patch logic (like Git) for real-time keystrokes. Git is designed for asynchronous, explicit merges, not sub-second character alignment.',
    'Routing every single keystroke as an individual HTTP POST request, absolutely overwhelming the server with TCP overhead. (Batching and WebSockets are mandatory).',
    'Storing the entire document object on every keystroke in the DB instead of appending small change operations to an event log.'
  ]
};
