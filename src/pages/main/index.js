import {createApp, toRaw} from "../../lib/vue@3.3.4@prod.js";
import {getByDefault, setValue} from "../../global/utils.js";
import {SETTING, STORAGE_FILES} from "../../global/constant.js";


createApp({
    el: '#app',
    data: () => ({
        storageFiles: [],
        files: [],
        listShow: false,
        mini: false,
        backgroundColor: getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE"),
        color: getByDefault(SETTING.COLOR, "#000000"),
    }),
    computed: {
        available() {
            return this.files.filter(e => e.checked).length + this.storageFiles.filter(e => e.checked).length;
        },
        text() {
            if (this.fileLength > 0) {
                return `拖拽${this.available}个文件，共${this.fileLength}个文件`
            } else {
                return "拖拽你的文件到这里";
            }
        },
        fileExist() {
            return this.files.length > 0 || this.storageFiles.length > 0;
        },
        fileLength() {
            return this.files.length + this.storageFiles.length;
        }
    },
    created(){
        this.storageFiles = getByDefault(STORAGE_FILES, []);
    },
    mounted() {
        const container = document.getElementById('container');
        const target = document.getElementById('target');
        container.addEventListener('drop', e => {
            e.preventDefault();
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file = e.dataTransfer.files.item(i);
                const item = e.dataTransfer.items[i];
                if (item.kind === 'file') {
                    if (this.files.findIndex(e => e.path === file.path) === -1) {
                        this.files.push({
                            path: file.path,
                            name: file.name,
                            checked: true
                        });
                    }
                }
            }
            return false;
        })
        container.addEventListener("dragenter", function (event) {
            event.preventDefault();
        });
        container.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        container.addEventListener("dragleave", function (event) {
            event.preventDefault();
        });
        target.ondragstart = (event) => {
            event.preventDefault()
            utools.startDrag([
                ...this.storageFiles.filter(e => e.checked).map(e => e.path),
                ...this.files.filter(e => e.checked).map(e => e.path)
            ]);
        }
    },
    methods: {
        clear() {
            this.files = [];
            if (!this.fileExist) {
                this.listShow = false;
            }
        },
        remove(i) {
            this.files.splice(i, 1);
            if (!this.fileExist) {
                this.listShow = false;
            }
        },
        showInExplorer(path) {
            utools.shellShowItemInFolder(path);
        },
        switchMini() {
            this.mini = !this.mini;
            window.preload.sendMsg('window', this.mini);
        },
        close() {
            window.preload.sendMsg('window-close');
        },
        toTop(index) {
            const files = this.files.splice(index, 1);
            this.storageFiles.push(files[0]);
            setValue(STORAGE_FILES, toRaw(this.storageFiles));
        },
        toBottom(index) {
            const files = this.storageFiles.splice(index, 1);
            this.files.push(files[0]);
            setValue(STORAGE_FILES, toRaw(this.storageFiles));
        }
    }
}).mount('#app')