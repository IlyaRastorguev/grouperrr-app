const { ipcRenderer } = require("electron");
const { runCommand } = require("./utils.js");
const { registerShortcut } = require("./shortcuts.js");
const { createDialog, closeDialog } = require("./dialog.js");
const storage = require("./storage.js");
const events = require("./events.js");

const sessionParseRegex =
  /^(.*): ((\d+) .*) \(created (\w+ \w+ \s?\d+ \d+:\d+:\d+ \d+)\)( \(attached\))?/;

async function getSessions() {
  const command = "tmux ls";
  const { stdout } = await runCommand(command);

  return stdout
    .toString()
    .trim()
    .split("\n")
    .map((i) => sessionParseRegex.exec(i));
}

const config = ipcRenderer.sendSync(events.config.get);

module.exports = {
  ipcRenderer,
  getSessions,
  registerShortcut,
  runCommand,
  createDialog,
  closeDialog,
  storage,
  events,
  config,
};
