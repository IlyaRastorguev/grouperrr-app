const { app, BrowserWindow, ipcMain, systemPreferences } = require("electron");
const { createMenu } = require("./menu.js");
const { config, application } = require("./events.js");
const { createStorage } = require("./storage.js");
const {
  loadConfig,
  loadCustomCss,
  loadShaders,
  loadScripts,
} = require("./config.js");
const { initializePty, killPty } = require("./pty.js");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    movable: true,
    titleBarStyle: "hiddenInset",
    width: 800,
    height: 600,
    backgroundColor: "#00000000",
    transparent: true,
    hasShadow: true,
    vibrancy: "sidebar",
    trafficLightPosition: {
      x: 16,
      y: 14,
    },
    webPreferences: {
      preload: "./src/preload.js",
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      movable: true,
    },
    icon: __dirname + "/public/icon.icns",
  });

  ipcMain.on(config.get, (ev) => {
    const config = loadConfig();
    ev.returnValue = config;
  });

  ipcMain.on(config.customCss, (ev) => {
    const customCss = loadCustomCss();
    ev.returnValue = customCss;
  });

  ipcMain.on(config.shaders, (ev) => {
    const shaders = loadShaders();
    ev.returnValue = shaders;
  });

  ipcMain.on(config.scripts, (ev) => {
    const scripts = loadScripts();
    ev.returnValue = scripts;
  });

  ipcMain.on(application.position, (ev) => {
    ev.returnValue = mainWindow.getPosition();
  });

  ipcMain.on(application.systemAccentColor, (ev) => {
    ev.returnValue = systemPreferences.getAccentColor();
  });

  ipcMain.on(application.move, (ev, x, y) => {
    mainWindow.setPosition(x, y, true);
  });

  createMenu();

  mainWindow.loadFile("index.html");

  initializePty(mainWindow);
  createStorage(mainWindow);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function() {
  app.quit();
});

app.on("quit", function() {
  killPty();
});
