import type { IconName } from '@/lib/icons';

export interface NavItem {
  label: string;
  icon: IconName;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
