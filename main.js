'use strict';
exports.__esModule = true;
var electron_1 = require('electron');
var path = require('path');
var isDev = process.env.ELECTRON_IS_DEV;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
var createWindow = function() {
  // Create the browser window.
  mainWindow = new electron_1.BrowserWindow({
    darkTheme: true,
    height: 600,
    webPreferences: {
      webSecurity: false,
    },
    width: 800,
  });
  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' // Dev server ran by react-scripts
      : 'file://' + path.join(__dirname, '/build/index.html') // Bundled application
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electron_1.app.quit();
  }
});
electron_1.app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
