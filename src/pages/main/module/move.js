import {createApp} from "../../../lib/vue@3.3.4@prod.js";


createApp({
    data: () => ({
        path: '',
        text: '移动文件到指定目录'
    }),
    computed: {},
    mounted() {
        const container = this.$refs['container'];
        container.addEventListener('drop', e => {
            e.preventDefault();

            try {

                this.text = '开始移动'

                if (this.path.trim() === '') {
                    alert("请先选择目标目录");
                    return;
                }


                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    const file = e.dataTransfer.files.item(i);
                    const item = e.dataTransfer.items[i];
                    if (item.kind === 'file') {
                        if (!window.preload.fs.statSync(file.path).isFile()) {
                            alert(file.path + '不是文件，无法移动');
                            continue;
                        }
                        this.text = '正在移动:' + file.name;
                        // 文件，移动
                        window.preload.fs.renameSync(file.path, window.preload.path.join(this.path, file.name))
                    }
                }
                this.text = '移动完成';

            } catch (e) {
                this.text = '移动失败:' + e.message || e;
            }finally {
                setTimeout(() => this.text = "移动文件到指定目录", 2000);
            }

            return false;
        })
        container.addEventListener("dragenter", e => e.preventDefault());
        container.addEventListener("dragover", e => e.preventDefault());
        container.addEventListener("dragleave", e => e.preventDefault());

    },
    methods: {
        selectPath() {
            const paths = utools.showOpenDialog({
                title: "选择目标文件夹",
                properties: ['openDirectory', 'createDirectory'],
                buttonLabel: '选择',
                defaultPath: this.path
            });
            if (paths && paths[0]) {
                this.path = paths[0];
            }
        },
        showPathOnExplorer() {
            if (this.path) {
                utools.shellShowItemInFolder(this.path);
            }
        }
    }
}).mount('#move')
