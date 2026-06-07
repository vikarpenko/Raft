import type { WorkspaceColor } from '@/types/workspace';

export const WORKSPACE_COLORS: Record<WorkspaceColor, string> = {
  RED: '#e0525f',
  ORANGE: '#e0894e',
  AMBER: '#c79029',
  YELLOW: '#cdab38',
  GREEN: '#5fa473',
  TEAL: '#3fa394',
  BLUE: '#4b8fc7',
  SKY: '#6cb6e3',
  INDIGO: '#6b6fd4',
  VIOLET: '#9579d4',
  PINK: '#d977a8',
  ROSE: '#c14d63',
  GRAY: '#9b7681',
};

export const WORKSPACE_COLOR_NAMES = Object.keys(WORKSPACE_COLORS) as WorkspaceColor[];

const FALLBACK = '#9b7681';

export function colorHex(color?: WorkspaceColor | null): string {
  return color ? WORKSPACE_COLORS[color] : FALLBACK;
}
