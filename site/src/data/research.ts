import publications from './publications.json';

export interface ResearchPost {
  title: string;
  category: string;
  kind: string;
  date: string;
  displayDate: string;
  description: string;
  href: string;
  source: string;
  visual: string;
  cover?: string;
  tags: string[];
  featured?: boolean;
  sources?: { name: string; url: string }[];
}

export const research: ResearchPost[] = [
  { title: 'Git-Hook Campaign: Incident Analysis and Proactive Blockchain Hunting', category: 'Malware analysis', kind: 'Campaign analysis', date: '2026-10-18', displayDate: '18 OCT 2026', description: 'Incident analysis of a malicious developer assessment and proactive hunting of related blockchain infrastructure.', href: '/research/git-hook-campaign/', source: 'On this site', visual: 'campaign', cover: '/images/git-hook-campaign/banner.webp', tags: ['GIT HOOKS', 'BLOCKCHAIN'], featured: true },
  { title: 'A notebook for the things that don’t look right', category: 'Field notes', kind: 'From the notebook', date: '2026-10-18', displayDate: '18 OCT 2026', description: 'An introduction to this research space, its subjects, and how to navigate the archive.', href: '/research/field-notes/', source: 'On this site', visual: 'notes', tags: ['RESEARCH', 'NOTEBOOK'] },
  ...publications,
].sort((a, b) => b.date.localeCompare(a.date));

export const topics = ['All research', ...new Set(research.map(post => post.category))];
