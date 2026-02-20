import type { TopicContent } from '../topicContent';

export const intervalsPatterns: TopicContent = {
  title: 'Intervals (Merge/Insert/Meeting Rooms)',
  description:
    'Interval problems model overlap on a line/time-axis. Most solutions rely on sorting endpoints and maintaining either a rolling merged interval or active overlap structure.',
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
        'Repeatedly compare interval pairs and merge any overlap until stable.\n\nStep-by-step mechanics:\n1. For each interval, compare against every other interval.\n2. Merge overlaps and mark consumed intervals.\n3. Repeat passes while any merge occurs.\n\n```python\nfunction mergeBrute(intervals):\n    changed = True\n\n    while changed:\n        changed = False\n        result = []\n        used = [False] * len(intervals)\n\n        for i in range(0, len(intervals)):\n            if used[i]:\n                continue\n\n            cur = intervals[i]\n\n            for j in range(i + 1, len(intervals)):\n                if used[j]:\n                    continue\n\n                if not (cur[1] < intervals[j][0] or intervals[j][1] < cur[0]):\n                    cur = [min(cur[0], intervals[j][0]), max(cur[1], intervals[j][1])]\n                    used[j] = True\n                    changed = True\n\n            result.append(cur)\n\n        intervals = result\n\n    return intervals\n```\n\nThis baseline is useful for intuition but too expensive and error-prone for production inputs.',
      complexity: {
        time: 'O(N^2)',
        space: 'O(N)'
      }
    },
    {
      title: 'Optimal Approach (Sort + Single Pass Merge)',
      content:
        'Sort intervals by start and merge greedily in one scan.\n\nStep-by-step mechanics:\n1. Sort by start ascending (tie by end ascending if needed).\n2. Seed result with first interval.\n3. For each interval:\n   - overlap if `start <= lastEnd`, then merge by extending end.\n   - otherwise append as new disjoint block.\n\n```python\nfunction mergeIntervals(intervals):\n    if len(intervals) == 0:\n        return []\n\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n\n    for i in range(1, len(intervals)):\n        start, end = intervals[i]\n        last = merged[-1]\n\n        if start <= last[1]:\n            last[1] = max(last[1], end)\n        else:\n            merged.append([start, end])\n\n    return merged\n```\n\nInsert-interval variant:\n1. Append intervals ending before `newInterval`.\n2. Merge all overlaps with `newInterval`.\n3. Append remaining intervals.\n\nMeeting-rooms variant:\n- Sort start and end arrays separately; sweep two pointers to track active meetings.\n\nWhy this works:\nSorting linearizes potential conflicts. Once sorted, only the latest merged interval can conflict with current interval.',
      complexity: {
        time: 'O(N log N)',
        space: 'O(N)'
      }
    }
  ],
  pitfalls: [
    'Using strict `<` instead of `<=` changes behavior for touching intervals like `[1,2]` and `[2,3]`.',
    'For insertion problems, forgetting intervals fully before or after new interval causes lost segments.',
    'Not sorting first leads to invalid merge decisions.',
    'Mutating references in-place unintentionally can alter caller data if defensive copies are expected.'
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
    },
    {
      name: 'Event Ordering',
      details:
        'Sorting endpoints transforms interval overlap into an ordered event-processing problem.'
    }
  ]
};
