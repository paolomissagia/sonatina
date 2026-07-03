import type { Guide } from './models'

export const guides: Guide[] = [
  {
    id: '1',
    title: 'Where to start with symphonies',
    type: 'Listening guide',
    description: 'A practical route from Haydn to Mahler without getting lost.',
    asset: 'symphony',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Understanding opus numbers',
    type: 'Reference',
    description: 'How catalog numbers work, and why they are not always chronological.',
    asset: 'chamberSonata',
    readTime: '5 min read',
  },
  {
    id: '3',
    title: 'A beginner’s guide to chamber music',
    type: 'Listening guide',
    description: 'Quartets, trios, sonatas, and the art of smaller forces.',
    asset: 'chamberSonata',
    readTime: '7 min read',
  },
]
