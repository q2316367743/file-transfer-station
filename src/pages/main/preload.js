const {basename, join} = require('path');
const {statSync, renameSync, createWriteStream} = require('fs');
const compressing = require('compressing');

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
    },
    compressing: {
        /**
         * 压缩为zip
         * @param {Array<string>} sources 全部的原始文件、夹路径
         * @param {string} target 目标路径
         */
        toZip(sources, target) {
            const stream = new compressing.zip.Stream();
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
        toTar(sources, target) {
            const stream = new compressing.tar.Stream();
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
        toTgz(sources, target) {
            const stream = new compressing.tgz.Stream();
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
    }
}
