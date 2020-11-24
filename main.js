// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

process.env.ELECTRON_ENABLE_LOGGING=1

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    maxHeight: 350,
    maxWidth: 500,
    resizable: false,
    frame: false,
    transparent: true,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadFile('./GUI/GUI.html');
  mainWindow.on('maximize', () => mainWindow.unmaximize());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  setTimeout(function () {
    createWindow();
  }, 10);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('waveStart', (event) => {
  console.log('Wave start recieved');
  event.reply('waveStartReply');
});

ipcMain.on('waveDone', (event, digits) => {
  console.log('Wave done recieved');
  event.reply('waveDoneReply', digits);
});
