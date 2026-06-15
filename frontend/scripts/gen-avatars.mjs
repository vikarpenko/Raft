/**
 * One-off dev script: generates the preset avatar SVGs into `public/avatars`
 * (referenced by `PRESET_AVATARS` in `src/lib/avatars.ts`).
 *
 * Not part of the app build — run manually only when you want to regenerate
 * the avatars: `node scripts/gen-avatars.mjs`.
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Avatar from 'boring-avatars';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const colors = ['#c14d63', '#9579d4', '#d97aa5', '#e8896b', '#edb45e',
  '#66a896', '#8098c0', '#9aaa6b', '#eecfd5', '#f6d6a8', '#b98bc9', '#352027'];

const seeds = ['Riverbank', 'Marina', 'Pebble', 'Willow', 'Cleo', 'Otis',
  'Juniper', 'Coral', 'Maple', 'Saffron', 'Fern'];

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/avatars');
mkdirSync(outDir, { recursive: true });

seeds.forEach((name, index) => {
  const svg = renderToStaticMarkup(
    React.createElement(Avatar, { size: 128, variant: 'beam', name, colors })
  );
  writeFileSync(resolve(outDir, `avatar-${index + 1}.svg`), svg + '\n');
});

console.log(`Generated ${seeds.length} avatars in ${outDir}`);
