/// <reference types="vite/client" />
interface Window {
    preload: {
        exit(code: number): void
    },
    ipcRenderer: {
        sendTo(id: number, channel: string, msg: any);
        on(channel: string, callback: (event: Event, res: any[]) => void)
    }
}
