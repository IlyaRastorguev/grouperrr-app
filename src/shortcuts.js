const shortcuts = new Map();

function registerShortcut(keys, action) {
  shortcuts.set(keys, action);
}

window.addEventListener("keydown", (event) => {
  let key = event.key;

  if (event.altKey) {
    key = "alt+" + key;
  }

  if (event.ctrlKey) {
    key = "ctrl+" + key;
  }

  if (event.shiftKey) {
    key = "shift+" + key;
  }

  if (event.metaKey) {
    key = "meta+" + key;
  }

  if (shortcuts.has(key)) {
    event.preventDefault();
    event.stopPropagation();
    shortcuts.get(key)();
  }
});

module.exports = { registerShortcut };
