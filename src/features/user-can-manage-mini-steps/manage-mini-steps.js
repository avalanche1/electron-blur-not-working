const {app, BrowserWindow, Menu, screen, ipcMain} = require("electron");
const path = require("path");

app.whenReady().then(open_window);

function open_window() {
  // Explain: Create app window.
  const WINDOW_DEFAULTS = {WIDTH: 300, OPACITY: 1};
  const minisWindow = new BrowserWindow({
    width: WINDOW_DEFAULTS.WIDTH,
    height: 200,
    x: screen.getPrimaryDisplay().workAreaSize.width - WINDOW_DEFAULTS.WIDTH - 50,
    y: 50,
    frame: false,
    opacity: WINDOW_DEFAULTS.OPACITY,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  minisWindow.setAlwaysOnTop(true);

  // Explain: Render the app.
  void minisWindow.loadFile(
    `${__dirname}/manage-mini-steps.html`,
  );

  // Spec-start: User can hide any App window temporarily.
  const {ipcMain} = require("electron");
  // todo: uncomment, when TS.
  ipcMain.on("hide-me-temporarily", (event, arg) => {
    // Spec-start: 1.212.11.1. Windows are gracefully minimized and restored (with animation).
    minisWindow.blur();
    minisWindow.minimize();
    // Menu.sendActionToFirstResponder('hide');
    setTimeout(() => restore_window(), 30 * 1000);

    // Explain: If the User is in another full-screen app when it's time to restore the window, - ..
    // the window will fail to be restored. So we need a tail recursing fn to restore it, when ..
    // User exits the full-screen app.
    function restore_window() {
      minisWindow.restore();
      if (!minisWindow.isVisible()) setTimeout(() => restore_window(), 60 * 1000);
    }

    // Spec-end.
  });
  // Spec-end.
}

function winReturnFocus() {
  const dummyTransparentWindow = new BrowserWindow({
    width: 1,
    height: 1,
    x: -100,
    y: -100,
    transparent: true,
    frame: false,
  });
  dummyTransparentWindow.close();
}
