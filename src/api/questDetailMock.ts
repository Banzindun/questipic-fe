import { QuestDetail } from '../constants/types';

const QUEST_DETAIL_MOCK: QuestDetail = {
  quest: {
    id: 'q2',
    title: 'Last Light on Pier 9',
    subtitle: 'A storm. A pier. The mainland gone.',
    theme: 'SURVIVAL',
    chapter: 4,
    chapterName: 'Pier 9, Midnight',
    totalChapters: 16,
    lives: 2,
    maxLives: 3,
    playersRemaining: 1209,
    evalMode: 'SOCIAL',
    qcoinsEarned: 280,
    status: 'active',
  },
  active: {
    kind: 'photo',
    chapter: 4,
    prompt: 'Photograph the shelter you found tonight',
    setup:
      "The keeper leans into the storm and points down the rocks. \"You'll need somewhere to wait it out. " +
      'Show me what you found." Submit one photo — taken in the app — that reads as a place a person could survive a long night.',
    rubric: ['Fits the scene', 'Originality', 'Composition'],
    evalMode: 'AI',
    timeLeft: '14h 22m',
    state: 'awaiting',
  },
  diary: [
    {
      type: 'narration',
      chapter: 4,
      timeAgo: '2h ago',
      text:
        'The walk to the dark lighthouse takes longer than the map suggested. The sand is loose; the wind is louder than it ought to be at this hour. ' +
        'When you reach the door it is already opening, as if the keeper has been listening for footsteps for a long time.',
      image: { hue: 210, hue2: 240, label: 'arrival at the lighthouse' },
    },
    {
      type: 'resolved-decision',
      chapter: 4,
      timeAgo: '6h ago',
      prompt: 'Three paths out of the dunes',
      setup: 'Lightning paints the headland in three directions: the cliff path, the boathouse trail, the dark lighthouse on the point.',
      options: [
        { letter: 'A', text: 'Take the cliff path — high, exposed, fastest.' },
        { letter: 'B', text: 'Cut down to the boathouse — shelter first, plan later.' },
        { letter: 'C', text: 'Walk to the dark lighthouse on the point.' },
      ],
      picked: 'C',
      crowdPicked: 'C',
      evalMode: 'SOCIAL',
    },
    {
      type: 'narration',
      chapter: 3,
      text:
        'You found the boathouse half-collapsed against the rocks. Inside, a paraffin lamp still burning. ' +
        'Someone had been here within the hour. Someone who left in a hurry.',
    },
    {
      type: 'resolved-photo',
      chapter: 3,
      timeAgo: '1d ago',
      prompt: 'Find proof someone else made it this far',
      passed: true,
      aiNote: 'Reads as a real, hand-held shot. Strong narrative match — the half-eaten meal sells it.',
      image: { hue: 35, hue2: 50, label: 'your submission' },
    },
    {
      type: 'narration',
      chapter: 3,
      text:
        'Your photograph went into the shared log. By midnight, fourteen other survivors had matched it with photographs of their own. The pier was not as empty as the mainland feared.',
    },
    {
      type: 'resolved-decision',
      chapter: 1,
      timeAgo: '3d ago',
      prompt: 'The first hour',
      setup: 'The ferry siren died mid-howl. You had a minute, maybe less, to decide what to do with it.',
      options: [
        { letter: 'A', text: 'Run for the upper deck.' },
        { letter: 'B', text: 'Stay with the family in the lounge.' },
        { letter: 'C', text: 'Make for the lifeboats alone.' },
      ],
      picked: 'A',
      crowdPicked: 'A',
      evalMode: 'SOCIAL',
    },
    {
      type: 'life-lost',
      chapter: 1,
      timeAgo: '3d ago',
      reason: "Held onto the rail too long. Lost a heart you didn't mean to spend.",
    },
    {
      type: 'narration',
      chapter: 1,
      isOpening: true,
      text:
        'Three days ago the forecast said clear. Three days ago you put the kettle on. ' +
        'Then the sky turned the colour of an old bruise, and the lights on the mainland went out one by one, and the pier was the last place left to stand.',
    },
    {
      type: 'quest-start',
      timeAgo: '3 days ago',
    },
  ],
};

export default QUEST_DETAIL_MOCK;
