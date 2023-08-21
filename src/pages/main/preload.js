const {ipcRenderer} = require('electron')
let parentId = null;

// 默认KEY
const KEY = "file-transfer-station"


// 默认管道，用于接受ID
ipcRenderer.on(KEY, event => {
    parentId = event.senderId;
})

window.preload = {
    /**
     * 接收主窗口发送过来的消息
     * @param channel 管道
     * @param callback 回调函数
     */
    receiveMsg: (channel, callback) => {
        ipcRenderer.on(channel, (event, res) => {
            parentId = event.senderId;
            if (res) {
                callback(res);
            }
        })
    },
    /**
     * 向插件主窗口发送消息
     * @param channel 管道
     * @param msg 消息内容
     */
    sendMsg: (channel, msg) => {
        if (parentId) {
            ipcRenderer.sendTo(parentId || id, channel, msg);
        }
    }
}
