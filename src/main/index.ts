import chalk from 'chalk';
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { registerEvents } from './ipc';

const { is } = require('electron-util');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null = null;


const startUrl = is.development ?
  `http://localhost:3000` :
  url.format({
    pathname: path.join(__dirname, '../../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.error);
};

function createWindow() {
  // Create the browser window.
  const opts: BrowserWindowConstructorOptions = {
    webPreferences: {
      webSecurity: !is.development,
      nodeIntegration: true,
    },
    title: 'PingPlotter',
    show: false,
  };

  // init window
  mainWindow = new BrowserWindow(opts);
  mainWindow.loadURL(startUrl);
  mainWindow.hide();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow!.maximize();
  });

  mainWindow.webContents.once('did-finish-load', () => {
    console.log(chalk.greenBright('Finished loading web contents'));
    mainWindow!.show();
    mainWindow!.maximize();
  });

  registerEvents(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  console.log(chalk.greenBright('App is ready'));
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});