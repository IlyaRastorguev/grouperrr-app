const { ipcRenderer } = require("electron");
const { config, application } = require("./events.js");

const systemAccentColor = ipcRenderer.sendSync(application.systemAccentColor);

function loadTheme() {
  const cnfg = ipcRenderer.sendSync(config.get);

  document.documentElement.style.setProperty(
    "--primary-bg",
    cnfg.theme.primaryBg,
  );
  document.documentElement.style.setProperty(
    "--primary-fg",
    cnfg.theme.primaryFg,
  );
  document.documentElement.style.setProperty(
    "--accent-color",
    cnfg.theme.accentColor === "system"
      ? `#${systemAccentColor}`
      : cnfg.theme.accentColor,
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    cnfg.theme.secondaryColor,
  );
  document.documentElement.style.setProperty(
    "--thirdary-color",
    cnfg.theme.thirdaryColor,
  );
  document.documentElement.style.setProperty(
    "--fourthary-color",
    cnfg.theme.fourtharyColor,
  );
  document.documentElement.style.setProperty(
    "--fifthary-color",
    cnfg.theme.fiftharyColor,
  );
  document.documentElement.style.setProperty(
    "--overlay-bg",
    cnfg.theme.overlayBg,
  );
  document.documentElement.style.setProperty("--border", cnfg.theme.border);

  const customCss = ipcRenderer.sendSync(config.customCss);

  if (customCss) {
    const style = document.createElement("style");
    style.innerHTML = customCss;
    document.head.appendChild(style);
  }
}

loadTheme();
