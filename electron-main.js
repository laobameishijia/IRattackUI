const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // 开发环境加载 Vue 项目地址，生产环境加载打包后的文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.loadFile(path.join(__dirname, 'index.html'))
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


// 监听渲染进程的目录选择请求
ipcMain.handle('select-directory', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
    // 如果有选择，则返回路径，否则返回空
    return result.canceled ? null : result.filePaths[0]
  })

// 监听渲染进程的目录选择请求
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile']
    })
    // 如果有选择，则返回路径，否则返回空
    return result.canceled ? null : result.filePaths[0]
  })
  
  