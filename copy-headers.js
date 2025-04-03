import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyHeaders() {
  try {
    const sourceFile = join(__dirname, '_headers');
    const targetFile = join(__dirname, 'dist', '_headers');
    
    await copyFile(sourceFile, targetFile);
    console.log('Successfully copied _headers file to dist directory');
    
    // Also copy _headers from public directory if it exists
    try {
      const publicSourceFile = join(__dirname, 'public', '_headers');
      await copyFile(publicSourceFile, targetFile);
      console.log('Successfully copied public/_headers file to dist directory');
    } catch (error) {
      // If the file doesn't exist, just continue
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // Copy blogposts directory to dist
    const { cpSync } = await import('node:fs');
    try {
      cpSync(
        join(__dirname, 'public', 'blogposts'),
        join(__dirname, 'dist', 'blogposts'),
        { recursive: true, force: true }
      );
      console.log('Successfully copied blogposts directory to dist');
    } catch (error) {
      console.error('Error copying blogposts directory:', error);
    }
  } catch (error) {
    console.error('Error copying _headers file:', error);
    process.exit(1);
  }
}

copyHeaders(); 