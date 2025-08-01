const fs = require('fs');
const path = require('path');

// Create extension directory
const extensionDir = './chrome-extension';
if (!fs.existsSync(extensionDir)) {
    fs.mkdirSync(extensionDir);
}

// Copy manifest
fs.copyFileSync('./public/manifest.json', path.join(extensionDir, 'manifest.json'));

// Copy built files (you'll need to run 'npm run build' first)
if (fs.existsSync('./out')) {
    // Copy the built Next.js files
    const copyRecursive = (src, dest) => {
        if (fs.statSync(src).isDirectory()) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest);
            fs.readdirSync(src).forEach(file => {
                copyRecursive(path.join(src, file), path.join(dest, file));
            });
        } else {
            fs.copyFileSync(src, dest);
        }
    };
    
    copyRecursive('./out', extensionDir);
    
    // Rename index.html to match manifest
    if (fs.existsSync(path.join(extensionDir, 'index.html'))) {
        console.log('✅ Extension files copied successfully!');
        console.log('📁 Extension directory: ./chrome-extension');
        console.log('🚀 Load this directory in Chrome Extensions (Developer mode)');
    }
} else {
    console.log('❌ Please run "npm run build" first to generate the static files');
}