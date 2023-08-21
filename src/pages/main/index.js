import {createApp} from "../../lib/vue@3.3.4@prod.js";
import {getByDefault} from "../../global/utils.js";
import {SETTING} from "../../global/constant.js";


createApp({
    el: '#app',
    data: () => ({
        files: [],
        listShow: false,
        mini: false,
        backgroundColor:  getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE"),
        color:  getByDefault(SETTING.COLOR, "#000000"),
    }),
    computed: {
        available() {
            return this.files.filter(e => e.checked).length;
        },
        text() {
            if (this.files.length > 0) {
                return `拖拽${this.available}个文件，共${this.files.length}个文件`
            } else {
                return "拖拽你的文件到这里";
            }
        }
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
            utools.startDrag(this.files.filter(e => e.checked).map(e => e.path));
        }
    },
    methods: {
        clear() {
            this.files = [];
        },
        remove(i) {
            this.files.splice(i, 1);
            if (this.files.length === 0) {
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
        }
    }
}).mount('#app')
