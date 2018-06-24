'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
exports.__esModule = true;
var electron_1 = require('electron');
var path = require('path');
var isDev = process.env.ELECTRON_IS_DEV;
// install dev tools for debugging during development
var installExtensions = function() {
  return __awaiter(_this, void 0, void 0, function() {
    var _a,
      installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
      REACT_PERF_DEVTOOLS,
      extensions;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          (_a = require('electron-devtools-installer')),
            (installExtension = _a['default']),
            (REACT_DEVELOPER_TOOLS = _a.REACT_DEVELOPER_TOOLS),
            (REDUX_DEVTOOLS = _a.REDUX_DEVTOOLS);
          REACT_PERF_DEVTOOLS = 'fcombecpigkkfcbfaeikoeegkmkjfbfm';
          extensions = [
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
            REACT_PERF_DEVTOOLS,
          ];
          return [
            4 /*yield*/,
            Promise.all(
              extensions.map(function(extension) {
                return new Promise(function(resolve) {
                  resolve(installExtension(extension));
                });
              })
            )
              .then(function(name) {
                return console.log('Added Extensions:  ' + name);
              })
              ['catch'](function(err) {
                return console.log('An error occurred: ', err);
              }),
          ];
        case 1:
          _b.sent();
          return [2 /*return*/];
      }
    });
  });
};
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
function createWindow() {
  // Create the browser window.
  mainWindow = new electron_1.BrowserWindow({
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
      : 'file://' + path.join(__dirname, '/build/index.html') // Bundled application
  );
  // if (isDev) {
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // }
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', function() {
  return __awaiter(_this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!isDev) return [3 /*break*/, 2];
          return [4 /*yield*/, installExtensions()];
        case 1:
          _a.sent();
          _a.label = 2;
        case 2:
          createWindow();
          return [2 /*return*/];
      }
    });
  });
});
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
