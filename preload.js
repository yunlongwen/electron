const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  sendMessage: (message) => ipcRenderer.send('message-from-renderer', message),
  onMessage: (callback) => ipcRenderer.on('message-from-main', (event, arg) => callback(arg)),
  // 除函数之外，我们也可以暴露变量
})