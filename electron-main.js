const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { readdirSync, statSync, readFile,readFileSync} = require('fs');
const { join, basename, dirname } = require('path');
const grpcClient = require('./src/service/grpc_client.js');
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 600,
    title: 'IRFuzz恶意ELF程序GNN检测模型对抗攻击系统',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  // 开发环境加载 Vue 项目地址，生产环境加载打包后的文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    // mainWindow.loadURL('http://localhost:5173')
    mainWindow.loadFile(join(__dirname, 'dist', 'index.html'))
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
ipcMain.handle('get-files-in-directory', async (event, directoryPath) => {
  let idCounter = 1; // ID 计数器在外部定义

  const getAllFiles = (dirPath) => {
    let files = [];
    const entries = readdirSync(dirPath, { withFileTypes: true });
    entries.forEach(entry => {
      const filePath = join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getAllFiles(filePath));
      } else if (filePath.endsWith('.txt') && !(entry.name.startsWith('success_') || entry.name.startsWith('failed_'))) { // 只处理 .txt 文件
        const stats = statSync(filePath);
        const fileName = entry.name;
        const [iteration, advconfidence] = fileName.split('_').map((part, index) => {
          return index === 0 ? parseInt(part, 10) : parseFloat(part.replace('.txt', ''));
        });
        files.push({
          id: idCounter++, // 使用 ID 计数器，并递增
          path: filePath,
          timestamp: formatTimestamp(stats.birthtime),
          iteration,
          advconfidence,
          targetmodel: basename(dirname(dirPath))
        });
      }
    });
    return files;
  };

  try {
    console.log('Directory Path:', directoryPath);
    const result = await getAllFiles(directoryPath);
    console.log('Files:', result);
    return result;
  } catch (error) {
    console.error('获取文件列表时出错:', error);
    return [];
  }
});


function formatTimestamp(date) {
  const pad = (num) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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


ipcMain.handle('get-images', async (event, dirPath) => {
  const files = readdirSync(dirPath);
  const functions = files.filter(file => /\.dot$/.test(file)).reduce((acc, file) => {
    const fileName = basename(file, '.dot')
    const functionName = fileName.slice(1);
    acc[functionName] = join(dirPath, `${fileName}.dot.png`);
    return acc;
  }, {});
  return functions;
});


ipcMain.handle('detect-file', async (event, filePath) => {
  console.log("Test")
  const content = readFileSync(filePath);
  const base64Content = content.toString('base64');
  console.log("base64Content",base64Content)
  return await grpcClient.detect(content);
});