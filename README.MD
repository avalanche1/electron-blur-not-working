This repo demonstrates that `win.blur()` api doesn't return focus to the previous app.

Electron issue: https://github.com/electron/electron/issues/3472#issuecomment-905835523

Steps to reproduce:
  - macOS (mine is `10.14`)
  - `npm start`
  - a frameless blue window will appear in top right corner of the screen
  - click the grey rectangle in bottom right corner of the blue window; this action is supposed to minimize the window and return focus to the previously focused app in the OS
    - the code involved is in ...
  - as you can see by pressing Cmd+F2 - the focus remains in the Electron app
