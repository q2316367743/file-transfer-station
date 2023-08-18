window.exports = {
    "application": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码
        args: {
            // 进入插件应用时调用
            enter: () => {
                const ubWindow = utools.createBrowserWindow('index.html', {
                    useContentSize: true,
                    width: 200,
                    height: 232,
                    frame: true,
                    transparent: false,
                    backgroundColor: '#000000',
                    hasShadow: false,
                    titleBarStyle: 'hidden',
                    titleBarOverlay: true,
                    alwaysOnTop: true
                }, () => {
                    // 设置窗口是否可以由用户手动最大化。
                    ubWindow.setMaximizable(false)
                    // 设置用户是否可以调节窗口尺寸
                    ubWindow.setResizable(false)
                    ubWindow.show();
                    utools.hideMainWindow();
                    if (utools.isDev()) {
                        ubWindow.webContents.openDevTools();
                    } else {
                        utools.outPlugin();
                    }
                });
            }
        }
    }
}