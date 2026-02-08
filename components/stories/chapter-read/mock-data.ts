import { type ChapterData } from '@/components/common/chapter-reader';

export const MOCK_CHAPTER: ChapterData = {
  id: '1',
  title: 'Chapter 5: The Dark Forest',
  content: `
    <p>The wind howled through the ancient trees as Elena stepped into the Dark Forest. She had heard the stories—everyone had—but nothing could have prepared her for this.</p>

    <p>The canopy above was so thick that barely any light filtered through. What little did manage to penetrate cast eerie, dancing shadows on the forest floor. Elena clutched her lantern tighter, its warm glow a small comfort in the overwhelming darkness.</p>

    <h2>The Path Ahead</h2>

    <p>"You shouldn't be here," a voice whispered from somewhere in the shadows. Elena spun around, her heart pounding, but saw nothing. Just more trees, more darkness.</p>

    <p>"Who's there?" she called out, her voice steadier than she felt.</p>

    <p>Silence. Then, slowly, a figure emerged from behind an ancient oak. It was a young man, perhaps a few years older than her, with silver hair that seemed to glow faintly in the dim light.</p>

    <blockquote>
      <p>"The forest doesn't take kindly to strangers," he said, his voice soft but carrying easily through the still air. "Especially ones carrying light."</p>
    </blockquote>

    <p>Elena raised her lantern higher, trying to get a better look at him. "I'm looking for the Heartstone. My village—they need it to survive the winter."</p>

    <p>The stranger's expression shifted, something like respect flickering in his pale eyes. "The Heartstone," he repeated. "That's deep in the forest. Deeper than anyone has gone in centuries."</p>

    <h2>An Unexpected Alliance</h2>

    <p>"Then I'll be the first in centuries to go there," Elena said firmly.</p>

    <p>The young man studied her for a long moment, then nodded slowly. "I'm Kael. And if you're truly set on this path..." He paused, glancing back into the darkness. "Then you'll need a guide."</p>

    <p>Elena hesitated. Trust was a luxury she couldn't afford, but neither could she afford to wander blind in this forest. She extended her hand. "I'm Elena. And I accept your offer—but know that I'm not as helpless as I might look."</p>

    <p>Kael's lips quirked into something almost like a smile as he shook her hand. "I never thought you were. Come. We have a long journey ahead, and the forest grows more dangerous after dark."</p>

    <p>Together, they walked deeper into the shadows, the lantern's light a small beacon of hope in the endless dark.</p>
  `,
  author: {
    id: 'author-1',
    name: 'Sarah Mitchell',
    username: 'sarahmitchell',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  storyTitle: 'The Chronicles of Eldoria',
  chapterNumber: 5,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-16'),
  wordCount: 412,
  status: 'published',
  stats: {
    views: 1234,
    likes: 89,
    comments: 23,
  },
  parentChapter: {
    id: 'ch-4',
    title: 'Chapter 4: The Warning',
  },
  tags: ['fantasy', 'adventure', 'mystery'],
};
