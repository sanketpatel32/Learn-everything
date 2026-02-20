import { TopicContent } from '../topicContent';

export const sdGeoSpatial: TopicContent = {
  title: 'Geospatial Indexing',
  description: 'Techniques for storing and querying geographic location data (latitude/longitude) efficiently for location-based applications.',
  concepts: [
    {
      name: 'Geohashing',
      details: 'Encodes 2D coordinates into a short string of letters and digits. Proximity is determined by string prefix matching at varying levels of precision.'
    },
    {
      name: 'Quadtrees',
      details: 'A tree data structure where each internal node has exactly four children. Recursively subdivides 2D space into four quadrants to index coordinates.'
    },
    {
      name: 'S2 Geometry (Google)',
      details: 'Projects the spherical earth onto a cube, dividing it into cells. Handles the distortion near the poles significantly better than standard geohashing.'
    }
  ],
  approaches: [
    {
      title: 'Geohash Prefix Queries',
      content: 'If a user is at geohash `9q8yy`, search the database for all points starting with `9q8yy` for immediate proximity, or `9q8y` for a broader radius.',
      complexity: { time: 'O(log N)', space: 'O(N)' }
    },
    {
      title: 'PostGIS / Spatial Databases',
      content: 'Using native R-Tree indices in databases like PostgreSQL (PostGIS add-on) to perform complex geometric queries (e.g., ST_DWithin).',
      complexity: { time: 'O(log N)', space: 'O(N)' }
    }
  ],
  pitfalls: [
    'Edge Cases in Geohashing: Two points can be physically 1 meter apart but have completely different geohash prefixes if they fall perfectly across a grid boundary line.',
    'Performing manual Haversine distance calculations across millions of SQL rows instead of using a spatial index, resulting in O(N) full table scans.',
    'Ignoring the curvature of the earth when calculating large distances using standard Euclidean math.'
  ]
};
