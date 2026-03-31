#!/usr/bin/env node

/**
 * generate-image.js — Generate images via Google Gemini (Imagen 4) API
 * 
 * Usage:
 *   node generate-image.js "cute cartoon cat, flat illustration, children's game" cat.png
 *   node generate-image.js --model imagen-4.0-generate-001 "prompt" output.png
 * 
 * Env: GEMINI_API_KEY must be set (in .env or environment)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env if present
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '.env');
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

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('Error: GEMINI_API_KEY not set. Add it to .env or export it.');
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
let model = 'imagen-4.0-fast-generate-001';
let prompt, outputFile;
let aspectRatio = '1:1';
let count = 1;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--model' && args[i + 1]) {
    model = args[++i];
  } else if (args[i] === '--aspect' && args[i + 1]) {
    aspectRatio = args[++i];
  } else if (args[i] === '--count' && args[i + 1]) {
    count = parseInt(args[++i], 10);
  } else if (!prompt) {
    prompt = args[i];
  } else if (!outputFile) {
    outputFile = args[i];
  }
}

if (!prompt || !outputFile) {
  console.error('Usage: node generate-image.js [--model MODEL] [--aspect 1:1] [--count N] "prompt" output.png');
  process.exit(1);
}

async function generateImage() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`;
  
  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: count,
      aspectRatio,
    },
  };

  console.log(`Generating with ${model}...`);
  console.log(`Prompt: "${prompt}"`);
  console.log(`Aspect: ${aspectRatio}, Count: ${count}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`API error ${res.status}: ${errorText}`);
    process.exit(1);
  }

  const data = await res.json();
  
  if (!data.predictions || data.predictions.length === 0) {
    console.error('No images returned. The prompt may have been filtered.');
    console.error('Response:', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  for (let i = 0; i < data.predictions.length; i++) {
    const prediction = data.predictions[i];
    const imageBytes = Buffer.from(prediction.bytesBase64Encoded, 'base64');
    
    let filename = outputFile;
    if (data.predictions.length > 1) {
      const ext = outputFile.match(/\.[^.]+$/)?.[0] || '.png';
      const base = outputFile.replace(/\.[^.]+$/, '');
      filename = `${base}-${i + 1}${ext}`;
    }
    
    writeFileSync(filename, imageBytes);
    console.log(`✓ Saved: ${filename} (${imageBytes.length} bytes)`);
  }
}

generateImage().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
