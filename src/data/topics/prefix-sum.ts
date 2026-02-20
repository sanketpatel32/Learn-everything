import { TopicContent } from '../topicContent';

export const prefixSum: TopicContent = {
  title: 'Prefix Sum Pattern',
  description: 'Preprocessing an array to store "running totals", making sum queries instant.',
  complexity: {
    time: 'O(N) Prep / O(1) Query',
    space: 'O(N)'
  },
  tutorialSteps: [
    {
      title: 'Preparation',
      content: 'Create a second list where each spot is the sum of everything before it in the original list.'
    },
    {
      title: 'The Magic',
      content: 'To find the sum between index 5 and 10, just take (Sum up to 10) minus (Sum up to 4). No need to loop through the numbers again!'
    }
  ],
  pitfalls: [
    'Forgetting that this only works well if the original list doesn\'t change often.',
    'Handling the very first element correctly (often helps to add a zero at the start).'
  ],
  concepts: [
    {
      name: 'Static Data Only',
      details: 'If the data changes, the whole prefix list must be rebuilt (O(N)). Use Segment Trees for dynamic data.'
    }
  ],
  example: 'Calculating total sales between any two dates in a year instantly.'
};
