const {ipcRenderer} = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  // Spec-start: User can hide any App window temporarily.
  document
    .querySelector("#hideBtn")
    .addEventListener("click", () => ipcRenderer.send("hide-me-temporarily"));
  // Spec-end.
});
