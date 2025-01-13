const { Terminal } = require("@xterm/xterm");
const { WebglAddon } = require("@xterm/addon-webgl");
const { FitAddon } = require("@xterm/addon-fit");

const {
  ipcRenderer,
  runCommand,
  registerShortcut,
  events: {
    terminal: { input, output, resize, focus },
  },
  storage: { subscribeToStorageValue, setToStorage },
  config,
} = window.api;

let isInputLocked = false;

const terminalContainer = document.getElementById("terminal");

const terminal = new Terminal(config.terminal);

if (config.terminal.useGPU) {
  const webglAddon = new WebglAddon();
  terminal.loadAddon(webglAddon);
}

const fitAddon = new FitAddon();

terminal.open(terminalContainer);
terminal.loadAddon(fitAddon);

fitAddon.fit();

terminal.onKey(({ key }) => {
  isInputLocked = true;
  ipcRenderer.send(input, key);
});

ipcRenderer.on(output, (_, data) => {
  terminal.write(data);
});

ipcRenderer.on(focus, () => {
  terminal.focus();
});

terminal.onWriteParsed((_) => {
  if (isInputLocked) {
    isInputLocked = false;
  }
});

const terminalContaiterResizeObserver = new ResizeObserver((entries) => {
  fitAddon.fit();
  ipcRenderer.send(resize, [terminal.cols, terminal.rows]);
});

terminalContaiterResizeObserver.observe(terminalContainer);

terminal.focus();

subscribeToStorageValue(
  "session",
  (sessionName) => {
    if (sessionName) {
      runCommand(
        `tmux display-message  -t ${sessionName} -p '#{window_index}'`,
      ).then(({ stdout }) => {
        const windowId = parseInt(stdout.toString());
        runCommand(`tmux switchc -t ${sessionName}:${windowId}`);
      });
    } else {
      ipcRenderer.send(input, "tmux a \x0d");
      runCommand(`tmux display-message -p '#S'`).then(({ stdout }) => {
        const sessionName = stdout.toString().trim();
        setToStorage("session", sessionName);
      });
    }
    terminal.focus();
  },
  { getInitialValue: true },
);

registerShortcut("meta+v", () => {
  navigator.clipboard.readText().then((text) => {
    ipcRenderer.send(input, text);
  });
});
