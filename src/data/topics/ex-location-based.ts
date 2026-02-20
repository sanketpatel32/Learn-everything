import { TopicContent } from '../topicContent';

export const exLocationBased: TopicContent = {
  title: 'Design Yelp / Proximity Service',
  description: 'Designing a location-based system that allows users to search for nearby points of interest (businesses, drivers) efficiently.',
  concepts: [
    {
      name: 'Read-Heavy Workload',
      details: 'A service like Yelp has vastly more reads (searching for places) than writes (adding new places/reviews).'
    },
    {
      name: 'Spatial Indexing',
      details: 'Using Quadtrees or Geohashing in a Spatial DB/Cache (like Redis GEO) instead of complex latitude/longitude math across the whole table.'
    }
  ],
  approaches: [
    {
      title: 'Distributed Quadtree',
      content: 'A massive memory tree keeping tracks of points. When a node fills up (e.g. 500 places), it splits into four sub-nodes. Requires a partitioning strategy mapped via a Hash Ring.',
      complexity: { time: '-', space: '-' }
    },
    {
      title: 'Read Replicas',
      content: 'Using a Master-Slave database setup where the Master handles new restaurant entries and Slaves process the immense search traffic.',
      complexity: { time: '-', space: '-' }
    }
  ],
  pitfalls: [
    'Performing `SELECT * FROM places WHERE distance(lat, lng) < 10` resulting in full table scans and total database collapse.',
    'Constantly updating driver locations in memory structures that require locking, causing high write contention (use Redis instead of complex custom tree locks).',
    'Failing to consider pagination for dense areas (e.g., searching "Coffee" in Manhattan).'
  ]
};
