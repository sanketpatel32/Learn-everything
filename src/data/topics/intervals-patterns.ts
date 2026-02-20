import type { TopicContent } from '../topicContent';

export const intervalsPatterns: TopicContent = {
  title: 'Intervals (Merge/Insert/Meeting Rooms)',
  description:
    'Interval problems model time or range collisions. The core trick is sorting by start time, then maintaining a rolling merged segment or active overlap count.',
  example:
    'Given `[[1,3],[2,6],[8,10],[15,18]]`, merging overlaps returns `[[1,6],[8,10],[15,18]]`.',
  complexity: {
    time: 'O(N log N)',
    space: 'O(N) output-dependent'
  },
  approaches: [
    {
      title: 'Brute Force (Pairwise Overlap Resolution)',
      content:
        'A naive approach repeatedly compares intervals and merges overlaps until no change occurs.\n\nStep-by-step mechanics:\n1. For each interval, compare against all others.\n2. If overlaps, replace with merged interval.\n3. Repeat passes until stable.\n\n```python\nfunction mergeBrute(intervals):\n    changed = True\n\n    while changed:\n        changed = False\n        result = []\n        used = [False] * len(intervals)\n\n        for i in range(0, len(intervals)):\n            if used[i]:\n                continue\n\n            cur = intervals[i]\n            for j in range(i + 1, len(intervals)):\n                if used[j]:\n                    continue\n\n                if not (cur[1] < intervals[j][0] or intervals[j][1] < cur[0]):\n                    cur = [min(cur[0], intervals[j][0]), max(cur[1], intervals[j][1])]\n                    used[j] = True\n                    changed = True\n\n            result.append(cur)\n\n        intervals = result\n\n    return intervals\n```\n\nThis is cumbersome and can degrade to quadratic or worse behavior.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Sort + Single Pass Merge)',
      content:
        'Sort intervals by start time, then merge in one pass.\n\nStep-by-step mechanics:\n1. Sort by `start` ascending.\n2. Initialize result with first interval.\n3. For each next interval:\n   - if overlap with last result interval, extend last end.\n   - else append as new disjoint interval.\n\n```python\nfunction mergeIntervals(intervals):\n    if len(intervals) == 0:\n        return []\n\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n\n    for i in range(1, len(intervals)):\n        start, end = intervals[i]\n        last = merged[-1]\n\n        if start <= last[1]:\n            last[1] = max(last[1], end)\n        else:\n            merged.append([start, end])\n\n    return merged\n```\n\nMeeting rooms variant:\n- Sort start times and end times separately or use min-heap of end times.\n- Track maximum simultaneous overlaps.\n\nWhy this works:\nAfter sorting, any overlap for interval `i` can only matter with the current merged tail, which enables linear merge after sort.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Using strict `<` instead of `<=` changes behavior for touching intervals like `[1,2]` and `[2,3]`.',
    'For insertion problems, forgetting intervals fully before or after new interval causes lost segments.',
    'Not sorting first leads to invalid merge decisions.'
  ],
  concepts: [
    {
      name: 'Sweep-line Thinking',
      details:
        'Many interval tasks can be viewed as scanning timeline events in sorted order.'
    },
    {
      name: 'Active Overlap State',
      details:
        'A single rolling merged interval often captures all needed state after sorting.'
    }
  ]
};
