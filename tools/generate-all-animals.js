#!/usr/bin/env node

/**
 * generate-all-animals.js — Generate the full set of 16 animal illustrations
 * Uses the locked prompt template from T01.
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Load .env
const envPath = resolve(root, '.env');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const PROMPT_TEMPLATE = (animal) =>
  `cute cartoon ${animal} face looking at the viewer, kawaii style, flat vector illustration, round shapes, big expressive eyes, soft pastel colors, minimal details, centered on white background, no text, no border, children's game card art`;

const animals = [
  { id: 'cat', prompt: 'cat' },
  { id: 'dog', prompt: 'dog' },
  { id: 'rabbit', prompt: 'rabbit' },
  { id: 'bear', prompt: 'bear' },
  { id: 'fox', prompt: 'fox' },
  { id: 'panda', prompt: 'panda' },
  { id: 'frog', prompt: 'frog' },
  { id: 'koala', prompt: 'koala' },
  { id: 'lion', prompt: 'lion' },
  { id: 'pig', prompt: 'pig' },
  { id: 'brontosaurus', prompt: 'brontosaurus dinosaur' },
  { id: 'trex', prompt: 't-rex dinosaur' },
  { id: 'crocodile', prompt: 'crocodile' },
  { id: 'lizard', prompt: 'chameleon lizard' },
  { id: 'turtle', prompt: 'turtle' },
  { id: 'dragon', prompt: 'friendly baby dragon' },
];

const generateScript = resolve(root, 'tools', 'generate-image.js');

async function run() {
  const CONCURRENCY = 2;
  let index = 0;

  async function next() {
    if (index >= animals.length) return;
    const animal = animals[index++];
    const outPath = resolve(root, 'assets', 'animals', `${animal.id}.png`);

    if (existsSync(outPath)) {
      console.log(`⏭ Skipping ${animal.id} (already exists)`);
      return next();
    }

    const prompt = PROMPT_TEMPLATE(animal.prompt);
    console.log(`🎨 Generating ${animal.id}...`);

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        execSync(`node "${generateScript}" "${prompt}" "${outPath}"`, {
          cwd: root,
          stdio: 'pipe',
          timeout: 30000,
        });
        console.log(`✓ ${animal.id} done`);
        return next();
      } catch (err) {
        const msg = err.stderr?.toString() || err.message;
        if (msg.includes('429') && attempt < 2) {
          const wait = 30 + attempt * 10;
          console.log(`⏳ ${animal.id} rate limited, waiting ${wait}s (attempt ${attempt + 1}/3)...`);
          execSync(`sleep ${wait}`);
        } else {
          console.error(`✗ ${animal.id} failed: ${msg.slice(0, 120)}`);
          return next();
        }
      }
    }

    return next();
  }

  const workers = Array.from({ length: CONCURRENCY }, () => next());
  await Promise.all(workers);

  console.log('\nDone! Generated animals:');
  for (const a of animals) {
    const p = resolve(root, 'assets', 'animals', `${a.id}.png`);
    const exists = existsSync(p);
    console.log(`  ${exists ? '✓' : '✗'} ${a.id}.png`);
  }
}

run();
