const {
  registerShortcut,
  createDialog,
  closeDialog,
  getSessions,
  storage: { setToStorage },
} = window.api;

function renderSessionList(sessions) {
  const div = document.createElement("div");

  sessions.forEach((session, index) => {
    const button = document.createElement("button");

    if (index < 9) {
      const label = document.createElement("span");
      label.classList.add("label");
      label.innerText = `${index + 1}`;
      button.appendChild(label);
      registerShortcut(`${index + 1}`, (cleanup) => {
        setToStorage("session", session[1]);
        closeDialog();
        cleanup();
      });
    }

    const title = document.createElement("span");
    title.innerHTML = session[1];
    button.appendChild(title);

    button.classList.add("session-list-item");
    button.setAttribute("id", session[1]);
    button.addEventListener("click", () => {
      setToStorage("session", session[1]);
      closeDialog();
    });

    div.appendChild(button);
  });

  div.classList.add("flex", "flex-column", "session-list");

  return div;
}

/**
 * @param {Element} sessions
 */
function renderInput(sessions) {
  const input = document.createElement("input");
  input.placeholder = "Enter session name";
  input.addEventListener("input", (ev) => {
    sessions.childNodes.forEach((session) => {
      if (!session.id.toLowerCase().match(ev.target.value.toLowerCase())) {
        session.classList.add("hidden");
      } else {
        session.classList.remove("hidden");
      }
    });
  });

  return input;
}

async function createQuickMenu() {
  const sessions = await getSessions();
  const title = document.createElement("h3");
  title.innerHTML = "Quick switch";

  const sessionsList = renderSessionList(sessions);
  const filterInput = renderInput(sessionsList);

  createDialog(title, filterInput, sessionsList);
  filterInput.focus();
}

registerShortcut("meta+p", createQuickMenu);
