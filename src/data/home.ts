import type { EditorPick } from '@/models/home'

export const editorPicks: EditorPick[] = [
  {
    type: 'Work',
    title: 'Symphony No. 5',
    subtitle: 'Ludwig van Beethoven',
    meta: '1808',
    asset: 'symphony',
    to: '/works/1',
  },
  {
    type: 'Composer',
    title: 'Wolfgang Amadeus Mozart',
    subtitle: 'Classical',
    meta: '1756-1791',
    asset: 'composerAvatar',
    to: '/composers/2',
  },
  {
    type: 'Guide',
    title: 'Where to start with symphonies',
    subtitle: 'Listening guide',
    meta: '8 min read',
    asset: 'violinConcerto',
    to: '/guides/1',
  },
  {
    type: 'Work',
    title: 'Clair de lune',
    subtitle: 'Claude Debussy',
    meta: '1905',
    asset: 'pianoConcerto',
    to: '/works/5',
  },
]
