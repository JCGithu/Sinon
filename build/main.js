// Modules to control application life and create native browser window
var _a = require('electron'), app = _a.app, ipcMain = _a.ipcMain, BrowserWindow = _a.BrowserWindow;
var path = require('path');
function createWindow() {
    // Create the browser window.
    var mainWindow = new BrowserWindow({
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
            nodeIntegration: true
        }
    });
    mainWindow.loadFile('./GUI/GUI.html');
    mainWindow.on('maximize', function () { return mainWindow.unmaximize(); });
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
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
ipcMain.on('waveStart', function (event) {
    console.log('Wave start recieved');
    event.reply('waveStartReply');
});
ipcMain.on('waveDone', function (event, digits) {
    console.log('Wave done recieved');
    event.reply('waveDoneReply', digits);
});
//# sourceMappingURL=main.js.map