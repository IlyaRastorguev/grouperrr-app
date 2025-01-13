const { ipcMain, ipcRenderer } = require("electron");
const {
  storage: { get, set, remove, changed },
} = require("./events.js");

class Storage {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.storage = {};
  }

  static create(mainWindow) {
    const storage = new Storage(mainWindow);

    ipcMain.on(get, (event, key) => {
      event.returnValue = storage.#get(key);
    });

    ipcMain.on(set, (_, key, value) => {
      storage.#set(key, value);
    });

    ipcMain.on(remove, (_, key) => {
      storage.#remove(key);
    });
  }

  #get(key) {
    return this.storage[key];
  }

  #set(key, value) {
    this.storage[key] = value;
    this.mainWindow.webContents.send(`${changed}_${key}`, value);
  }

  #remove(key) {
    ipcRenderer.emit(changed, key);
    delete this.storage[key];
  }
}

function getFromStorage(key) {
  return ipcRenderer.sendSync(get, key);
}

function setToStorage(key, value) {
  ipcRenderer.send(set, key, value);
}

function subscribeToStorageValue(
  storageKey,
  callback,
  { getInitialValue } = {},
) {
  if (getInitialValue) {
    callback(getFromStorage(storageKey));
  }

  ipcRenderer.on(`${changed}_${storageKey}`, function(_, value) {
    callback(value);
  });
}

module.exports = {
  createStorage: Storage.create,
  setToStorage,
  subscribeToStorageValue,
  getFromStorage,
};
