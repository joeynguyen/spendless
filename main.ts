import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const isDev = process.env.ELECTRON_IS_DEV;

// install dev tools for debugging during development
const installExtensions = async () => {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
  } = require('electron-devtools-installer');

  const REACT_PERF_DEVTOOLS = 'fcombecpigkkfcbfaeikoeegkmkjfbfm';
  const extensions = [
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
    REACT_PERF_DEVTOOLS,
  ];

  await Promise.all(
    extensions.map(extension => {
      return new Promise(resolve => {
        resolve(installExtension(extension));
      });
    })
  )
    .then(name => console.log(`Added Extensions:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    darkTheme: true,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
    width: 1440,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000?react_perf' // Dev server ran by react-scripts
      : `file://${path.join(__dirname, '/build/index.html')}` // Bundled application
  );

  // if (isDev) {
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDev) {
    await installExtensions();
  }
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
