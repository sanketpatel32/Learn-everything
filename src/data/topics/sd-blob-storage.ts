import { TopicContent } from '../topicContent';

export const sdBlobStorage: TopicContent = {
  title: 'Object Storage (S3/Blob)',
  description: 'Deep dive into Object Storage systems designed to handle massive amounts of unstructured data like images, videos, and backups.',
  concepts: [
    {
      name: 'Flat Namespace',
      details: 'Unlike hierarchical file systems, object storage stores data in a flat namespace (buckets) using unique identifiers/keys.'
    },
    {
      name: 'Immutability & Versioning',
      details: 'Objects are generally immutable. Modifying a file replaces the whole object. Versioning retains multiple historical copies.'
    },
    {
      name: 'Multipart Upload',
      details: 'Splitting large files (e.g., 50GB videos) into smaller chunks uploaded in parallel to improve reliability and speed.'
    }
  ],
  approaches: [
    {
      title: 'Presigned URLs',
      content: 'Instead of routing file uploads/downloads through the application server, the server grants the client a short-lived token to interact directly with the storage bucket.',
      complexity: { time: '-', space: '-' }
    },
    {
      title: 'CDN Integration',
      content: 'Placing a Content Delivery Network (e.g., CloudFront) in front of the object storage to cache heavily accessed read-only assets globally.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Routing terabytes of file uploads through the backend Node/Python server, saturating network bandwidth and CPU. Use Presigned URLs.',
    'Assuming S3 has millisecond consistency for instant overwrite reads across all global regions.',
    'Storing billions of tiny log files directly in S3 without grouping/batching them, resulting in massive API request costs.'
  ]
};
