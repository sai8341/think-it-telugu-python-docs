const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating Linux/POSIX-compliant deployment zip...');

// Use tar with forward slashes
try {
  // Check if tar exists
  execSync('tar --version', { stdio: 'ignore' });
  const buildDir = path.join(__dirname, 'build');
  const zipPath = path.join(__dirname, 'python-docs-deploy.zip');
  const desktopZipPath = 'C:\\Users\\saikumar\\Desktop\\python-docs-deploy.zip';

  // Windows tar with standard forward slashes
  execSync(`tar -acf "${zipPath}" *`, { cwd: buildDir, stdio: 'inherit' });
  console.log('✅ Created zip via tar with standard POSIX directories');

  // Copy to desktop
  fs.copyFileSync(zipPath, desktopZipPath);
  console.log('✅ Copied to Desktop:', desktopZipPath);
} catch (e) {
  console.error('Error creating zip:', e);
}
