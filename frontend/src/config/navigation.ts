import type { NavSection } from '@/types/navigation';

/**
 * Returns the top bar title for the current path.
 *
 * Falls back from an exact route match to the root section,
 * then to a capitalized path segment.
 */
export function titleForPath(path: string): string {
  for (const section of navSections) {
    const item = section.items.find((navItem) => navItem.path === path);
    if (item) return item.label;
  }
  const firstSegment = `/${path.split('/').filter(Boolean)[0] ?? ''}`;
  for (const section of navSections) {
    const item = section.items.find((navItem) => navItem.path === firstSegment);
    if (item) return item.label;
  }
  const slug = path.split('/').filter(Boolean)[0] ?? '';
  return slug ? slug[0].toUpperCase() + slug.slice(1) : 'Page';
}

/** Sidebar navigation: grouped sections with their links and icons. */
export const navSections: NavSection[] = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', icon: 'dashboard', path: '/' },
      { label: 'Spaces', icon: 'spaces', path: '/spaces' },
      { label: 'To-Do', icon: 'todo', path: '/todo' },
      { label: 'Calendar', icon: 'calendar', path: '/calendar' },
      { label: 'Notes', icon: 'notes', path: '/notes' },
      { label: 'Chats', icon: 'chats', path: '/chats' },
      { label: 'Expenses', icon: 'expenses', path: '/expenses' },
      { label: 'Statistics', icon: 'statistics', path: '/statistics' },
    ],
  },
  {
    title: 'General',
    items: [
      { label: 'Profile', icon: 'profile', path: '/profile' },
      { label: 'Inbox', icon: 'inbox', path: '/inbox' },
      { label: 'Settings', icon: 'settings', path: '/settings' },
      { label: 'Help', icon: 'help', path: '/help' },
    ],
  },
];
