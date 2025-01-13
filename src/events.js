const events = {
  config: {
    get: "config-get",
    customCss: "config-custom-css",
    shaders: "config-shaders",
    scripts: "config-scripts"
  },
  storage: {
    get: "storage-get",
    set: "storage-set",
    remove: "storage-remove",
    changed: "storage-changed",
    save: "storage-save",
  },
  terminal: {
    input: "terminal-input",
    resize: "terminal-resize",
    output: "terminal-output",
    focus: "terminal-focus",
  },
  application: {
    move: "application-move",
    position: "application-position",
    systemAccentColor: "application-system-accent-color",
    loadDefaults: "load-defaults"
  },
};

module.exports = events;
