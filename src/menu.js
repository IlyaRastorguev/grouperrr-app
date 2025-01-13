const { Menu } = require("electron");
const { loadDefaults } = require("./loadDefaults.js");


const menuTemplate = [
  {
    label: "Settings",
    submenu: [
      {
        label: "Load default scripts",
        accelerator: "CmdOrCtrl+Shift+D",
        click: () => {
          loadDefaults();
        },
      },
    ],
  },
];

function createMenu() {
  const defaultMenu = Menu.getApplicationMenu().items;
  const menu = Menu.buildFromTemplate(menuTemplate);

  for (const i of defaultMenu) {
    menu.append(i);
  }

  Menu.setApplicationMenu(menu);
}

module.exports = {
  createMenu,
};
