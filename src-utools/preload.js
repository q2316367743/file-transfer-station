const {ipcRenderer} = require('electron');

// 常量
const KEY = "file-transfer-station";
// 窗口操作
const KEY_WINDOW = 'window';
const KEY_WINDOW_CLOSE = 'window-close';

const SKIP_TASKBAR = '/setting/skipTaskbar';
const ALWAYS_ON_TOP = '/setting/alwaysOnTop'
const HEIGHT = '/setting/height';
const WIDTH = '/setting/width';

function getByDefault(key, defaultValue) {
    let value = utools.dbStorage.getItem(key);
    if (typeof value === 'undefined' || value == null) {
        return defaultValue;
    }
    return value;
}

window.ipcRenderer = ipcRenderer;
window.preload = {
    exit(code) {
        process.exit(code);
    }
}



window.exports = {
    "setting": {
        mode: "none",
        args: {
            enter: () => {
                const ubWindow = utools.createBrowserWindow('src/pages/setting/index.html', {
                    useContentSize: true,
                    width: 600,
                    height: 400,
                    frame: true,
                    transparent: false,
                    backgroundColor: '#ffffff',
                    hasShadow: false,
                }, () => {
                    ubWindow.show();
                    utools.hideMainWindow();
                    if (utools.isDev()) {
                        ubWindow.webContents.openDevTools();
                    } else {
                        utools.outPlugin();
                    }
                });
            },
        }
    }
}
