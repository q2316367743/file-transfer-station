
// 常量
const KEY = "file-transfer-station";
// 窗口操作
const KEY_WINDOW = 'window';
const KEY_WINDOW_CLOSE = 'window-close';

const SKIP_TASKBAR = '/setting/skipTaskbar';
const ALWAYS_ON_TOP = '/setting/alwaysOnTop'
const HEIGHT = '/setting/height';
const WIDTH = '/setting/width';


function getByDefault(key: string, defaultValue: any) {
    let value = utools.dbStorage.getItem(key);
    if (typeof value === 'undefined' || value == null) {
        return defaultValue;
    }
    return value;
}

export function runner() {
    let ubWindow = utools.createBrowserWindow('src/pages/main/index.html', {
        // @ts-ignore
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
        utools.hideMainWindow();
        utools.outPlugin();
        if (utools.isDev()) {
            ubWindow.webContents.openDevTools();
        }
        // 将窗口ID发送过去
        window.ipcRenderer.sendTo(ubWindow.webContents.id, KEY, '');
        window.ipcRenderer.on(KEY_WINDOW, (_event, res) => {
            // 窗口操作
            if (res) {
                // 变为最小化
                ubWindow.setContentSize(32, 32, true);
            } else {
                ubWindow.setContentSize(200, 232, true);
            }
        });
        window.ipcRenderer.on(KEY_WINDOW_CLOSE, () => {
            ubWindow.destroy();
            utools.outPlugin();
            window.preload.exit(1);
        })
        ubWindow.on('close', () => {
            utools.outPlugin();
            window.preload.exit(1);
        })
    });
}
