const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('./pages/index.html')
}

function send(channel, data) {
  console.log(data)
}
app.whenReady().then(() => {
  // 监听来自渲染进程的消息
  ipcMain.on('message-from-renderer', (event, arg) => {
    console.log(arg); // 打印来自渲染进程的消息
    event.reply('message-from-main', '收到你的消息！');
});
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})