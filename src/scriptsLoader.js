const { ipcRenderer } = require("electron");
const { config } = require("./events.js");

function scriptsLoader() {
  const scripts = ipcRenderer.sendSync(config.scripts);

  for (const source of scripts) {
    const script = document.createElement("script");
    script.setAttribute("src", source)
    script.setAttribute("type", "module");
    document.head.appendChild(script);
  }
}

scriptsLoader();
