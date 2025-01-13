const fs = require("fs");

const defaultConfig = {
  app: {
    appBg: "#00000000",
    pribaryBg: "#191724",
    primaryFg: "#e0def4",
    accentColor: "#eb6f92",
    secondaryColor: "#ea9999",
    thirdaryColor: "#f9c74f",
    fourtharyColor: "#31748f",
    fiftharyColor: "#c4a7e7",
  },
  terminal: {
    fontFamily: "JetBrainsMono Nerd Font",
    fontSize: 12,
    cursorBlink: true,
    screenReaderMode: false,
    theme: {
      background: "#191724",
    },
  },
};
const configDir = `${process.env.HOME}/.config/Grouper`;
const filePath = configDir + "/config.json";

function loadConfig() {
  try {
    const data = fs.readFileSync(filePath);
    const config = JSON.parse(data.toString());

    return config;
  } catch (e) {
    return defaultConfig;
  }
}

function loadCustomCss() {
  try {
    const data = fs.readFileSync(configDir + "/custom.css");
    return data.toString();
  } catch (e) {
    return "";
  }
}

function loadScripts() {
  const scripts = [];
  try {
    const scriptsFolder = fs.readdirSync(configDir + "/scripts", {
      withFileTypes: true,
    });

    for (const i of scriptsFolder) {
      if (i.isFile()) {
        scripts.push(`${i.parentPath}/${i.name}`);
      }
    }

    return scripts;
  } catch (e) {
    console.error("Can't load scripts", e);
    return "";
  }
}

function loadShaders() {
  const shaders = [];
  try {
    const shadersFolder = fs.readdirSync(configDir + "/shaders", {
      withFileTypes: true,
    });

    for (const i of shadersFolder) {
      if (i.isFile()) {
        const shader = fs.readFileSync(`${i.parentPath}/${i.name}`, {
          encoding: "utf-8",
        });
        shaders.push(shader);
      }
    }

    return shaders;
  } catch (e) {
    console.error("Can't load shaders", e);
    return "";
  }
}

module.exports = {
  loadConfig,
  loadCustomCss,
  loadShaders,
  loadScripts,
};
