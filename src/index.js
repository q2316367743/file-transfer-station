
const el = new Vue({
    el: '#app',
    data: {
        files: [],
        listShow: false
    },
    computed: {
        text() {
            if (this.files.length > 0) {
                return "拖拽" + this.files.length + "个文件（夹）离开这里"
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
                            name: file.name
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
            utools.startDrag(this.files.map(e => e.path));
            this.files = [];
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
        showInExplorer(path){
            utools.shellShowItemInFolder(path);
        }
    }
})