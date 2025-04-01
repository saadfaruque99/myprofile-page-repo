import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy _headers file to dist directory
const rootHeadersPath = path.join(__dirname, '_headers');
const destHeadersPath = path.join(__dirname, 'dist', '_headers');

try {
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
  }
  
  // Copy _headers file
  fs.copyFileSync(rootHeadersPath, destHeadersPath);
  console.log('Successfully copied _headers file to dist directory');
  
  // Also copy from public directory if it exists
  const publicHeadersPath = path.join(__dirname, 'public', '_headers');
  if (fs.existsSync(publicHeadersPath)) {
    fs.copyFileSync(publicHeadersPath, destHeadersPath);
    console.log('Successfully copied public/_headers file to dist directory');
  }
} catch (error) {
  console.error('Error copying headers file:', error);
} 