const { ipcMain } = require("electron");
const {
  terminal: { resize, input, output },
} = require("./events.js");
const pty = require("node-pty");

process.env.LC_CTYPE = 'en_US.UTF-8';
let ptyProcess;

function initializePty(mainWindow) {
  ptyProcess = pty.spawn("/bin/zsh", [], {
    name: "xterm-256color",
    cols: 80,
    rows: 60,
    cwd: "/",
    encoding: "utf8",
    env: process.env,
  });

  ipcMain.on(input, (event, data) => {
    ptyProcess.write(`${data}`);
    event.returnValue = true;
  });

  ipcMain.on(resize, (_, [cols, rows]) => {
    ptyProcess.resize(cols, rows);
  });

  ptyProcess.onData((data) => {
    try {
      mainWindow.webContents.send(output, data.toString());
    } catch (e) {}
  });
}

function killPty() {
  ptyProcess.kill();
}

module.exports = { initializePty, killPty };
