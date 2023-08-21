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
const BACKGROUND_COLOR = '/setting/backgroundColor';

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
                const ubWindow = utools.createBrowserWindow('src/pages/main/index.html', {
                    useContentSize: true,
                    skipTaskbar: getByDefault(SKIP_TASKBAR, false),
                    width: getByDefault(WIDTH, 200),
                    height: getByDefault(HEIGHT, 232),
                    minWidth: 32,
                    minHeight: 32,
                    frame: true,
                    transparent: false,
                    backgroundColor: '#ffffff',
                    hasShadow: false,
                    titleBarStyle: 'hidden',
                    alwaysOnTop: getByDefault(ALWAYS_ON_TOP, true),
                    resizable: false,
                    webPreferences: {
                        preload: 'src/pages/main/preload.js'
                    }
                }, () => {
                    ubWindow.show();
                    // 将窗口ID发送过去
                    ipcRenderer.sendTo(ubWindow.webContents.id, KEY, '');
                    ipcRenderer.on(KEY_WINDOW, (event, res) => {
                        // 窗口操作
                        if (res) {
                            // 变为最小化
                            ubWindow.setContentSize(32, 32, true);
                        } else {
                            ubWindow.setContentSize(200, 232, true);
                        }
                    });
                    ipcRenderer.on(KEY_WINDOW_CLOSE, () => {
                        ubWindow.destroy();
                        utools.outPlugin();
                        process.exit(1);
                    })
                    utools.hideMainWindow();
                    if (utools.isDev()) {
                        ubWindow.webContents.openDevTools();
                    } else {
                        utools.outPlugin();
                    }
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
