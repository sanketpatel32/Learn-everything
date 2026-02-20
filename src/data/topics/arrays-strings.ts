import { TopicContent } from '../topicContent';

export const arraysStrings: TopicContent = {
  title: 'Arrays & Strings',
  description: 'The foundation of all data storage. Fast, simple, and memory-efficient.',
  tutorialSteps: [
    {
      title: 'Simple Memory',
      content: 'An array is just a line of boxes in memory. Because they are side-by-side, finding the 100th box is instant.'
    },
    {
      title: 'The Cost',
      content: 'While finding things is fast, inserting into the middle is slow because you have to push every other element over by one.'
    }
  ],
  concepts: [
    { name: 'Cache Friendly', details: 'Computers love reading things that are side-by-side in memory.' },
    { name: 'Immutability', details: 'In many languages, strings cannot be changed - you have to create a new one instead.' }
  ],
  pitfalls: ['Running off the end of the list.', 'Trying to resize an array that has run out of space.']
};
