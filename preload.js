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

window.exports = {
    "application": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
        args: {
            // 进入插件应用时调用
            enter: () => {
                let ubWindow = utools.createBrowserWindow('src/pages/main/index.html', {
                    useContentSize: true,
                    skipTaskbar: getByDefault(SKIP_TASKBAR, false),
                    width: getByDefault(WIDTH, 200),
                    height: getByDefault(HEIGHT, 232),
                    minWidth: 172,
                    minHeight: 204,
                    maximizable: false,
                    frame: true,
                    transparent: false,
                    backgroundColor: '#ffffff',
                    hasShadow: false,
                    titleBarStyle: 'hidden',
                    titleBarOverlay: true,
                    alwaysOnTop: getByDefault(ALWAYS_ON_TOP, true),
                    webPreferences: {
                        preload: 'src/pages/main/preload.js'
                    }
                }, () => {
                    ubWindow.show();
                    utools.hideMainWindow();
                    if (utools.isDev()) {
                        ubWindow.webContents.openDevTools();
                    } else {
                        utools.outPlugin();
                    }
                    // 将窗口ID发送过去
                    ipcRenderer.sendTo(ubWindow.webContents.id, KEY, '');
                    ipcRenderer.on(KEY_WINDOW_CLOSE, () => {
                        ubWindow.destroy();
                        utools.outPlugin();
                        process.exit(1);
                    })
                    ubWindow.on('close', () => {
                        utools.outPlugin();
                        process.exit(1);
                    })
                });
            }
        }
    },
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
