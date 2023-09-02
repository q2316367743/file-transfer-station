const {basename, join} = require('path');
const {statSync, renameSync} = require('fs');

window.preload = {
    path: {
        baseName(path) {
            return basename(path);
        },
        join: join
    },
    fs: {
        statSync(path) {
            return statSync(path);
        },
        renameSync(sourcePath, targetPath) {
            return renameSync(sourcePath, targetPath);
        }
    }
}
