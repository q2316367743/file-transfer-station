const {basename, join} = require('path');
const {statSync, renameSync, createWriteStream, rmSync} = require('fs');
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
        },
        rmSync(path) {
            return rmSync(path);
        }
    },
    compressing: {
        /**
         * 压缩为zip
         * @param {Array<string>} sources 全部的原始文件、夹路径
         * @param {string} target 目标路径
         * @param {Function} callback
         */
        toZip(sources, target, callback) {
            const stream = new compressing.zip.Stream();
            stream.on('end', callback);
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
        toTar(sources, target, callback) {
            const stream = new compressing.tar.Stream();
            stream.on('end', callback);
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
        toTgz(sources, target, callback) {
            const stream = new compressing.tgz.Stream();
            stream.on('end', callback);
            sources.forEach(source => stream.addEntry(source));
            const ws = createWriteStream(target);
            stream.pipe(ws);
        },
    }
}
