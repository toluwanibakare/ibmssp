const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const emailSrcDir = path.join(rootDir, 'email-service');
const emailTargetDir = path.join(distDir, 'email-service');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      if (childItemName === 'node_modules' || childItemName === '.git') return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  if (fs.existsSync(emailSrcDir)) {
    console.log('Copying email-service into dist/email-service...');
    copyRecursiveSync(emailSrcDir, emailTargetDir);
    console.log('email-service successfully copied to dist/email-service!');
  } else {
    console.warn('Warning: email-service directory not found.');
  }
} catch (err) {
  console.error('Error copying email-service to dist:', err);
}
