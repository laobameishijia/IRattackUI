const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { readdirSync, statSync, readFile} = require('fs');
const { join, path } = require('path');
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
    mainWindow.loadURL('http://localhost:5174')
  } else {
    mainWindow.loadURL('http://localhost:5174')
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

  // 监听来自渲染进程的获取文件列表请求
ipcMain.handle('get-files-in-directory', (event, directoryPath) => {
  const getAllFiles = (dirPath) => {
      let files = [];
      const entries = readdirSync(dirPath, { withFileTypes: true });
      entries.forEach(entry => {
          const filePath = join(dirPath, entry.name);
          if (entry.isDirectory()) {
              files = files.concat(getAllFiles(filePath));
          } else {
              files.push(filePath);
          }
      });
      return files;
  };

  try {
      console.log(directoryPath)
      return getAllFiles(directoryPath);
  } catch (error) {
      console.error('获取文件列表时出错:', error);
      return [];
  }
});

ipcMain.handle('read-text-file', (event, filePath) => {
  return new Promise((resolve, reject) => {
      readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('读取文件时出错:', err);
              reject(err);
          } else {
              resolve(data);
          }
      });
  });
});

ipcMain.handle('read-ui-json-file', (event, filePath) => {
  return new Promise((resolve, reject) => {
      readFile(filePath, 'utf8', (err, data) => {
          if (err) {
              console.error('读取文件时出错:', err);
              reject(err);
          } else {
              try {
                  const jsonData = JSON.parse(data);
                  resolve(jsonData);
              } catch (parseError) {
                  console.error('解析 JSON 时出错:', parseError);
                  reject(parseError);
              }
          }
      });
  });
});