const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const projectRoot = path.resolve(__dirname, '..');
const revealSrc = path.join(projectRoot, 'node_modules', 'reveal.js');
const revealDest = path.join(projectRoot, 'assets', 'reveal.js');

copyDir(path.join(revealSrc, 'dist'), path.join(revealDest, 'dist'));
copyDir(path.join(revealSrc, 'plugin'), path.join(revealDest, 'plugin'));

