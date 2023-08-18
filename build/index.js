const fs = require('fs');
const path = require('path');

fs.mkdirSync('dist');
fs.mkdirSync('dist/public');

fs.readdirSync('public').forEach(file => {
    fs.copyFileSync(path.join('public', file), path.join('dist/public', file))
});

fs.copyFileSync('index.html', path.join('dist', 'index.html'))
fs.copyFileSync('plugin.json', path.join('dist', 'plugin.json'))
fs.copyFileSync('preload.js', path.join('dist', 'preload.js'))