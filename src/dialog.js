const {
  terminal: { focus },
} = require("./events");
const { ipcRenderer } = require("electron");
const { registerShortcut } = require("./shortcuts");

const dialogContainer = document.getElementById("dialog-container");

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");

  return card;
}

function createDialogCycleNavigation(wrapper) {
  function getSelectableElements() {
    return wrapper.querySelectorAll(
      'input:not([type="hidden"]), button:not(.hidden), [contenteditable], [tabindex]:not(.hidden[tabindex="-1"])',
    );
  }

  let selectableComponents = [];
  let currentElementIndex = 0;
  let currentElement = selectableComponents[currentElementIndex];

  function goNext() {
    currentElementIndex =
      (currentElementIndex + 1) % selectableComponents.length;
    currentElement = selectableComponents[currentElementIndex];
    currentElement.focus();
  }

  function goPrevious() {
    currentElementIndex =
      currentElementIndex - 1 || selectableComponents.length;
    currentElement = selectableComponents[currentElementIndex];
    currentElement.focus();
  }

  function handler(ev) {
    selectableComponents = getSelectableElements();

    if (ev.key === "Tab") {
      ev.preventDefault();
      goNext();
    } else if (ev.ctrlKey) {
      if (ev.key === "j") {
        ev.preventDefault();
        goNext();
      } else if (ev.key === "k") {
        ev.preventDefault();
        goPrevious();
      }
    }
  }

  function keyupHandler(ev) {
    if (ev.key === "Control") {
      currentElement.click();
    }
  }

  wrapper.addEventListener("keydown", handler);
  wrapper.addEventListener("keyup", keyupHandler);

  return () => {
    wrapper.removeEventListener("keydown", handler);
    wrapper.removeEventListener("keyup", handler);
  };
}

function createDialog(...elements) {
  dialogContainer.innerHTML = "";
  const card = createCard();

  for (const element of elements) {
    card.appendChild(element);
  }

  const cleanupListener = createDialogCycleNavigation(card);

  dialogContainer.appendChild(card);
  dialogContainer.classList.add("open");

  return cleanupListener;
}

function closeDialog() {
  dialogContainer.classList.remove("open");
  ipcRenderer.emit(focus);
}

registerShortcut("Escape", closeDialog);

module.exports = { createDialog, closeDialog };
