import {createApp} from "../../../lib/vue@3.3.4@prod.js";
import {getByDefault} from "../../../global/utils.js";
import {SETTING} from "../../../global/constant.js";


createApp({
    data: () => ({
        files: [],
        type: 'zip',
        listShow: false,
        backgroundColor: getByDefault(SETTING.BACKGROUND_COLOR, "#FFFAEE"),
        color: getByDefault(SETTING.COLOR, "#000000"),
    }),
    computed: {
        available() {
            return this.files.filter(e => e.checked).length > 0;
        },
        fileExist() {
            return this.files.length > 0;
        },
        realLen() {
            return this.files.filter(e => e.checked).length;
        },
        text() {
            if (this.files.length > 0) {
                return `点击图标压缩(${this.realLen}/${this.files.length})`;
            } else {
                return '请拖拽文件（夹）到此处';
            }
        }
    },
    mounted() {
        const container = this.$refs['container'];
        container.addEventListener('drop', e => {
            e.preventDefault();

            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file = e.dataTransfer.files.item(i);
                const item = e.dataTransfer.items[i];
                if (item.kind === 'file') {
                    this.files.push({
                        name: file.name,
                        path: file.path,
                        checked: true
                    });
                }
            }

            return false;
        })
        container.addEventListener("dragenter", e => e.preventDefault());
        container.addEventListener("dragover", e => e.preventDefault());
        container.addEventListener("dragleave", e => e.preventDefault());

    },
    methods: {
        clear() {
            this.files = [];
            if (!this.fileExist) {
                this.listShow = false;
            }
        },
        showInExplorer(path) {
            utools.shellShowItemInFolder(path);
        },
        remove(i) {
            this.files.splice(i, 1);
            if (!this.fileExist) {
                this.listShow = false;
            }
        },
        save() {
            if (!this.available) {
                return;
            }
            const str = utools.showSaveDialog({
                title: "选择保存位置",
                buttonLabel: "保存",
                properties: ['createDirectory'],
                filters: [{
                    name: this.type,
                    extensions: [this.type]
                }]
            });
            if (!str) {
                return;
            }
            switch (this.type) {
                case 'zip':
                    window.preload.compressing.toZip(this.files.filter(e => e.checked).map(e => e.path),
                        str, () => this.afterComplete(str));
                    break;
                case 'tar':
                    window.preload.compressing.toTar(this.files.filter(e => e.checked).map(e => e.path),
                        str, () => this.afterComplete(str));
                    break;
                case 'tgz':
                    window.preload.compressing.toTgz(this.files.filter(e => e.checked).map(e => e.path),
                        str, () => this.afterComplete(str));
                    break;
                default:
                    alert('压缩类型错误，无法压缩')
            }

        },
        afterComplete(str) {
            this.clear();
            const res = confirm("压缩成功，是否打开文件路径");
            if (res) {
                utools.shellShowItemInFolder(str);
            }
        }

    }
}).mount('#compressing');

