const fs = require("fs");
const pth = require("path");

const defaultScripts = [
  {
    fileName: "quickMenu",
    path: "./src/quickMenu.js",
  },
  {
    fileName: "titlebar",
    path: "./src/titlebar.js",
  },
  {
    fileName: "sidebar",
    path: "./src/sidebar.js",
  },
];

function loadDefaults() {
  for (const f of defaultScripts) {
    const { fileName, path } = f;
    const fileContent = fs.readFileSync(path, { encoding: "utf8" });
    const filePath = pth.join(
      process.env.HOME,
      `.config/Grouper/scripts/${fileName}.js`,
    );
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error("Error saving file:", err);
      } else {
      }
    });
  }
}

module.exports = {
  loadDefaults,
};
