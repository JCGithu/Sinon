// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
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
    fullscreenable:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./GUI/GUI.html')

  mainWindow.on('maximize', () => mainWindow.unmaximize());

  mainWindow.on('show', () => setSize(449, 301));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  setTimeout(function() {
      createWindow();
      
  }, 10);
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


function createWaveWindow() {
  const childWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });
  childWindow.loadFile('./GUI/wave.html');
  /* win.loadURL(`file://${__dirname}/wave.html`); */

  childWindow.on('closed', function(){
      childWindow = null
  })
}

ipcMain.on('open-wave', (event, effectFile) => {
  console.log('recieved')
  console.log(effectFile)
  createWaveWindow();
})