import type { WorkspaceColor } from '@/types/workspace';

/** Maps each workspace color name to its hex value. */
export const WORKSPACE_COLORS: Record<WorkspaceColor, string> = {
  RED: '#e0525f',
  ORANGE: '#e0894e',
  AMBER: '#e5a329',
  YELLOW: '#f5cc52',
  GREEN: '#6dcc6f',
  TEAL: '#3fa394',
  BLUE: '#4b8fc7',
  SKY: '#6cb6e3',
  INDIGO: '#6b6fd4',
  VIOLET: '#9579d4',
  PINK: '#d977a8',
  ROSE: '#deabb0',
  GRAY: '#8a7f83',
};

/** All available color names, for color pickers. */
export const WORKSPACE_COLOR_NAMES = Object.keys(WORKSPACE_COLORS) as WorkspaceColor[];

/** Color used when a workspace has none set. */
const FALLBACK = '#853664';

/** Returns the hex for a workspace color, or the fallback when unset. */
export function colorHex(color?: WorkspaceColor | null): string {
  return color ? WORKSPACE_COLORS[color] : FALLBACK;
}

/** Builds a translucent CSS tint of a workspace color (e.g. for soft backgrounds). */
export function colorTint(color: WorkspaceColor | null | undefined, percent: number): string {
  return `color-mix(in srgb, ${colorHex(color)} ${percent}%, transparent)`;
}
