const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');

try {
  if (fs.existsSync(dist)) {
    console.log('Removing dist directory...');
    fs.rmSync(dist, { recursive: true, force: true });
    console.log('dist removed');
  }
} catch (err) {
  console.warn('Failed to remove dist directory (continuing):', err.message || err);
}

process.exit(0);
