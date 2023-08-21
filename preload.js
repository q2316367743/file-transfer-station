const {ipcRenderer} = require('electron');

// 常量
const KEY = "file-transfer-station";
// 窗口操作
const KEY_WINDOW = 'window';
const KEY_WINDOW_CLOSE = 'window-close';

const SKIP_TASKBAR = '/setting/skipTaskbar';
const ALWAYS_ON_TOP = '/setting/alwaysOnTop'


function getByDefault(key, defaultValue) {
    let value = utools.dbStorage.getItem(key);
    if (typeof value === 'undefined' || value == null) {
        return defaultValue;
    }
    return value;
}

function setValue(key, value) {
    utools.dbStorage.setItem(key, value);
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
                    width: 200,
                    height: 232,
                    minWidth: 32,
                    minHeight: 32,
                    frame: true,
                    transparent: false,
                    backgroundColor: '#000000',
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
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                let skipTaskbar = getByDefault(SKIP_TASKBAR, false);
                let alwaysOnTop = getByDefault(ALWAYS_ON_TOP, true);
                callbackSetList([
                    {
                        title: skipTaskbar ? '隐藏' : '显示',
                        description: '是否在任务栏中显示',
                        key: SKIP_TASKBAR,
                        value: skipTaskbar
                    },

                    {
                        title: alwaysOnTop ? '始终置顶' : '不置顶',
                        description: '是否始终置顶',
                        key: ALWAYS_ON_TOP,
                        value: alwaysOnTop
                    }
                ])
            },
            select: (action, itemData) => {
                const key = itemData.key;
                const value = itemData.value;
                if (key === SKIP_TASKBAR) {
                    setValue(key, !value);
                } else if (key === ALWAYS_ON_TOP) {
                    setValue(key, !value);
                }
                utools.hideMainWindow()
                utools.outPlugin()
                utools.showNotification("修改成功");
            },
        }
    }
}
