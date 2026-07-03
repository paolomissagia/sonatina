import type { Guide } from '@/models/guide'

export const guides: Guide[] = [
  {
    id: '1',
    title: 'Where should I start with classical music?',
    type: 'Listening guide',
    category: 'Getting started',
    description: 'A beginner’s guide with essential works to listen to first.',
    asset: 'symphonyOrchestra',
    readTime: '5 min read',
    audience: 'New listeners',
    overview:
      'Start with a small set of vivid, approachable works that show how classical music can be dramatic, intimate, rhythmic, and deeply memorable.',
    sections: ['Start with short pieces', 'Try one symphony', 'Notice contrast', 'Follow what you enjoy'],
  },
  {
    id: '2',
    title: 'How to listen to your first opera',
    type: 'Listening guide',
    category: 'Genres',
    description: 'Everything you need to know before watching your first opera.',
    asset: 'operaCurtain',
    readTime: '6 min read',
    audience: 'First opera viewers',
    overview:
      'Opera becomes easier to enjoy when you know the story, listen for recurring musical ideas, and accept that drama matters as much as perfect realism.',
    sections: ['Read the synopsis', 'Listen for voices', 'Follow the staging', 'Choose an accessible first opera'],
  },
  {
    id: '3',
    title: 'Symphony, concerto, or sonata?',
    type: 'Reference',
    category: 'Genres',
    description: 'Understanding the different types of classical compositions.',
    asset: 'chamberSonata',
    readTime: '4 min read',
    audience: 'Curious beginners',
    overview:
      'Classical titles often describe the forces and form of a piece. Learning a few common labels makes browsing works much less mysterious.',
    sections: ['Symphony', 'Concerto', 'Sonata', 'Suite'],
  },
  {
    id: '4',
    title: 'The Romantic period',
    type: 'Period guide',
    category: 'Periods',
    description: 'A look at the era of emotion, expression, and grandeur.',
    asset: 'composerRomantic',
    readTime: '7 min read',
    audience: 'History explorers',
    overview:
      'The Romantic period widened classical music’s emotional scale, pushing harmony, orchestral color, and personal expression into bolder territory.',
    sections: ['Emotional expression', 'Expanded orchestra', 'National styles', 'Virtuosity'],
  },
  {
    id: '5',
    title: 'What makes Bach sound like Bach?',
    type: 'Composer guide',
    category: 'Composers',
    description: 'Counterpoint, sacred drama, and the architecture behind the music.',
    asset: 'composerBaroque',
    readTime: '6 min read',
    audience: 'Composer-focused listeners',
    overview:
      'Bach’s music often feels inevitable because independent lines move with clarity, purpose, and a deep sense of harmonic direction.',
    sections: ['Counterpoint', 'Dance forms', 'Sacred drama', 'Keyboard architecture'],
  },
  {
    id: '6',
    title: 'How to listen actively',
    type: 'Listening guide',
    category: 'Listening',
    description: 'Simple ways to notice melody, texture, form, and color as you listen.',
    asset: 'pianoKeys',
    readTime: '5 min read',
    audience: 'Active listeners',
    overview:
      'Active listening is not about technical analysis. It is the habit of noticing what changes, what returns, and what catches your ear.',
    sections: ['Listen for melody', 'Notice texture', 'Track repetition', 'Write one sentence'],
  },
]

export function findGuide(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return guides.find((guide) => guide.id === id)
}
